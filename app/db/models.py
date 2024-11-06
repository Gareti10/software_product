
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, func
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType
from db.base import Base



# Modelo de Fornecedor
class Fornecedor(Base):
    __tablename__ = "fornecedores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    telefone = Column(String)

    # Relacionamento com Produtos
    produtos = relationship("Produtos", back_populates="fornecedor")


# Modelo de Produtos
class Produtos(Base):
    __tablename__ = "tb_produtos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    item = Column(String, nullable=False)
    preco = Column(Float)
    quantidade_estoque = Column(Integer)
    quantidade_minima_estoque = Column(Integer)
    id_setor = Column(Integer, ForeignKey('tb_setores.id'), nullable=False)
    id_fornecedor = Column(Integer, ForeignKey('fornecedores.id'), nullable=False)

    # Relacionamento com Fornecedor
    fornecedor = relationship("Fornecedor", back_populates="produtos")




class ProdutoFornecedor(Base):
    __tablename__ = "produto_fornecedor"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_produto = Column(Integer, ForeignKey("tb_produtos.id"), nullable=False)
    id_fornecedor = Column(Integer, ForeignKey("fornecedores.id"), nullable=False)
    preco = Column(Float, nullable=False)
    data_associacao = Column(DateTime, default=func.now())

    # Relacionamentos usando strings para evitar problemas de dependência
    produto = relationship("Produtos", backref="produto_fornecedores")
    fornecedor = relationship("Fornecedor", backref="produto_fornecedores")


class Setores(Base):
    __tablename__ = 'tb_setores'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    nome = Column('nome', String, nullable=False)



class Usuarios(Base):
    __tablename__ = 'tb_usuarios'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    username = Column('username', String, nullable=False, unique=True)
    password = Column('password', String, nullable=False)
    email = Column('Email', EmailType)



# Modelo de Cliente
class Cliente(Base):
    __tablename__ = 'clientes'
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True, nullable=False)
    endereco = Column(String, nullable=False)
    telefone = Column(String, nullable=False)
    email = Column(String, nullable=False)

    # Relacionamento com Compras (histórico de compras)
    compras = relationship("Compra", back_populates="cliente")
# Modelo de Compra (histórico de compras do cliente)
class Compra(Base):
    __tablename__ = "compras"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_produto = Column(Integer, ForeignKey("tb_produtos.id"), nullable=False)
    id_cliente = Column(Integer, ForeignKey("clientes.id"), nullable=False)  # Chave estrangeira para Cliente
    quantidade = Column(Integer, nullable=False)
    data_compra = Column(DateTime, default=func.now())

    # Relacionamentos
    produto = relationship("Produtos", backref="compras")
    cliente = relationship("Cliente", back_populates="compras")  # Relacionamento com Cliente
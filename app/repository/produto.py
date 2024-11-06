from sqlalchemy.orm import Session

from db.models import Produtos
from db.models import ProdutoFornecedor

class ProdutoRepository:
    @staticmethod
    def find_all(db: Session) -> list[Produtos]:
        return db.query(Produtos).all()

    @staticmethod
    def save(db: Session, produto: Produtos) -> Produtos:
        if produto.id:
            db.merge(produto)
        else:
            db.add(produto)
        db.commit()
        return produto

    @staticmethod
    def find_by_id(db: Session, id: int) -> Produtos:
        return db.query(Produtos).filter(Produtos.id == id).first()
 
    @staticmethod
    def find_by_nome_item(db: Session, nome_item: str) -> Produtos:
        return db.query(Produtos).filter(Produtos.item == nome_item).first()

    @staticmethod
    def exists_by_id(db: Session, id: int) -> bool:
        return db.query(Produtos).filter(Produtos.id == id).first() is not None

    @staticmethod
    def delete_by_id(db: Session, id: int) -> None:
        produto = db.query(Produtos).filter(Produtos.id == id).first()
        if produto is not None:
            db.delete(produto)
            db.commit()
 


    # Função para encontrar o menor preço de um produto específico
    @staticmethod
    def find_menor_preco_por_produto(db: Session, produto_id: int):
        return db.query(ProdutoFornecedor).filter(ProdutoFornecedor.produto_id == produto_id).order_by(ProdutoFornecedor.preco.asc()).first()

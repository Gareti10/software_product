from sqlalchemy.orm import Session
from db.models import Fornecedor, ProdutoFornecedor
from schemas.fornecedor import FornecedorRequest

class FornecedorRepository:

    @staticmethod
    def create(db: Session, fornecedor: FornecedorRequest):
        new_fornecedor = Fornecedor(**fornecedor.dict())
        db.add(new_fornecedor)
        db.commit()
        db.refresh(new_fornecedor)
        return new_fornecedor

    @staticmethod
    def get_all(db: Session):
        return db.query(Fornecedor).all()

    @staticmethod
    def get_by_id(db: Session, fornecedor_id: int):
        return db.query(Fornecedor).filter(Fornecedor.id == fornecedor_id).first()

    @staticmethod
    def set_preco_produto(db: Session, fornecedor_id: int, produto_id: int, preco: float):
        produto_fornecedor = ProdutoFornecedor(
            fornecedor_id=fornecedor_id,
            produto_id=produto_id,
            preco=preco
        )
        db.add(produto_fornecedor)
        db.commit()
        db.refresh(produto_fornecedor)
        return produto_fornecedor

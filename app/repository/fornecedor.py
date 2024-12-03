from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from db.models import Fornecedor, ProdutoFornecedor, Produtos
from schemas.produto_fornecedor import ProdutoFornecedorResponse
from schemas.fornecedor import FornecedorRequest
from sqlalchemy import func

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
        # Verificar se o produto existe
        produto = db.query(Produtos).filter(Produtos.id == produto_id).first()
        if not produto:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado")

        # Verificar se já existe uma relação entre fornecedor e produto
        produto_fornecedor = db.query(ProdutoFornecedor).filter(
            ProdutoFornecedor.id_produto == produto_id,
            ProdutoFornecedor.id_fornecedor == fornecedor_id
        ).first()

        if produto_fornecedor:
            # Atualizar o preço se a relação já existir
            produto_fornecedor.preco = preco
        else:
            # Criar uma nova relação
            produto_fornecedor = ProdutoFornecedor(
                id_produto=produto_id,
                id_fornecedor=fornecedor_id,
                preco=preco
            )
            db.add(produto_fornecedor)

        db.commit()
        db.refresh(produto_fornecedor)

        return ProdutoFornecedorResponse.from_orm(produto_fornecedor)  # Usando .from_orm para gerar a resposta


    @staticmethod
    def get_best_price_for_item(db: Session, produto_id: int):
        # Encontrar o menor preço para o produto
        result = db.query(
            ProdutoFornecedor.id_produto,
            ProdutoFornecedor.id_fornecedor,
            ProdutoFornecedor.preco,
            Fornecedor.nome.label("fornecedor_nome")
        ).join(Fornecedor, ProdutoFornecedor.id_fornecedor == Fornecedor.id) \
         .filter(ProdutoFornecedor.id_produto == produto_id) \
         .order_by(ProdutoFornecedor.preco.asc()) \
         .first()  # Pega o primeiro resultado, que será o menor preço
        
        if result:
            return {
                "produto_id": result.id_produto,
                "fornecedor_id": result.id_fornecedor,
                "fornecedor_nome": result.fornecedor_nome,
                "preco": result.preco
            }
        return None
    
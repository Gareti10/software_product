from typing import List
from fastapi import APIRouter, Response, Depends, status, Query, HTTPException
from sqlalchemy.orm import Session
from db.database import engine,SessionLocal, get_db


from sqlalchemy.orm import Session
from repository.produto import ProdutoRepository
from db.models import Produtos as ProdutosModel # Certifique-se de que o modelo SQLAlchemy está no arquivo models.py
from schemas.produto import ProdutoRequest, ProdutoResponse  # Os esquemas Pydantic são importados aqui


from db.base import Base
from db.database import get_db


from db.models import Produtos
from schemas.produto import ProdutoUpdate

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



def send_low_stock_email(produto):
    sender_email = "92rafa@gmail.com"
    receiver_email = "rafael.gareti@aluno.faculdadeimpacta.com.br"
    password = "gzry xomu bcnk ravf"

    message = MIMEMultipart("alternative")
    message["Subject"] = f"Compra Necessária: {produto.item}"
    message["From"] = sender_email
    message["To"] = receiver_email

    text = f"A quantidade do produto {produto.item} atingiu a quantidade mínima. Por favor, compre mais 100 unidades."
    html = f"<p>A quantidade do produto <strong>{produto.item}</strong> atingiu a quantidade mínima. Por favor, compre mais 100 unidades.</p>"

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())


#cria a tabela
Base.metadata.create_all(bind=engine)
router = APIRouter(prefix="/v1/api/produtos")


@router.post("/criar", response_model=ProdutoResponse, status_code=status.HTTP_201_CREATED)
def create(request: ProdutoRequest, db: Session = Depends(get_db)):
    produto = ProdutoRepository.save(db, ProdutosModel(**request.dict()))
    return ProdutoResponse.from_orm(produto)


@router.get("/listar_todos", response_model=list[ProdutoResponse])
def find_all(db: Session = Depends(get_db)):
    produtos = ProdutoRepository.find_all(db)
    return [ProdutoResponse.from_orm(produto) for produto in produtos]


@router.get("/procurar_por_id/{id}", response_model=ProdutoResponse)
def find_by_id(id: int, db: Session = Depends(get_db)):
    produto = ProdutoRepository.find_by_id(db, id)
    if not produto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
        )
    return ProdutoResponse.from_orm(produto)


@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_by_id(id: int, db: Session = Depends(get_db)):
    if not ProdutoRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
        )
    ProdutoRepository.delete_by_id(db, id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/update/{id}", response_model=ProdutoResponse)
def update(id: int, request: ProdutoRequest, db: Session = Depends(get_db)):
    if not ProdutoRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
        )
    produto = ProdutoRepository.save(db, ProdutosModel(id=id, **request.dict()))
    return ProdutoResponse.from_orm(produto)
@router.put("/aumentar_caixas/{id}")
def aumentar_caixas(id: int, quantidade: int, db: Session = Depends(get_db)):
    produto = db.query( ProdutosModel).filter( ProdutosModel.id == id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    produto.quantidade_estoque += quantidade
    db.commit()
    db.refresh(produto)
    return {"message": "Caixas aumentadas com sucesso", "produto": produto}

# @router.put("/diminuir_caixas/{id}")
# def diminuir_caixas(id: int, quantidade: int, db: Session = Depends(get_db)):
#     produto = db.query( ProdutosModel).filter( ProdutosModel.id == id).first()
#     if not produto:
#         raise HTTPException(status_code=404, detail="Produto não encontrado")
#     if produto.quantidade_estoque - quantidade < 0:
#         raise HTTPException(status_code=400, detail="Quantidade de caixas não pode ser negativa")
#     produto.quantidade_estoque -= quantidade
#     db.commit()
#     db.refresh(produto)
#     return {"message": "Caixas diminuídas com sucesso", "produto": produto}


@router.put("/diminuir_caixas/{id}")
def diminuir_caixas(id: int, quantidade: int, db: Session = Depends(get_db)):
    produto = db.query(ProdutosModel).filter(ProdutosModel.id == id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    if produto.quantidade_estoque - quantidade < 0:
        raise HTTPException(status_code=400, detail="Quantidade de caixas não pode ser negativa")
    
    produto.quantidade_estoque -= quantidade

    # Verifica se a quantidade em estoque atingiu ou está abaixo da quantidade mínima
    if produto.quantidade_estoque <= produto.quantidade_minima_estoque:
        send_low_stock_email(produto)  # Envia o e-mail

    db.commit()
    db.refresh(produto)
    return {"message": "Caixas diminuídas com sucesso", "produto": produto}

@router.get("/produtos/{produto_id}/menor_preco")
def get_menor_preco(produto_id: int, db: Session = Depends(get_db)):
    fornecedor_com_menor_preco = find_menor_preco_por_produto(db, produto_id)
    if fornecedor_com_menor_preco:
        return fornecedor_com_menor_preco
    return {"message": "Nenhum fornecedor encontrado para este produto"}
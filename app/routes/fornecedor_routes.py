from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from repository.fornecedor import FornecedorRepository
from schemas.fornecedor import FornecedorRequest, FornecedorResponse

router = APIRouter(prefix="/v1/api/fornecedores", tags=["Fornecedores"])


# Rota para cadastrar um novo fornecedor
@router.post("/fornecedores", response_model=FornecedorResponse, status_code=status.HTTP_201_CREATED)
def create_fornecedor(fornecedor: FornecedorRequest, db: Session = Depends(get_db)):
    return FornecedorRepository.create(db, fornecedor)

# Rota para listar todos os fornecedores
@router.get("/fornecedores", response_model=list[FornecedorResponse])
def list_fornecedores(db: Session = Depends(get_db)):
    return FornecedorRepository.get_all(db)

# Rota para definir o preço de um produto pelo fornecedor
@router.post("/fornecedores/{fornecedor_id}/produtos/{produto_id}/preco")
def set_preco_produto(fornecedor_id: int, produto_id: int, preco: float, db: Session = Depends(get_db)):
    fornecedor = FornecedorRepository.get_by_id(db, fornecedor_id)
    if not fornecedor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fornecedor não encontrado")
    return FornecedorRepository.set_preco_produto(db, fornecedor_id, produto_id, preco)
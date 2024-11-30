from pydantic import BaseModel
from datetime import datetime

class PrecoRequest(BaseModel):
    preco: float

class ProdutoFornecedorResponse(BaseModel):
    id: int
    id_produto: int
    id_fornecedor: int
    preco: float
    data_associacao: datetime

    class Config:
        from_attributes = True

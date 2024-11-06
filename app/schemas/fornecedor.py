from pydantic import BaseModel

class FornecedorBase(BaseModel):
    nome: str
    email: str
    telefone: str

class FornecedorRequest(FornecedorBase):
    nome: str
    email: str
    telefone: str


class FornecedorResponse(FornecedorBase):
    id: int

    class Config:
        from_attributes = True

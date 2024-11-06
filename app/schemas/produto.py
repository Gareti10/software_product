from pydantic import BaseModel

# Modelo base para produto
class ProdutoBase(BaseModel):
    item: str
    preco: float
    quantidade_estoque: int
    quantidade_minima_estoque: int
    id_setor: int
    id_fornecedor: int  # Adiciona a referência ao fornecedor

# Esquema para criação de produto
class ProdutoRequest(ProdutoBase):
    pass

# Esquema para resposta de produto
class ProdutoResponse(ProdutoBase):
    id: int

    class Config:
        from_attributes = True

# Esquema para atualização de produto
class ProdutoUpdate(ProdutoBase):
    id: int

    class Config:
        from_attributes = True

from pydantic import BaseModel
from pydantic import validator
import re

#TODO criar pasta caso de uso
# #Este arquivo ficam as regras de negócio

class Produtos(BaseModel):
    item: str
    preco: float
    quantidade_estoque: int
    quantidade_minima_estoque: int
    id_setor: int

    # @validator('preco')
    # def validate_preco(cls, value):
    #     if value <= 0:
    #         raise ValueError('preco Invalido')
    #     return value

    # @validator('item')
    # def validate_item(cls, value):
    #     if not re.match('^([a-z]|-|_)+$', value):
    #         raise ValueError('Invalid item')
    #     return value


class ProdutoRequest(Produtos):
    item: str
    preco: float
    quantidade_estoque: int
    quantidade_minima_estoque: int
    id_setor: int


class ProdutoResponse(Produtos):
    id: int
    item: str
    preco: float
    quantidade_estoque: int
    quantidade_minima_estoque: int
    id_setor: int

    class Config:
        from_attributes=True

class ProdutoUpdate(Produtos):
    id: int
    item: str
    preco: float
    quantidade_estoque: int
    quantidade_minima_estoque: int
    id_setor: int

    class Config:
        from_attributes=True
from routes.produto_routes import router as produto_router
from routes.setor_routes import router as setor_router
from routes.usuario_routes import router as usuario_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite apenas o frontend de React
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers (autenticação, etc.)
)
@app.get('/health-check') 
def health_check():
    return True
app.include_router(setor_router)
app.include_router(produto_router)
app.include_router(usuario_router)
            # app.include_router(poc_routes)

# app.include_router(user_routes)
# app.include_router(poc_routes)


if __name__ == "__main__":
    import uvicorn
#                  #nomearquivo#nomeAppMain   
    uvicorn.run("main:app", host="127.0.0.1", port=8003, reload=True)
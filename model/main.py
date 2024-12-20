from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints.chat import router

app = FastAPI()

app.include_router(router, prefix="/chat", tags=["chat"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Server is running"}




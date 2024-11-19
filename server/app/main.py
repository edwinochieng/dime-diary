from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import connect_to_db, close_db_connection
from app.api.v1.endpoints.auth import auth_router
from app.api.v1.endpoints.transaction import transaction_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(transaction_router, prefix="/transactions", tags=["transactions"])



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await connect_to_db()

@app.on_event("shutdown")
async def shutdown_event():
    await close_db_connection()


@app.get("/")
def read_root():
    return {"message": "Server is running"}




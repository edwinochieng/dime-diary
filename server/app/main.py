from fastapi import FastAPI
from app.db.database import connect_to_db, close_db_connection
from app.api.v1.endpoints.auth import router

app = FastAPI()

app.include_router(router, prefix="/auth", tags=["auth"])

@app.on_event("startup")
async def startup_event():
    await connect_to_db()

@app.on_event("shutdown")
async def shutdown_event():
    await close_db_connection()


@app.get("/")
def read_root():
    return {"message": "Edwin,Server is running"}




from fastapi import FastAPI
from app.db.database import connect_to_db, close_db_connection

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await connect_to_db()

@app.on_event("shutdown")
async def shutdown_event():
    await close_db_connection()
    

@app.get("/")
def read_root():
    return {"message": "Server is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

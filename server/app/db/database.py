from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class MongoDB:
    client: AsyncIOMotorClient = None

db = MongoDB()

async def connect_to_db():
    db.client = AsyncIOMotorClient(settings.MONGO_URI)
    print("Connected to DB!")

async def close_db_connection():
    if db.client:
        await db.client.close()
        print("Disconnected from DB!")

def get_database():
    return db.client[settings.MONGO_DB_NAME]

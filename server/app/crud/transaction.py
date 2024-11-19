from typing import Optional, List
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.schemas.transaction import TransactionUpdate, TransactionInDB

TRANSACTION_COLLECTION = "transactions"

async def create_transaction(
    db: AsyncIOMotorDatabase, 
    transaction_data: dict
) -> TransactionInDB:
    result = await db[TRANSACTION_COLLECTION].insert_one(transaction_data)
    transaction_data["id"] = str(result.inserted_id)
    return TransactionInDB(**transaction_data)


async def get_transaction_by_id(db: AsyncIOMotorDatabase, transaction_id: str) -> Optional[TransactionInDB]:
    transaction_doc = await db[TRANSACTION_COLLECTION].find_one({"_id": ObjectId(transaction_id)})
    if transaction_doc:
        transaction_doc["id"] = str(transaction_doc["_id"])
        del transaction_doc["_id"]
        return TransactionInDB(**transaction_doc)
    return None

async def update_transaction(db: AsyncIOMotorDatabase, transaction_id: str, updates: TransactionUpdate) -> Optional[TransactionInDB]:
    updates_dict = {k: v for k, v in updates.dict(exclude_unset=True).items()}
    if updates_dict:
        result = await db[TRANSACTION_COLLECTION].update_one(
            {"_id": ObjectId(transaction_id)}, {"$set": updates_dict}
        )
        if result.modified_count == 1:
            return await get_transaction_by_id(db, transaction_id)
    return None

async def delete_transaction(db: AsyncIOMotorDatabase, transaction_id: str) -> bool:
    result = await db[TRANSACTION_COLLECTION].delete_one({"_id": ObjectId(transaction_id)})
    return result.deleted_count == 1

async def get_all_transactions(db: AsyncIOMotorDatabase, user_id: Optional[str] = None) -> List[TransactionInDB]:
    query = {"user_id": user_id} if user_id else {}
    cursor = db[TRANSACTION_COLLECTION].find(query)
    transactions = []
    async for transaction in cursor:
        transaction["id"] = str(transaction["_id"])
        del transaction["_id"]
        transactions.append(TransactionInDB(**transaction))
    return transactions

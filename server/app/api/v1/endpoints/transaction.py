from fastapi import APIRouter, HTTPException, Depends
from app.db.database import get_database
from app.core.auth import get_current_user_id
from app.schemas.transaction import TransactionCreate, TransactionUpdate, TransactionInDB
from app.crud.transaction import (
    create_transaction,
    get_transaction_by_id,
    update_transaction,
    delete_transaction,
    get_all_transactions
)

transaction_router = APIRouter()

@transaction_router.post("/", response_model=TransactionInDB)
async def create_new_transaction(
    transaction: TransactionCreate, 
    db=Depends(get_database), 
    user_id: str = Depends(get_current_user_id)  
):
    transaction_with_user = transaction.dict()
    transaction_with_user["user_id"] = user_id
    return await create_transaction(db, transaction_with_user)

@transaction_router.get("/{transaction_id}", response_model=TransactionInDB)
async def get_transaction(transaction_id: str, db=Depends(get_database)):
    transaction = await get_transaction_by_id(db, transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@transaction_router.get("/")
async def get_transactions(
    user_id: str = Depends(get_current_user_id), db=Depends(get_database)
):
    transactions = await get_all_transactions(db, user_id=user_id)
    return transactions

@transaction_router.put("/{transaction_id}", response_model=TransactionInDB)
async def update_transaction_details(transaction_id: str, updates: TransactionUpdate, db=Depends(get_database)):
    transaction = await update_transaction(db, transaction_id, updates)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found or no changes applied")
    return transaction

@transaction_router.delete("/{transaction_id}", response_model=dict)
async def delete_transaction_record(transaction_id: str, db=Depends(get_database)):
    success = await delete_transaction(db, transaction_id)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"status": "Transaction deleted successfully"}

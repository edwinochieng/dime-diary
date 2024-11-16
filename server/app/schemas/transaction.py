from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionBase(BaseModel):
    title: str
    amount: float
    transaction_type: str
    category: str
    date: datetime
    note: Optional[str] = None
    user_id: str 

class TransactionCreate(TransactionBase):
    pass

class TransactionInDB(TransactionBase):
    id: str

    class Config:
        json_encoders = {
            str: str,
            datetime: lambda v: v.isoformat()  
        }

class TransactionUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    transaction_type: Optional[str] = None
    category: Optional[str] = None
    date: Optional[datetime] = None
    note: Optional[str] = None

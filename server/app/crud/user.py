from typing import Optional
from app.db.database import get_database  
from app.schemas.user import UserCreate, UserInDB
from app.core.utils import hash_password

USER_COLLECTION = "users"  

async def create_user(user: UserCreate) -> UserInDB:
    db = get_database()  
    hashed_password = hash_password(user.password)
    new_user = user.dict()
    new_user['password'] = hashed_password  
    user_doc = await db[USER_COLLECTION].insert_one(new_user)
    new_user['_id'] = str(user_doc.inserted_id)
    return UserInDB(**new_user)

async def get_user_by_email(email: str) -> Optional[UserInDB]:
    db = get_database()  
    user_doc = await db[USER_COLLECTION].find_one({"email": email})
    if user_doc:
        user_doc["_id"] = str(user_doc["_id"])
        return UserInDB(**user_doc)
    return None

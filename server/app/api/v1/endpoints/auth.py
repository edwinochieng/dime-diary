from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserInDB
from app.core.auth import create_access_token
from app.core.utils import verify_password
from app.crud.user import create_user, get_user_by_email
from pydantic import BaseModel



auth_router = APIRouter()
class LoginRequest(BaseModel):
    email: str
    password: str


@auth_router.post("/signup", response_model=UserInDB)
async def signup(user: UserCreate):
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await create_user(user)


@auth_router.post("/login")
async def login(form_data: LoginRequest):
    user = await get_user_by_email(form_data.email)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

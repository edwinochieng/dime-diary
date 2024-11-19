from jwt import encode,decode, ExpiredSignatureError, InvalidTokenError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from typing import Optional
import os


SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")  
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> dict:
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user_id(token: str = Depends(oauth2_scheme)) -> str:
    try:
        payload = verify_token(token) 
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Token payload is missing 'sub' field")
        return user_id
    except HTTPException as e:
        raise e  
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

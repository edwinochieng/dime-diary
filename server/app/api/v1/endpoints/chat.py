from fastapi import APIRouter, HTTPException, Body
from app.model.inference import call_model, model_client

chat_router = APIRouter()

@chat_router.post("/generate-response")
async def generate_response(query: str = Body(..., embed=True)):
  
    result = call_model(model_client, query)
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return {"response": result["response"]}


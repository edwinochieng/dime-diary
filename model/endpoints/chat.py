from fastapi import APIRouter, HTTPException, Body
from text_generation.inference import call_model

router = APIRouter()

@router.post("/generate-response")
async def generate_response(query: str = Body(..., embed=True)):
    result = call_model(query)
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return {"response": result["response"]}

from huggingface_hub import InferenceClient
import json

model_id = "microsoft/Phi-3.5-mini-instruct"

model_client = InferenceClient(model=model_id, timeout=120)

def call_model(inference_client: InferenceClient, prompt: str):
    try:
        response = inference_client.post(
            json={
                "inputs": prompt,
                "parameters": {"max_new_tokens": 200},
                "task": "text-generation"
            },
        )
        generated_text = json.loads(response.decode())[0]["generated_text"]
        return {"success": True, "response": generated_text}
    except Exception as e:
        return {"success": False, "error": str(e)}

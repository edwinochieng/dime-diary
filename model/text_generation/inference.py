from huggingface_hub import InferenceClient
import os

model_id = "microsoft/Phi-3.5-mini-instruct"
client = InferenceClient(api_key=os.getenv("HF_ACCESS_TOKEN"))

def call_model(prompt: str):
    messages = [
    {
        "role": "system",
        "content": "You are a financial assistant.Your purpose is to help users with questions about finance, expenses, budgeting, and related topics. If asked questions outside these areas, politely decline to answer."
    },
    {
        "role": "user",
        "content": prompt
    }
    ]

    try:
        stream = client.chat.completions.create(
            model=model_id, messages=messages, max_tokens=500, stream=True
        )
        response_text = ""
        for chunk in stream:
            response_text += chunk.choices[0].delta.content
        return {"success": True, "response": response_text}
    except Exception as e:
        return {"success": False, "error": str(e)}

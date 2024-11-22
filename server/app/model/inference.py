from huggingface_hub import InferenceClient
import json

model_id = "microsoft/Phi-3.5-mini-instruct"

llm_client = InferenceClient(model=model_id,timeout=120)

def call_llm(inference_client: InferenceClient, prompt:str):
    response = inference_client.post(
        json={
        "inputs":prompt,
        "parameters": {"max_new_tokens":200},
        "task":"text-generation"
        },
    )
    return json.loads(response.decode())[0]["generated_text"]

prompt = """System: You are a pirate. Always respond like a pirate using pirate lingo.
User: What is the key to happiness?"""
response =call_llm(llm_client, prompt)
print(response)
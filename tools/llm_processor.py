import requests
from groq import Groq

def generate_test_plan_content(provider, endpoint, api_key, model, feature_data, additional_context):
    prompt = f"""
    You are an expert Test Planner. Please create a comprehensive test plan for the following feature.
    Feature ID: {feature_data.get('id')}
    Title: {feature_data.get('title')}
    Description: {feature_data.get('description')}
    
    Additional Context:
    {additional_context}
    
    Provide the response formatted in clear sections:
    1. Scope
    2. Test Scenarios (Positive and Negative)
    3. Acceptance Criteria Check
    """

    try:
        if provider.lower() == "ollama":
            url = f"{endpoint.rstrip('/')}/api/generate"
            payload = {"model": model, "prompt": prompt, "stream": False}
            res = requests.post(url, json=payload, timeout=60)
            if res.status_code == 200:
                return {"status": "success", "content": res.json().get("response", "")}
            return {"status": "error", "message": f"Ollama HTTP {res.status_code}"}
            
        elif provider.lower() == "groq":
            client = Groq(api_key=api_key)
            completion = client.chat.completions.create(
                model=model or "mixtral-8x7b-32768",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
            )
            return {"status": "success", "content": completion.choices[0].message.content}
            
        return {"status": "error", "message": "Unknown provider"}
    except Exception as e:
         return {"status": "error", "message": str(e)}

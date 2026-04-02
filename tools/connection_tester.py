import requests
from groq import Groq

def test_jira_connection(url, credentials):
    """Test standard Jira Basic Auth or Bearer Token"""
    try:
        headers = {"Accept": "application/json"}
        if credentials.startswith("Bearer "):
            headers["Authorization"] = credentials
        else:
            headers["Authorization"] = f"Basic {credentials}"
            
        endpoint = f"{url.rstrip('/')}/rest/api/3/myself"
        response = requests.get(endpoint, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return {"status": "success", "message": "Jira connection successful"}
        else:
            return {"status": "error", "message": f"Failed with status: {response.status_code}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def test_llm_connection(provider, endpoint, api_key):
    try:
        if provider.lower() == "ollama":
            url = f"{endpoint.rstrip('/')}/api/tags"
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                 return {"status": "success", "message": "Ollama connection successful"}
            else:
                 return {"status": "error", "message": f"Ollama failed: {response.status_code}"}
        elif provider.lower() == "groq":
            client = Groq(api_key=api_key)
            models = client.models.list()
            return {"status": "success", "message": "GROQ connection successful"}
        else:
            return {"status": "error", "message": "Unknown LLM provider"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

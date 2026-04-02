import requests

def fetch_feature_details(url, credentials, ticket_id):
    try:
        headers = {"Accept": "application/json"}
        if credentials.startswith("Bearer "):
            headers["Authorization"] = credentials
        else:
            headers["Authorization"] = f"Basic {credentials}"
            
        endpoint = f"{url.rstrip('/')}/rest/api/3/issue/{ticket_id}"
        response = requests.get(endpoint, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            fields = data.get("fields", {})
            title = fields.get("summary", "")
            description = fields.get("description", "")
            
            # Simple stringification (actual Jira may return rich ADF json)
            desc_text = str(description)
            
            return {
                "status": "success",
                "ticketDetails": {
                    "id": ticket_id,
                    "title": title,
                    "description": desc_text,
                    "acceptanceCriteria": "Extracted from description"
                }
            }
        else:
            return {"status": "error", "message": f"Failed fetching Jira: {response.status_code}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

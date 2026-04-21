import os
import httpx
import jwt
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
import logging

load_dotenv()

router = APIRouter()
logger = logging.getLogger("auth")

# Configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
JWT_SECRET = os.getenv("JWT_SECRET", "intellinexus_ultra_secret_key_2026") # Should be rotated in prod
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Google OAuth Endpoints
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

@router.get("/login/google")
async def login_google(request: Request):
    """
    Redirects the user to Google's OAuth consent screen.
    """
    # Use the request's origin to determine the redirect URI dynamically
    origin = str(request.base_url).rstrip("/")
    redirect_uri = f"{origin}/api/v1/auth/callback/google"
    
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "response_type": "code",
        "scope": "openid email profile",
        "redirect_uri": redirect_uri,
        "access_type": "offline",
        "prompt": "select_account"
    }
    
    auth_url = f"{GOOGLE_AUTH_URL}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"
    return RedirectResponse(url=auth_url)

@router.get("/callback/google")
async def callback_google(request: Request, code: str):
    """
    Handles the callback from Google, exchanges code for user info.
    """
    origin = str(request.base_url).rstrip("/")
    redirect_uri = f"{origin}/api/v1/auth/callback/google"
    
    # 1. Exchange authorization code for access token
    async with httpx.AsyncClient() as client:
        token_data = {
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        }
        
        token_resp = await client.post(GOOGLE_TOKEN_URL, data=token_data)
        if token_resp.status_code != 200:
            logger.error(f"Google Token Exchange Failed: {token_resp.text}")
            raise HTTPException(status_code=400, detail="Failed to exchange code for token")
            
        token_json = token_resp.json()
        access_token = token_json.get("access_token")
        
        # 2. Get user info
        user_info_resp = await client.get(
            GOOGLE_USERINFO_URL, 
            headers={"Authorization": f"Bearer {access_token}"}
        )
        
        if user_info_resp.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch user info from Google")
            
        user_info = user_info_resp.json()
        
    # 3. Create a local session token (JWT)
    payload = {
        "email": user_info.get("email"),
        "name": user_info.get("name"),
        "picture": user_info.get("picture"),
        "sub": user_info.get("sub")
    }
    
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    
    # 4. Redirect back to frontend
    # In production, we might want to use a cookie, but for this dev setup, we'll pass to dashboard
    frontend_dest = f"{FRONTEND_URL}/dashboard?auth_success=true&token={token}&name={user_info.get('name')}"
    
    return RedirectResponse(url=frontend_dest)

from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("PROJECT_URL")
key: str = os.environ.get("PUBLISHABLE_KEY")

supabase_client: Client = create_client(url, key)

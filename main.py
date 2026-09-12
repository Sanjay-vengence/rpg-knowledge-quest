import os
from dotenv import load_dotenv
from google import genai

# Load the API key from .env
load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Simple test prompt
response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents="Say hello and confirm you're working, in one short sentence."
)

print(response.text)
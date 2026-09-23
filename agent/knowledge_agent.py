import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def load_content():
    """Loads the verified Tamil literary content from our JSON file."""
    with open("data/content.json", "r", encoding="utf-8") as f:
        return json.load(f)

def get_knowledge_response(user_question: str) -> str:
    """
    Answers a question using ONLY the verified content in content.json.
    This prevents hallucination by grounding the AI in our curated data.
    """
    content = load_content()

    system_instruction = f"""You are a Knowledge Agent for a Tamil literature learning game.
You must answer ONLY using the verified content provided below. 
Do not use any outside knowledge, even if you know more about the topic.
If the answer isn't in the provided content, say so honestly instead of guessing.

VERIFIED CONTENT:
{json.dumps(content, ensure_ascii=False, indent=2)}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=f"{system_instruction}\n\nQuestion: {user_question}"
    )

    return response.text


# Quick test when running this file directly
if __name__ == "__main__":
    question = "What does the first Kural say about the letter A?"
    answer = get_knowledge_response(question)
    print(answer)
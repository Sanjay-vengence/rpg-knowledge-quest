import json
import random

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from agent.personalization_agent import PlayerState


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


# ==========================================
# PLAYER STATE
# ==========================================

player = PlayerState()


# ==========================================
# LOAD QUESTS
# ==========================================

with open("data/generated_quests.json", "r", encoding="utf-8") as f:
    cached_quests = json.load(f)


# ==========================================
# REQUEST MODEL
# ==========================================

class AnswerSubmission(BaseModel):
    quest_id: str
    was_correct: bool


# ==========================================
# HOME PAGE
# ==========================================

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request,
        "quest.html"
    )
@app.get("/quest")
def quest_page(request: Request):
    return templates.TemplateResponse(request, "quest.html")

@app.get("/world")
def world(request: Request):
    return templates.TemplateResponse(
        request,
        "world.html"
    )


# ==========================================
# GET QUEST
# ==========================================

@app.get("/quest-data")
def get_quest():

    matching = [
        q for q in cached_quests
        if q["difficulty"] == player.difficulty
    ]

    quest = (
        random.choice(matching)
        if matching
        else random.choice(cached_quests)
    )

    # Copy so cached quests are not modified
    quest = dict(quest)

    quest["hint_available"] = player.needs_hint()

    return quest


# ==========================================
# SUBMIT ANSWER
# ==========================================

@app.post("/answer")
def submit_answer(submission: AnswerSubmission):

    player.record_answer(
        submission.was_correct,
        quest_id=submission.quest_id
    )

    return player.get_state_summary()


# ==========================================
# PLAYER STATUS
# ==========================================

@app.get("/player-status")
def get_player_status():

    return player.get_state_summary()


# ==========================================
# RESET GAME
# ==========================================

@app.post("/reset")
def reset_player():

    global player

    player = PlayerState()

    return player.get_state_summary()
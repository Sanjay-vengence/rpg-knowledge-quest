import json
import random

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from agent.personalization_agent import PlayerState


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)

templates = Jinja2Templates(
    directory="templates"
)


# ==========================================
# PLAYER STATE
# ==========================================

player = PlayerState()


# ==========================================
# LOAD JSON FILE
# ==========================================

def load_json_file(path):

    with open(
        path,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)


# ==========================================
# LOAD ALL LITERATURE QUESTS
# ==========================================

literature_quests = {

    # --------------------------------------
    # 1. THIRUKKURAL
    # --------------------------------------

    "thirukkural": load_json_file(
        "data/generated_quests.json"
    ),


    # --------------------------------------
    # 2. SILAPPADHIGARAM
    # --------------------------------------

    "silappadhigaram": load_json_file(
        "data/silappadhigaram_quests.json"
    ),


    # --------------------------------------
    # 3. PURANANURU
    # --------------------------------------

    "purananuru": load_json_file(
        "data/purananuru_quests.json"
    ),


    # --------------------------------------
    # 4. MANIMEGALAI
    # --------------------------------------

    "manimegalai": load_json_file(
        "data/manimegalai_quests.json"
    ),
}


# ==========================================
# EXISTING THIRUKKURAL VARIABLE
# ==========================================
#
# Keep this because the existing RPG
# already uses cached_quests.
#
# This prevents us from breaking the
# current Thirukkural system.
# ==========================================

cached_quests = literature_quests["thirukkural"]


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
        "hub.html"
    )


# ==========================================
# QUEST PAGE
# ==========================================

@app.get("/quest")
def quest_page(request: Request):

    return templates.TemplateResponse(
        request,
        "quest.html"
    )


# ==========================================
# LITERATURE SELECTION PAGE
# ==========================================

@app.get("/literature")
def literature_page(request: Request):

    return templates.TemplateResponse(
        request,
        "literature.html"
    )


# ==========================================
# RPG WORLD
# ==========================================

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
def get_quest(
    literature: str = "thirukkural"
):

    # --------------------------------------
    # CHECK LITERATURE
    # --------------------------------------

    if literature not in literature_quests:

        # Invalid literature
        # → default to Thirukkural

        literature = "thirukkural"


    # --------------------------------------
    # GET SELECTED LITERATURE QUESTS
    # --------------------------------------

    quests = literature_quests[
        literature
    ]


    # --------------------------------------
    # FILTER BY PLAYER DIFFICULTY
    # --------------------------------------

    matching = [

        q

        for q in quests

        if q.get(
            "difficulty"
        ) == player.difficulty

    ]


    # --------------------------------------
    # SELECT QUEST
    # --------------------------------------

    quest = (

        random.choice(matching)

        if matching

        else random.choice(quests)

    )


    # --------------------------------------
    # COPY QUEST
    # --------------------------------------

    # Prevent modification of the
    # original cached JSON data.

    quest = dict(quest)


    # --------------------------------------
    # HINT INFORMATION
    # --------------------------------------

    quest["hint_available"] = (
        player.needs_hint()
    )


    # --------------------------------------
    # SELECTED LITERATURE
    # --------------------------------------

    quest["selected_literature"] = (
        literature
    )


    # --------------------------------------
    # RETURN QUEST
    # --------------------------------------

    return quest


# ==========================================
# GET AVAILABLE LITERATURES
# ==========================================

@app.get("/literatures")
def get_literatures():

    return {

        "literatures": [

            # --------------------------------
            # THIRUKKURAL
            # --------------------------------

            {
                "id": "thirukkural",

                "name": "Thirukkural",

                "quest_count": len(
                    literature_quests[
                        "thirukkural"
                    ]
                )
            },


            # --------------------------------
            # SILAPPADHIGARAM
            # --------------------------------

            {
                "id": "silappadhigaram",

                "name": "Silappadhigaram",

                "quest_count": len(
                    literature_quests[
                        "silappadhigaram"
                    ]
                )
            },


            # --------------------------------
            # PURANANURU
            # --------------------------------

            {
                "id": "purananuru",

                "name": "Purananuru",

                "quest_count": len(
                    literature_quests[
                        "purananuru"
                    ]
                )
            },


            # --------------------------------
            # MANIMEGALAI
            # --------------------------------

            {
                "id": "manimegalai",

                "name": "Manimegalai",

                "quest_count": len(
                    literature_quests[
                        "manimegalai"
                    ]
                )
            }

        ]
    }


# ==========================================
# SUBMIT ANSWER
# ==========================================

@app.post("/answer")
def submit_answer(
    submission: AnswerSubmission
):

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
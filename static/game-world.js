// ==========================================
// TEMPLE OF THIRUKKURAL
// 2D RPG TEMPLE WORLD
// STAGE 14–18 — QUEST COMPLETION + MULTI-GUARDIAN AREA PROGRESSION
// ==========================================


// ==========================================
// CANVAS SETUP
// ==========================================
// ==========================================
// SELECTED LITERATURE
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


// Literature passed from literature.html

let selectedLiterature =
    urlParams.get(
        "literature"
    );


// If URL doesn't contain literature,
// check browser storage.

if (!selectedLiterature) {

    selectedLiterature =
        localStorage.getItem(
            "selectedLiterature"
        );

}


// Final fallback

if (!selectedLiterature) {

    selectedLiterature =
        "thirukkural";

}


// Save it again

localStorage.setItem(
    "selectedLiterature",
    selectedLiterature
);


// Debug

console.log(
    "=================================="
);

console.log(
    "SELECTED LITERATURE:",
    selectedLiterature
);

console.log(
    "=================================="
);

// ==========================================
// STAGES 7–9 — LITERATURE RPG PROFILES
// ==========================================
// Each literature keeps the same gameplay engine,
// but receives its own story, areas, Guardians,
// objectives and ending text.
// ==========================================

const literatureProfiles = {

    thirukkural: {
        tamilName: "திருக்குறள்",
        englishName: "Thirukkural",
        questTitleTa: "அறிவின் முதல் சோதனை",
        questTitleEn: "The First Trial of Knowledge",
        questDescriptionTa: "திருக்குறளின் ஞானப் பாதையில் உன் தகுதியை நிரூபி.",
        questDescriptionEn: "Prove your worth on the path of Thirukkural wisdom.",
        questQuestionTa: "இந்தச் சோதனையை ஏற்கிறாயா?",
        questQuestionEn: "Will you accept this trial?",
        sageDialogues: [
            ["வருக, இளம் தேடுபவனே...", "Welcome, young seeker..."],
            ["இந்தப் பழமையான கோயிலில் பல இரகசியங்கள் புதைந்துள்ளன.", "Many secrets lie hidden within this ancient temple."],
            ["திருக்குறளின் ஞானத்தைத் தேடி வந்திருந்தால், உன் தகுதியை நிரூபி.", "If you seek the wisdom of Thirukkural, prove your worth."],
            ["உனக்காக ஒரு சோதனை காத்திருக்கிறது.", "A trial awaits you."],
            ["அதை வென்றால் மட்டுமே இந்தப் பாதையின் ரகசியங்களை அறிய முடியும்.", "Only by completing it can you uncover the secrets of this path."]
        ],
        areas: [
            {
                tamilName: "திருக்குறள் கோயில்",
                englishName: "Temple of Thirukkural",
                background: "temple",
                gateTa: "📚 பழமையான நூலகம்",
                gateEn: "Ancient Library"
            },
            {
                tamilName: "பழமையான நூலகம்",
                englishName: "The Ancient Library",
                background: "library",
                gateTa: "🏘️ அறிஞர்களின் கிராமம்",
                gateEn: "Scholars' Village"
            },
            {
                tamilName: "அறிஞர்களின் கிராமம்",
                englishName: "The Scholars' Village",
                background: "village",
                gateTa: "🌲 புனித ஞானக் காடு",
                gateEn: "Sacred Wisdom Forest"
            },
            {
                tamilName: "புனித ஞானக் காடு",
                englishName: "The Sacred Wisdom Forest",
                background: "forest",
                gateTa: "🏛️ இறுதி ஞான மண்டபம்",
                gateEn: "Final Wisdom Sanctum"
            },
            {
                tamilName: "இறுதி ஞான மண்டபம்",
                englishName: "The Final Wisdom Sanctum",
                background: "sanctum",
                gateTa: "",
                gateEn: ""
            }
        ],
        guardians: [
            ["ஞானக் காவலர்", "Knowledge Guardian", "ஞானக் காவலரை அடைந்து சோதனையைத் தொடங்கு", "Reach the Knowledge Guardian and begin the trial"],
            ["நூலகக் காவலர்", "Library Guardian", "நூலகக் காவலரை எதிர்கொண்டு அடுத்த சோதனையை முடி", "Face the Library Guardian and complete the next trial"],
            ["ஞானத்தின் காவலர்", "Guardian of Wisdom", "ஞானத்தின் காவலரை எதிர்கொண்டு சோதனையை முடி", "Face the Guardian of Wisdom and complete the trial"],
            ["துணிச்சலின் காவலர்", "Guardian of Courage", "துணிச்சலின் காவலரை வீழ்த்தி இறுதி மண்டபத்தைத் திற", "Defeat the Guardian of Courage and unlock the final sanctum"],
            ["நிழல் மன்னன்", "Shadow King", "நிழல் மன்னனை எதிர்கொண்டு இறுதி போரில் வெற்றி பெறு", "Face the Shadow King and win the final battle"]
        ],
        stageStories: [
            ["கோயிலின் முதல் வாயில் உன்னைச் சோதிக்கிறது.", "The first temple gate tests your knowledge."],
            ["பழமையான நூலகத்தின் இரகசியங்கள் அடுத்த சோதனையை மறைக்கின்றன.", "The Ancient Library hides the next trial."],
            ["அறிஞர்களின் கிராமம் ஞானத்தின் ஆழத்தைச் சோதிக்கிறது.", "The Scholars' Village tests the depth of your wisdom."],
            ["புனித ஞானக் காட்டை கடந்து இறுதி மண்டபத்தைத் திற.", "Cross the Sacred Wisdom Forest and unlock the final sanctum."],
            ["இறுதி மண்டபத்தில் நிழல் மன்னன் காத்திருக்கிறான்.", "The Shadow King awaits in the Final Wisdom Sanctum."]
        ],
        endingTa: "நிழல் மன்னன் வீழ்ந்தான் — திருக்குறள் பயணம் நிறைவு.",
        endingEn: "The Shadow King has fallen — your Thirukkural journey is complete."
    },

    silappadhigaram: {
        tamilName: "சிலப்பதிகாரம்",
        englishName: "Silappadhigaram",
        questTitleTa: "கண்ணகியின் நீதிப் பயணம்",
        questTitleEn: "Kannagi's Journey of Justice",
        questDescriptionTa: "கண்ணகியின் பாதையைப் பின்தொடர்ந்து உண்மை மற்றும் நீதியைத் தேடு.",
        questDescriptionEn: "Follow Kannagi's path and seek truth and justice.",
        questQuestionTa: "இந்த நீதிப் பயணத்தை ஏற்கிறாயா?",
        questQuestionEn: "Will you accept this journey of justice?",
        sageDialogues: [
            ["வருக, இளம் தேடுபவனே...", "Welcome, young seeker..."],
            ["கண்ணகியின் கதை துயரத்தையும் நீதிக்கான தேடலையும் சுமக்கிறது.", "Kannagi's story carries both tragedy and a search for justice."],
            ["புகாரிலிருந்து மதுரை வரை ஒரு பழமையான பயணம் உன்னை அழைக்கிறது.", "An ancient journey from Puhar to Madurai awaits you."],
            ["ஒவ்வொரு சோதனையும் கண்ணகியின் கதையின் ஒரு பகுதியைத் திறக்கும்.", "Each trial will reveal another part of Kannagi's story."],
            ["உண்மையை அறிந்தால் மட்டுமே இறுதி நீதிமன்றத்தை அடைய முடியும்.", "Only by understanding the truth can you reach the final court."]
        ],
        areas: [
            { tamilName: "புகாரின் பழைய துறைமுகம்", englishName: "Ancient Port of Puhar", background: "village", gateTa: "🏛️ மதுரையின் வாயில்", gateEn: "Gate of Madurai" },
            { tamilName: "மதுரையின் அரச வாயில்", englishName: "Royal Gate of Madurai", background: "temple", gateTa: "⚖️ நீதியின் மண்டபம்", gateEn: "Hall of Justice" },
            { tamilName: "நீதியின் மண்டபம்", englishName: "Hall of Justice", background: "library", gateTa: "🌿 சேர நாட்டின் பாதை", gateEn: "Path to Chera Land" },
            { tamilName: "சேர நாட்டின் புனிதப் பாதை", englishName: "Sacred Path of Chera Land", background: "forest", gateTa: "⚖️ இறுதி நீதிமன்றம்", gateEn: "Final Court" },
            { tamilName: "இறுதி நீதிமன்றம்", englishName: "The Final Court", background: "sanctum", gateTa: "", gateEn: "" }
        ],
        guardians: [
            ["புகாரின் காவலர்", "Guardian of Puhar", "புகாரின் காவலரை எதிர்கொண்டு முதல் சோதனையை முடி", "Face the Guardian of Puhar and complete the first trial"],
            ["மதுரையின் காவலர்", "Guardian of Madurai", "மதுரையின் காவலரை எதிர்கொண்டு அடுத்த சோதனையை முடி", "Face the Guardian of Madurai and complete the next trial"],
            ["நீதியின் காவலர்", "Guardian of Justice", "நீதியின் காவலரை எதிர்கொண்டு உண்மையை அறி", "Face the Guardian of Justice and uncover the truth"],
            ["சேர நாட்டின் காவலர்", "Guardian of Chera Land", "சேர நாட்டின் காவலரை வீழ்த்தி இறுதி நீதிமன்றத்தைத் திற", "Defeat the Guardian of Chera Land and unlock the Final Court"],
            ["நிழல் மன்னன்", "Shadow King", "நிழல் மன்னனை எதிர்கொண்டு இறுதி நீதிப் போரில் வெற்றி பெறு", "Face the Shadow King and win the final battle for justice"]
        ],
        stageStories: [
            ["புகாரில் கண்ணகி மற்றும் கோவலனின் கதையின் முதல் தடம் கிடைக்கிறது.", "In Puhar, the first trail of Kannagi and Kovalan's story appears."],
            ["மதுரையின் வாயில் அநீதியின் கதவைத் திறக்கிறது.", "The gate of Madurai reveals the turning point of injustice."],
            ["நீதியின் மண்டபத்தில் உண்மை மற்றும் பொறுப்பு சோதிக்கப்படுகின்றன.", "Truth and responsibility are tested in the Hall of Justice."],
            ["சேர நாட்டின் பாதை கண்ணகியின் புகழை இறுதி நிலைக்கு அழைத்துச் செல்கிறது.", "The path to Chera Land carries Kannagi's legacy toward its final trial."],
            ["இறுதி நீதிமன்றத்தில் நிழல் மன்னன் உன் அறிவையும் நீதியையும் சோதிக்கிறான்.", "In the Final Court, the Shadow King tests your knowledge and sense of justice."]
        ],
        endingTa: "நிழல் மன்னன் வீழ்ந்தான் — சிலப்பதிகார நீதிப் பயணம் நிறைவு.",
        endingEn: "The Shadow King has fallen — your Silappadhigaram journey of justice is complete."
    },

    purananuru: {
        tamilName: "புறநானூறு",
        englishName: "Purananuru",
        questTitleTa: "புறத்தின் வீரப் பயணம்",
        questTitleEn: "The Journey of Puram",
        questDescriptionTa: "புலவர்கள், வீரர்கள், அரசர்கள் மற்றும் சமூக மதிப்புகளின் உலகை ஆராய்.",
        questDescriptionEn: "Explore the world of poets, heroes, rulers and social values.",
        questQuestionTa: "இந்தப் புறப் பயணத்தை ஏற்கிறாயா?",
        questQuestionEn: "Will you accept this journey through Puram?",
        sageDialogues: [
            ["வருக, இளம் தேடுபவனே...", "Welcome, young seeker..."],
            ["புறநானூறு பண்டைய தமிழ் சமூகத்தின் குரலைக் காக்கிறது.", "Purananuru preserves voices from ancient Tamil society."],
            ["புலவர்களின் சொற்களில் வீரமும் கொடையும் வாழ்க்கையின் நிலையாமையும் ஒலிக்கின்றன.", "Through poets' words, heroism, generosity and impermanence echo."],
            ["ஒவ்வொரு காவலரும் புற உலகின் ஒரு கதவைத் திறப்பார்.", "Each Guardian will open another gate into the world of Puram."],
            ["இறுதி மண்டபத்தில் அறிவும் மனித மதிப்புகளும் உன்னைச் சோதிக்கும்.", "In the final hall, knowledge and human values will be tested."]
        ],
        areas: [
            { tamilName: "புறநானூற்றின் மன்றம்", englishName: "Hall of Puram", background: "village", gateTa: "📜 புலவர்களின் மன்றம்", gateEn: "Hall of Poets" },
            { tamilName: "புலவர்களின் மன்றம்", englishName: "Hall of Poets", background: "library", gateTa: "⚔️ வீரர்களின் நிலம்", gateEn: "Land of Heroes" },
            { tamilName: "வீரர்களின் நிலம்", englishName: "Land of Heroes", background: "forest", gateTa: "🎁 கொடையின் மண்டபம்", gateEn: "Hall of Generosity" },
            { tamilName: "கொடையின் மண்டபம்", englishName: "Hall of Generosity", background: "temple", gateTa: "🏛️ இறுதி புகழ் மண்டபம்", gateEn: "Final Hall of Fame" },
            { tamilName: "இறுதி புகழ் மண்டபம்", englishName: "Final Hall of Fame", background: "sanctum", gateTa: "", gateEn: "" }
        ],
        guardians: [
            ["புறத்தின் காவலர்", "Guardian of Puram", "புறத்தின் காவலரை எதிர்கொண்டு முதல் சோதனையை முடி", "Face the Guardian of Puram and complete the first trial"],
            ["புலவர்களின் காவலர்", "Guardian of Poets", "புலவர்களின் காவலரை எதிர்கொண்டு அடுத்த சோதனையை முடி", "Face the Guardian of Poets and complete the next trial"],
            ["வீரத்தின் காவலர்", "Guardian of Heroes", "வீரத்தின் காவலரை எதிர்கொண்டு சோதனையை முடி", "Face the Guardian of Heroes and complete the trial"],
            ["கொடையின் காவலர்", "Guardian of Generosity", "கொடையின் காவலரை வீழ்த்தி இறுதி மண்டபத்தைத் திற", "Defeat the Guardian of Generosity and unlock the final hall"],
            ["நிழல் மன்னன்", "Shadow King", "நிழல் மன்னனை எதிர்கொண்டு இறுதி போரில் வெற்றி பெறு", "Face the Shadow King and win the final battle"]
        ],
        stageStories: [
            ["புறநானூற்றின் மன்றம் பண்டைய சமூகத்தின் முதல் கதவைத் திறக்கிறது.", "The Hall of Puram opens the first gate into ancient society."],
            ["புலவர்களின் மன்றத்தில் சொற்களே ஆயுதங்களாக மாறுகின்றன.", "In the Hall of Poets, words become your weapons."],
            ["வீரர்களின் நிலம் புகழ், போர் மற்றும் வாழ்க்கையின் நிலையாமையைச் சோதிக்கிறது.", "The Land of Heroes tests fame, war and the impermanence of life."],
            ["கொடையின் மண்டபத்தில் அரசர்களின் பெருந்தன்மை சோதிக்கப்படுகிறது.", "The Hall of Generosity tests the generosity of rulers."],
            ["இறுதி புகழ் மண்டபத்தில் நிழல் மன்னன் புற உலகின் அறிவைச் சவால் செய்கிறான்.", "In the Final Hall of Fame, the Shadow King challenges your knowledge of Puram."]
        ],
        endingTa: "நிழல் மன்னன் வீழ்ந்தான் — புறநானூறு பயணம் நிறைவு.",
        endingEn: "The Shadow King has fallen — your Purananuru journey is complete."
    },

    manimegalai: {
        tamilName: "மணிமேகலை",
        englishName: "Manimegalai",
        questTitleTa: "மணிமேகலையின் விடுதலைப் பயணம்",
        questTitleEn: "Manimegalai's Path to Liberation",
        questDescriptionTa: "கருணை, துறவு மற்றும் ஆன்மிகத் தேடலின் பாதையில் பயணம் செய்.",
        questDescriptionEn: "Travel the path of compassion, renunciation and spiritual search.",
        questQuestionTa: "இந்த ஆன்மிகப் பயணத்தை ஏற்கிறாயா?",
        questQuestionEn: "Will you accept this spiritual journey?",
        sageDialogues: [
            ["வருக, இளம் தேடுபவனே...", "Welcome, young seeker..."],
            ["மணிமேகலையின் உலகம் கருணையையும் ஆன்மிகத் தேடலையும் அழைக்கிறது.", "The world of Manimegalai calls you toward compassion and spiritual search."],
            ["உலகியலான ஆசைகளைத் தாண்டி ஒரு புதிய பாதை உன்னை எதிர்பார்க்கிறது.", "Beyond worldly desires, a new path awaits you."],
            ["ஒவ்வொரு சோதனையும் அறத்தின் ஒரு கதவைத் திறக்கும்.", "Each trial opens another door of virtue."],
            ["இறுதி மண்டபத்தில் அறிவும் கருணையும் உன் வெற்றியைத் தீர்மானிக்கும்.", "In the final hall, knowledge and compassion will shape your victory."]
        ],
        areas: [
            { tamilName: "மணிமேகலையின் தொடக்கப் பாதை", englishName: "Path of Manimegalai", background: "temple", gateTa: "☸️ அறத்தின் மண்டபம்", gateEn: "Hall of Virtue" },
            { tamilName: "அறத்தின் மண்டபம்", englishName: "Hall of Virtue", background: "library", gateTa: "💠 கருணையின் நகரம்", gateEn: "City of Compassion" },
            { tamilName: "கருணையின் நகரம்", englishName: "City of Compassion", background: "village", gateTa: "🌿 துறவின் காடு", gateEn: "Forest of Renunciation" },
            { tamilName: "துறவின் புனிதக் காடு", englishName: "Forest of Renunciation", background: "forest", gateTa: "☸️ இறுதி விடுதலை மண்டபம்", gateEn: "Final Hall of Liberation" },
            { tamilName: "இறுதி விடுதலை மண்டபம்", englishName: "Final Hall of Liberation", background: "sanctum", gateTa: "", gateEn: "" }
        ],
        guardians: [
            ["அறத்தின் காவலர்", "Guardian of Virtue", "அறத்தின் காவலரை எதிர்கொண்டு முதல் சோதனையை முடி", "Face the Guardian of Virtue and complete the first trial"],
            ["கருணையின் காவலர்", "Guardian of Compassion", "கருணையின் காவலரை எதிர்கொண்டு அடுத்த சோதனையை முடி", "Face the Guardian of Compassion and complete the next trial"],
            ["துறவின் காவலர்", "Guardian of Renunciation", "துறவின் காவலரை எதிர்கொண்டு சோதனையை முடி", "Face the Guardian of Renunciation and complete the trial"],
            ["விடுதலையின் காவலர்", "Guardian of Liberation", "விடுதலையின் காவலரை வீழ்த்தி இறுதி மண்டபத்தைத் திற", "Defeat the Guardian of Liberation and unlock the final hall"],
            ["நிழல் மன்னன்", "Shadow King", "நிழல் மன்னனை எதிர்கொண்டு இறுதி ஆன்மிகப் போரில் வெற்றி பெறு", "Face the Shadow King and win the final spiritual battle"]
        ],
        stageStories: [
            ["மணிமேகலையின் பாதை உன் ஆன்மிகத் தேடலைத் தொடங்குகிறது.", "The Path of Manimegalai begins your spiritual search."],
            ["அறத்தின் மண்டபம் நல்லொழுக்கத்தின் மதிப்பைச் சோதிக்கிறது.", "The Hall of Virtue tests the value of moral conduct."],
            ["கருணையின் நகரம் பிறருக்கான இரக்கத்தைச் சோதிக்கிறது.", "The City of Compassion tests your care for others."],
            ["துறவின் காடு உலகியலான பற்றுகளைத் தாண்டிச் செல்லச் சவால் விடுக்கிறது.", "The Forest of Renunciation challenges you to move beyond worldly attachment."],
            ["இறுதி விடுதலை மண்டபத்தில் நிழல் மன்னன் உன் அறிவையும் கருணையையும் சோதிக்கிறான்.", "In the Final Hall of Liberation, the Shadow King tests your knowledge and compassion."]
        ],
        endingTa: "நிழல் மன்னன் வீழ்ந்தான் — மணிமேகலை விடுதலைப் பயணம் நிறைவு.",
        endingEn: "The Shadow King has fallen — your Manimegalai journey toward liberation is complete."
    }
};

const activeLiteratureProfile =
    literatureProfiles[selectedLiterature] ||
    literatureProfiles.thirukkural;

function getLiteratureStageStory(stageNumber) {
    return activeLiteratureProfile.stageStories[
        Math.max(
            0,
            Math.min(
                stageNumber - 1,
                activeLiteratureProfile.stageStories.length - 1
            )
        )
    ];
}

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");


// ==========================================
// PLAYER SPRITES + WALKING ANIMATIONS
// ==========================================

// Idle sprites
const playerSprites = {
    north: new Image(),
    south: new Image(),
    east: new Image(),
    west: new Image()
};

playerSprites.north.src = "/static/images/idle_north.png?v=2";
playerSprites.south.src = "/static/images/idle_south.png?v=2";
playerSprites.east.src = "/static/images/idle_east.png?v=2";
playerSprites.west.src = "/static/images/idle_west.png?v=2";

// 7 walking frames for each direction
const playerAnimations = {
    north: [],
    south: [],
    east: [],
    west: [],

    northEast: [],
    northWest: [],
    southEast: [],
    southWest: []
};

const walkingFrameCount = 7;

for (let i = 1; i <= walkingFrameCount; i++) {

    const frameNumber = String(i).padStart(2, "0");

    const northSprite = new Image();
    northSprite.src =
        `/static/images/walk_north_${frameNumber}.png?v=2`;
    playerAnimations.north.push(northSprite);

    const southSprite = new Image();
    southSprite.src =
        `/static/images/walk_south_${frameNumber}.png?v=2`;
    playerAnimations.south.push(southSprite);

    const eastSprite = new Image();
    eastSprite.src =
        `/static/images/walk_east_${frameNumber}.png?v=2`;
    playerAnimations.east.push(eastSprite);

    const westSprite = new Image();
    westSprite.src =
        `/static/images/walk_west_${frameNumber}.png?v=2`;
    playerAnimations.west.push(westSprite);

    // North-East
    const northEastSprite = new Image();
    northEastSprite.src =
        `/static/images/walk_north-east_${frameNumber}.png?v=3`;
    playerAnimations.northEast.push(northEastSprite);

    // North-West
    const northWestSprite = new Image();
    northWestSprite.src =
        `/static/images/walk_north-west_${frameNumber}.png?v=3`;
    playerAnimations.northWest.push(northWestSprite);

    // South-East
    const southEastSprite = new Image();
    southEastSprite.src =
        `/static/images/walk_south-east_${frameNumber}.png?v=3`;
    playerAnimations.southEast.push(southEastSprite);

    // South-West
    const southWestSprite = new Image();
    southWestSprite.src =
        `/static/images/walk_south-west_${frameNumber}.png?v=3`;
    playerAnimations.southWest.push(southWestSprite);
}

// ==========================================
// CURRENT PLAYER DIRECTION
// ==========================================

let playerDirection = "south";

// ==========================================
// WALKING ANIMATION STATE
// ==========================================

let isMoving = false;
let currentFrame = 0;
let animationTimer = 0;

// Higher number = slower animation
const animationSpeed = 7;

// ==========================================
// IDLE SPRITE LOADING
// ==========================================

let spritesLoaded = 0;
const totalSprites = 4;

function spriteLoaded(direction) {

    spritesLoaded++;

    console.log(
        "✅ Idle player sprite loaded:",
        direction,
        `${spritesLoaded}/${totalSprites}`
    );
}

function spriteLoadError(direction) {

    console.error(
        "❌ Failed to load idle player sprite:",
        direction
    );
}

playerSprites.north.onload = function () {
    spriteLoaded("north");
};

playerSprites.south.onload = function () {
    spriteLoaded("south");
};

playerSprites.east.onload = function () {
    spriteLoaded("east");
};

playerSprites.west.onload = function () {
    spriteLoaded("west");
};

playerSprites.north.onerror = function () {
    spriteLoadError("north");
};

playerSprites.south.onerror = function () {
    spriteLoadError("south");
};

playerSprites.east.onerror = function () {
    spriteLoadError("east");
};

playerSprites.west.onerror = function () {
    spriteLoadError("west");
};

// ==========================================
// PLAYER SETTINGS
// ==========================================

const player = {

    x: 0,
    y: 0,

    // Collision / movement size
    width: 42,
    height: 58,

    speed: 4,

    // Fallback color
    color: "#d9a441"

};



// ==========================================
// STAGE 10.1 — SAGE NPC
// ==========================================

const sage = {

    x: 0,
    y: 0,

    width: 90,
    height: 90,

    interactionDistance: 110,

    name: "Sage"

};


// ==========================================
// SAGE SPRITE
// ==========================================

const sageSprite = new Image();

sageSprite.src =
    "/static/images/npc/Sage.png";

let sageSpriteLoaded = false;


sageSprite.onload = function () {

    sageSpriteLoaded = true;

    console.log(
        "✅ Sage sprite loaded"
    );

};


sageSprite.onerror = function () {

    console.error(
        "❌ Sage sprite failed to load"
    );

};



// ==========================================
// ANCIENT INSCRIPTION
// ==========================================

const inscription = {

    x: 0,
    y: 0,

    width: 60,
    height: 80,

    color: "#8b7355",

    interactionDistance: 100

};


// ==========================================
// INTERACTION STATE
// ==========================================

let showInteractionMessage = false;

let playerNearInscription = false;

// ==========================================
// STAGE 10.3 — SAGE PROXIMITY STATE
// ==========================================

let playerNearSage = false;

// ==========================================
// STAGE 10.5 — SAGE DIALOGUE STATE
// ==========================================

let showSageDialogue = false;


// ==========================================
// STAGE 10.6 — SAGE DIALOGUE SEQUENCE
// ==========================================
// Stores the Tamil dialogue scenes that Sage
// will eventually display one at a time.
// ==========================================

const sageDialogues =
    activeLiteratureProfile.sageDialogues.map(
        ([textTa, textEn]) => ({
            speaker: "ஞானி",
            text: textTa,
            englishText: textEn
        })
    );


// Current dialogue index.
// Stage 10.6.1 only creates the sequence.
// The display and E-key progression will be
// connected in the next steps.

let currentSageDialogue = 0;


// ==========================================
// STAGE 10.7 — SAGE QUEST OFFER STATE
// ==========================================

let showQuestOffer = false;

let questAccepted = false;

// ==========================================
// VISUAL EFFECTS — QUEST / COMBAT FEEDBACK
// ==========================================

let questAcceptedGlow = false;
let questAcceptedGlowTimer = 0;
const QUEST_GLOW_DURATION = 45;

let guardianSpawnFlash = false;
let guardianSpawnFlashTimer = 0;
const GUARDIAN_FLASH_DURATION = 45;

// "guardian" for stages 1-4, "boss" for stage 5.
let guardianSpawnFlashTarget = "guardian";

let answerFeedback = "";
let answerFeedbackTimer = 0;
let answerFeedbackCorrect = false;
const ANSWER_FEEDBACK_DURATION = 55;

// ==========================================
// XP POPUP SYSTEM
// ==========================================

let xpPopup = "";
let xpPopupTimer = 0;

// Long enough to remain clearly visible after
// the Guardian reward screen appears.
const XP_POPUP_DURATION = 120;

// Web Audio API tones.
// No external sound files are required.
let gameAudioContext = null;

function playGameTone(type) {
    try {
        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContextClass) {
            return;
        }

        if (!gameAudioContext) {
            gameAudioContext =
                new AudioContextClass();
        }

        if (gameAudioContext.state === "suspended") {
            gameAudioContext.resume();
        }

        const oscillator =
            gameAudioContext.createOscillator();

        const gain =
            gameAudioContext.createGain();

        oscillator.connect(gain);
        gain.connect(gameAudioContext.destination);

        const now =
            gameAudioContext.currentTime;

        if (type === "quest") {
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(
                440,
                now
            );
            oscillator.frequency.exponentialRampToValueAtTime(
                660,
                now + 0.18
            );
        } else if (type === "correct") {
            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(
                520,
                now
            );
            oscillator.frequency.exponentialRampToValueAtTime(
                780,
                now + 0.16
            );
        } else if (type === "spawn") {
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(
                180,
                now
            );
            oscillator.frequency.exponentialRampToValueAtTime(
                520,
                now + 0.28
            );
        } else {
            oscillator.type = "sawtooth";
            oscillator.frequency.setValueAtTime(
                220,
                now
            );
            oscillator.frequency.exponentialRampToValueAtTime(
                120,
                now + 0.18
            );
        }

        gain.gain.setValueAtTime(
            0.0001,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.08,
            now + 0.015
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.22
        );

        oscillator.start(now);
        oscillator.stop(now + 0.24);

    } catch (error) {
        console.warn(
            "Game audio unavailable:",
            error
        );
    }
}


// ==========================================
// STAGE 10.8 — QUEST ACCEPTED STATE
// ==========================================

let showQuestAcceptedNotification = false;

let questNotificationTimer = 0;


// ==========================================
// STAGE 10.8 — ACTIVE QUEST
// ==========================================

const activeQuest = {

    title:
        activeLiteratureProfile.questTitleTa,

    englishTitle:
        activeLiteratureProfile.questTitleEn,

    objective:
        activeLiteratureProfile.guardians[0][2],

    englishObjective:
        activeLiteratureProfile.guardians[0][3]

};

// ==========================================
// STAGE 10.9 — ACTIVE QUEST HUD STATE
// ==========================================

let showActiveQuestHUD = false;

// ==========================================
// STAGE 11.0 — QUEST START STATE
// ==========================================

let questStarted = false;
let showQuestStartPrompt = false;

// ==========================================
// STAGE 12 — KNOWLEDGE GUARDIAN
// ==========================================

const guardian = {
    x: 0,
    y: 0,
    width: 110,
    height: 120,
    interactionDistance: 125,
    name: "Knowledge Guardian"
};

// ==========================================
// FINAL BOSS — MAIN VILLAIN
// ==========================================
const finalBoss = {
    x: 0,
    y: 0,
    width: 145,
    height: 155,
    interactionDistance: 155,
    name: "Shadow King"
};

let finalBossVisible = false;

const finalBossSprite = new Image();
finalBossSprite.src = "/static/images/npc/final%20boss.png?v=1";
let finalBossSpriteLoaded = false;

finalBossSprite.onload = function () {
    finalBossSpriteLoaded = true;
    console.log("👑 Main Villain sprite loaded");
};

finalBossSprite.onerror = function () {
    finalBossSpriteLoaded = false;
    console.warn("⚠️ final boss.png not found. Using built-in final boss fallback.");
};

let guardianVisible = false;
let guardianDefeated = false;
let playerNearGuardian = false;

// ==========================================
// STAGE 14 — QUEST COMPLETION / AREA STATE
// ==========================================
let currentArea = 1;
let playerNearAreaGate = false;
let guardianEncounter = 1;

// Four explorable areas. Each area has its own background and
// the Guardian for that stage appears inside it.
const areaConfigs = {};

activeLiteratureProfile.areas.forEach(
    (area, index) => {

        const areaNumber = index + 1;

        areaConfigs[areaNumber] = {
            tamilName: area.tamilName,
            englishName: area.englishName,
            background: area.background,
            nextArea:
                areaNumber < activeLiteratureProfile.areas.length
                    ? areaNumber + 1
                    : null,
            nextGateTa: area.gateTa,
            nextGateEn: area.gateEn
        };
    }
);

function getCurrentAreaConfig() {
    return areaConfigs[currentArea] || areaConfigs[1];
}

function getCurrentAreaConfig() {
    return areaConfigs[currentArea] || areaConfigs[1];
}

let area2Unlocked = false;
let area3Unlocked = false;
let area4Unlocked = false;
let showGuardianVictoryNotification = false;
let guardianVictoryTimer = 0;
let showRewardScreen = false;
let rewardScreenTimer = 0;
const rewardScreenData = { reward: 0, hpGain: 0, maxHpGain: 0, stage: 0, tamilName: "", englishName: "", finalBoss: false };
const completedQuestIds = new Set();

// Additional Guardian stages after entering Area 2.
let nextGuardianPending = false;
let nextGuardianTimer = 0;
const nextGuardianDelay = 120; // ~2 seconds at 60 FPS
let finalGuardianCompleted = false;
let questCompleted = false;

// ==========================================
// STAGE 14 — 2D GUARDIAN SPRITE
// ==========================================
const guardianSprite = new Image();
guardianSprite.src = "/static/images/npc/Guardian.png?v=1";
let guardianSpriteLoaded = false;

guardianSprite.onload = function () {
    guardianSpriteLoaded = true;
    console.log("✅ Guardian sprite loaded");
};

guardianSprite.onerror = function () {
    guardianSpriteLoaded = false;
    console.warn("⚠️ Guardian.png not found. Using built-in 2D fallback guardian.");
};

// ==========================================
// AREAS 1–4 — BACKGROUND WORLDS
// ==========================================
const area2 = areaConfigs[2];
const area3 = areaConfigs[3];
const area4 = areaConfigs[4];

// ==========================================
// STAGES 15–18 — FOUR GUARDIANS + FINAL BOSS
// ==========================================
// Stage 1 = Temple Guardian
// Stage 2 = Library Guardian
// Stage 3 = Guardian of Wisdom
// Stage 4 = Guardian of Courage
// Stage 5 = Shadow King (Final Boss)
// The same 2D Guardian.png sprite is reused for the four Guardians.
// The Shadow King appears separately in Area 5.
// ==========================================
const guardianStages =
    activeLiteratureProfile.guardians.map(
        (guardianData, index) => ({
            stage: index + 1,
            tamilName: guardianData[0],
            englishName: guardianData[1],
            objectiveTa: guardianData[2],
            objectiveEn: guardianData[3],
            storyTa:
                getLiteratureStageStory(index + 1)[0],
            storyEn:
                getLiteratureStageStory(index + 1)[1],
            speechTa:
                index === 4
                    ? guardianData[0] + " உன் இறுதி சோதனையை முன்வைக்கிறான்."
                    : guardianData[0] + " உன் அறிவைச் சோதிக்கிறான்.",
            speechEn:
                index === 4
                    ? guardianData[1] + " presents the final challenge."
                    : guardianData[1] + " tests your knowledge.",
            isFinalBoss: index === 4
        })
    );

function getCurrentGuardianStage() {
    return guardianStages[
        Math.max(0, Math.min(guardianEncounter - 1, guardianStages.length - 1))
    ];
}

// ==========================================
// STAGE 13 — KNOWLEDGE BATTLE
// ==========================================

let guardianBattleOpen = false;
let guardianQuestionLoading = false;
let guardianQuestion = null;
let guardianSelectedAnswer = -1;
let guardianResult = "";
let guardianOptions = [];
let guardianOptionRects = [];

// HINT SYSTEM DISABLED:
// All four literature paths use knowledge-only battles.
// No hint counter, H-key hint, or answer-elimination mechanic is used.

let playerHP = 100;
let maxPlayerHP = 100;

let playerXP = 0;
let playerDifficulty = "easy";

const guardianCombat = {
    damageEasy: 15,
    damageMedium: 25,
    damageHard: 35,
    rewardEasy: 50,
    rewardMedium: 100,
    rewardHard: 200
};

const uniqueThirukkuralQuestions = [
    {
        id: "stage1_thirukkural_001",
        story: "திருக்குறள் கோயிலின் முதல் வாயிலில், ஞானக் காவலர் திருவள்ளுவரின் முதல் குறளைப் பற்றி உன்னைச் சோதிக்கிறார்.",
        english_story: "At the first gate of the Temple of Thirukkural, the Knowledge Guardian tests you on the opening Kural of Thiruvalluvar.",
        question: "திருக்குறளின் முதல் குறளில், எல்லா எழுத்துகளுக்கும் முதலாகக் குறிப்பிடப்படும் எழுத்து எது?",
        english_question: "In the first Kural of the Thirukkural, which letter is said to be the first of all letters?",
        tamil_question: "திருக்குறளின் முதல் குறளில், எல்லா எழுத்துகளுக்கும் முதலாகக் குறிப்பிடப்படும் எழுத்து எது?",
        options: [
            "அ — அகரம்",
            "ஆ — ஆகாரம்",
            "இ — இகரம்",
            "உ — உகரம்"
        ],
        english_options: [
            "A — the letter A",
            "Aa — the letter Aa",
            "I — the letter I",
            "U — the letter U"
        ],
        correct_answer: 0, difficulty: "easy"
    },
    {
        id: "stage2_thirukkural_002",
        story: "பழமையான நூலகத்தின் வாயிலில், நூலகக் காவலர் திருக்குறளின் ஆசிரியரைப் பற்றி கேட்கிறார்.",
        english_story: "At the entrance of the Ancient Library, the Library Guardian asks about the author of the Thirukkural.",
        question: "திருக்குறளை இயற்றியவர் யார்?",
        english_question: "Who is the author of the Thirukkural?",
        tamil_question: "திருக்குறளை இயற்றியவர் யார்?",
        options: [
            "திருவள்ளுவர்",
            "கம்பர்",
            "இளங்கோ அடிகள்",
            "அவ்வையார்"
        ],
        english_options: [
            "Thiruvalluvar",
            "Kambar",
            "Ilango Adigal",
            "Avvaiyar"
        ],
        correct_answer: 0, difficulty: "medium"
    },
    {
        id: "stage3_thirukkural_003",
        story: "அறிஞர்களின் கிராமத்தில், ஞானத்தின் காவலர் திருக்குறளின் அமைப்பைப் பற்றி உன்னைச் சோதிக்கிறார்.",
        english_story: "In the Scholars' Village, the Guardian of Wisdom tests your knowledge of the structure of the Thirukkural.",
        question: "திருக்குறளில் மொத்தம் எத்தனை குறள்கள் உள்ளன?",
        english_question: "How many couplets are there in the Thirukkural?",
        tamil_question: "திருக்குறளில் மொத்தம் எத்தனை குறள்கள் உள்ளன?",
        options: [
            "1000 குறள்கள்",
            "1080 குறள்கள்",
            "1330 குறள்கள்",
            "1500 குறள்கள்"
        ],
        english_options: [
            "1,000 couplets",
            "1,080 couplets",
            "1,330 couplets",
            "1,500 couplets"
        ],
        correct_answer: 2, difficulty: "hard"
    },
    {
        id: "stage4_thirukkural_004",
        story: "புனித ஞானக் காட்டில், துணிச்சலின் காவலர் திருக்குறளின் மூன்று பெரும் பாகங்களை அறிந்திருக்கிறாயா என்று சோதிக்கிறார்.",
        english_story: "In the Sacred Wisdom Forest, the Guardian of Courage tests whether you know the three major divisions of the Thirukkural.",
        question: "திருக்குறளின் மூன்று பெரும் பாகங்கள் எவை?",
        english_question: "What are the three major divisions of the Thirukkural?",
        tamil_question: "திருக்குறளின் மூன்று பெரும் பாகங்கள் எவை?",
        options: [
            "அறத்துப்பால், பொருட்பால், காமத்துப்பால்",
            "இயல், இசை, நாடகம்",
            "அகம், புறம், பக்தி",
            "கல்வி, செல்வம், வீரம்"
        ],
        english_options: [
            "Aram, Porul, Inbam",
            "Literature, Music, Drama",
            "Akam, Puram, Bhakti",
            "Education, Wealth, Courage"
        ],
        correct_answer: 0, difficulty: "hard"
    },
    {
        id: "shadow_king_thirukkural_005",
        story: "இறுதி ஞான மண்டபத்தில் நிழல் மன்னன் தோன்றுகிறான். திருக்குறளின் அடிப்படை வடிவத்தை அறிந்தால் மட்டுமே இறுதி போரில் வெல்ல முடியும்.",
        english_story: "In the Final Wisdom Sanctum, the Shadow King appears. Only true knowledge of the Thirukkural's basic form can win the final battle.",
        question: "திருக்குறளின் ஒவ்வொரு குறளும் எத்தனை அடிகளைக் கொண்டது?",
        english_question: "How many lines does each couplet of the Thirukkural contain?",
        tamil_question: "திருக்குறளின் ஒவ்வொரு குறளும் எத்தனை அடிகளைக் கொண்டது?",
        options: [
            "1 அடி",
            "2 அடிகள்",
            "3 அடிகள்",
            "4 அடிகள்"
        ],
        english_options: [
            "1 line",
            "2 lines",
            "3 lines",
            "4 lines"
        ],
        correct_answer: 1, difficulty: "hard"
    }
];

const literatureBilingualFallbacks = {
    "silappadhigaram_001": {
        "tamil_question": "சிலப்பதிகாரத்தின் மையப் பெண் கதாபாத்திரம் யார்?",
        "tamil_options": [
            "கண்ணகி",
            "மணிமேகலை",
            "அவ்வையார்",
            "மாதவி"
        ],
        "tamil_story": "பண்டைய கதை கண்ணகி மற்றும் கோவலனின் வாழ்க்கையுடன் தொடங்குகிறது. இந்தக் காப்பியத்தின் முக்கிய கதாபாத்திரங்களில் ஒருவரை அடையாளம் காண்பதே உன் முதல் சோதனை."
    },
    "silappadhigaram_002": {
        "tamil_question": "சிலப்பதிகாரத்தில் கண்ணகியின் கணவர் யார்?",
        "tamil_options": [
            "கோவலன்",
            "சேரன் செங்குட்டுவன்",
            "நெடுஞ்செழியன்",
            "இளங்கோ அடிகள்"
        ],
        "tamil_story": "கண்ணகியின் கதை கோவலனின் வாழ்க்கைக் கதையுடன் நெருக்கமாக இணைந்துள்ளது."
    },
    "silappadhigaram_003": {
        "tamil_question": "சிலப்பதிகாரத்தை இயற்றியவர் என மரபாகக் கருதப்படுபவர் யார்?",
        "tamil_options": [
            "இளங்கோ அடிகள்",
            "திருவள்ளுவர்",
            "கம்பர்",
            "சாத்தனார்"
        ],
        "tamil_story": "சிலப்பதிகாரம் தமிழின் முக்கியமான காப்பியங்களில் ஒன்றாகும்."
    },
    "silappadhigaram_004": {
        "tamil_question": "சிலப்பதிகாரத்திற்கு அதன் பெயரை வழங்கிய சிலம்பின் பெயர் என்ன?",
        "tamil_options": [
            "சிலம்பு",
            "வளையல்",
            "தாலி",
            "குண்டலம்"
        ],
        "tamil_story": "சிலப்பதிகாரத்தின் கதை கண்ணகி மற்றும் கோவலனின் வாழ்க்கை அனுபவங்களைப் பின்தொடர்கிறது."
    },
    "silappadhigaram_005": {
        "tamil_question": "கண்ணகியின் கதையுடன் வலுவாகத் தொடர்புடைய கருப்பொருள் எது?",
        "tamil_options": [
            "நீதி",
            "வானியல்",
            "வேளாண்மை",
            "இசை"
        ],
        "tamil_story": "கோவலனுக்கு இழைக்கப்பட்ட அநீதிக்குப் பிறகு, கண்ணகியின் கதை நீதியைத் தேடும் பயணமாக மாறுகிறது."
    },
    "silappadhigaram_006": {
        "tamil_question": "சிலப்பதிகாரத்தின் மையத் திருமணத் தம்பதியர் யார்?",
        "tamil_options": [
            "கண்ணகி மற்றும் கோவலன்",
            "கண்ணகி மற்றும் இளங்கோ அடிகள்",
            "மாதவி மற்றும் நெடுஞ்செழியன்",
            "மணிமேகலை மற்றும் கோவலன்"
        ],
        "tamil_story": "கண்ணகியின் தனிப்பட்ட துயரத்தை நீதியின் பெரிய கேள்வியுடன் இந்தக் காப்பியம் இணைக்கிறது."
    },
    "silappadhigaram_007": {
        "tamil_question": "சிலப்பதிகாரத்தில் பாண்டிய நாட்டுடன் தொடர்புடைய நகரம் எது?",
        "tamil_options": [
            "மதுரை",
            "புகார்",
            "வஞ்சி",
            "காஞ்சி"
        ],
        "tamil_story": "இந்தக் காப்பியம் பண்டைய தமிழ் அரசுகளுடனும் அவற்றின் முக்கிய நகரங்களுடனும் நெருக்கமாகத் தொடர்புடையது."
    },
    "silappadhigaram_008": {
        "tamil_question": "சிலப்பதிகாரத்தில் வரும் பண்டைய சோழர் துறைமுக நகரமான புகாரின் மற்றொரு பெயர் என்ன?",
        "tamil_options": [
            "காவேரிப்பட்டினம்",
            "மதுரை",
            "வஞ்சி",
            "உறையூர்"
        ],
        "tamil_story": "சிலப்பதிகாரம் பண்டைய துறைமுக நகரமான புகாரில் தொடங்குகிறது; அது காவேரிப்பட்டினம் என்றும் அழைக்கப்படுகிறது."
    },
    "silappadhigaram_009": {
        "tamil_question": "கோவலனுக்கு ஏற்பட்ட அநீதிக்கு கண்ணகி அளிக்கும் பதிலின் மையக் கருத்து எது?",
        "tamil_options": [
            "நீதி",
            "சாகசம்",
            "வாணிபம்",
            "கல்வி"
        ],
        "tamil_story": "கண்ணகியின் பயணம் நீதி, பொறுப்பு மற்றும் அநீதியான முடிவுகளின் விளைவுகளைப் பற்றிய கேள்விகளை எழுப்புகிறது."
    },
    "silappadhigaram_010": {
        "tamil_question": "கண்ணகியின் கதையின் மூலம் சிலப்பதிகாரம் எந்தப் பரந்த கருத்தை எடுத்துரைக்கிறது?",
        "tamil_options": [
            "நீதி மற்றும் அநீதியான முடிவுகளின் விளைவுகள்",
            "நவீன தொழில்நுட்பத்தின் கண்டுபிடிப்பு",
            "வானியலின் வரலாறு",
            "நவீன அறிவியலின் வளர்ச்சி"
        ],
        "tamil_story": "தனிப்பட்ட துயரத்தை நீதியுடனும் ஆட்சியாளர்கள் எடுக்கும் முடிவுகளின் விளைவுகளுடனும் சிலப்பதிகாரம் இணைக்கிறது."
    },
    "purananuru_001": {
        "tamil_question": "புறநானூறு சங்க இலக்கியத்தின் எந்தத் தொகுப்பைச் சேர்ந்தது?",
        "tamil_options": [
            "எட்டுத்தொகை",
            "பத்துப்பாட்டு",
            "பதினெண்கீழ்க்கணக்கு",
            "ஐம்பெருங்காப்பியம்"
        ],
        "tamil_story": "புறநானூறு செம்மையான தமிழ் சங்க இலக்கியத்தின் முக்கியமான தொகுப்புகளில் ஒன்றாகும்."
    },
    "purananuru_002": {
        "tamil_question": "புறநானூற்றில் மரபாக எத்தனை பாடல்கள் உள்ளதாகக் கருதப்படுகிறது?",
        "tamil_options": [
            "100",
            "200",
            "300",
            "400"
        ],
        "tamil_story": "புறநானூறு என்ற பெயர் நானூறு பாடல்களைக் கொண்ட தொகுப்பைக் குறிக்கிறது."
    },
    "purananuru_003": {
        "tamil_question": "புறநானூற்றுடன் வலுவாகத் தொடர்புடைய பரந்த கருப்பொருள் எது?",
        "tamil_options": [
            "போர் மற்றும் பொது வாழ்க்கை",
            "வானியல்",
            "இலக்கணம்",
            "கணிதம்"
        ],
        "tamil_story": "புறநானூறு தனிப்பட்ட காதலைவிட பொது மற்றும் சமூக வாழ்க்கையின் அம்சங்களை முக்கியமாக எடுத்துரைக்கிறது."
    },
    "purananuru_004": {
        "tamil_question": "புறநானூற்றில் பாடல்கள் இயற்றிய புகழ்பெற்ற தமிழ் புலவர் யார்?",
        "tamil_options": [
            "கணியன் பூங்குன்றனார்",
            "கம்பர்",
            "சேக்கிழார்",
            "ஆண்டாள்"
        ],
        "tamil_story": "பல புகழ்பெற்ற தமிழ் புலவர்களின் பாடல்கள் புறநானூறு தொகுப்பில் இடம்பெற்றுள்ளன."
    },
    "purananuru_005": {
        "tamil_question": "கணியன் பூங்குன்றனாரின் புறநானூற்றுப் பாடலுடன் புகழ்பெற்ற முறையில் தொடர்புடைய கருத்து எது?",
        "tamil_options": [
            "யாதும் ஊரே யாவரும் கேளிர்",
            "அரசர்கள் மட்டுமே முக்கியமானவர்கள்",
            "போர் மட்டுமே பெருமைக்கான பாதை",
            "அறிவு புலவர்களுக்கு மட்டுமே உரியது"
        ],
        "tamil_story": "கணியன் பூங்குன்றனார் மனிதகுலத்தைப் பற்றிய பரந்த பார்வையை வெளிப்படுத்தும் புகழ்பெற்ற புறநானூற்றுப் பாடலுக்காக நினைவுகூரப்படுகிறார்."
    },
    "purananuru_006": {
        "tamil_question": "புறநானூற்றில் ஆட்சியாளர்களின் எந்தப் பண்பு அடிக்கடி பாராட்டப்படுகிறது?",
        "tamil_options": [
            "கொடைத்தன்மை",
            "மௌனம்",
            "தனிமை",
            "ரகசியம்"
        ],
        "tamil_story": "அரசர்கள், வீரர்கள், கொடை, போர், மரணம் மற்றும் சமூகத்தின் மதிப்புகள் பற்றிய பாடல்கள் புறநானூற்றில் உள்ளன."
    },
    "purananuru_007": {
        "tamil_question": "சங்க இலக்கியத்தில் விவரிக்கப்படும் வரலாற்று உலகத்துடன் அடிக்கடி தொடர்புடைய மூன்று முக்கிய தமிழ் அரச வம்சங்கள் எவை?",
        "tamil_options": [
            "சேரர், சோழர் மற்றும் பாண்டியர்",
            "பல்லவர், சாளுக்கியர் மற்றும் ராஷ்டிரகூடர்",
            "முகலாயர், சோழர் மற்றும் பாண்டியர்",
            "மௌரியர், குப்தர் மற்றும் சேரர்"
        ],
        "tamil_story": "புறநானூற்றுப் பாடல்கள் பண்டைய தமிழகத்தின் ஆட்சியாளர்கள் மற்றும் சமூக வாழ்க்கை பற்றிய தகவல்களை வழங்குகின்றன."
    },
    "purananuru_008": {
        "tamil_question": "புறநானூற்றுப் பாடல்களில் பொதுவாக ஆராயப்படும் கருத்து எது?",
        "tamil_options": [
            "வாழ்க்கையின் நிலையாமை",
            "இயந்திரங்களின் கண்டுபிடிப்பு",
            "நவீன அரசியல் தேர்தல்கள்",
            "விண்வெளி ஆய்வு"
        ],
        "tamil_story": "மனித வாழ்க்கை, மரணம், புகழ், கொடை மற்றும் உலகியலான அதிகாரத்தின் நிலையாமை பற்றிய சிந்தனைகள் புறநானூற்றில் காணப்படுகின்றன."
    },
    "purananuru_009": {
        "tamil_question": "புறம் மரபு முக்கியமாக எதைப் பற்றிப் பேசுகிறது?",
        "tamil_options": [
            "பொது வாழ்க்கை, போர், வீரியம் மற்றும் சமூக மதிப்புகள்",
            "மறைக்கப்பட்ட காதல் உணர்வுகள்",
            "திருமணச் சடங்குகள் மட்டும்",
            "தாவரங்களின் விளக்கங்கள் மட்டும்"
        ],
        "tamil_story": "தமிழ் இலக்கிய மரபு கருப்பொருள்களை அகம் மற்றும் புறம் எனப் பிரிக்கிறது. புறநானூறு புற மரபுடன் தொடர்புடையது."
    },
    "purananuru_010": {
        "tamil_question": "பண்டைய தமிழ் சமூகத்தைப் புரிந்துகொள்வதில் புறநானூறு ஏன் முக்கியமானது?",
        "tamil_options": [
            "ஆட்சியாளர்கள், வீரர்கள், சமூகம், மதிப்புகள் மற்றும் வரலாற்று வாழ்க்கையைப் பற்றிய கவிதை விளக்கங்களை வழங்குகிறது",
            "இது நவீன அறிவியலைப் பற்றிய கையேடு",
            "இதில் மதச் சடங்குகள் மட்டுமே உள்ளன",
            "இது நவீன வரலாற்றுப் பாடநூலாக எழுதப்பட்டது"
        ],
        "tamil_story": "புறநானூறு கவிதையாக மட்டுமல்லாமல், பண்டைய தமிழ் சமூகத்தைப் பற்றிய தகவல்களையும் பாதுகாத்து வைத்திருப்பதால் முக்கியமானது."
    },
    "manimegalai_001": {
        "tamil_question": "மணிமேகலையின் மையப் பெண் கதாபாத்திரம் யார்?",
        "tamil_options": [
            "மணிமேகலை",
            "கண்ணகி",
            "மாதவி",
            "அவ்வையார்"
        ],
        "tamil_story": "மணிமேகலை ஒரு முக்கியமான தமிழ் புத்த காப்பியம்; அதன் மையக் கதாபாத்திரத்தின் ஆன்மிகப் பயணத்தைப் பின்தொடர்கிறது."
    },
    "manimegalai_002": {
        "tamil_question": "மணிமேகலையை இயற்றியவர் என மரபாகக் கருதப்படுபவர் யார்?",
        "tamil_options": [
            "சாத்தனார்",
            "இளங்கோ அடிகள்",
            "திருவள்ளுவர்",
            "கம்பர்"
        ],
        "tamil_story": "புத்த சிந்தனைகள் மற்றும் அறக்கருத்துகளை எடுத்துரைத்த புலவருடன் மணிமேகலை மரபாகத் தொடர்புபடுத்தப்படுகிறது."
    },
    "manimegalai_003": {
        "tamil_question": "மணிமேகலையின் தாய் யார்?",
        "tamil_options": [
            "மாதவி",
            "கண்ணகி",
            "அவ்வையார்",
            "மணிமேகலைத் தேவி"
        ],
        "tamil_story": "மணிமேகலை சிலப்பதிகாரத்தின் கதாபாத்திரங்களுடனும் நிகழ்வுகளுடனும் தொடர்புடையது."
    },
    "manimegalai_004": {
        "tamil_question": "மணிமேகலையுடன் வலுவாகத் தொடர்புடைய சமய மரபு எது?",
        "tamil_options": [
            "பௌத்தம்",
            "சமணம்",
            "சைவம்",
            "வைணவம்"
        ],
        "tamil_story": "உலகியலான வாழ்க்கையிலிருந்து ஆன்மிக மதிப்புகளை நோக்கி மணிமேகலை நகர்வதை இந்தக் காப்பியம் எடுத்துரைக்கிறது."
    },
    "manimegalai_005": {
        "tamil_question": "மணிமேகலை தனது ஆன்மிகப் பயணத்தின் மூலம் முக்கியமாக எதைத் தேடுகிறாள்?",
        "tamil_options": [
            "ஆன்மிக விடுதலை மற்றும் கருணை",
            "அரசியல் அதிகாரம்",
            "இராணுவ வெற்றி",
            "செல்வமும் புகழும்"
        ],
        "tamil_story": "மணிமேகலை உலகியலான வாழ்க்கையைத் துறந்து ஆன்மிகப் பயிற்சி மற்றும் கருணையுடன் தொடர்புடைய பாதையைத் தேர்ந்தெடுக்கிறாள்."
    },
    "manimegalai_006": {
        "tamil_question": "மணிமேகலையுடன் தொடர்புடைய மாயக் கிண்ணத்தின் பெயர் என்ன?",
        "tamil_options": [
            "அமுதசுரபி",
            "சிலம்பு",
            "குண்டலம்",
            "வளையல்"
        ],
        "tamil_story": "ஒரு மாயக் கிண்ணம் கதையில் முக்கிய பங்கு வகிக்கிறது; அது மணிமேகலையின் அறப்பணிகளுடன் தொடர்புடையது."
    },
    "manimegalai_007": {
        "tamil_question": "மணிமேகலையின் அறச்செயல்களின் மூலம் வலியுறுத்தப்படும் மதிப்பு எது?",
        "tamil_options": [
            "கருணை",
            "பழிவாங்குதல்",
            "வெற்றி கொள்ளுதல்",
            "ஆடம்பரம்"
        ],
        "tamil_story": "பசியாலும் வறுமையாலும் துன்பப்படும் மக்களுக்கு உதவுவதையும் கருணையையும் இந்தக் காப்பியம் வலியுறுத்துகிறது."
    },
    "manimegalai_008": {
        "tamil_question": "மணிமேகலை பாரம்பரியமாக எந்த வகையான தமிழ் இலக்கியப் படைப்பாகக் கருதப்படுகிறது?",
        "tamil_options": [
            "ஐம்பெருங்காப்பியங்களில் ஒன்று",
            "ஒரு சங்கத் தொகுப்பு",
            "ஒரு இலக்கண நூல்",
            "ஒரு பக்திப் பாடல் தொகுப்பு"
        ],
        "tamil_story": "சிலப்பதிகாரத்தில் அறிமுகமான இலக்கிய உலகை மணிமேகலை தொடர்ந்து விரிவுபடுத்துகிறது."
    },
    "manimegalai_009": {
        "tamil_question": "மணிமேகலையின் ஆன்மிகப் பயணத்தில் முக்கியமான தத்துவக் கருத்து எது?",
        "tamil_options": [
            "ஆசை மற்றும் துன்பத்திலிருந்து விடுதலை",
            "இராணுவப் புகழைத் தேடுதல்",
            "செல்வத்தைச் சேர்த்தல்",
            "அரசுகளை விரிவுபடுத்துதல்"
        ],
        "tamil_story": "துன்பம், ஆசை மற்றும் விடுதலை தொடர்பான புத்த தத்துவக் கருத்துகளை இந்தக் காப்பியம் ஆராய்கிறது."
    },
    "manimegalai_010": {
        "tamil_question": "மணிமேகலையின் மாற்றத்தின் மூலம் வலுவாக வெளிப்படுத்தப்படும் பரந்த செய்தி எது?",
        "tamil_options": [
            "கருணை, துறவு மற்றும் ஆன்மிகத் தேடல்",
            "அதிகாரம், வெற்றி மற்றும் செல்வம்",
            "வாணிபம், போர் மற்றும் அரசியல்",
            "புகழ், ஆடம்பரம் மற்றும் பொழுதுபோக்கு"
        ],
        "tamil_story": "மணிமேகலை தனது கதையை அற மற்றும் தத்துவ போதனைகளுடன் இணைக்கிறது."
    }
};

// ==========================================
// STAGES 7–9 — CURATED LITERATURE QUESTIONS
// ==========================================
// The supplied datasets contain ten questions each.
// The RPG uses questions 001–005 so every run has
// exactly five stage questions: four Guardians +
// one Shadow King.
// ==========================================

const literatureStageQuestionData = {

    // ------------------------------------------
    // SILAPPADHIGARAM
    // ------------------------------------------

    silappadhigaram_001: {
        quest_id: "silappadhigaram_001",
        difficulty: "easy",
        story: "The ancient tale begins with the story of Kannagi and Kovalan. Your first challenge is to identify one of the central characters of the epic.",
        question: "Who is the central female character of Silappadhigaram?",
        options: [
            "Kannagi",
            "Manimekalai",
            "Avvaiyar",
            "Madhavi"
        ],
        correct_answer: 0
    },

    silappadhigaram_002: {
        quest_id: "silappadhigaram_002",
        difficulty: "easy",
        story: "Kannagi's story is closely connected with the story of Kovalan.",
        question: "Who is Kannagi's husband in Silappadhigaram?",
        options: [
            "Kovalan",
            "Cheran Senguttuvan",
            "Nedunchezhiyan",
            "Ilango Adigal"
        ],
        correct_answer: 0
    },

    silappadhigaram_003: {
        quest_id: "silappadhigaram_003",
        difficulty: "easy",
        story: "Silappadhigaram is one of the important Tamil epics.",
        question: "Who is traditionally credited as the author of Silappadhigaram?",
        options: [
            "Ilango Adigal",
            "Thiruvalluvar",
            "Kambar",
            "Sattanar"
        ],
        correct_answer: 0
    },

    silappadhigaram_004: {
        quest_id: "silappadhigaram_004",
        difficulty: "easy",
        story: "The story of Silappadhigaram follows the experiences of Kannagi and Kovalan.",
        question: "What is the name of the anklet that gives Silappadhigaram its title?",
        options: [
            "Silambu",
            "Valai",
            "Thali",
            "Kundalam"
        ],
        correct_answer: 0
    },

    silappadhigaram_005: {
        quest_id: "silappadhigaram_005",
        difficulty: "easy",
        story: "Kannagi's story becomes a journey of justice after a serious injustice is committed against Kovalan.",
        question: "Which theme is strongly associated with Kannagi's story?",
        options: [
            "Justice",
            "Astronomy",
            "Agriculture",
            "Music"
        ],
        correct_answer: 0
    },

    // ------------------------------------------
    // PURANANURU
    // ------------------------------------------

    purananuru_001: {
        quest_id: "purananuru_001",
        difficulty: "easy",
        story: "Purananuru is one of the important anthologies of classical Tamil Sangam literature.",
        question: "Purananuru belongs to which collection of Sangam literature?",
        options: [
            "Ettuthokai",
            "Pathupattu",
            "Pathinenkilkanakku",
            "Aimperumkappiyam"
        ],
        correct_answer: 0
    },

    purananuru_002: {
        quest_id: "purananuru_002",
        difficulty: "easy",
        story: "The name Purananuru refers to an anthology containing four hundred poems.",
        question: "How many poems are traditionally included in Purananuru?",
        options: [
            "100",
            "200",
            "300",
            "400"
        ],
        correct_answer: 3
    },

    purananuru_003: {
        quest_id: "purananuru_003",
        difficulty: "easy",
        story: "Purananuru mainly deals with public and social aspects of life rather than private love.",
        question: "Which broad theme is strongly associated with Purananuru?",
        options: [
            "War and public life",
            "Astronomy",
            "Grammar",
            "Mathematics"
        ],
        correct_answer: 0
    },

    purananuru_004: {
        quest_id: "purananuru_004",
        difficulty: "easy",
        story: "Several celebrated Tamil poets are represented in the Purananuru anthology.",
        question: "Which famous Tamil poet is associated with poems in Purananuru?",
        options: [
            "Kaniyan Pungundranar",
            "Kambar",
            "Sekkizhar",
            "Andal"
        ],
        correct_answer: 0
    },

    purananuru_005: {
        quest_id: "purananuru_005",
        difficulty: "medium",
        story: "Kaniyan Pungundranar is remembered for a famous Purananuru poem expressing a broad view of humanity.",
        question: "Which idea is famously associated with Kaniyan Pungundranar's Purananuru poem?",
        options: [
            "All places are my own and all people are my kin",
            "Only kings are important",
            "War is the only path to greatness",
            "Knowledge belongs only to poets"
        ],
        correct_answer: 0
    },

    // ------------------------------------------
    // MANIMEGALAI
    // ------------------------------------------

    manimegalai_001: {
        quest_id: "manimegalai_001",
        difficulty: "easy",
        story: "Manimegalai is a major Tamil Buddhist epic that follows the spiritual journey of its central character.",
        question: "Who is the central female character of Manimegalai?",
        options: [
            "Manimegalai",
            "Kannagi",
            "Madhavi",
            "Avvaiyar"
        ],
        correct_answer: 0
    },

    manimegalai_002: {
        quest_id: "manimegalai_002",
        difficulty: "easy",
        story: "Manimegalai is traditionally associated with the poet who also wrote about Buddhist ideas and moral teachings.",
        question: "Who is traditionally credited as the author of Manimegalai?",
        options: [
            "Sattanar",
            "Ilango Adigal",
            "Thiruvalluvar",
            "Kambar"
        ],
        correct_answer: 0
    },

    manimegalai_003: {
        quest_id: "manimegalai_003",
        difficulty: "easy",
        story: "Manimegalai is connected to the characters and events of Silappadhigaram.",
        question: "Who is Manimegalai's mother?",
        options: [
            "Madhavi",
            "Kannagi",
            "Avvaiyar",
            "Manimekala Devi"
        ],
        correct_answer: 0
    },

    manimegalai_004: {
        quest_id: "manimegalai_004",
        difficulty: "easy",
        story: "The epic presents Manimegalai's movement away from worldly life toward spiritual values.",
        question: "Which religious tradition is strongly associated with Manimegalai?",
        options: [
            "Buddhism",
            "Jainism",
            "Saivism",
            "Vaishnavism"
        ],
        correct_answer: 0
    },

    manimegalai_005: {
        quest_id: "manimegalai_005",
        difficulty: "medium",
        story: "Manimegalai rejects a worldly life and chooses a path connected with spiritual practice and compassion.",
        question: "What does Manimegalai primarily seek through her spiritual journey?",
        options: [
            "Spiritual liberation and compassion",
            "Political power",
            "Military victory",
            "Wealth and fame"
        ],
        correct_answer: 0
    }
};


function applyLiteratureBilingualFallbacks(question) {
    if (!question || selectedLiterature === "thirukkural") {
        return question;
    }

    const questId = String(
        question.quest_id ||
        question.id ||
        question.questId ||
        ""
    );

    const fallback = literatureBilingualFallbacks[questId];

    if (!fallback) {
        return question;
    }

    if (
        !question.tamil_question ||
        !String(question.tamil_question).trim()
    ) {
        question.tamil_question = fallback.tamil_question;
    }

    if (
        !Array.isArray(question.tamil_options) ||
        question.tamil_options.length === 0
    ) {
        question.tamil_options = fallback.tamil_options.slice();
    }

    if (
        !question.tamil_story ||
        !String(question.tamil_story).trim()
    ) {
        question.tamil_story = fallback.tamil_story;
    }

    return question;
}

const guardianFallbackQuestion = uniqueThirukkuralQuestions[0];
const area2FallbackQuestion = uniqueThirukkuralQuestions[1];
const finalBossFallbackQuestion = uniqueThirukkuralQuestions[4];


// ==========================================
// STAGE 10.7 — QUEST OFFER CONTENT
// ==========================================

const sageQuestOffer = {

    speaker: "ஞானி",

    get title() {
        return activeLiteratureProfile.questTitleTa;
    },

    get englishTitle() {
        return activeLiteratureProfile.questTitleEn;
    },

    get description() {
        return activeLiteratureProfile.questDescriptionTa;
    },

    get englishDescription() {
        return activeLiteratureProfile.questDescriptionEn;
    },

    get question() {
        return activeLiteratureProfile.questQuestionTa;
    },

    get englishQuestion() {
        return activeLiteratureProfile.questQuestionEn;
    }

};





const interactionPrompt =
    "Press E to interact";

const sageInteractionPrompt =
    "ஞானியிடம் பேச E அழுத்தவும்";


// ==========================================
// CANVAS RESIZING
// ==========================================

// ==========================================
// COMMON WORLD FLOOR ALIGNMENT
// ==========================================
const WORLD_FLOOR_RATIO = 0.78;

function getWorldFloorY(characterHeight) {
    return canvas.height * WORLD_FLOOR_RATIO - characterHeight;
}

function positionGuardianOnWorldFloor() {
    guardian.x = canvas.width / 2 - guardian.width / 2;
    guardian.y = getWorldFloorY(guardian.height);
}

function positionFinalBossOnWorldFloor() {
    finalBoss.x = canvas.width / 2 - finalBoss.width / 2;
    finalBoss.y = getWorldFloorY(finalBoss.height);
}

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    inscription.x =
        canvas.width / 2 -
        inscription.width / 2;


    inscription.y =
        canvas.height / 2 -
        120;


    // ======================================
    // STAGE 10.1 — SAGE POSITION
    // ======================================

    sage.x =
        canvas.width / 2 -
        sage.width / 2;

    sage.y =
        canvas.height * 0.34;

    positionGuardianOnWorldFloor();
    positionFinalBossOnWorldFloor();

}


resizeCanvas();


window.addEventListener(
    "resize",
    function () {

        resizeCanvas();
        updateCollisionBoundaries();
        positionPlayerAtCenter();

    }
);


// ==========================================
// PLAYER INITIAL POSITION
// ==========================================

function positionPlayerAtCenter() {

    player.x =
        canvas.width / 2 -
        player.width / 2;


    player.y =
        canvas.height / 2 -
        player.height / 2;

}


positionPlayerAtCenter();


// ==========================================
// TEMPLE BACKGROUND
// ==========================================

const templeImage = new Image();

templeImage.src =
    "/static/images/temple.jpg";

let imageLoaded = false;


templeImage.onload = function () {

    imageLoaded = true;

    console.log(
        "🏛️ Temple background loaded"
    );

};


templeImage.onerror = function () {

    console.error(
        "❌ Could not load temple.jpg"
    );

};

// ==========================================
// STAGE 15 — AREA 2 BACKGROUND
// ==========================================
const libraryImage = new Image();
libraryImage.src = "/static/images/library.jpg";
let libraryImageLoaded = false;

libraryImage.onload = function () {
    libraryImageLoaded = true;
    console.log("📚 Library background loaded");
};

libraryImage.onerror = function () {
    libraryImageLoaded = false;
    console.warn("⚠️ library.jpg not found. Area 2 will use a procedural fallback.");
};

const villageImage = new Image();
villageImage.src = "/static/images/village.jpg";
let villageImageLoaded = false;

villageImage.onload = function () {
    villageImageLoaded = true;
    console.log("🏘️ Village background loaded");
};

villageImage.onerror = function () {
    villageImageLoaded = false;
    console.warn("⚠️ village.jpg not found. Area 3 will use a procedural fallback.");
};

const forestImage = new Image();
forestImage.src = "/static/images/forest.jpg";
let forestImageLoaded = false;

forestImage.onload = function () {
    forestImageLoaded = true;
    console.log("🌲 Forest background loaded");
};

forestImage.onerror = function () {
    forestImageLoaded = false;
    console.warn("⚠️ forest.jpg not found. Area 4 will use a procedural fallback.");
};


// ==========================================
// KEYBOARD INPUT
// ==========================================

const keys = {};


window.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key.toLowerCase();


        keys[key] = true;


        // ==================================
        // E = INTERACT
        // ==================================

        if (key === "e") {

            checkInteraction();

        }


        // ==================================
        // PREVENT PAGE SCROLL
        // ==================================

        if (

            [
                "arrowup",
                "arrowdown",
                "arrowleft",
                "arrowright",
                " "

            ].includes(key)

        ) {

            event.preventDefault();

        }

    }
);


window.addEventListener(
    "keyup",
    function (event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


// ==========================================
// GUARDIAN / BOSS SPAWN EFFECT TRIGGER
// ==========================================
// Uses the same effect for all five stages and
// all four literature paths.
// ==========================================
function triggerGuardianSpawnEffect(isFinalBoss = false) {

    guardianSpawnFlashTarget =
        isFinalBoss ? "boss" : "guardian";

    guardianSpawnFlash = true;
    guardianSpawnFlashTimer = 0;

    // Audio is tied to the spawn event so every
    // Guardian and the Shadow King gets a sound.
    playGameTone("spawn");
}


// ==========================================
// STAGE 10.8 — ACCEPT QUEST
// ==========================================
// Accepts the Sage's quest offer and starts
// Stage 1 without changing player/NPC positions.
// ==========================================

function acceptQuest() {

    if (!showQuestOffer) {
        return;
    }

    questAccepted = true;
    showQuestOffer = false;

    // ✨ Quest accepted visual/audio feedback.
    questAcceptedGlow = true;
    questAcceptedGlowTimer = 0;
    playGameTone("quest");

    // The old Active Quest HUD becomes available
    // only after the quest is actually accepted.
    showActiveQuestHUD = true;

    showQuestAcceptedNotification = true;
    questNotificationTimer = 0;

    questStarted = false;

    currentArea = 1;
    guardianEncounter = 1;

    guardianVisible = true;

    // ⚔️ Stage 1 Guardian spawn flash + sound.
    triggerGuardianSpawnEffect(false);

    finalBossVisible = false;
    guardianDefeated = false;

    area2Unlocked = false;
    area3Unlocked = false;
    area4Unlocked = false;

    playerNearAreaGate = false;
    playerNearGuardian = false;

    activeQuest.objective =
        guardianStages[0].objectiveTa;

    activeQuest.englishObjective =
        guardianStages[0].objectiveEn;

    positionGuardianOnWorldFloor();
    positionFinalBossOnWorldFloor();

    updateCollisionBoundaries();

    console.log(
        "📜 QUEST ACCEPTED:",
        activeLiteratureProfile.englishName
    );

    console.log(
        "⚔️ STAGE 1 GUARDIAN ACTIVATED"
    );
}


// ==========================================
// CHECK INTERACTION
// ==========================================

function checkInteraction() {

    if (questCompleted) {
        return;
    }

    if (showRewardScreen) {
        continueFromRewardScreen();
        return;
    }

    if (playerNearAreaGate && guardianDefeated && getCurrentAreaConfig().nextArea) {
        enterNextArea();
        return;
    }

    if (guardianBattleOpen) {
        if (guardianSelectedAnswer === -1) {
            guardianResult = "முதலில் ஒரு பதிலைத் தேர்ந்தெடுக்கவும் / Select an answer first.";
            return;
        }
        submitGuardianAnswer();
        return;
    }

    if (playerNearGuardian && (guardianVisible || finalBossVisible)) {
        startGuardianBattle();
        return;
    }

    if (showQuestOffer) {
        acceptQuest();
        return;
    }

    if (playerNearSage && !questAccepted) {
        if (!showSageDialogue) {
            showSageDialogue = true;
            currentSageDialogue = 0;
        } else {
            currentSageDialogue++;
            if (currentSageDialogue >= sageDialogues.length) {
                showSageDialogue = false;
                currentSageDialogue = 0;

                // Stage 10.7 — show the quest offer.
                // Keep the Active Quest HUD hidden until
                // the player explicitly accepts.
                showActiveQuestHUD = false;
                showQuestOffer = true;
            }
        }
    }
}


// ==========================================
// CHECK PLAYER PROXIMITY
// ==========================================

function checkPlayerProximity() {

    const playerCenterX =

        player.x +
        player.width / 2;


    const playerCenterY =

        player.y +
        player.height / 2;


    const inscriptionCenterX =

        inscription.x +
        inscription.width / 2;


    const inscriptionCenterY =

        inscription.y +
        inscription.height / 2;


    const distance = Math.sqrt(

        Math.pow(

            playerCenterX -
            inscriptionCenterX,

            2

        )

        +

        Math.pow(

            playerCenterY -
            inscriptionCenterY,

            2

        )

    );


    playerNearInscription =

        distance <
        inscription.interactionDistance;


    // Hide dialogue when walking away

    if (!playerNearInscription) {

        showInteractionMessage = false;

    }

}


// ==========================================
// STAGE 10.3 — CHECK SAGE PROXIMITY
// ==========================================
// Detects whether the player is close enough to Sage.
// This stage only detects proximity.
// Stage 10.4 now displays the Sage interaction prompt.
// ==========================================

function checkSageProximity() {

    if (currentArea !== 1 || questAccepted) {
        playerNearSage = false;
        return;
    }

    const playerCenterX =
        player.x +
        player.width / 2;

    const playerCenterY =
        player.y +
        player.height / 2;

    const sageCenterX =
        sage.x +
        sage.width / 2;

    const sageCenterY =
        sage.y +
        sage.height / 2;

    const distance = Math.sqrt(

        Math.pow(
            playerCenterX -
            sageCenterX,
            2
        )

        +

        Math.pow(
            playerCenterY -
            sageCenterY,
            2
        )

    );

    playerNearSage =
        distance <
        sage.interactionDistance;

}


// ==========================================
// STAGE 12 — CHECK GUARDIAN PROXIMITY
// ==========================================

function checkGuardianProximity() {

    const targetVisible = guardianVisible || finalBossVisible;

    if (!targetVisible || guardianDefeated) {
        playerNearGuardian = false;
        return;
    }

    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;
    const target = finalBossVisible ? finalBoss : guardian;
    const targetCenterX = target.x + target.width / 2;
    const targetCenterY = target.y + target.height / 2;

    const distance = Math.sqrt(
        Math.pow(playerCenterX - targetCenterX, 2) +
        Math.pow(playerCenterY - targetCenterY, 2)
    );

    playerNearGuardian = distance < target.interactionDistance;
}


// ==========================================
// STAGE 15 — AREA GATE PROXIMITY
// ==========================================
function checkAreaGateProximity() {

    if (currentArea >= 5 || !guardianDefeated || !getCurrentAreaConfig().nextArea) {
        playerNearAreaGate = false;
        return;
    }

    const gateX = canvas.width / 2;
    const gateY = canvas.height - 72;
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;

    playerNearAreaGate = Math.hypot(
        playerCenterX - gateX,
        playerCenterY - gateY
    ) < 115;
}


// ==========================================
// STAGE 10.2 — SAGE NPC COLLISION + TEMPLE OBJECT COLLISION
// ==========================================
//
// Collision is invisible in the final game.
// The coordinates below use percentages of the
// current canvas so they remain responsive.
// ==========================================

const collisionObjects = [
    // ------------------------------------------
    // OUTER WORLD BOUNDARIES
    // ------------------------------------------
    {
        type: "boundary",
        name: "topBoundary",
        x: 0,
        y: 0,
        width: canvas.width,
        height: 28
    },
    {
        type: "boundary",
        name: "bottomBoundary",
        x: 0,
        y: canvas.height - 28,
        width: canvas.width,
        height: 28
    },
    {
        type: "boundary",
        name: "leftBoundary",
        x: 0,
        y: 0,
        width: 28,
        height: canvas.height
    },
    {
        type: "boundary",
        name: "rightBoundary",
        x: canvas.width - 28,
        y: 0,
        width: 28,
        height: canvas.height
    },

    // ------------------------------------------
    // TEMPLE ARCHITECTURE
    // ------------------------------------------
    // These invisible rectangles sit over the
    // large side pillars/structures in the
    // temple background.
    {
        type: "architecture",
        name: "leftFrontPillar",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    {
        type: "architecture",
        name: "leftInnerPillar",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    {
        type: "architecture",
        name: "rightInnerPillar",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    {
        type: "architecture",
        name: "rightFrontPillar",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },

    // ------------------------------------------
    // INSCRIPTION / STONE
    // ------------------------------------------
    {
        type: "interactable",
        name: "ancientInscription",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },

    // ------------------------------------------
    // SAGE NPC COLLISION
    // ------------------------------------------
    {
        type: "npc",
        name: "sage",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },

    {
        type: "boss",
        name: "knowledgeGuardian",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    {
        type: "boss",
        name: "finalBoss",
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
];

function updateCollisionBoundaries() {

    // ==========================================
    // OUTER BOUNDARIES
    // ==========================================

    collisionObjects[0].x = 0;
    collisionObjects[0].y = 0;
    collisionObjects[0].width = canvas.width;
    collisionObjects[0].height = 28;

    collisionObjects[1].x = 0;
    collisionObjects[1].y = canvas.height - 28;
    collisionObjects[1].width = canvas.width;
    collisionObjects[1].height = 28;

    collisionObjects[2].x = 0;
    collisionObjects[2].y = 0;
    collisionObjects[2].width = 28;
    collisionObjects[2].height = canvas.height;

    collisionObjects[3].x = canvas.width - 28;
    collisionObjects[3].y = 0;
    collisionObjects[3].width = 28;
    collisionObjects[3].height = canvas.height;

    // ==========================================
    // STAGE 15 — AREA-SPECIFIC COLLISION
    // ==========================================
    if (currentArea === 1) {

        collisionObjects[4].x = canvas.width * 0.025;
        collisionObjects[4].y = canvas.height * 0.18;
        collisionObjects[4].width = canvas.width * 0.115;
        collisionObjects[4].height = canvas.height * 0.70;

        collisionObjects[5].x = canvas.width * 0.285;
        collisionObjects[5].y = canvas.height * 0.27;
        collisionObjects[5].width = canvas.width * 0.070;
        collisionObjects[5].height = canvas.height * 0.52;

        collisionObjects[6].x = canvas.width * 0.645;
        collisionObjects[6].y = canvas.height * 0.27;
        collisionObjects[6].width = canvas.width * 0.070;
        collisionObjects[6].height = canvas.height * 0.52;

        collisionObjects[7].x = canvas.width * 0.860;
        collisionObjects[7].y = canvas.height * 0.18;
        collisionObjects[7].width = canvas.width * 0.115;
        collisionObjects[7].height = canvas.height * 0.70;

        collisionObjects[8].x = inscription.x;
        collisionObjects[8].y = inscription.y;
        collisionObjects[8].width = inscription.width;
        collisionObjects[8].height = inscription.height;

        collisionObjects[9].x = sage.x + sage.width * 0.28;
        collisionObjects[9].y = sage.y + sage.height * 0.70;
        collisionObjects[9].width = sage.width * 0.44;
        collisionObjects[9].height = sage.height * 0.22;

    } else {

        for (let i = 4; i <= 9; i++) {
            collisionObjects[i].x = -1000;
            collisionObjects[i].y = -1000;
            collisionObjects[i].width = 0;
            collisionObjects[i].height = 0;
        }
    }

    if (finalBossVisible) {

        collisionObjects[10].x =
            finalBoss.x - finalBoss.width * 0.50;

        collisionObjects[10].y =
            finalBoss.y + finalBoss.height * 0.55;

        collisionObjects[10].width =
            finalBoss.width * 2.00;

        collisionObjects[10].height =
            finalBoss.height * 0.28;

    } else if (guardianVisible && !guardianDefeated) {

        collisionObjects[10].x =
            guardian.x - guardian.width * 0.55;

        collisionObjects[10].y =
            guardian.y + guardian.height * 0.55;

        collisionObjects[10].width =
            guardian.width * 2.10;

        collisionObjects[10].height =
            guardian.height * 0.28;

    } else {

        collisionObjects[10].x = -1000;
        collisionObjects[10].y = -1000;
        collisionObjects[10].width = 0;
        collisionObjects[10].height = 0;

    }
}

updateCollisionBoundaries();

function isColliding(rectA, rectB) {
    return (
        rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
    );
}

function getPlayerCollisionBox(x, y) {
    return {
        // Only the lower portion of the character
        // participates in collision.
        x: x + player.width * 0.25,
        y: y + player.height * 0.55,
        width: player.width * 0.5,
        height: player.height * 0.35
    };
}

// ==========================================
// STAGE 10.2 — SAGE COLLISION HELPER
// ==========================================

function getSageCollisionBox() {

    return {

        x: sage.x + sage.width * 0.28,

        y: sage.y + sage.height * 0.70,

        width: sage.width * 0.44,

        height: sage.height * 0.22

    };

}


function canMoveTo(newX, newY) {

    const playerBox =
        getPlayerCollisionBox(newX, newY);

    // Stage 10.2:
    // Sage is already part of collisionObjects,
    // so the existing collision system handles him
    // automatically.

    for (const obstacle of collisionObjects) {

        if (obstacle.type === "boss") {
            if (obstacle.name === "finalBoss" && !finalBossVisible) continue;
            if (obstacle.name === "knowledgeGuardian" && (!guardianVisible || guardianDefeated || finalBossVisible)) continue;
        }

        if (
            obstacle.width <= 0 ||
            obstacle.height <= 0
        ) {
            continue;
        }

        if (isColliding(playerBox, obstacle)) {
            return false;
        }
    }

    return true;
}

// ==========================================
// OPTIONAL DEBUG HELPER
// ==========================================
// Disabled by default.
// Set SHOW_COLLISION_DEBUG = true only when
// you need to tune pillar positions.
// ==========================================

const SHOW_COLLISION_DEBUG = false;

function drawCollisionDebug() {

    if (!SHOW_COLLISION_DEBUG) {
        return;
    }

    ctx.save();

    for (const obstacle of collisionObjects) {

        ctx.strokeStyle =
            obstacle.type === "interactable"
                ? "yellow"
                : obstacle.type === "npc"
                    ? "cyan"
                    : "red";

        ctx.lineWidth = 2;

        ctx.strokeRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
        );
    }

    const playerBox =
        getPlayerCollisionBox(
            player.x,
            player.y
        );

    ctx.strokeStyle = "lime";

    ctx.strokeRect(
        playerBox.x,
        playerBox.y,
        playerBox.width,
        playerBox.height
    );

    ctx.restore();
}


// ==========================================
// UPDATE PLAYER MOVEMENT
// ==========================================

function updatePlayer() {

    if (guardianBattleOpen || showAreaTransition) {
        isMoving = false;
        return;
    }

    let movingX = 0;
    let movingY = 0;

    // ======================================
    // CHECK KEYS
    // ======================================

    const up =
        keys["w"] ||
        keys["arrowup"];

    const down =
        keys["s"] ||
        keys["arrowdown"];

    const left =
        keys["a"] ||
        keys["arrowleft"];

    const right =
        keys["d"] ||
        keys["arrowright"];


    // ======================================
    // NORTH-EAST
    // W + D
    // ======================================

    if (up && right) {

        movingY -= 1;
        movingX += 1;

        playerDirection = "northEast";
    }


    // ======================================
    // NORTH-WEST
    // W + A
    // ======================================

    else if (up && left) {

        movingY -= 1;
        movingX -= 1;

        playerDirection = "northWest";
    }


    // ======================================
    // SOUTH-EAST
    // S + D
    // ======================================

    else if (down && right) {

        movingY += 1;
        movingX += 1;

        playerDirection = "southEast";
    }


    // ======================================
    // SOUTH-WEST
    // S + A
    // ======================================

    else if (down && left) {

        movingY += 1;
        movingX -= 1;

        playerDirection = "southWest";
    }


    // ======================================
    // NORTH
    // W
    // ======================================

    else if (up) {

        movingY -= 1;

        playerDirection = "north";
    }


    // ======================================
    // SOUTH
    // S
    // ======================================

    else if (down) {

        movingY += 1;

        playerDirection = "south";
    }


    // ======================================
    // WEST
    // A
    // ======================================

    else if (left) {

        movingX -= 1;

        playerDirection = "west";
    }


    // ======================================
    // EAST
    // D
    // ======================================

    else if (right) {

        movingX += 1;

        playerDirection = "east";
    }


    // ======================================
    // CHECK MOVEMENT
    // ======================================

    isMoving =
        movingX !== 0 ||
        movingY !== 0;


    // ======================================
    // NORMALIZE DIAGONAL MOVEMENT
    // ======================================

    if (isMoving) {

        const movementLength =
            Math.sqrt(
                movingX * movingX +
                movingY * movingY
            );

        movingX /=
            movementLength;

        movingY /=
            movementLength;
    }


    // ======================================
    // APPLY MOVEMENT WITH COLLISION
    // ======================================

    const newX =
        player.x +
        movingX *
        player.speed;

    const newY =
        player.y +
        movingY *
        player.speed;

    // Check X and Y separately so the player
    // can slide along walls naturally.
    if (canMoveTo(newX, player.y)) {
        player.x = newX;
    }

    if (canMoveTo(player.x, newY)) {
        player.y = newY;
    }
}

// ==========================================
// UPDATE WALKING ANIMATION
// ==========================================

function updateAnimation() {

    // Stop animation when player is standing still.
    if (!isMoving) {

        currentFrame = 0;
        animationTimer = 0;

        return;
    }

    animationTimer++;

    if (animationTimer >= animationSpeed) {

        animationTimer = 0;

        currentFrame++;

        if (currentFrame >= walkingFrameCount) {
            currentFrame = 0;
        }
    }
}

// ==========================================
// DRAW BACKGROUND
// ==========================================

function drawProceduralAreaFallback(area) {
    // This fallback guarantees that the four areas still look different
    // even if one of the JPG files is missing.
    const w = canvas.width;
    const h = canvas.height;

    const palettes = {
        1: ["#2a1710", "#4b2b1b", "#8b5a2b"],
        2: ["#17120f", "#302019", "#5b4030"],
        3: ["#172416", "#2e4826", "#6c5a35"],
        4: ["#07150d", "#102d1a", "#284d2a"]
    };

    const palette = palettes[area] || palettes[1];
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(0.55, palette[1]);
    gradient.addColorStop(1, palette[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = 0.22;

    if (area === 1) {
        ctx.strokeStyle = "#d9a441";
        ctx.lineWidth = 5;
        for (let x = 80; x < w; x += 170) {
            ctx.strokeRect(x, h * 0.18, 55, h * 0.65);
        }
        ctx.strokeRect(w * 0.25, h * 0.12, w * 0.50, 20);
    } else if (area === 2) {
        ctx.fillStyle = "#c9a86a";
        for (let x = 70; x < w; x += 150) {
            ctx.fillRect(x, h * 0.18, 95, 22);
            ctx.fillRect(x + 10, h * 0.23, 75, h * 0.50);
        }
    } else if (area === 3) {
        ctx.fillStyle = "#d5a45a";
        for (let x = 60; x < w; x += 190) {
            ctx.beginPath();
            ctx.moveTo(x, h * 0.58);
            ctx.lineTo(x + 70, h * 0.40);
            ctx.lineTo(x + 140, h * 0.58);
            ctx.closePath();
            ctx.fill();
        }
    } else {
        ctx.fillStyle = "#78a85a";
        for (let x = 30; x < w; x += 110) {
            ctx.beginPath();
            ctx.arc(x, h * 0.30, 45, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(x - 6, h * 0.30, 12, h * 0.48);
        }
    }

    ctx.restore();
}

function drawBackground() {

    const area = getCurrentAreaConfig();
    let backgroundImage = null;
    let backgroundLoaded = false;

    if (currentArea === 1) {
        backgroundImage = templeImage;
        backgroundLoaded = imageLoaded;
    } else if (currentArea === 2) {
        backgroundImage = libraryImage;
        backgroundLoaded = libraryImageLoaded;
    } else if (currentArea === 3) {
        backgroundImage = villageImage;
        backgroundLoaded = villageImageLoaded;
    } else if (currentArea === 4) {
        backgroundImage = forestImage;
        backgroundLoaded = forestImageLoaded;
    } else if (currentArea === 5) {
        backgroundImage = templeImage;
        backgroundLoaded = imageLoaded;
    }

    if (!backgroundLoaded) {
        drawProceduralAreaFallback(currentArea);
    } else {
        const imageRatio = backgroundImage.width / backgroundImage.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imageRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imageRatio;
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imageRatio;
            drawX = (canvas.width - drawWidth) / 2;
            drawY = 0;
        }

        ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight);
    }

    const overlaySets = {

        thirukkural: [
            "rgba(15, 8, 4, 0.35)",
            "rgba(10, 7, 4, 0.28)",
            "rgba(7, 12, 6, 0.25)",
            "rgba(2, 10, 5, 0.24)",
            "rgba(12, 4, 20, 0.56)"
        ],

        silappadhigaram: [
            "rgba(52, 20, 8, 0.30)",
            "rgba(45, 12, 8, 0.30)",
            "rgba(35, 10, 8, 0.28)",
            "rgba(20, 8, 4, 0.25)",
            "rgba(48, 12, 8, 0.55)"
        ],

        purananuru: [
            "rgba(30, 20, 8, 0.28)",
            "rgba(20, 16, 8, 0.26)",
            "rgba(10, 18, 8, 0.27)",
            "rgba(18, 12, 5, 0.25)",
            "rgba(35, 20, 8, 0.52)"
        ],

        manimegalai: [
            "rgba(20, 12, 35, 0.28)",
            "rgba(12, 18, 35, 0.25)",
            "rgba(8, 25, 22, 0.25)",
            "rgba(10, 28, 20, 0.25)",
            "rgba(30, 10, 45, 0.55)"
        ]
    };

    const overlays =
        overlaySets[selectedLiterature] ||
        overlaySets.thirukkural;

    ctx.fillStyle = overlays[currentArea - 1] || overlays[0];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (currentArea === 5) {
        const glow = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.55, 20, canvas.width / 2, canvas.height * 0.55, canvas.width * 0.62);
        glow.addColorStop(0, "rgba(125, 76, 255, 0.20)");
        glow.addColorStop(0.55, "rgba(80, 35, 120, 0.08)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0.40)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (!guardianBattleOpen) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "rgba(245, 213, 138, 0.94)";
        ctx.font = "bold 14px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
        ctx.fillText(
            area.tamilName + " • " + area.englishName.toUpperCase(),
            canvas.width / 2,
            38
        );
        ctx.restore();
    }
}


// ==========================================
// DRAW PLAYER
// ==========================================

function drawPlayer() {

    ctx.save();


    // ======================================
    // PLAYER SHADOW
    // ======================================

    ctx.beginPath();


    ctx.ellipse(

        player.x +
        player.width / 2,

        player.y +
        player.height - 3,

        player.width / 2,

        9,

        0,

        0,

        Math.PI * 2

    );


    ctx.fillStyle =
        "rgba(0, 0, 0, 0.55)";


    ctx.fill();


    // ======================================
    // SELECT CURRENT SPRITE
    // ======================================

    let currentSprite;

    if (!isMoving) {

        // We currently have idle sprites only for
        // the four cardinal directions.
        let idleDirection =
            playerDirection;

        if (idleDirection === "northEast") {
            idleDirection = "north";
        }

        if (idleDirection === "northWest") {
            idleDirection = "north";
        }

        if (idleDirection === "southEast") {
            idleDirection = "south";
        }

        if (idleDirection === "southWest") {
            idleDirection = "south";
        }

        currentSprite =
            playerSprites[idleDirection];

    } else {

        // Walking: use the current frame of the
        // selected 8-direction animation.
        currentSprite =
            playerAnimations[playerDirection][currentFrame];
    }

    // ======================================
    // DRAW PLAYER SPRITE
    // ======================================

    if (
        currentSprite &&
        currentSprite.complete &&
        currentSprite.naturalWidth > 0
    ) {

        const spriteWidth = 100;
        const spriteHeight = 100;

        // Keep pixel art sharp.
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            currentSprite,

            player.x +
            player.width / 2 -
            spriteWidth / 2,

            player.y +
            player.height -
            spriteHeight +
            10,

            spriteWidth,
            spriteHeight
        );

    } else {

        // ==================================
        // FALLBACK CHARACTER
        // ==================================

        ctx.fillStyle = player.color;

        ctx.fillRect(
            player.x + 8,
            player.y + 20,
            player.width - 16,
            player.height - 20
        );

        // Head
        ctx.beginPath();

        ctx.arc(
            player.x +
            player.width / 2,
            player.y + 13,
            12,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#c58b65";
        ctx.fill();

        // Hair
        ctx.beginPath();

        ctx.arc(
            player.x +
            player.width / 2,
            player.y + 9,
            12,
            Math.PI,
            Math.PI * 2
        );

        ctx.fillStyle = "#24140e";
        ctx.fill();
    }

    ctx.restore();
}



// ==========================================
// STAGE 10.1 — DRAW SAGE
// ==========================================

function drawSage() {

    if (!sageSpriteLoaded) {

        return;

    }


    ctx.save();


    // ======================================
    // SAGE SHADOW
    // ======================================

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.35)";

    ctx.beginPath();

    ctx.ellipse(
        sage.x + sage.width / 2,
        sage.y + sage.height * 0.90,
        sage.width * 0.32,
        sage.height * 0.10,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // ======================================
    // SAGE SPRITE
    // ======================================

    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
        sageSprite,
        sage.x,
        sage.y,
        sage.width,
        sage.height
    );


    ctx.restore();

}


// ==========================================
// STAGE 12 + 14 — DRAW 2D KNOWLEDGE GUARDIAN
// ==========================================
function drawGuardian() {

    if (finalBossVisible) {
        drawFinalBoss();
        return;
    }

    if (!guardianVisible || guardianDefeated) return;

    ctx.save();

    const cx = guardian.x + guardian.width / 2;
    const baseY = guardian.y + guardian.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.beginPath();
    ctx.ellipse(cx, baseY - 5, guardian.width * 0.38, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    if (guardianSpriteLoaded) {
        const drawWidth = guardian.width * 1.15;
        const drawHeight = guardian.height * 1.15;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            guardianSprite,
            cx - drawWidth / 2,
            baseY - drawHeight + 8,
            drawWidth,
            drawHeight
        );
    } else {
        // Temporary 2D fallback until Guardian.png is added.
        ctx.fillStyle = "#1b1110";
        ctx.beginPath();
        ctx.moveTo(cx - 38, guardian.y + 48);
        ctx.lineTo(cx - 48, baseY - 8);
        ctx.lineTo(cx + 48, baseY - 8);
        ctx.lineTo(cx + 38, guardian.y + 48);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#d9a441";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#704c38";
        ctx.beginPath();
        ctx.arc(cx, guardian.y + 38, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#0e0908";
        ctx.beginPath();
        ctx.arc(cx, guardian.y + 31, 30, Math.PI, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#f5d58a";
        ctx.fillRect(cx - 13, guardian.y + 35, 8, 4);
        ctx.fillRect(cx + 5, guardian.y + 35, 8, 4);

        ctx.strokeStyle = "#8b6a42";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(guardian.x + guardian.width - 10, guardian.y + 22);
        ctx.lineTo(guardian.x + guardian.width - 10, baseY - 4);
        ctx.stroke();

        ctx.strokeStyle = "#d9a441";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(guardian.x + guardian.width - 10, guardian.y + 15, 9, 0, Math.PI * 2);
        ctx.stroke();
    }

    const stageConfig = getCurrentGuardianStage();
    const plateWidth = Math.min(
        330,
        Math.max(235, guardian.width * 2.7)
    );
    const plateHeight = 48;
    const plateX = cx - plateWidth / 2;
    const plateY = guardian.y - 58;

    drawRoundedPanel(
        plateX, plateY, plateWidth, plateHeight, 10,
        "rgba(20, 10, 5, 0.94)",
        "rgba(217, 164, 65, 0.95)", 2
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 14px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        stageConfig.tamilName + " • STAGE " + guardianEncounter,
        cx,
        plateY + 18
    );

    ctx.fillStyle = "#bdb4a6";
    ctx.font = "italic 10px Arial, sans-serif";
    ctx.fillText(
        "[ " + stageConfig.englishName + " ]",
        cx,
        plateY + 36
    );

    ctx.restore();
}


// ==========================================
// FINAL BOSS — MAIN VILLAIN DRAWING
// ==========================================
function drawFinalBoss() {

    if (!finalBossVisible) return;

    ctx.save();

    const cx = finalBoss.x + finalBoss.width / 2;
    const baseY = finalBoss.y + finalBoss.height;

    // Large shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.68)";
    ctx.beginPath();
    ctx.ellipse(cx, baseY - 4, finalBoss.width * 0.43, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    if (finalBossSpriteLoaded) {
        const drawWidth = finalBoss.width * 1.18;
        const drawHeight = finalBoss.height * 1.18;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            finalBossSprite,
            cx - drawWidth / 2,
            baseY - drawHeight + 8,
            drawWidth,
            drawHeight
        );
    } else {
        // Dark armored villain fallback
        ctx.fillStyle = "#120d18";
        ctx.beginPath();
        ctx.moveTo(cx - 55, finalBoss.y + 62);
        ctx.lineTo(cx - 67, baseY - 8);
        ctx.lineTo(cx + 67, baseY - 8);
        ctx.lineTo(cx + 55, finalBoss.y + 62);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#7d4cff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Head
        ctx.fillStyle = "#5c3b4f";
        ctx.beginPath();
        ctx.arc(cx, finalBoss.y + 45, 30, 0, Math.PI * 2);
        ctx.fill();

        // Crown / horns
        ctx.fillStyle = "#17101e";
        ctx.beginPath();
        ctx.moveTo(cx - 31, finalBoss.y + 30);
        ctx.lineTo(cx - 45, finalBoss.y + 4);
        ctx.lineTo(cx - 20, finalBoss.y + 20);
        ctx.lineTo(cx, finalBoss.y - 2);
        ctx.lineTo(cx + 20, finalBoss.y + 20);
        ctx.lineTo(cx + 45, finalBoss.y + 4);
        ctx.lineTo(cx + 31, finalBoss.y + 30);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#d9a441";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glowing eyes
        ctx.fillStyle = "#d9a441";
        ctx.fillRect(cx - 17, finalBoss.y + 42, 11, 5);
        ctx.fillRect(cx + 6, finalBoss.y + 42, 11, 5);

        // Staff
        ctx.strokeStyle = "#6e4a32";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(finalBoss.x + finalBoss.width - 12, finalBoss.y + 20);
        ctx.lineTo(finalBoss.x + finalBoss.width - 12, baseY - 3);
        ctx.stroke();

        ctx.strokeStyle = "#7d4cff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(finalBoss.x + finalBoss.width - 12, finalBoss.y + 16, 13, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Villain name plate
    const plateWidth = 315;
    const plateHeight = 54;
    const plateX = cx - plateWidth / 2;
    const plateY = finalBoss.y - 68;

    drawRoundedPanel(
        plateX, plateY, plateWidth, plateHeight, 10,
        "rgba(10, 6, 14, 0.96)",
        "rgba(125, 76, 255, 0.95)", 3
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 17px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText("நிழல் மன்னன்", cx, plateY + 17);

    ctx.fillStyle = "#e4d8ff";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText("THE SHADOW KING • FINAL BOSS", cx, plateY + 38);

    ctx.restore();
}


// ==========================================
// FINAL BOSS — MAIN VILLAIN DRAWING
// ==========================================
function drawFinalBoss() {

    if (!finalBossVisible) return;

    ctx.save();

    const cx = finalBoss.x + finalBoss.width / 2;
    const baseY = finalBoss.y + finalBoss.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.68)";
    ctx.beginPath();
    ctx.ellipse(cx, baseY - 4, finalBoss.width * 0.43, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    if (finalBossSpriteLoaded) {
        const drawWidth = finalBoss.width * 1.18;
        const drawHeight = finalBoss.height * 1.18;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(finalBossSprite, cx - drawWidth / 2, baseY - drawHeight + 8, drawWidth, drawHeight);
    } else {
        // Distinct dark-armored villain fallback.
        ctx.fillStyle = "#120d18";
        ctx.beginPath();
        ctx.moveTo(cx - 55, finalBoss.y + 62);
        ctx.lineTo(cx - 67, baseY - 8);
        ctx.lineTo(cx + 67, baseY - 8);
        ctx.lineTo(cx + 55, finalBoss.y + 62);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#7d4cff";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#5c3b4f";
        ctx.beginPath();
        ctx.arc(cx, finalBoss.y + 45, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#17101e";
        ctx.beginPath();
        ctx.moveTo(cx - 31, finalBoss.y + 30);
        ctx.lineTo(cx - 45, finalBoss.y + 4);
        ctx.lineTo(cx - 20, finalBoss.y + 20);
        ctx.lineTo(cx, finalBoss.y - 2);
        ctx.lineTo(cx + 20, finalBoss.y + 20);
        ctx.lineTo(cx + 45, finalBoss.y + 4);
        ctx.lineTo(cx + 31, finalBoss.y + 30);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#d9a441";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#d9a441";
        ctx.fillRect(cx - 17, finalBoss.y + 42, 11, 5);
        ctx.fillRect(cx + 6, finalBoss.y + 42, 11, 5);

        ctx.strokeStyle = "#6e4a32";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(finalBoss.x + finalBoss.width - 12, finalBoss.y + 20);
        ctx.lineTo(finalBoss.x + finalBoss.width - 12, baseY - 3);
        ctx.stroke();

        ctx.strokeStyle = "#7d4cff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(finalBoss.x + finalBoss.width - 12, finalBoss.y + 16, 13, 0, Math.PI * 2);
        ctx.stroke();
    }

    const plateWidth = 315;
    const plateHeight = 54;
    const plateX = cx - plateWidth / 2;
    const plateY = finalBoss.y - 68;

    drawRoundedPanel(plateX, plateY, plateWidth, plateHeight, 10, "rgba(10, 6, 14, 0.96)", "rgba(125, 76, 255, 0.95)", 3);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 17px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText("நிழல் மன்னன்", cx, plateY + 17);

    ctx.fillStyle = "#e4d8ff";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText("THE SHADOW KING • FINAL BOSS", cx, plateY + 38);

    ctx.restore();
}


// ==========================================
// STAGE 12 — GUARDIAN INTERACTION PROMPT
// ==========================================

function drawGuardianInteractionPrompt() {

    if (
        ((!guardianVisible || guardianDefeated) && !finalBossVisible) ||
        guardianBattleOpen ||
        !playerNearGuardian
    ) {
        return;
    }

    ctx.save();

    const promptWidth = 320;
    const promptHeight = 44;

    const promptX =
        player.x +
        player.width / 2 -
        promptWidth / 2;

    const promptY =
        player.y - 62;

    ctx.fillStyle = "rgba(20, 10, 5, 0.92)";
    ctx.fillRect(
        promptX,
        promptY,
        promptWidth,
        promptHeight
    );

    ctx.strokeStyle = "#d9a441";
    ctx.lineWidth = 2;
    ctx.strokeRect(
        promptX,
        promptY,
        promptWidth,
        promptHeight
    );

    ctx.fillStyle = "#f5e6c8";
    ctx.font =
        "bold 16px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        playerHP <= 0
            ? "E — மீண்டும் போராடு"
            : finalBossVisible
                ? "E — இறுதி போரில் நுழையவும்"
                : "E — காவலரின் சோதனையைத் தொடங்கு",
        player.x + player.width / 2,
        promptY + promptHeight / 2
    );

    ctx.restore();
}



// ==========================================
// DRAW ANCIENT INSCRIPTION
// ==========================================

function drawInscription() {

    ctx.save();


    // Stone body

    ctx.fillStyle =
        inscription.color;


    ctx.fillRect(

        inscription.x,
        inscription.y,

        inscription.width,
        inscription.height

    );


    // Stone border

    ctx.strokeStyle =
        "#d6b879";


    ctx.lineWidth = 3;


    ctx.strokeRect(

        inscription.x,
        inscription.y,

        inscription.width,
        inscription.height

    );


    // Ancient markings

    ctx.fillStyle =
        "#3d2a1b";


    ctx.font =
        "18px Georgia";


    ctx.textAlign =
        "center";


    ctx.fillText(

        "குறள்",

        inscription.x +
        inscription.width / 2,

        inscription.y + 32

    );


    ctx.fillText(

        "☰",

        inscription.x +
        inscription.width / 2,

        inscription.y + 58

    );


    ctx.restore();

}


// ==========================================
// DRAW INTERACTION PROMPT
// ==========================================

function drawInteractionPrompt() {

    if (

        !playerNearInscription ||
        showInteractionMessage ||
        showSageDialogue ||
        showQuestOffer ||
        questAccepted

    ) {

        return;

    }


    ctx.save();


    const promptWidth = 220;

    const promptHeight = 42;


    const promptX =

        player.x +
        player.width / 2 -
        promptWidth / 2;


    const promptY =

        player.y - 55;


    // Background

    ctx.fillStyle =
        "rgba(20, 10, 5, 0.88)";


    ctx.fillRect(

        promptX,
        promptY,

        promptWidth,
        promptHeight

    );


    // Border

    ctx.strokeStyle =
        "#d9a441";


    ctx.lineWidth = 2;


    ctx.strokeRect(

        promptX,
        promptY,

        promptWidth,
        promptHeight

    );


    // Text

    ctx.fillStyle =
        "#f5e6c8";


    ctx.font =
        "bold 17px Georgia";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(

        interactionPrompt,

        player.x +
        player.width / 2,

        promptY +
        promptHeight / 2

    );


    ctx.restore();

}


// ==========================================
// STAGE 10.4 — DRAW SAGE INTERACTION PROMPT
// ==========================================
// Shows a separate prompt when the player is
// within Sage's interaction distance.
// ==========================================

function drawSageInteractionPrompt() {

    // Do not show the Sage interaction prompt while
    // the Sage dialogue box is already open.
    if (
        !playerNearSage ||
        questAccepted ||
        showSageDialogue ||
        showQuestOffer ||
        showQuestAcceptedNotification
    ) {
        return;
    }

    // If the ancient inscription dialogue is open,
    // don't show the Sage prompt at the same time.
    if (showInteractionMessage) {
        return;
    }

    ctx.save();

    const promptWidth = 280;
    const promptHeight = 42;

    const promptX =
        player.x +
        player.width / 2 -
        promptWidth / 2;

    const promptY =
        player.y - 55;

    // Background
    ctx.fillStyle =
        "rgba(20, 10, 5, 0.88)";

    ctx.fillRect(
        promptX,
        promptY,
        promptWidth,
        promptHeight
    );

    // Border
    ctx.strokeStyle =
        "#d9a441";

    ctx.lineWidth = 2;

    ctx.strokeRect(
        promptX,
        promptY,
        promptWidth,
        promptHeight
    );

    // Text
    ctx.fillStyle =
        "#f5e6c8";

    ctx.font =
        "bold 17px Georgia";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillText(
        sageInteractionPrompt,
        player.x +
        player.width / 2,
        promptY +
        promptHeight / 2
    );

    ctx.restore();
}


// ==========================================

// ==========================================
// DRAW INTERACTION MESSAGE
// ==========================================

function drawInteractionMessage() {

    if (!showInteractionMessage) {

        return;

    }


    const boxWidth =

        Math.min(

            520,

            canvas.width - 40

        );


    const boxHeight = 150;


    const boxX =

        canvas.width / 2 -
        boxWidth / 2;


    const boxY =

        canvas.height - 210;


    ctx.save();


    // Background

    ctx.fillStyle =
        "rgba(20, 10, 5, 0.92)";


    ctx.fillRect(

        boxX,
        boxY,

        boxWidth,
        boxHeight

    );


    // Border

    ctx.strokeStyle =
        "#d9a441";


    ctx.lineWidth = 2;


    ctx.strokeRect(

        boxX,
        boxY,

        boxWidth,
        boxHeight

    );


    // Heading

    ctx.fillStyle =
        "#f5d58a";


    ctx.font =
        "bold 20px Georgia";


    ctx.textAlign =
        "center";


    ctx.fillText(

        "Ancient Inscription",

        canvas.width / 2,

        boxY + 35

    );


    // Dialogue

    ctx.fillStyle =
        "#f5e6c8";


    ctx.font =
        "17px Georgia";


    ctx.fillText(

        "An ancient verse is carved into the stone.",

        canvas.width / 2,

        boxY + 75

    );


    ctx.fillText(

        "Its words seem to hold a forgotten challenge...",

        canvas.width / 2,

        boxY + 105

    );


    // Continue

    ctx.fillStyle =
        "#d9a441";


    ctx.font =
        "14px Georgia";


    ctx.fillText(

        "Press E to continue",

        canvas.width / 2,

        boxY + 132

    );


    ctx.restore();

}


// ==========================================
// STAGE 10.8 — DRAW QUEST ACCEPTED NOTIFICATION
// ==========================================

function drawQuestAcceptedNotification() {

    if (!showQuestAcceptedNotification) {
        return;
    }

    // Keep the notification visible for about 3 seconds.
    questNotificationTimer++;

    if (questNotificationTimer >= 180) {
        showQuestAcceptedNotification = false;
        questNotificationTimer = 0;
        return;
    }

    ctx.save();

    const boxWidth =
        Math.min(
            620,
            canvas.width - 60
        );

    const boxHeight = 150;

    const boxX =
        canvas.width / 2 -
        boxWidth / 2;

    const boxY = 70;

    // Background
    ctx.fillStyle =
        "rgba(20, 10, 5, 0.96)";

    ctx.fillRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );

    // Border
    ctx.strokeStyle =
        "#d9a441";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );

    // Heading
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle =
        "#d9a441";

    ctx.font =
        "bold 23px Arial, sans-serif";

    ctx.fillText(
        "QUEST ACCEPTED",
        canvas.width / 2,
        boxY + 35
    );

    // Tamil quest title
    ctx.fillStyle =
        "#f5d58a";

    ctx.font =
        "bold 21px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        activeQuest.title,
        canvas.width / 2,
        boxY + 72
    );

    // English title
    ctx.fillStyle =
        "#d8d0c0";

    ctx.font =
        "italic 14px Arial, sans-serif";

    ctx.fillText(
        "[ " +
        activeQuest.englishTitle +
        " ]",
        canvas.width / 2,
        boxY + 98
    );

    // Objective
    ctx.fillStyle =
        "#f5e6c8";

    ctx.font =
        "16px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        "📜 " + activeQuest.objective,
        canvas.width / 2,
        boxY + 128
    );

    ctx.restore();
}



// ==========================================
// STAGE 14 — POLISHED RPG HUD
// ==========================================

function drawRoundedPanel(x, y, width, height, radius, fill, stroke, lineWidth = 1) {

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = fill;
    ctx.fill();

    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}


function drawRPGStatHUD() {

    // The Active Quest HUD is no longer relevant after the
    // Shadow King is defeated and the quest is completed.
    // Keep the completion banner visible without the old
    // ACTIVE QUEST card remaining behind it.
    if (!showActiveQuestHUD || questCompleted) {
        return;
    }

    ctx.save();

    // ==========================================================
    // CLEAN HUD LAYOUT
    // The HUD occupies the top strip. The battle window starts
    // below it, so the two layers can never overlap.
    // ==========================================================

    const margin = Math.max(18, Math.min(28, canvas.width * 0.018));
    const hudGap = 12;

    // Keep both HUD cards inside a safe area even on smaller windows.
    const hudWidth = Math.min(320, Math.max(270, canvas.width * 0.30));
    const hudHeight = 154;

    // -----------------------------
    // LEFT — ACTIVE QUEST
    // -----------------------------
    // Hide the Active Quest card during cinematic/interaction moments.
    // Original vertical character positioning is preserved.
    const hideQuestCard =
        showSageDialogue ||
        showQuestOffer ||
        showQuestAcceptedNotification ||
        playerNearGuardian ||
        guardianBattleOpen ||
        showRewardScreen ||
        showAreaTransition ||
        questCompleted;

    const questX = margin;
    const questY = margin;

    if (!hideQuestCard) {

    drawRoundedPanel(
        questX,
        questY,
        hudWidth,
        hudHeight,
        14,
        "rgba(18, 10, 6, 0.985)",
        "rgba(217, 164, 65, 0.95)",
        2
    );

    ctx.fillStyle = "#d9a441";
    ctx.fillRect(
        questX,
        questY + 12,
        4,
        hudHeight - 24
    );

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText(
        "📜  ACTIVE QUEST",
        questX + 16,
        questY + 23
    );

    ctx.fillStyle = "#f5d58a";
    ctx.font =
        "bold 16px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        activeQuest.title,
        questX + 16,
        questY + 48
    );

    ctx.fillStyle = "#cfc6b5";
    ctx.font = "italic 10px Arial, sans-serif";
    ctx.fillText(
        "[ " + activeQuest.englishTitle + " ]",
        questX + 16,
        questY + 65
    );

    ctx.fillStyle = "#f5e6c8";
    const objective = guardianBattleOpen
        ? "காவலரின் கேள்விக்கு பதிலளி"
        : activeQuest.objective;

    // Wrap the Tamil objective instead of allowing it to run outside
    // the card and clip at the left/right edge.
    const objectiveLines = drawWrappedCanvasText(
        "▶ " + objective,
        questX + hudWidth / 2,
        questY + 76,
        hudWidth - 32,
        16,
        "#f5e6c8",
        "12px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif",
        2
    );

    const englishObjective = guardianBattleOpen
        ? "[ Answer the Guardian's question ]"
        : "[ " + activeQuest.englishObjective + " ]";

    const englishY = questY + 78 + objectiveLines * 16;
    drawWrappedCanvasText(
        englishObjective,
        questX + hudWidth / 2,
        englishY,
        hudWidth - 32,
        13,
        "#bdb4a6",
        "italic 10px Arial, sans-serif",
        2
    );

    ctx.textAlign = "left";
    ctx.fillStyle = guardianDefeated
        ? "#7ee787"
        : guardianBattleOpen
            ? "#f5d58a"
            : "#d9a441";

    ctx.font = "bold 10px Arial, sans-serif";
    ctx.fillText(
        guardianDefeated
            ? "✓ PATH UNLOCKED"
            : guardianBattleOpen
                ? "⚔ GUARDIAN TRIAL ACTIVE"
                : "◆ REACH THE GUARDIAN",
        questX + 16,
        questY + hudHeight - 14
    );

    } // end Active Quest card visibility block

    // -----------------------------
    // RIGHT — PLAYER STATUS
    // -----------------------------

    const statsX =
        canvas.width - hudWidth - margin;
    const statsY = margin;

    drawRoundedPanel(
        statsX,
        statsY,
        hudWidth,
        hudHeight,
        14,
        "rgba(18, 10, 6, 0.985)",
        "rgba(217, 164, 65, 0.95)",
        2
    );

    ctx.textAlign = "left";
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText(
        "⚔  ADVENTURER STATUS",
        statsX + 16,
        statsY + 23
    );

    // HP label + value
    ctx.fillStyle = "#f5e6c8";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText(
        "❤️  VITALITY",
        statsX + 16,
        statsY + 47
    );

    ctx.textAlign = "right";
    ctx.fillText(
        playerHP + " / " + maxPlayerHP,
        statsX + hudWidth - 16,
        statsY + 47
    );

    // HP bar
    const hpX = statsX + 16;
    const hpY = statsY + 56;
    const hpWidth = hudWidth - 32;
    const hpHeight = 14;

    drawRoundedPanel(
        hpX,
        hpY,
        hpWidth,
        hpHeight,
        7,
        "rgba(255,255,255,0.10)",
        "rgba(255,255,255,0.18)",
        1
    );

    const hpRatio = Math.max(
        0,
        Math.min(1, playerHP / maxPlayerHP)
    );

    const hpFill =
        hpRatio > 0.60
            ? "#49d17d"
            : hpRatio > 0.30
                ? "#e8b84b"
                : "#ef5b5b";

    if (hpRatio > 0) {
        drawRoundedPanel(
            hpX,
            hpY,
            hpWidth * hpRatio,
            hpHeight,
            7,
            hpFill,
            null
        );
    }

    // Stat cards
    const cardY = statsY + 82;
    const cardGap = 10;
    const cardWidth =
        (hudWidth - 32 - cardGap) / 2;
    const cardHeight = 43;

    const cards = [
        {
            x: statsX + 16,
            label: "⭐ XP",
            value: String(playerXP)
        },
        {
            x: statsX + 16 + cardWidth + cardGap,
            label: "⚔ LEVEL",
            value: String(playerDifficulty).toUpperCase()
        }
    ];

    for (const card of cards) {

        drawRoundedPanel(
            card.x,
            cardY,
            cardWidth,
            cardHeight,
            8,
            "rgba(48, 25, 14, 0.99)",
            "rgba(217, 164, 65, 0.55)",
            1
        );

        ctx.textAlign = "center";
        ctx.fillStyle = "#bdb4a6";
        ctx.font = "bold 8px Arial, sans-serif";
        ctx.fillText(
            card.label,
            card.x + cardWidth / 2,
            cardY + 14
        );

        ctx.fillStyle = "#f5d58a";
        ctx.font = "bold 12px Arial, sans-serif";
        ctx.fillText(
            card.value,
            card.x + cardWidth / 2,
            cardY + 32
        );
    }

    ctx.restore();
}

// Keep the old function name so the rest of the game remains compatible.
function drawActiveQuestHUD() {
    drawRPGStatHUD();
}

// ==========================================
// STAGE 13 — LOAD GUARDIAN QUESTION
// ==========================================

async function loadGuardianQuestion() {

    guardianQuestionLoading = true;
    guardianQuestion = null;
    guardianSelectedAnswer = -1;
    guardianResult = "";
    guardianOptions = [];

    try {

        // ==========================================
        // THIRUKKURAL — KEEP THE EXISTING CURATED
        // FIVE-QUESTION SYSTEM EXACTLY AS IT IS.
        // ==========================================

        if (selectedLiterature === "thirukkural") {

            const curatedIndex =
                guardianEncounter - 1;

            guardianQuestion =
                JSON.parse(
                    JSON.stringify(
                        uniqueThirukkuralQuestions[
                            curatedIndex
                        ]
                    )
                );

            console.log(
                "📜 Thirukkural stage question:",
                guardianEncounter,
                guardianQuestion.id
            );

        }

        // ==========================================
        // OTHER LITERATURES — FIVE STAGE QUESTIONS
        // ==========================================
        // The first five questions of each supplied
        // literature dataset are used in order:
        //
        // Stage 1 -> 001
        // Stage 2 -> 002
        // Stage 3 -> 003
        // Stage 4 -> 004
        // Stage 5 -> 005
        //
        // This prevents repeats and guarantees exactly
        // one question per RPG stage.
        // ==========================================

        else {

            const stageIndex =
                Math.max(
                    0,
                    Math.min(
                        guardianEncounter - 1,
                        4
                    )
                );

            const questionId =
                selectedLiterature +
                "_" +
                String(
                    stageIndex + 1
                ).padStart(3, "0");

            const curated =
                literatureStageQuestionData[
                    questionId
                ];

            if (!curated) {
                throw new Error(
                    "No curated stage question found for " +
                    questionId
                );
            }

            guardianQuestion =
                JSON.parse(
                    JSON.stringify(
                        curated
                    )
                );

            guardianQuestion =
                applyLiteratureBilingualFallbacks(
                    guardianQuestion
                );

            console.log(
                "📚 Literature stage question:",
                questionId
            );
        }

        guardianOptions =
            guardianQuestion.options ||
            guardianQuestion.choices ||
            guardianQuestion.answers ||
            [];

        playerDifficulty =
            guardianQuestion.difficulty ||
            guardianQuestion.level ||
            "easy";

        if (!guardianOptions.length) {
            throw new Error(
                "The quest has no answer options."
            );
        }

        const stageConfig =
            getCurrentGuardianStage();

        activeQuest.objective =
            stageConfig.isFinalBoss
                ? activeLiteratureProfile.questTitleTa
                : stageConfig.objectiveTa;

        activeQuest.englishObjective =
            stageConfig.isFinalBoss
                ? activeLiteratureProfile.questTitleEn
                : stageConfig.objectiveEn;

    } catch (error) {

        console.error(
            "❌ Guardian question loading failed:",
            error
        );

        // Safe fallback: never break the existing
        // Thirukkural gameplay if a new dataset fails.
        guardianQuestion =
            selectedLiterature === "thirukkural"
                ? uniqueThirukkuralQuestions[
                    Math.max(
                        0,
                        Math.min(
                            guardianEncounter - 1,
                            4
                        )
                    )
                ]
                : uniqueThirukkuralQuestions[
                    Math.max(
                        0,
                        Math.min(
                            guardianEncounter - 1,
                            4
                        )
                    )
                ];

        guardianOptions =
            guardianQuestion.options.slice();

        playerDifficulty =
            guardianQuestion.difficulty ||
            "easy";

        guardianResult =
            "⚠️ Demo question loaded";

    } finally {

        guardianQuestionLoading = false;

    }
}


// ==========================================
// STAGE 15 — AREA 2 TRANSITION
// ==========================================
let showAreaTransition = false;
let areaTransitionTimer = 0;

function enterNextArea() {

    const nextArea = getCurrentAreaConfig().nextArea;
    if (!nextArea) return;

    currentArea = nextArea;
    guardianEncounter = currentArea;
    playerNearAreaGate = false;

    player.x = canvas.width / 2 - player.width / 2;
    player.y = Math.max(90, canvas.height * 0.16);
    playerDirection = "south";
    currentFrame = 0;
    animationTimer = 0;

    const stageConfig = getCurrentGuardianStage();
    guardian.name = stageConfig.englishName;
    guardianVisible = !stageConfig.isFinalBoss;
    finalBossVisible = !!stageConfig.isFinalBoss;
    finalBoss.name = stageConfig.englishName;
    guardianDefeated = false;
    guardianBattleOpen = false;
    guardianSelectedAnswer = -1;
    guardianResult = "";
    guardianQuestion = null;
    guardianOptions = [];
    nextGuardianPending = false;
    nextGuardianTimer = 0;
    finalGuardianCompleted = false;

    activeQuest.title = stageConfig.tamilName;
    activeQuest.englishTitle = stageConfig.englishName;
    activeQuest.objective = stageConfig.objectiveTa;
    activeQuest.englishObjective = stageConfig.objectiveEn;

    positionGuardianOnWorldFloor();
    positionFinalBossOnWorldFloor();

    // ⚔️ Every new stage gets the same spawn effect.
    // Stage 5 uses the Shadow King target automatically.
    triggerGuardianSpawnEffect(stageConfig.isFinalBoss);

    showAreaTransition = true;
    areaTransitionTimer = 0;
    playerNearAreaGate = false;
    playerNearGuardian = false;
    updateCollisionBoundaries();
}

// ==========================================
// STAGES 16–18 — ACTIVATE NEXT GUARDIAN
// ==========================================
function activateNextGuardian() {

    if (!nextGuardianPending) return;

    nextGuardianPending = false;
    nextGuardianTimer = 0;
    guardianEncounter++;

    const stageConfig = getCurrentGuardianStage();
    guardian.name = stageConfig.englishName;
    guardianVisible = !stageConfig.isFinalBoss;
    finalBossVisible = !!stageConfig.isFinalBoss;
    finalBoss.name = stageConfig.englishName;
    guardianDefeated = false;
    guardianBattleOpen = false;
    guardianQuestionLoading = false;
    guardianQuestion = null;
    guardianSelectedAnswer = -1;
    guardianResult = "";
    guardianOptions = [];

    activeQuest.title = stageConfig.tamilName;
    activeQuest.englishTitle = stageConfig.englishName;
    activeQuest.objective = stageConfig.objectiveTa;
    activeQuest.englishObjective = stageConfig.objectiveEn;

    positionGuardianOnWorldFloor();
    positionFinalBossOnWorldFloor();

    // ⚔️ Keep the effect consistent even if this activation path
    // is used by a future stage-transition change.
    triggerGuardianSpawnEffect(stageConfig.isFinalBoss);

    updateCollisionBoundaries();
    showGuardianVictoryNotification = false;
    guardianVictoryTimer = 0;
}

// ==========================================
// STAGE 13 — START GUARDIAN BATTLE
// ==========================================

function startGuardianBattle() {

    if (
        (guardianDefeated && !finalBossVisible) ||
        guardianBattleOpen
    ) {
        return;
    }

    questStarted = true;
    guardianBattleOpen = true;
    showQuestAcceptedNotification = false;

    guardianResult = "";
    guardianSelectedAnswer = -1;

    const stageConfig =
        getCurrentGuardianStage();

    activeQuest.objective =
        stageConfig.isFinalBoss
            ? activeLiteratureProfile.questQuestionTa
            : stageConfig.objectiveTa;

    activeQuest.englishObjective =
        stageConfig.isFinalBoss
            ? activeLiteratureProfile.questQuestionEn
            : stageConfig.objectiveEn;

    console.log(
        "⚔️ Guardian battle started"
    );

    loadGuardianQuestion();
}


// ==========================================
// STAGE 13 — ANSWER CHECK
// ==========================================

function guardianAnswerIsCorrect(index) {

    if (!guardianQuestion) {
        return false;
    }

    const correctAnswer =
        guardianQuestion.correct_answer ??
        guardianQuestion.correctAnswer ??
        guardianQuestion.answer ??
        guardianQuestion.correct_option ??
        guardianQuestion.correctOption ??
        guardianQuestion.correct_index ??
        guardianQuestion.correctIndex;

    if (typeof correctAnswer === "number") {
        return index === correctAnswer;
    }

    if (
        typeof correctAnswer === "string" &&
        /^\d+$/.test(correctAnswer.trim())
    ) {
        return index === Number(
            correctAnswer.trim()
        );
    }

    if (typeof correctAnswer === "string") {

        return (
            String(
                guardianOptions[index]
            ).trim() ===
            correctAnswer.trim()
        );

    }

    return false;
}


// ==========================================
// STAGE 13 — BACKEND RESULT
// ==========================================

async function sendGuardianResultToBackend(
    wasCorrect
) {

    if (!guardianQuestion) {
        return null;
    }

    const questId =
        guardianQuestion.id ||
        guardianQuestion.quest_id ||
        guardianQuestion.questId;

    if (!questId) {
        return null;
    }

    try {

        const response = await fetch(
            "/answer",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    "Accept":
                        "application/json"
                },
                body: JSON.stringify({
                    quest_id: String(questId),
                    was_correct: Boolean(wasCorrect)
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                "Answer request failed: " +
                response.status
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "⚠️ Backend result update failed:",
            error
        );

        return null;
    }
}


// ==========================================
// STAGE 13 — DIFFICULTY
// ==========================================

function getGuardianDamage() {

    const difficulty =
        String(
            playerDifficulty
        ).toLowerCase();

    if (difficulty === "hard") {
        return guardianCombat.damageHard;
    }

    if (difficulty === "medium") {
        return guardianCombat.damageMedium;
    }

    return guardianCombat.damageEasy;
}


function getGuardianReward() {

    const difficulty =
        String(
            playerDifficulty
        ).toLowerCase();

    if (difficulty === "hard") {
        return guardianCombat.rewardHard;
    }

    if (difficulty === "medium") {
        return guardianCombat.rewardMedium;
    }

    return guardianCombat.rewardEasy;
}


// ==========================================
// STAGE 13 — SUBMIT ANSWER
// ==========================================

async function submitGuardianAnswer() {

    if (
        !guardianBattleOpen ||
        guardianSelectedAnswer < 0 ||
        guardianQuestionLoading
    ) {
        return;
    }

    const selectedIndex =
        guardianSelectedAnswer;

    const wasCorrect =
        guardianAnswerIsCorrect(
            selectedIndex
        );

    const backendData =
        await sendGuardianResultToBackend(
            wasCorrect
        );

    if (backendData) {
        playerDifficulty =
            backendData.difficulty ??
            playerDifficulty;
    }

    if (wasCorrect) {

        const reward = getGuardianReward();
        const isFinalBoss = guardianEncounter === 5 || finalBossVisible;
        const maxHpGain = isFinalBoss ? 20 : 10;
        const hpGain = isFinalBoss ? 50 : 25;
        // ==========================================
        // XP REWARD — EVERY GUARDIAN STAGE
        // ==========================================

        playerXP += reward;

        // Start a fresh visible popup for this stage.
        // This works for Guardians 1–4 and the Shadow King.
        xpPopup =
            "+" + reward + " XP";

        xpPopupTimer =
            XP_POPUP_DURATION;

        maxPlayerHP += maxHpGain;

        playerHP =
            Math.min(
                maxPlayerHP,
                playerHP + hpGain
            );

        // ⭐ Correct-answer feedback + XP popup.
        answerFeedback = "✓ CORRECT!";
        answerFeedbackCorrect = true;
        answerFeedbackTimer =
            ANSWER_FEEDBACK_DURATION;

        playGameTone("correct");

        const defeatedQuestId = String(
            guardianQuestion.id ||
            guardianQuestion.quest_id ||
            guardianQuestion.questId ||
            ""
        );

        if (defeatedQuestId) {
            completedQuestIds.add(defeatedQuestId);
        }

        guardianResult = "✓ CORRECT! THE GUARDIAN YIELDS.";
        guardianDefeated = true;
        guardianBattleOpen = false;
        guardianVisible = false;
        finalBossVisible = false;
        const defeatedStage = guardianEncounter;
        const defeatedGuardian = getCurrentGuardianStage();

        if (defeatedGuardian.isFinalBoss) {
            finalGuardianCompleted = true;
            activeQuest.objective = "இறுதி போர் முடிந்தது — கோயிலின் ரகசியத்தைத் தேடு";
            activeQuest.englishObjective = "Shadow King is defeated — seek the temple's secret";
        } else if (guardianEncounter < 4) {
            if (currentArea === 1) area2Unlocked = true;
            if (currentArea === 2) area3Unlocked = true;
            if (currentArea === 3) area4Unlocked = true;
            activeQuest.objective = "பாதை திறக்கப்பட்டது — அடுத்த பகுதிக்குச் செல்";
            activeQuest.englishObjective = "The path is open — enter the next area";
        } else if (guardianEncounter === 4) {
            // Guardian 4 is the last Guardian. The player must leave
            // Area 4 through its gate to enter Area 5. The Shadow King
            // is then spawned in the Final Wisdom Sanctum.
            activeQuest.objective = "இறுதி மண்டபத்திற்குச் சென்று நிழல் மன்னனை எதிர்கொள்";
            activeQuest.englishObjective = "Enter the Final Wisdom Sanctum and face the Shadow King";
        }

        // Do NOT auto-activate another Guardian here. The next stage
        // is reached only by walking to the area gate and entering it.
        nextGuardianPending = false;
        nextGuardianTimer = 0;

        showGuardianVictoryNotification = false;
        guardianVictoryTimer = 0;
        showRewardScreen = true;
        rewardScreenTimer = 0;
        rewardScreenData.reward = reward;
        rewardScreenData.hpGain = hpGain;
        rewardScreenData.maxHpGain = maxHpGain;
        rewardScreenData.stage = defeatedStage;
        rewardScreenData.tamilName = defeatedGuardian.tamilName;
        rewardScreenData.englishName = defeatedGuardian.englishName;
        rewardScreenData.finalBoss = isFinalBoss;
        nextGuardianPending = false;
        nextGuardianTimer = 0;
        updateCollisionBoundaries();

        console.log(
            "🏆 Guardian defeated:",
            defeatedGuardian.englishName,
            "| Stage:",
            defeatedStage,
            "| Reward:",
            reward,
            "XP"
        );

    } else {

        const damage =
            getGuardianDamage();

        playerHP =
            Math.max(
                0,
                playerHP - damage
            );

        guardianResult =
            "✗ WRONG! HP -" + damage;

        // 💥 Wrong-answer feedback.
        answerFeedback = "✕ WRONG!";
        answerFeedbackCorrect = false;
        answerFeedbackTimer =
            ANSWER_FEEDBACK_DURATION;

        playGameTone("wrong");

        guardianSelectedAnswer = -1;

        if (playerHP <= 0) {

            guardianResult =
                "💀 TRIAL FAILED — E to retry";

            guardianBattleOpen = false;

            console.log(
                "💀 Guardian trial failed."
            );

        } else {

            console.log(
                "⚠️ Wrong answer. HP:",
                playerHP
            );

        }
    }
}



// ==========================================
// STAGE 13 — POLISHED GUARDIAN BATTLE
// ==========================================

function getGuardianEnglishText(keys, fallback = "") {

    if (!guardianQuestion) {
        return fallback;
    }

    for (const key of keys) {
        const value = guardianQuestion[key];

        if (
            typeof value === "string" &&
            value.trim()
        ) {
            return value.trim();
        }
    }

    return fallback;
}

function containsTamil(text) {
    return /[\u0B80-\u0BFF]/.test(String(text || ""));
}

function drawBilingualText(
    tamilText,
    englishText,
    centerX,
    startY,
    maxWidth,
    tamilSize = 17,
    englishSize = 12,
    gap = 7
) {

    if (tamilText) {

        drawWrappedCanvasText(
            tamilText,
            centerX,
            startY,
            maxWidth,
            tamilSize + 7,
            "#f7e4b1",
            `bold ${tamilSize}px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif`
        );
    }

    if (englishText) {

        const tamilLineCount = Math.max(
            1,
            String(tamilText || "")
                .split(/\s+/)
                .reduce(
                    (count, word) => count + (
                        ctx.measureText(word).width > maxWidth
                            ? 1
                            : 0
                    ),
                    0
                )
        );

        // English subtitle is deliberately placed below the Tamil line.
        drawWrappedCanvasText(
            "[ " + englishText + " ]",
            centerX,
            startY + tamilSize + 18 + gap,
            maxWidth,
            englishSize + 5,
            "#bdb4a6",
            `italic ${englishSize}px Arial, sans-serif`
        );
    }
}

function getGuardianTamilText(keys, fallback = "") {

    if (guardianQuestion) {
        for (const key of keys) {
            const value = guardianQuestion[key];
            if (typeof value === "string" && value.trim()) {
                return value.trim();
            }
        }
    }

    return fallback;
}

function getGuardianTamilQuestion(question) {

    const explicitTamil = getGuardianTamilText(
        [
            "tamil_question",
            "question_ta",
            "tamilQuestion",
            "challenge_question_ta"
        ],
        ""
    );

    if (explicitTamil) {
        return explicitTamil;
    }

    // If a literature question came from an older JSON file,
    // recover its Tamil version from the built-in fallback map.
    const questId = String(
        guardianQuestion?.quest_id ||
        guardianQuestion?.id ||
        guardianQuestion?.questId ||
        ""
    );

    const fallback = literatureBilingualFallbacks[questId];

    if (
        fallback &&
        fallback.tamil_question
    ) {
        return fallback.tamil_question;
    }

    const normalized = String(question || "").trim().toLowerCase();

    // Translation for the current fifth-Kural question shown by the
    // generated quest data. Future questions can provide tamil_question.
    if (normalized.includes("according to the fifth kural") &&
        normalized.includes("worthy glory of god")) {
        return "ஐந்தாம் குறளின்படி, இறைவனின் தகுதியான புகழை உண்மையாகப் போற்றியவர்களுக்கு என்ன நிகழும்?";
    }

    return "தமிழில் கேள்வி: சரியான பதிலைத் தேர்ந்தெடுக்கவும்.";
}

function getGuardianOptionEnglish(index, option) {
    if (guardianQuestion && Array.isArray(guardianQuestion.english_options)) {
        return guardianQuestion.english_options[index] || String(option);
    }
    return String(option);
}

function getGuardianOptionTamil(index, option) {

    if (
        guardianQuestion &&
        Array.isArray(guardianQuestion.tamil_options)
    ) {
        return (
            guardianQuestion.tamil_options[index] ||
            String(option)
        );
    }

    const questId = String(
        guardianQuestion?.quest_id ||
        guardianQuestion?.id ||
        guardianQuestion?.questId ||
        ""
    );

    const fallback =
        literatureBilingualFallbacks[questId];

    if (
        fallback &&
        Array.isArray(fallback.tamil_options)
    ) {
        return (
            fallback.tamil_options[index] ||
            String(option)
        );
    }

    return String(option);
}

function getGuardianTamilStory(story) {

    const explicitTamil = getGuardianTamilText(
        [
            "tamil_story",
            "story_ta",
            "tamilStory",
            "scenario_ta",
            "description_ta"
        ],
        ""
    );

    if (explicitTamil) {
        return explicitTamil;
    }

    const questId = String(
        guardianQuestion?.quest_id ||
        guardianQuestion?.id ||
        guardianQuestion?.questId ||
        ""
    );

    const fallback =
        literatureBilingualFallbacks[questId];

    if (
        fallback &&
        fallback.tamil_story
    ) {
        return fallback.tamil_story;
    }

    const normalized = String(story || "").trim().toLowerCase();

    if (normalized.includes("fifth kural") &&
        normalized.includes("sacred chamber")) {
        return "ஐந்தாம் குறளின் புனித அறையின் முன் நீ நிற்கிறாய். பழமையான தமிழ் எழுத்தில் ஒளிரும் கல்வெட்டு உன் பாதையை மறைக்கிறது. இறைவனின் உண்மையான புகழையும் அறச்செயல்களின் தத்துவத்தையும் புரிந்தவர்களே பாதுகாப்பாக கடந்து செல்ல முடியும்.";
    }

    if (finalBossVisible) {
        return "நிழல் மன்னன் உன் பாதையை மறித்து, கோயிலின் அறிவை இருளால் கைப்பற்ற முயல்கிறான். இறுதி போரில் அவனை வீழ்த்தி உண்மையை மீட்டு விடு.";
    }

    if (finalBossVisible) {
        return "நிழல் மன்னன் உன் பாதையை மறித்து, கோயிலின் அறிவை இருளால் கைப்பற்ற முயல்கிறான். இறுதி போரில் அவனை வீழ்த்தி உண்மையை மீட்டு விடு.";
    }

    return "ஞானக் காவலர் உன் பாதையை மறித்து, உன் அறிவைச் சோதிக்கிறார்.";
}


function drawGuardianBattle() {

    if (!guardianBattleOpen) {
        return;
    }

    ctx.save();

    // ==========================================================
    // CLEAN BATTLE LAYOUT
    // HUD occupies the top strip. Battle panel begins below it.
    // Nothing is allowed to draw underneath the HUD.
    // ==========================================================

    const margin = 18;

    const hudWidth = Math.min(300, canvas.width * 0.30);
    const topReserved = 178;

    // Leave enough horizontal space for the two HUD panels.
    const sideSafe = hudWidth + 28;

    let boxX = sideSafe;
    let boxWidth = canvas.width - sideSafe * 2;

    if (boxWidth < 520) {
        boxX = 18;
        boxWidth = canvas.width - 36;
    }

    const boxY = topReserved;
    const boxHeight = Math.max(
        470,
        canvas.height - boxY - margin
    );

    // Very subtle world dimming only outside the battle panel.
    // This does NOT cover the HUD.
    ctx.fillStyle = "rgba(5, 2, 1, 0.10)";
    ctx.fillRect(
        0,
        boxY,
        canvas.width,
        canvas.height - boxY
    );

    // Main battle panel.
    drawRoundedPanel(
        boxX,
        boxY,
        boxWidth,
        boxHeight,
        18,
        "rgba(18, 10, 6, 0.985)",
        "rgba(217, 164, 65, 0.98)",
        3
    );

    drawRoundedPanel(
        boxX + 8,
        boxY + 8,
        boxWidth - 16,
        boxHeight - 16,
        13,
        "rgba(0, 0, 0, 0)",
        "rgba(217, 164, 65, 0.22)",
        1
    );

    const centerX = canvas.width / 2;
    const contentWidth = boxWidth - 72;

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    // ==========================================================
    // HEADER
    // ==========================================================

    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText(
        guardianEncounter === 5 ? "👑  FINAL BOSS BATTLE  👑" : "⚔  KNOWLEDGE TRIAL  ⚔",
        centerX,
        boxY + 27
    );

    const battleStageConfig = getCurrentGuardianStage();

    ctx.fillStyle = "#f7d987";
    ctx.font =
        "bold 22px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        battleStageConfig.tamilName,
        centerX,
        boxY + 53
    );

    ctx.fillStyle = "#bdb4a6";
    ctx.font = "italic 11px Arial, sans-serif";
    ctx.fillText(
        "[ " + battleStageConfig.englishName + " • STAGE " + guardianEncounter + " ]",
        centerX,
        boxY + 70
    );

    // Difficulty badge
    const difficultyText =
        String(playerDifficulty).toUpperCase();

    const difficultyWidth = 122;
    const difficultyHeight = 25;
    const difficultyX =
        centerX - difficultyWidth / 2;
    const difficultyY = boxY + 80;

    drawRoundedPanel(
        difficultyX,
        difficultyY,
        difficultyWidth,
        difficultyHeight,
        13,
        "rgba(217, 164, 65, 0.15)",
        "rgba(217, 164, 65, 0.75)",
        1
    );

    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 10px Arial, sans-serif";
    ctx.fillText(
        "DIFFICULTY • " + difficultyText,
        centerX,
        difficultyY + 16
    );

    // ==========================================================
    // BOSS SPEECH
    // ==========================================================

    ctx.fillStyle = "#f5e6c8";
    ctx.font =
        "bold 14px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        battleStageConfig.speechTa,
        centerX,
        boxY + 129
    );

    ctx.fillStyle = "#a99f91";
    ctx.font = "italic 11px Arial, sans-serif";
    ctx.fillText(
        "[ " + battleStageConfig.speechEn + " ]",
        centerX,
        boxY + 148
    );

    if (guardianQuestionLoading) {

        ctx.fillStyle = "#f5e6c8";
        ctx.font = "16px Georgia";
        ctx.fillText(
            "The Guardian is preparing your trial...",
            centerX,
            boxY + 210
        );

        ctx.restore();
        return;
    }

    if (!guardianQuestion) {

        ctx.fillStyle = "#f5e6c8";
        ctx.font = "16px Georgia";
        ctx.fillText(
            "No question is available.",
            centerX,
            boxY + 210
        );

        ctx.restore();
        return;
    }

    // ==========================================================
    // STORY — TAMIL FIRST, ENGLISH SUBTITLE BELOW IT
    // ==========================================================

    const story =
        guardianQuestion.story ||
        guardianQuestion.scenario ||
        guardianQuestion.description ||
        "";

    const englishStory =
        getGuardianEnglishText(
            [
                "english_story",
                "story_en",
                "englishStory",
                "scenario_en",
                "description_en"
            ],
            containsTamil(story)
                ? "The Guardian blocks your path and tests your knowledge."
                : story
        );

    const tamilStory = getGuardianTamilStory(story);

    ctx.textAlign = "left";
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 10px Arial, sans-serif";
    ctx.fillText(
        "📜  QUEST / கதை",
        boxX + 36,
        boxY + 178
    );

    ctx.textAlign = "center";

    let cursorY = boxY + 188;

    const storyTamilLines = drawWrappedCanvasText(
        tamilStory,
        centerX,
        cursorY,
        contentWidth,
        15,
        "#f5e6c8",
        "bold 13px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif",
        3
    );

    cursorY += storyTamilLines * 15 + 3;

    const storyEnglishLines = drawWrappedCanvasText(
        "[ " + englishStory + " ]",
        centerX,
        cursorY,
        contentWidth,
        13,
        "#c7bdad",
        "italic 10px Arial, sans-serif",
        2
    );

    cursorY += storyEnglishLines * 13 + 8;

    // ==========================================================
    // QUESTION — DYNAMIC POSITION
    // This prevents Tamil and English from ever overlapping.
    // ==========================================================

    ctx.textAlign = "left";
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 10px Arial, sans-serif";
    ctx.fillText(
        "❓  CHALLENGE / கேள்வி",
        boxX + 36,
        cursorY
    );

    cursorY += 9;

    const question =
        guardianQuestion.question ||
        guardianQuestion.challenge_question ||
        guardianQuestion.challenge ||
        "Choose your answer:";

    const englishQuestion =
        getGuardianEnglishText(
            [
                "english_question",
                "question_en",
                "englishQuestion",
                "challenge_question_en"
            ],
            containsTamil(question)
                ? "Choose the correct answer to pass the Guardian."
                : question
        );

    const tamilQuestion =
        getGuardianTamilQuestion(question);

    ctx.textAlign = "center";

    const questionTamilLines = drawWrappedCanvasText(
        tamilQuestion,
        centerX,
        cursorY + 4,
        contentWidth,
        18,
        "#fff4d2",
        "bold 15px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif",
        3
    );

    cursorY += 4 + questionTamilLines * 18 + 3;

    const questionEnglishLines = drawWrappedCanvasText(
        "[ " + englishQuestion + " ]",
        centerX,
        cursorY,
        contentWidth,
        13,
        "#c7bdad",
        "italic 10px Arial, sans-serif",
        2
    );

    cursorY += questionEnglishLines * 13 + 8;

    // ==========================================================
    // OPTIONS — BILINGUAL 2 x 2 GRID
    // Tamil and English are deliberately separated into two lines.
    // This prevents the overlap visible in the previous version.
    // ==========================================================

    guardianOptionRects = [];

    const gridGapX = 12;
    const gridGapY = 10;
    const optionWidth = Math.min(380, (contentWidth - gridGapX) / 2);
    const optionHeight = canvas.height < 700 ? 62 : 70;
    const gridWidth = optionWidth * 2 + gridGapX;
    const gridX = centerX - gridWidth / 2;

    for (let i = 0; i < guardianOptions.length; i++) {
        const option = guardianOptions[i];
        if (option === null || option === undefined) continue;

        const col = guardianOptionRects.length % 2;
        const row = Math.floor(guardianOptionRects.length / 2);
        const optionX = gridX + col * (optionWidth + gridGapX);
        const optionY = cursorY + row * (optionHeight + gridGapY);

        guardianOptionRects.push({
            index: i, x: optionX, y: optionY, width: optionWidth, height: optionHeight
        });

        const selected = guardianSelectedAnswer === i;
        drawRoundedPanel(
            optionX, optionY, optionWidth, optionHeight, 10,
            selected ? "rgba(217, 164, 65, 0.96)" : "rgba(42, 22, 15, 0.98)",
            selected ? "#fff0b5" : "rgba(217, 164, 65, 0.72)",
            selected ? 2.5 : 1.5
        );

        const tamilOption = getGuardianOptionTamil(i, option);
        const englishOption = getGuardianOptionEnglish(i, option);
        const textColor = selected ? "#21120b" : "#f5e6c8";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = textColor;
        ctx.font = "bold 14px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
        ctx.fillText(String.fromCharCode(65 + i) + ". " + tamilOption, optionX + optionWidth / 2, optionY + 27);

        ctx.fillStyle = selected ? "#3a2616" : "#c7bdad";
        ctx.font = "bold 11px Arial, sans-serif";
        ctx.fillText(englishOption, optionX + optionWidth / 2, optionY + 49);
    }

    // ==========================================================
    // RESULT + CONTROLS
    // ==========================================================

    const controlsY =
        boxY + boxHeight - 30;

    if (guardianResult) {

        const resultY =
            boxY + boxHeight - 78;

        const isCorrect =
            guardianResult.startsWith("✓");

        const isWrong =
            guardianResult.startsWith("✗") ||
            guardianResult.startsWith("💀");

        drawRoundedPanel(
            centerX - 230,
            resultY - 18,
            460,
            34,
            9,
            isCorrect
                ? "rgba(54, 135, 82, 0.28)"
                : isWrong
                    ? "rgba(190, 62, 62, 0.28)"
                    : "rgba(217, 164, 65, 0.18)",
            isCorrect
                ? "rgba(126, 231, 135, 0.7)"
                : isWrong
                    ? "rgba(255, 138, 128, 0.7)"
                    : "rgba(217, 164, 65, 0.6)",
            1
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle =
            isCorrect
                ? "#7ee787"
                : isWrong
                    ? "#ff8a80"
                    : "#f5d58a";

        ctx.font =
            "bold 12px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

        ctx.fillText(
            guardianResult,
            centerX,
            resultY + 4
        );
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 11px Arial, sans-serif";
    ctx.fillStyle = "#d9a441";
    ctx.font =
        "bold 12px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        "1–4  தேர்வு / SELECT   •   E — பதிலைச் சமர்ப்பிக்கவும்",
        centerX,
        controlsY - 4
    );

    ctx.restore();
}


// ==========================================
// STAGE 13 — TEXT WRAPPING
// ==========================================


function drawWrappedCanvasText(
    text,
    centerX,
    startY,
    maxWidth,
    lineHeight,
    color,
    font,
    maxLines = 99
) {

    ctx.save();

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const words =
        String(text || "")
            .split(/\s+/)
            .filter(Boolean);

    const lines = [];
    let current = "";

    for (const word of words) {

        const test =
            current
                ? current + " " + word
                : word;

        if (
            ctx.measureText(test).width > maxWidth &&
            current
        ) {

            lines.push(current);
            current = word;

        } else {

            current = test;

        }
    }

    if (current) {
        lines.push(current);
    }

    // Keep UI bounded on small screens.
    const visibleLines = lines.slice(0, maxLines);

    if (lines.length > maxLines && visibleLines.length > 0) {
        let last = visibleLines[visibleLines.length - 1];
        if (!last.endsWith("…")) {
            last = last.replace(/[.,;:!?]?\s*$/, "") + "…";
            visibleLines[visibleLines.length - 1] = last;
        }
    }

    for (
        let i = 0;
        i < visibleLines.length;
        i++
    ) {

        ctx.fillText(
            visibleLines[i],
            centerX,
            startY + i * lineHeight
        );
    }

    ctx.restore();

    // Return the actual number of rendered lines so the next
    // bilingual section can be positioned below it.
    return visibleLines.length;
}



// ==========================================
// STAGE 13 — MOUSE ANSWER SELECTION
// ==========================================

canvas.addEventListener(
    "click",
    function (event) {

        if (showRewardScreen) {
            if (key === "e" || key === "enter") {
                continueFromRewardScreen();
                event.preventDefault();
            }
            return;
        }

        if (!guardianBattleOpen) {
            return;
        }

        const rect =
            canvas.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;

        for (
            const option of guardianOptionRects
        ) {

            if (
                mouseX >= option.x &&
                mouseX <=
                    option.x + option.width &&
                mouseY >= option.y &&
                mouseY <=
                    option.y + option.height
            ) {

                guardianSelectedAnswer =
                    option.index;

                guardianResult = "";

                return;
            }
        }
    }
);


// ==========================================
// STAGE 13 — KEYBOARD ANSWERS
// ==========================================

window.addEventListener(
    "keydown",
    function (event) {

        if (!guardianBattleOpen) {
            return;
        }

        const key =
            event.key.toLowerCase();

        if (
            ["1", "2", "3", "4"].includes(key)
        ) {

            const index =
                Number(key) - 1;

            if (
                guardianOptions[index] !== null &&
                guardianOptions[index] !== undefined
            ) {

                guardianSelectedAnswer =
                    index;

                guardianResult = "";
            }

            event.preventDefault();
            return;
        }

    }
);


function continueFromRewardScreen() {
    if (!showRewardScreen) return;

    showRewardScreen = false;
    rewardScreenTimer = 0;
    nextGuardianPending = false;
    nextGuardianTimer = 0;

    if (rewardScreenData.finalBoss) {
        // The Shadow King is the end of the quest.
        finalBossVisible = false;
        finalBossBattleOpen = false;
        finalGuardianCompleted = true;
        questCompleted = true;

        // Hide the old ACTIVE QUEST HUD immediately when the
        // final boss is defeated. The QUEST COMPLETE banner
        // will be drawn separately by the game loop.
        showActiveQuestHUD = false;

        guardianDefeated = true;
        activeQuest.objective =
            activeLiteratureProfile.endingTa;
        activeQuest.englishObjective =
            activeLiteratureProfile.endingEn;
        updateCollisionBoundaries();
        return;
    }

    // After every Guardian, the player must physically reach the next
    // gate. This guarantees the background changes in the correct order:
    // Temple -> Library -> Village -> Forest -> Final Sanctum.
    // No Guardian is spawned early in the previous area.
    guardianDefeated = true;
    updateCollisionBoundaries();
}

function drawQuestCompletionBanner() {
    if (!questCompleted || showRewardScreen || guardianBattleOpen) return;

    ctx.save();
    const width = Math.min(620, canvas.width - 50);
    const height = 132;
    const x = canvas.width / 2 - width / 2;
    const y = 24;

    drawRoundedPanel(
        x, y, width, height, 16,
        "rgba(18, 10, 6, 0.96)",
        "rgba(151, 108, 255, 0.95)", 3
    );

    ctx.textAlign = "center";
    ctx.fillStyle = "#d8c2ff";
    ctx.font = "bold 23px Arial, sans-serif";
    ctx.fillText("👑 QUEST COMPLETE", canvas.width / 2, y + 40);

    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 17px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        activeLiteratureProfile.endingTa,
        canvas.width / 2,
        y + 72
    );

    ctx.fillStyle = "#c7bdad";
    ctx.font = "italic 11px Arial, sans-serif";
    ctx.fillText(
        activeLiteratureProfile.endingEn,
        canvas.width / 2,
        y + 98
    );
    ctx.restore();
}

function drawRewardScreen() {
    if (!showRewardScreen) return;

    ctx.save();
    ctx.fillStyle = "rgba(4, 2, 1, 0.72)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const width = Math.min(640, canvas.width - 40);
    const height = Math.min(390, canvas.height - 60);
    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 - height / 2;

    drawRoundedPanel(x, y, width, height, 20, "rgba(18,10,6,0.99)", rewardScreenData.finalBoss ? "rgba(151,108,255,0.98)" : "rgba(217,164,65,0.98)", 3);

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = rewardScreenData.finalBoss ? "#d8c2ff" : "#7ee787";
    ctx.font = "bold 28px Arial, sans-serif";
    ctx.fillText(rewardScreenData.finalBoss ? "👑 SHADOW KING DEFEATED" : "✓ VICTORY", canvas.width/2, y+55);

    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 21px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(rewardScreenData.tamilName + (rewardScreenData.finalBoss ? " வீழ்ந்தான்" : " தோற்கடிக்கப்பட்டார்"), canvas.width/2, y+94);

    ctx.fillStyle = "#c7bdad";
    ctx.font = "italic 13px Arial, sans-serif";
    ctx.fillText("[ " + rewardScreenData.englishName + " • STAGE " + rewardScreenData.stage + " ]", canvas.width/2, y+119);

    const cardW = Math.min(170, (width - 72) / 3);
    const cardY = y + 150;
    const gap = 12;
    const startX = canvas.width/2 - (cardW*3 + gap*2)/2;
    const cards = [
        ["⭐ XP REWARD", "+" + rewardScreenData.reward + " XP"],
        ["❤️ HP RESTORED", "+" + rewardScreenData.hpGain + " HP"],
        ["🛡 MAX HP", "+" + rewardScreenData.maxHpGain]
    ];
    for (let i=0;i<cards.length;i++) {
        const cx = startX + i*(cardW+gap);
        drawRoundedPanel(cx, cardY, cardW, 82, 10, "rgba(48,25,14,0.98)", "rgba(217,164,65,0.55)", 1);
        ctx.fillStyle="#bdb4a6"; ctx.font="bold 10px Arial"; ctx.fillText(cards[i][0], cx+cardW/2, cardY+25);
        ctx.fillStyle="#f5d58a"; ctx.font="bold 17px Arial"; ctx.fillText(cards[i][1], cx+cardW/2, cardY+55);
    }

    ctx.fillStyle = "#f5e6c8";
    ctx.font = "bold 13px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    const nextText =
        rewardScreenData.finalBoss
            ? "🏆 QUEST COMPLETE — " + activeLiteratureProfile.endingTa
            : rewardScreenData.stage === 4
                ? activeLiteratureProfile.areas[4].tamilName +
                  " சென்று நிழல் மன்னனை எதிர்கொள்"
                : "அடுத்த பகுதிக்குச் சென்று " +
                  getCurrentAreaConfig().nextGateTa +
                  " அடையவும்";
    ctx.fillText(nextText, canvas.width/2, y+278);
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillText(rewardScreenData.finalBoss ? "E / ENTER — FINISH QUEST" : "E / ENTER — CONTINUE", canvas.width/2, y+320);
    ctx.restore();
}

// ==========================================
// STAGE 14 — GUARDIAN VICTORY NOTIFICATION
// ==========================================
function drawGuardianVictoryNotification() {

    if (!showGuardianVictoryNotification || showRewardScreen || showAreaTransition) return;

    guardianVictoryTimer++;
    if (guardianVictoryTimer > 180) {
        showGuardianVictoryNotification = false;
        guardianVictoryTimer = 0;
        return;
    }

    ctx.save();

    const boxWidth = Math.min(560, canvas.width - 50);
    const boxHeight = 160;
    const boxX = canvas.width / 2 - boxWidth / 2;
    const boxY = 190;

    drawRoundedPanel(
        boxX, boxY, boxWidth, boxHeight, 16,
        "rgba(18, 10, 6, 0.97)",
        "rgba(217, 164, 65, 0.98)", 3
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#7ee787";
    ctx.font = "bold 24px Arial, sans-serif";
    ctx.fillText("✓ GUARDIAN DEFEATED", canvas.width / 2, boxY + 38);

    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 20px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    const victoryStageConfig = getCurrentGuardianStage();

    ctx.fillText(
        victoryStageConfig.tamilName + " தோற்கடிக்கப்பட்டார்",
        canvas.width / 2, boxY + 73
    );

    ctx.fillStyle = "#d8d0c0";
    ctx.font = "italic 13px Arial, sans-serif";
    ctx.fillText(
        "[ " + victoryStageConfig.englishName + " • STAGE " + guardianEncounter + " ]",
        canvas.width / 2, boxY + 98
    );

    ctx.fillStyle = "#f5e6c8";
    ctx.font = "bold 15px Arial, sans-serif";
    ctx.fillText("+ " + getGuardianReward() + " XP", canvas.width / 2, boxY + 127);

    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 14px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        currentArea < 4
            ? "🚶 அடுத்த பகுதிக்குச் செல்லுங்கள்"
            : finalGuardianCompleted
                ? "👑 நிழல் மன்னன் வீழ்ந்தான் • இறுதி வெற்றி"
                : "⚔️ அடுத்த சோதனை விரைவில் தொடங்கும்",
        canvas.width / 2, boxY + 148
    );

    ctx.restore();
}


// ==========================================
// STAGE 15 — AREA GATE
// ==========================================
function drawAreaGate() {

    const area = getCurrentAreaConfig();
    if (currentArea >= 5 || !guardianDefeated || !area.nextArea) return;

    // Subtle destination marker only. The actual bilingual interaction
    // text is drawn once by drawAreaGatePrompt(), preventing duplicate boxes.
    ctx.save();
    const gateX = canvas.width / 2;
    const gateY = canvas.height - 44;
    const gateW = Math.min(190, canvas.width - 80);

    ctx.strokeStyle = "rgba(217,164,65,0.72)";
    ctx.lineWidth = 2;
    ctx.strokeRect(gateX - gateW / 2, gateY - 16, gateW, 32);

    ctx.fillStyle = "rgba(217,164,65,0.10)";
    ctx.fillRect(gateX - gateW / 2, gateY - 16, gateW, 32);
    ctx.restore();
}

// ==========================================
// STAGE 10.7 — DRAW SAGE QUEST OFFER
// ==========================================

function drawAreaTransition() {

    if (!showAreaTransition) return;

    areaTransitionTimer++;
    if (areaTransitionTimer > 150) {
        showAreaTransition = false;
        areaTransitionTimer = 0;
        return;
    }

    ctx.save();

    // Full-screen cinematic cover: player, Guardian, gate and HUD
    // must never remain visible through the area-transition card.
    ctx.fillStyle = "rgba(4, 2, 1, 0.94)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const boxWidth = Math.min(680, canvas.width - 56);
    const boxHeight = 196;
    const boxX = Math.max(28, canvas.width / 2 - boxWidth / 2);
    const boxY = Math.max(28, canvas.height / 2 - boxHeight / 2);
    const centerX = canvas.width / 2;

    drawRoundedPanel(
        boxX, boxY, boxWidth, boxHeight, 18,
        "rgba(18, 10, 6, 0.995)",
        "rgba(217, 164, 65, 0.98)", 3
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#d9a441";
    ctx.font = "bold 13px Arial, sans-serif";
    ctx.fillText("✦ AREA " + currentArea + " ✦", centerX, boxY + 34);

    // Bounded Tamil title prevents clipping on narrow screens.
    drawWrappedCanvasText(
        getCurrentAreaConfig().tamilName,
        centerX,
        boxY + 50,
        boxWidth - 48,
        29,
        "#f5d58a",
        "bold 23px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif",
        2
    );

    ctx.fillStyle = "#d8d0c0";
    ctx.font = "italic 14px Arial, sans-serif";
    ctx.fillText("[ " + getCurrentAreaConfig().englishName + " ]", centerX, boxY + 118);

    const stageStory =
        getCurrentGuardianStage();

    ctx.fillStyle = "#f5e6c8";
    ctx.font = "bold 15px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        stageStory.storyTa,
        centerX,
        boxY + 151
    );

    ctx.fillStyle = "#aaa093";
    ctx.font = "italic 11px Arial, sans-serif";
    ctx.fillText(
        "[ " + stageStory.storyEn + " ]",
        centerX,
        boxY + 174
    );
    ctx.restore();
}


function drawQuestOffer() {

    if (!showQuestOffer) {
        return;
    }


    const controlsHint =
        document.getElementById("controls-hint");

    if (controlsHint) {
        controlsHint.style.display = "none";
    }


    ctx.save();


    // ======================================
    // QUEST OFFER BOX
    // ======================================

    const boxWidth =
        Math.min(
            760,
            canvas.width - 50
        );

    const boxHeight = 300;

    const boxX =
        canvas.width / 2 -
        boxWidth / 2;

    const boxY =
        canvas.height - 360;


    // ======================================
    // BACKGROUND
    // ======================================

    ctx.fillStyle =
        "rgba(20, 10, 5, 0.97)";

    ctx.fillRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );


    // ======================================
    // GOLD BORDER
    // ======================================

    ctx.strokeStyle =
        "#d9a441";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );


    // ======================================
    // SPEAKER
    // ======================================

    ctx.fillStyle =
        "#f5d58a";

    ctx.font =
        "bold 23px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "alphabetic";

    ctx.fillText(
        sageQuestOffer.speaker,
        canvas.width / 2,
        boxY + 38
    );


    // ======================================
    // QUEST TITLE — TAMIL
    // ======================================

    ctx.fillStyle =
        "#d9a441";

    ctx.font =
        "bold 20px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        sageQuestOffer.title,
        canvas.width / 2,
        boxY + 78
    );


    // ======================================
    // QUEST TITLE — ENGLISH
    // ======================================

    ctx.fillStyle =
        "#cfc6b5";

    ctx.font =
        "italic 14px Arial, sans-serif";

    ctx.fillText(
        "[ " + sageQuestOffer.englishTitle + " ]",
        canvas.width / 2,
        boxY + 102
    );


    // ======================================
    // QUEST DESCRIPTION — TAMIL
    // ======================================

    ctx.fillStyle =
        "#f5e6c8";

    ctx.font =
        "18px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        sageQuestOffer.description,
        canvas.width / 2,
        boxY + 138
    );


    // ======================================
    // QUEST DESCRIPTION — ENGLISH
    // ======================================

    ctx.fillStyle =
        "#d8d0c0";

    ctx.font =
        "italic 15px Arial, sans-serif";

    ctx.fillText(
        "[ " + sageQuestOffer.englishDescription + " ]",
        canvas.width / 2,
        boxY + 164
    );


    // ======================================
    // QUESTION — TAMIL
    // ======================================

    ctx.fillStyle =
        "#f5e6c8";

    ctx.font =
        "18px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        sageQuestOffer.question,
        canvas.width / 2,
        boxY + 198
    );


    // ======================================
    // QUESTION — ENGLISH
    // ======================================

    ctx.fillStyle =
        "#d8d0c0";

    ctx.font =
        "italic 15px Arial, sans-serif";

    ctx.fillText(
        "[ " + sageQuestOffer.englishQuestion + " ]",
        canvas.width / 2,
        boxY + 222
    );


    // ======================================
    // ACCEPT PROMPT
    // ======================================

    ctx.fillStyle =
        "#d9a441";

    ctx.font =
        "bold 15px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        "E — சோதனையை ஏற்கிறேன்",
        canvas.width / 2,
        boxY + 260
    );


    ctx.restore();
}


// ==========================================
// STAGE 10.5 — DRAW SAGE DIALOGUE
// ==========================================
// Tamil dialogue box shown after the player
// approaches Sage and presses E.
// ==========================================

function drawSageDialogue() {

    const controlsHint =
        document.getElementById("controls-hint");

    if (!showSageDialogue) {

        if (controlsHint) {
            controlsHint.style.display = "none";
        }

        return;
    }


    // ======================================
    // HIDE MOVEMENT CONTROLS
    // ======================================

    if (controlsHint) {
        controlsHint.style.display = "none";
    }


    // ======================================
    // GET CURRENT DIALOGUE
    // ======================================

    const dialogue =
        sageDialogues[currentSageDialogue];

    if (!dialogue) {
        return;
    }


    ctx.save();


    // ======================================
    // DIALOGUE BOX
    // ======================================

    const boxWidth =
        Math.min(
            760,
            canvas.width - 50
        );

    // Extra height for English subtitles.
    const boxHeight = 255;

    const boxX =
        canvas.width / 2 -
        boxWidth / 2;

    const boxY =
        canvas.height - 320;


    // ======================================
    // BACKGROUND
    // ======================================

    ctx.fillStyle =
        "rgba(20, 10, 5, 0.97)";

    ctx.fillRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );


    // ======================================
    // GOLD BORDER
    // ======================================

    ctx.strokeStyle =
        "#d9a441";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        boxX,
        boxY,
        boxWidth,
        boxHeight
    );


    // ======================================
    // SPEAKER NAME
    // ======================================

    ctx.fillStyle =
        "#f5d58a";

    ctx.font =
        "bold 23px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "alphabetic";

    ctx.fillText(
        dialogue.speaker,
        canvas.width / 2,
        boxY + 38
    );


    // ======================================
    // TAMIL DIALOGUE
    // ======================================

    ctx.fillStyle =
        "#f5e6c8";

    ctx.font =
        "18px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        dialogue.text,
        canvas.width / 2,
        boxY + 92
    );


    // ======================================
    // ENGLISH SUBTITLE
    // ======================================

    ctx.fillStyle =
        "#d8d0c0";

    ctx.font =
        "italic 15px Arial, sans-serif";

    ctx.fillText(
        "[ " +
        getSageEnglishSubtitle(currentSageDialogue) +
        " ]",
        canvas.width / 2,
        boxY + 128
    );


    // ======================================
    // CONTINUE PROMPT
    // ======================================

    ctx.fillStyle =
        "#d9a441";

    ctx.font =
        "bold 15px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        "தொடர E அழுத்தவும்",
        canvas.width / 2,
        boxY + 208
    );


    ctx.restore();
}


// ==========================================
// STAGE 10.7.4 — ENGLISH SAGE SUBTITLES
// ==========================================

function getSageEnglishSubtitle(index) {

    const dialogue =
        sageDialogues[index];

    if (dialogue && dialogue.englishText) {
        return dialogue.englishText;
    }

    return "";
}


// ==========================================
// ✨ QUEST ACCEPTED GLOW
// ==========================================

function drawQuestAcceptedGlow() {

    if (!questAcceptedGlow) {
        return;
    }

    questAcceptedGlowTimer++;

    const progress =
        questAcceptedGlowTimer /
        QUEST_GLOW_DURATION;

    const alpha =
        Math.max(
            0,
            0.38 * (1 - progress)
        );

    ctx.save();

    ctx.fillStyle =
        `rgba(255, 215, 80, ${alpha})`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.restore();

    if (
        questAcceptedGlowTimer >=
        QUEST_GLOW_DURATION
    ) {
        questAcceptedGlow = false;
        questAcceptedGlowTimer = 0;
    }
}


// ==========================================
// ⚔️ GUARDIAN SPAWN FLASH
// ==========================================

function drawGuardianSpawnFlash() {

    if (!guardianSpawnFlash) {
        return;
    }

    guardianSpawnFlashTimer++;

    const progress =
        guardianSpawnFlashTimer /
        GUARDIAN_FLASH_DURATION;

    const radius =
        25 + progress * 145;

    const alpha =
        Math.max(
            0,
            0.82 * (1 - progress)
        );

    const target =
        guardianSpawnFlashTarget === "boss"
            ? finalBoss
            : guardian;

    const centerX =
        target.x + target.width / 2;

    const centerY =
        target.y + target.height * 0.78;

    ctx.save();

    // Outer expanding energy ring.
    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        `rgba(255, 215, 80, ${alpha})`;

    ctx.lineWidth = 6;

    ctx.shadowColor =
        `rgba(255, 215, 80, ${alpha})`;

    ctx.shadowBlur = 18;

    ctx.stroke();

    // Inner white ring.
    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius * 0.62,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        `rgba(255, 255, 255, ${alpha * 0.9})`;

    ctx.lineWidth = 2.5;

    ctx.shadowBlur = 8;

    ctx.stroke();

    // Small vertical light burst.
    const burstHeight =
        35 + progress * 70;

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        centerY - burstHeight
    );

    ctx.lineTo(
        centerX,
        centerY + burstHeight
    );

    ctx.strokeStyle =
        `rgba(255, 215, 80, ${alpha * 0.55})`;

    ctx.lineWidth = 3;

    ctx.stroke();

    ctx.restore();

    if (
        guardianSpawnFlashTimer >=
        GUARDIAN_FLASH_DURATION
    ) {
        guardianSpawnFlash = false;
        guardianSpawnFlashTimer = 0;
    }
}

// ==========================================
// 💥 ANSWER FEEDBACK
// ==========================================

function drawAnswerFeedback() {

    if (answerFeedbackTimer <= 0) {
        return;
    }

    const progress =
        1 -
        answerFeedbackTimer /
        ANSWER_FEEDBACK_DURATION;

    const alpha =
        Math.max(
            0,
            1 - progress
        );

    const y =
        canvas.height * 0.42 -
        progress * 38;

    ctx.save();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font =
        "bold 32px Arial, sans-serif";

    ctx.fillStyle =
        answerFeedbackCorrect
            ? `rgba(126, 231, 135, ${alpha})`
            : `rgba(255, 138, 128, ${alpha})`;

    ctx.shadowColor =
        answerFeedbackCorrect
            ? "rgba(126, 231, 135, 0.55)"
            : "rgba(255, 80, 80, 0.55)";

    ctx.shadowBlur = 14;

    ctx.fillText(
        answerFeedback,
        canvas.width / 2,
        y
    );

    ctx.restore();

    answerFeedbackTimer--;

    if (answerFeedbackTimer <= 0) {
        answerFeedback = "";
    }
}


// ==========================================
// ⭐ XP / REWARD POPUP
// ==========================================

function drawXPPopup() {

    if (
        !xpPopup ||
        xpPopupTimer <= 0
    ) {
        return;
    }

    // Progress from 0 -> 1 during the popup.
    const elapsed =
        XP_POPUP_DURATION - xpPopupTimer;

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                elapsed / XP_POPUP_DURATION
            )
        );

    // Fade in at the beginning and fade out near the end.
    let alpha = 1;

    if (progress < 0.15) {
        alpha = progress / 0.15;
    } else if (progress > 0.75) {
        alpha = (1 - progress) / 0.25;
    }

    alpha =
        Math.max(
            0,
            Math.min(1, alpha)
        );

    // Float upward as the popup is displayed.
    const floatY =
        progress * 70;

    const x =
        canvas.width / 2;

    const y =
        canvas.height * 0.25 - floatY;

    ctx.save();

    ctx.globalAlpha = alpha;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Gold glow.
    ctx.shadowColor =
        "rgba(255, 215, 0, 0.95)";

    ctx.shadowBlur = 24;

    ctx.font =
        "bold 34px Arial, sans-serif";

    // Black outline for readability over
    // the world and reward screen.
    ctx.lineWidth = 7;

    ctx.strokeStyle =
        "rgba(0, 0, 0, 0.95)";

    ctx.strokeText(
        xpPopup,
        x,
        y
    );

    // Main gold XP text.
    ctx.shadowBlur = 14;

    ctx.fillStyle =
        "#FFD700";

    ctx.fillText(
        xpPopup,
        x,
        y
    );

    ctx.restore();

    // Countdown happens here exactly once per frame.
    xpPopupTimer--;

    if (xpPopupTimer <= 0) {
        xpPopupTimer = 0;
        xpPopup = "";
    }
}


// ==========================================
// ATMOSPHERIC VIGNETTE
// ==========================================

// ==========================================

function drawVignette() {

    const gradient =

        ctx.createRadialGradient(

            canvas.width / 2,
            canvas.height / 2,

            canvas.height * 0.2,

            canvas.width / 2,
            canvas.height / 2,

            canvas.height * 0.75

        );


    gradient.addColorStop(

        0,

        "rgba(0, 0, 0, 0)"

    );


    gradient.addColorStop(

        1,

        "rgba(0, 0, 0, 0.65)"

    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(

        0,
        0,

        canvas.width,
        canvas.height

    );

}


// ==========================================
// MAIN GAME LOOP
// ==========================================

function drawAreaGatePrompt() {

    if (!playerNearAreaGate || currentArea >= 5) return;

    const area = getCurrentAreaConfig();
    if (!area.nextArea) return;

    ctx.save();

    const width = Math.min(500, canvas.width - 48);
    const height = 74;
    const x = canvas.width / 2 - width / 2;
    const y = canvas.height - 132;

    drawRoundedPanel(
        x, y, width, height, 14,
        "rgba(20, 10, 5, 0.97)",
        "rgba(217, 164, 65, 0.98)",
        2
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "#f5d58a";
    ctx.font = "bold 15px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";
    ctx.fillText(
        "E — " + area.nextGateTa + " செல்லவும்",
        canvas.width / 2,
        y + 30
    );

    ctx.fillStyle = "#d8d0c0";
    ctx.font = "italic 12px Arial, sans-serif";
    ctx.fillText(
        "E — Enter " + area.nextGateEn,
        canvas.width / 2,
        y + 53
    );

    ctx.restore();
}

function drawLiteratureBadge() {

    if (
        guardianBattleOpen ||
        showQuestOffer ||
        showSageDialogue ||
        showRewardScreen ||
        showAreaTransition
    ) {
        return;
    }

    ctx.save();

    const width =
        Math.min(
            260,
            canvas.width - 30
        );

    const x = 18;
    const y = 18;

    drawRoundedPanel(
        x,
        y,
        width,
        34,
        9,
        "rgba(18, 10, 6, 0.84)",
        "rgba(217, 164, 65, 0.55)",
        1
    );

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#f5d58a";
    ctx.font =
        "bold 11px 'Noto Sans Tamil', 'Nirmala UI', Arial, sans-serif";

    ctx.fillText(
        activeLiteratureProfile.tamilName,
        x + 12,
        y + 12
    );

    ctx.fillStyle = "#bdb4a6";
    ctx.font =
        "italic 9px Arial, sans-serif";

    ctx.fillText(
        activeLiteratureProfile.englishName,
        x + 12,
        y + 25
    );

    ctx.restore();
}


function gameLoop() {

    // Hide the browser movement hint while a cinematic
    // dialogue, quest offer, or Guardian battle is open.
    const controlsHint =
        document.getElementById("controls-hint");

    if (controlsHint) {
        controlsHint.style.display = "none";
    }

    if (showQuestAcceptedNotification) {

        questNotificationTimer++;

        if (questNotificationTimer >= 180) {
            showQuestAcceptedNotification = false;
        }
    }

    // ======================================
    // STAGES 16–18 — NEXT GUARDIAN TIMER
    // ======================================
    if (nextGuardianPending && !showRewardScreen) {
        nextGuardianTimer++;

        if (nextGuardianTimer >= nextGuardianDelay) {
            activateNextGuardian();
        }
    }

    // ======================================
    // UPDATE
    // ======================================

    if (!showRewardScreen && !showAreaTransition) {
        updatePlayer();
        updateAnimation();
        checkPlayerProximity();
        checkSageProximity();
        checkGuardianProximity();
        checkAreaGateProximity();
    } else if (showAreaTransition) {
        // Freeze all proximity/input-driven movement during the cinematic.
        playerNearAreaGate = false;
        playerNearGuardian = false;
    }

    updateCollisionBoundaries();


    // ======================================
    // DRAW
    // ======================================

    drawBackground();

    if (currentArea === 1) {
        drawInscription();
    }

    // Stage 10.1 — draw Sage only in Area 1
    if (currentArea === 1) {
        drawSage();
    }

    // Stage 12 — draw Knowledge Guardian
    drawGuardian();

    // ⚔️ Guardian spawn effect
    drawGuardianSpawnFlash();

    drawPlayer();

    drawInteractionPrompt();

    drawSageInteractionPrompt();

    drawGuardianInteractionPrompt();
    if (!showAreaTransition && !showRewardScreen && !guardianBattleOpen) {
        drawAreaGate();
        drawAreaGatePrompt();
    }

    drawInteractionMessage();

    drawSageDialogue();

    drawQuestOffer();

    drawQuestAcceptedNotification();

    // ✨ Quest accepted flash
    drawQuestAcceptedGlow();

    // 💥 Correct / wrong answer feedback
    drawAnswerFeedback();

    // Draw the vignette BEFORE the battle/HUD layers.
    // This prevents it from washing out the HP bar, quest panel,
    // question text, and answer controls.
    drawVignette();

    // Battle panel is drawn at full saturation.
    drawGuardianBattle();

    // HUD is deliberately drawn LAST so HP / XP / difficulty
    // always remain bright and readable.
    drawLiteratureBadge();
    drawActiveQuestHUD();

    drawGuardianVictoryNotification();
    drawAreaTransition();
    drawRewardScreen();
    drawQuestCompletionBanner();

    // ======================================
    // ⭐ XP REWARD POPUP — DRAW LAST
    // ======================================
    // This is intentionally after the reward screen
    // so the XP popup can never be hidden behind it.
    drawXPPopup();

    // Collision debug is OFF by default.
    drawCollisionDebug();


    // ======================================
    // NEXT FRAME
    // ======================================

    requestAnimationFrame(
        gameLoop
    );

}


// ==========================================
// START GAME
// ==========================================

console.log(
    "📚 Literature RPG world starting:",
    activeLiteratureProfile.englishName
);

console.log(
    "👹 Five-stage Guardian system active"
);

console.log(
    "🌍 Selected path:",
    activeLiteratureProfile.areas
        .map(area => area.englishName)
        .join(" → ")
);


gameLoop();

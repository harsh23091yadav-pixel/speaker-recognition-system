from utils.audio_features import extract_features
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os
import pickle
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # TEMPORARY
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs("models", exist_ok=True)


@app.get("/")
def root():
    return {
        "message": "Speaker Recognition Backend Running"
    }


@app.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    filepath = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    features = extract_features(filepath)

    print("MFCC Shape:", features.shape)

    return {
        "filename": file.filename,
        "status": "uploaded successfully"
    }


@app.post("/save-speaker")
async def save_speaker(
    name: str,
    file: UploadFile = File(...)
):

    filepath = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    features = extract_features(filepath)

    speakers = {}

    if os.path.exists("models/speakers.pkl"):

        with open("models/speakers.pkl", "rb") as f:
            speakers = pickle.load(f)

    if name not in speakers:
        speakers[name] = []

    speakers[name].append(features)

    with open("models/speakers.pkl", "wb") as f:
        pickle.dump(speakers, f)

    return {
        "speaker": name,
        "samples": len(speakers[name]),
        "status": "saved"
    }


@app.get("/speakers")
def get_speakers():

    if not os.path.exists("models/speakers.pkl"):
        return {"speakers": []}

    with open("models/speakers.pkl", "rb") as f:
        speakers = pickle.load(f)

    return {
        "speakers": list(speakers.keys())
    }


@app.post("/recognize")
async def recognize_audio(
    file: UploadFile = File(...)
):

    filepath = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    features = extract_features(filepath)

    with open("models/speakers.pkl", "rb") as f:
        speakers = pickle.load(f)

    best_speaker = None
    best_score = float("inf")

    for speaker_name, samples in speakers.items():

        for speaker_features in samples:

            distance = np.linalg.norm(
                features - speaker_features
            )

            if distance < best_score:
                best_score = distance
                best_speaker = speaker_name

    print("Best Score:", best_score)
    print("Detected:", best_speaker)

    if best_score > 75:
        best_speaker = "Unknown Speaker"

    confidence = round(
        max(0, 100 - best_score),
        2
    )

    return {
        "speaker": str(best_speaker),
        "confidence": float(confidence)
    }
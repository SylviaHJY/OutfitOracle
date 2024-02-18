from fastapi import FastAPI
from .routers import remove_bg_route
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv('src/.env')

app = FastAPI()
@app.get("/")
def read_root():
    return {"Hello": "World"}

origins = [
    "http://localhost:3000",    # replace with the origin of your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(remove_bg_route.router)



import requests
from dotenv import load_dotenv
import os

class RemoveBgService:
    def __init__(self):
        load_dotenv('src/.env')
        self.api_key = os.getenv("REMOVE_BG_API_KEY")
        if not self.api_key:
            raise ValueError("No REMOVE_BG_API_KEY found in environment variables")

    def remove_background(self, image_url: str):
        response = requests.post(
            'https://api.remove.bg/v1.0/removebg',
            data={'image_url': image_url, 'size': 'auto'},
            headers={'X-Api-Key': self.api_key},
        )
        if response.status_code == requests.codes.ok:
            #return response.content
            return response.content

        else:
            raise Exception(f"Error: {response.status_code}, {response.text}")

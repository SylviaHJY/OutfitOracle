import unittest
from unittest.mock import patch
from io import BytesIO
from PIL import Image
from main import app
from src.routers.save_outfit import upload_clothing_items
# Function to test - fetches data from an API


class TestSaveOutfitApi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_file_upload(self):

        
        response = self.app.post('/outfit', data={"urls": ["https://firebasestorage.googleapis.com/v0/b/wardrobe-wizard-105dd.appspot.com/o/clothes%2F7l5VB8uPhHdmG24WiRqkBWmIeCs2%2FT-shirts%2Fts4.png?alt=media&token=11e3cd10-4adb-43b3-882d-89de60fd2930"],"categories": ["T-shirts"],"user_id": "7l5VB8uPhHdmG24WiRqkBWmIeCs2"},headers={ 'Content-Type': 'application/json' })
        
        self.assertEqual(response.status_code,200)
        # response = self.app.post('/outfit', data={'urls': ['https://fastly.picsum.photos/id/53/200/300.jpg?hmac=KbEX4oNyVO15M-9S4xMsefrElB1uiO3BqnvVqPnhPgE'], 'categories': ['top'], 'user_id': '1234'})
        #self.assertEqual(response.status_code, 415)

if __name__ == '__main__':
    unittest.main()
import unittest
from unittest.mock import patch
from io import BytesIO
from PIL import Image
from main import app
from src.routers.save_outfit import upload_clothing_items
# Function to test - fetches data from an API


class TestRemoveBgApi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_file_upload(self):

        file_path = 'C:\\Users\\paula\\Downloads\\Paula_closet\\ts2.png'
        with open(file_path, 'rb') as file:
            file.content = file.read()
        
        file = BytesIO(file.content)
        
        file.filename = 'test.png'

        response = self.app.post('/remove-bg', data={'image_file': (file, 'test.png')})

        
        self.assertEqual(response.status_code,200)

        self.assertIn('image/png', response.mimetype)

        image = Image.open(BytesIO(response.data))
        # response = self.app.post('/outfit', data={'urls': ['https://fastly.picsum.photos/id/53/200/300.jpg?hmac=KbEX4oNyVO15M-9S4xMsefrElB1uiO3BqnvVqPnhPgE'], 'categories': ['top'], 'user_id': '1234'})
        #self.assertEqual(response.status_code, 415)

if __name__ == '__main__':
    unittest.main()
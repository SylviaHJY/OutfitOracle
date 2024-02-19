from rembg import remove

class RemoveBgService:
    def remove_background(self, image_data: bytes):
        # remove background from image
        result = remove(image_data)
        return result  # return image content
    
# function 2: remove background from image using url
# class RemoveBgService: 
#     def __init__(self):
#         # rembg server url
#         self.rembg_server_url = "http://localhost:7001/api/remove"

#     def remove_background(self, image_url: str):
#         # Send GET request to rembg server with image_url as a query parameters
#         response = requests.get(self.rembg_server_url, params={"url": image_url})
#         if response.status_code == 200:
#             return response.content  # return image content
#         else:
#             raise Exception(f"Error: {response.status_code}, {response.text}")
        
# from PIL import Image
# import requests
# from io import BytesIO

# class RemoveBgService:
#     def __init__(self):
#         # rembg server url
#         self.rembg_server_url = "http://localhost:7001/api/remove"

#     def remove_background(self, image_url: str):
#         # get original image
#         original_image_response = requests.get(image_url)
#         original_image = Image.open(BytesIO(original_image_response.content))
#         original_size = original_image.size
        
#         # remove background from image
#         response = requests.get(self.rembg_server_url, params={"url": image_url})
#         if response.status_code == 200:
#             # resize image to original size
#             processed_image = Image.open(BytesIO(response.content))
#             resized_image = processed_image.resize(original_size, Image.Resampling.LANCZOS)
#             # convert image to byte array
#             img_byte_arr = BytesIO()
#             resized_image.save(img_byte_arr, format=processed_image.format)
#             return img_byte_arr.getvalue()
#         else:
#             raise Exception(f"Error: {response.status_code}, {response.text}")


    # function 3: remove background from image using remove.bg API
    #from dotenv import load_dotenv
    #import os
    # use remove bg api to remove background from image
    # def __init__(self):
    #     load_dotenv('src/.env')
    #     self.api_key = os.getenv("REMOVE_BG_API_KEY")
    #     if not self.api_key:
    #         raise ValueError("No REMOVE_BG_API_KEY found in environment variables")

    # def remove_background(self, image_url: str):
    #     response = requests.post(
    #         'https://api.remove.bg/v1.0/removebg',
    #         data={'image_url': image_url, 'size': 'auto'},
    #         headers={'X-Api-Key': self.api_key},
    #     )
    #     if response.status_code == requests.codes.ok:
    #         #return response.content
    #         return response.content

    #     else:
    #         raise Exception(f"Error: {response.status_code}, {response.text}")
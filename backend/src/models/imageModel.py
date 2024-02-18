from pydantic import BaseModel, HttpUrl

# ImageModel: Model for image
class ImageModel(BaseModel):
    image_url: HttpUrl 

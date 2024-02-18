from pydantic import BaseModel

# ImageModel: Model for image
class ImageModel(BaseModel):
    image_url: str 

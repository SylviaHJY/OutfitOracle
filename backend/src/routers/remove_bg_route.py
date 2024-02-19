from fastapi import APIRouter, HTTPException, Response, File, UploadFile
from src.core.remove_bg import RemoveBgService

router = APIRouter()

# create remove bg service
remove_bg_service = RemoveBgService()

@router.post("/remove-bg")
async def remove_background(file: UploadFile = File(...)):
    try:
        content = await file.read()
        result = RemoveBgService().remove_background(content)  
        return Response(content=result, media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()
    
    
#from fastapi import Query
#from src.models.imageModel import ImageModel

# @router.get("/remove-bg")
# def remove_background(image_url: str = Query(..., description="The URL of the image to process")):
#     try:
#         # Remove background from image
#         result = remove_bg_service.remove_background(image_url)
#         return Response(content=result, media_type="image/png")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

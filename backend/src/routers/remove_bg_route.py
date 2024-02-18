from fastapi import APIRouter, HTTPException, Response
from src.models.imageModel import ImageModel
from src.core.remove_bg import RemoveBgService

router = APIRouter()

# 直接创建RemoveBgService实例
remove_bg_service = RemoveBgService()

@router.post("/remove-bg")
def remove_background(image: ImageModel):
    try:
        # 注意：修改了remove_background方法以保存文件而不是返回二进制内容
        result = remove_bg_service.remove_background(image.image_url)
        return Response(content=result, media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

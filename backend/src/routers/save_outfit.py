import os
from src.core.canvasImage import compose_outfit_image
from src.core.saveToFirestore import save_to_firestore
from src.core.saveToStorage import upload_to_firebase_storage
from flask import request, jsonify
from werkzeug.utils import secure_filename
import uuid
from io import BytesIO
from flask import Blueprint, request,jsonify

# Define Blueprint
save_outfit = Blueprint('outfit', __name__)

@save_outfit.route('/outfit', methods=['POST'])
def upload_clothing_items():
    # 用户上传的信息可能包含衣物图片的文件和对应分类
    clothing_items = request.files.getlist('clothing_items')
    categories = request.form.getlist('categories')
    
    # 假设 categories 和 clothing_items 的顺序是对应的
    items_data = []
    for item, category in zip(clothing_items, categories):
        filename = secure_filename(item.filename)
        bytes_io = BytesIO()
        item.save(bytes_io)
        bytes_io.seek(0)  # 重置流的指针到开始位置
        items_data.append({
            "category": category,
            "bytes_io": bytes_io
        })

    # 调整函数调用以匹配新的参数
    outfit_image_io = compose_outfit_image(items_data)

    # 上传字节流到 Firebase Storage
    file_name = f"outfits/{uuid.uuid4()}.png"
    user_id = request.form['user_id'] 
    outfit_url = upload_to_firebase_storage(outfit_image_io, file_name, user_id)

    # 将图片 URL 保存到 Firestore
    document_id = save_to_firestore(outfit_url, request.form['user_id'])

    return jsonify({"document_id": document_id, "outfit_url": outfit_url})

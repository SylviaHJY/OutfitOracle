from PIL import Image
from io import BytesIO

# import requests
# 导入衣物类别字典
from .config import CLOTHING_CATEGORIES

def resize_image_uniform_width(img, target_width):
    # 计算新的高度保持宽高比不变
    aspect_ratio = img.height / img.width
    target_height = int(target_width * aspect_ratio)
    # 调整图像大小
    resized_img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    return resized_img

def compose_outfit_image(items_data, target_width=300):
    # Initialize a dictionary to hold images by category
    categorized_images = {'accessories': [], 'top': [], 'bottom': [], 'shoes': []}

    # Open images, resize them, and categorize based on the provided category info
    for item_data in items_data:
        category = item_data['category']  # 假设这是前端发送的具体类别信息
        bytes_io = item_data['bytes_io']  # 图片数据
        
        img = Image.open(bytes_io).convert('RGBA')
        resized_img = resize_image_uniform_width(img, target_width)
        
        # 使用CLOTHING_CATEGORIES字典将具体的类别映射到更一般的类别
        category_key = CLOTHING_CATEGORIES.get(category, 'accessories')
        
        # 将调整大小的图片添加到它们对应的类别列表中
        categorized_images[category_key].append(resized_img)
    
    # Calculate the canvas size
    width = target_width  # 所有图片宽度一致
    height = sum(max(img.height for img in cat_imgs) for cat_imgs in categorized_images.values() if cat_imgs)
    
    # Create the outfit canvas
    outfit_image = Image.new('RGBA', (width, height), (0, 0, 0, 0))  # Transparent background
    current_height = 0

    # Paste images onto the canvas in order (Top, Bottom, Shoes, Accessories)
    for category in ['accessories','top', 'bottom', 'shoes']:  # 确保使用正确的顺序
        for img in categorized_images[category]:
            outfit_image.paste(img, (0, current_height), img)
            current_height += img.height
    
    # Prepare the image for uploading by saving it to a BytesIO object
    outfit_image_io = BytesIO()
    outfit_image.save(outfit_image_io, format='PNG')  # Save as PNG format
    outfit_image_io.seek(0)  # Move the read pointer to the start of the stream
    
    return outfit_image_io  # Return the BytesIO stream ready for uploading



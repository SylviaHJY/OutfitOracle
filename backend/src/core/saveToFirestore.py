from firebase_admin import firestore
# from datetime import datetime

def save_to_firestore(outfit_url, user_id):
    db = firestore.client()
    ootd_collection = db.collection('OOTD')
    
    # 创建一个新的文档s
    doc_ref = ootd_collection.document()
    doc_ref.set({
        'user_id': user_id,
        'outfit_url': outfit_url,
        'created_at': firestore.SERVER_TIMESTAMP  # 使用服务器时间戳
    })

    return doc_ref.id

from flask import Blueprint, request, Response
from src.core.remove_bg import RemoveBgService
from flask import current_app
# import logging

# logging.basicConfig(level=logging.DEBUG)

# Define Blueprint
bg_remover = Blueprint('bg_remover', __name__)
# Added /api for the endpoint so that it can be accessed at /api/remove-bg. This is required for the frontend to make requests to the backend over 443.
@bg_remover.route('/api/remove-bg', methods=['POST'])
def remove_background():
    try:
        # current_app.logger.debug('remove_background() called.')
        file = request.files['image_file']
        content = file.read()
        result = RemoveBgService().remove_background(content)
        return Response(result, mimetype='image/png')
    except Exception as e:
        current_app.logger.error("Error removing background: %s", str(e), exc_info=True)
        return {"detail": str(e)}, 500

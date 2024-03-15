from flask import Flask
from flask_cors import CORS
# from dotenv import load_dotenv
from .routers.bg_remover import bg_remover

# load_dotenv('src/.env')

def create_app():
    app = Flask(__name__)
    # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    # CORS(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    app.register_blueprint(bg_remover)

    @app.route("/")
    def hello():
        return "Hello, World!"

    return app

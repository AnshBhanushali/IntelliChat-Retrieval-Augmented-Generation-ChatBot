import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """
    Configuration class for the Flask application.
    """

    SECRET_KEY = os.getenv('SECRET_KEY')
    DEBUG = os.getenv('DEBUG', 'False').lower() in ['true', '1', 't']
    PORT = int(os.getenv('PORT', 5000))

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')

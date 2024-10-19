from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRETKEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQL_URL')
app.config['DEBUG'] = os.getenv('DEBUG', 'False') == 'True'
app.config['PORT'] = int(os.getenv('PORT', 5000))

CORS(app)
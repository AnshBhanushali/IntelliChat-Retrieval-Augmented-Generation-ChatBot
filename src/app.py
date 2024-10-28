from flask import Flask, request, jsonify, session
from flask_cors import CORS
from src.config import Config
from src.models import db, User
from src.utils import EmbeddingEngine, VectorStore, LanguageModel
import logging
import os

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

embedding_engine = EmbeddingEngine()
vector_store = VectorStore()
language_model = LanguageModel()

UPLOAD_FOLDER = 'data/documents/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.secret_key = app.config['SECRET_KEY']


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    logger.info(f"Signup attempt for username: {username}")

    if not username or not password:
        logger.warning("Signup failed: Missing username or password.")
        return jsonify({'message': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        logger.warning(f"Signup failed: User '{username}' already exists.")
        return jsonify({'message': 'User already exists'}), 409

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    logger.info(f"User '{username}' created successfully.")
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    logger.info(f"Login attempt for username: {username}")

    if not username or not password:
        logger.warning("Login failed: Missing username or password.")
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        session['user_id'] = user.id
        logger.info(f"User '{username}' logged in successfully.")
        return jsonify({'message': 'Login successful'}), 200

    logger.warning(f"Login failed: Invalid credentials for username '{username}'.")
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    logger.info("User logged out successfully.")
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/chat', methods=['POST'])
def chat():
    if 'user_id' not in session:
        logger.warning("Unauthorized chat attempt.")
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.json
    query = data.get('query')

    logger.info("Chat request received.")

    if not query:
        logger.warning("Chat failed: No query provided.")
        return jsonify({'message': 'No query provided'}), 400

    query_vector = embedding_engine.embed_text(query)
    documents = vector_store.search(query_vector)
    response = generate_response(query, documents)

    logger.info("Chat response generated successfully.")
    return jsonify({'response': response})

def generate_response(query, documents):
    context = "\n\n".join(documents)
    prompt = f"Context:\n{context}\n\nQuestion:\n{query}\n\nAnswer:"
    return language_model.generate(prompt)

@app.errorhandler(404)
def not_found(error):
    logger.error(f"404 Error: {request.url} not found.")
    return jsonify({'message': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"500 Error: Internal server error at {request.url}. Exception: {error}")
    return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=app.config['DEBUG'], port=app.config['PORT'])

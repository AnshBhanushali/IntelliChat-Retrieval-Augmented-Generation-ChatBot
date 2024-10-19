from utils import vectorize_and_save
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    try:
        logger.info("Starting document vectorization...")
        vectorize_and_save(documents_path='data/documents/', embeddings_output='data/embeddings.pkl')
        logger.info("Document vectorization completed successfully.")
    except Exception as e:
        logger.error(f"An error occurred during document vectorization: {e}")

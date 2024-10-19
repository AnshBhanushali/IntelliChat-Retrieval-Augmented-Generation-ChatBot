import os
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import pickle
from transformers import AutoModelForCausalLM, AutoTokenizer
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmbeddingEngine:

    # Handles embedding of textual data using sentence transformer

    def __init__(self, model_name = 'all-MiniLM-L6-v2'):

        # initializes embedding model

        logger.info(f"Loading embedding model : {model_name}")
        self.model = SentenceTransformer(model_name)
        logger.info("Embedding model loaded successfully.")

    def embed_text(self, text):

        # generates embedding for provided data

        if isinstance(text, str):
            texts = [texts]
        logger.info(f"Genrating embeddings for {len(texts)} text(s).")
        embeddings = self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        return embeddings







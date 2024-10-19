# utils.py

import os
import numpy as np
import faiss
import pickle
import logging
from sentence_transformers import SentenceTransformer
from transformers import AutoModelForCausalLM, AutoTokenizer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmbeddingEngine:
    """
    Handles embedding of textual data using Sentence Transformers.
    """

    def __init__(self, model_name='all-MiniLM-L6-v2'):
        """
        Initializes the embedding model.
        """
        logger.info(f"Loading embedding model: {model_name}")
        self.model = SentenceTransformer(model_name)
        logger.info("Embedding model loaded successfully.")

    def embed_text(self, texts):
        """
        Generates embeddings for the provided texts.
        """
        if isinstance(texts, str):
            texts = [texts]
        logger.info(f"Generating embeddings for {len(texts)} text(s).")
        embeddings = self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        return embeddings


def load_documents(path='data/documents/'):
    """
    Loads text documents from the specified directory.
    """
    documents = []
    filenames = []
    logger.info(f"Loading documents from: {path}")
    if not os.path.exists(path):
        logger.error(f"Documents directory does not exist: {path}")
        raise FileNotFoundError(f"Documents directory does not exist: {path}")

    for filename in os.listdir(path):
        if filename.endswith('.txt'):
            file_path = os.path.join(path, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    documents.append(content)
                    filenames.append(filename)
                    logger.debug(f"Loaded document: {filename}")
            except Exception as e:
                logger.error(f"Error reading {file_path}: {e}")
    logger.info(f"Loaded {len(documents)} documents.")
    return documents, filenames


class VectorStore:
    """
    Manages vector embeddings and performs similarity searches using FAISS.
    """

    def __init__(self, embeddings_path='data/embeddings.pkl'):
        """
        Initializes the VectorStore by loading embeddings and setting up the FAISS index.
        """
        logger.info(f"Loading embeddings from: {embeddings_path}")
        if os.path.exists(embeddings_path):
            with open(embeddings_path, 'rb') as f:
                data = pickle.load(f)
            self.embeddings = np.array(data['embeddings']).astype('float32')
            self.documents = data['documents']
            self.filenames = data['filenames']
            logger.info(f"Loaded {len(self.documents)} embeddings.")
        else:
            logger.warning(f"Embeddings file not found at {embeddings_path}. Initializing empty VectorStore.")
            self.embeddings = np.empty((0, 384), dtype='float32') 
            self.documents = []
            self.filenames = []

        dimension = self.embeddings.shape[1] if self.embeddings.shape[0] > 0 else 384 
        logger.info(f"Initializing FAISS index with dimension: {dimension}")
        self.index = faiss.IndexFlatL2(dimension)
        if self.embeddings.shape[0] > 0:
            self.index.add(self.embeddings)
            logger.info("FAISS index initialized and embeddings added.")
        else:
            logger.info("FAISS index initialized with no embeddings.")

    def add_document(self, embedding, document, filename):
        """
        Adds a new document and its embedding to the vector store.
        """
        self.embeddings = np.vstack([self.embeddings, embedding.astype('float32')])
        self.documents.append(document)
        self.filenames.append(filename)
        self.index.add(embedding.reshape(1, -1).astype('float32'))
        logger.info(f"Added document '{filename}' to the vector store.")

    def save_embeddings(self, embeddings_path='data/embeddings.pkl'):
        """
        Saves the embeddings, documents, and filenames to a pickle file.
        """
        with open(embeddings_path, 'wb') as f:
            pickle.dump({
                'embeddings': self.embeddings,
                'documents': self.documents,
                'filenames': self.filenames
            }, f)
        logger.info(f"Embeddings saved successfully to {embeddings_path}.")

    def search(self, query_vector, top_k=3):
        """
        Searches for the top_k most similar documents to the query_vector.
        """
        logger.info(f"Searching for top {top_k} similar documents.")
        if self.embeddings.shape[0] == 0:
            logger.warning("Vector store is empty. Returning empty results.")
            return []

        if query_vector.ndim == 1:
            query_vector = query_vector.reshape(1, -1)
        distances, indices = self.index.search(query_vector.astype('float32'), top_k)
        results = [self.documents[idx] for idx in indices[0]]
        logger.info("Search completed.")
        return results


class LanguageModel:
    """
    Generates responses using a pre-trained language model.
    """

    def __init__(self, model_name='gpt2'):
        """
        Initializes the language model and tokenizer.
        """
        logger.info(f"Loading language model: {model_name}")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        logger.info("Language model loaded successfully.")

    def generate(self, prompt, max_length=150, do_sample=True, top_p=0.95, top_k=60):
        """
        Generates text based on the provided prompt.
        """
        logger.info("Generating response from language model.")
        inputs = self.tokenizer.encode(prompt, return_tensors='pt')
        outputs = self.model.generate(
            inputs,
            max_length=max_length,
            do_sample=do_sample,
            top_p=top_p,
            top_k=top_k,
            pad_token_id=self.tokenizer.eos_token_id  
        )
        text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        response = text[len(prompt):].strip()
        logger.info("Response generated successfully.")
        return response


def vectorize_and_save(documents_path='data/documents/', embeddings_output='data/embeddings.pkl'):
    """
    Embeds documents and saves the embeddings along with documents and filenames to a pickle file.
    """
    logger.info("Starting vectorization of documents.")
    engine = EmbeddingEngine()
    documents, filenames = load_documents(documents_path)
    embeddings = engine.embed_text(documents)
    logger.info("Embedding generation completed.")

    output_dir = os.path.dirname(embeddings_output)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        logger.info(f"Created directory for embeddings: {output_dir}")

    logger.info(f"Saving embeddings to: {embeddings_output}")
    with open(embeddings_output, 'wb') as f:
        pickle.dump({
            'embeddings': embeddings,
            'documents': documents,
            'filenames': filenames
        }, f)
    logger.info("Embeddings saved successfully.")


if __name__ == "__main__":
    try:
        vectorize_and_save()
    except Exception as e:
        logger.error(f"An error occurred during vectorization: {e}")

from huggingface_hub import InferenceClient
from langchain_core.embeddings import Embeddings


class HFEmbedding(Embeddings):

    def __init__(self, api_key):
        self.client = InferenceClient(
            provider="hf-inference",
            api_key=api_key
        )

        self.model = "sentence-transformers/all-MiniLM-L6-v2"

    def embed_query(self, text: str) -> list[float]:

        embedding = self.client.feature_extraction(
            text,
            model=self.model
        )

        return embedding.tolist()

    def embed_documents(
        self,
        texts: list[str]
    ) -> list[list[float]]:

        embeddings = self.client.feature_extraction(
            texts,
            model=self.model
        )

        return embeddings.tolist()
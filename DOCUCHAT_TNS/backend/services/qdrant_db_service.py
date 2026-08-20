import os
import re
import shutil

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    Filter,
    FieldCondition,
    MatchValue,
    PayloadSchemaType,
)
from langchain_qdrant import QdrantVectorStore

load_dotenv()


QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not QDRANT_URL:
    raise RuntimeError("QDRANT_URL is not configured")

if not QDRANT_API_KEY:
    raise RuntimeError("QDRANT_API_KEY is not configured")


qdrant_client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)


COLLECTION_NAME = "docuchat_documents"


def sanitize_topic_name(topic_name):

    safe_topic_name = (
        topic_name or "default"
    ).strip().lower()

    safe_topic_name = re.sub(
        r"[^a-z0-9\s]",
        "",
        safe_topic_name
    )

    safe_topic_name = re.sub(
        r"\s+",
        "_",
        safe_topic_name
    )

    return safe_topic_name


def ensure_collection(embeddings):

    collections = qdrant_client.get_collections()

    existing_collections = [
        collection.name
        for collection in collections.collections
    ]

    # Create collection if it doesn't exist
    if COLLECTION_NAME not in existing_collections:

        test_embedding = embeddings.embed_query(
            "Qdrant collection initialization"
        )

        vector_size = len(test_embedding)

        print(
            f"[QDRANT] Creating collection "
            f"'{COLLECTION_NAME}' "
            f"with vector size {vector_size}"
        )

        qdrant_client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE,
            ),
        )

        print("[QDRANT] Collection created")

    else:

        print(
            f"[QDRANT] Collection already exists: "
            f"{COLLECTION_NAME}"
        )

    # Create indexes required for filtering
    qdrant_client.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="metadata.user_id",
        field_schema=PayloadSchemaType.KEYWORD,
    )

    qdrant_client.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="metadata.session_id",
        field_schema=PayloadSchemaType.KEYWORD,
    )

    qdrant_client.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="metadata.topic_name",
        field_schema=PayloadSchemaType.KEYWORD,
    )

    print("[QDRANT] Payload indexes ready")


def get_vector_store(
    topic_name,
    user_id,
    session_id,
    embeddings,
):

    if not user_id:
        raise ValueError(
            "user_id is required"
        )

    if not session_id:
        raise ValueError(
            "session_id is required"
        )

    safe_topic_name = sanitize_topic_name(
        topic_name
    )

    # Create the collection if this is the
    # first time DOCUCHAT is using Qdrant.
    ensure_collection(embeddings)

    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings,
    )

    print(
        f"[QDRANT] Vector store ready | "
        f"user={user_id} | "
        f"session={session_id} | "
        f"topic={safe_topic_name}"
    )

    return vector_store


def delete_vector_db(user_id, session_id):

    try:
        qdrant_client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="metadata.user_id",
                        match=MatchValue(
                            value=str(user_id)
                        ),
                    ),
                    FieldCondition(
                        key="metadata.session_id",
                        match=MatchValue(
                            value=str(session_id)
                        ),
                    ),
                ]
            ),
        )

        print(
            f"[DELETED] Vector DB: "
            f"Qdrant session {session_id}"
        )

        return True

    except Exception as e:

        print(
            f"[ERROR] Error deleting vector DB: {e}"
        )

        return False




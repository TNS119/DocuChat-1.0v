import requests

MODAL_URL = "https://nikhilendarsai119--docuchat-docling-extract-documents.modal.run"


def extract_documents(pdf_bytes: bytes):

    files = {
        "pdf": ("document.pdf", pdf_bytes, "application/pdf")
    }

    response = requests.post(
        MODAL_URL,
        files=files,
        timeout=300
    )

    response.raise_for_status()

    return response.json()
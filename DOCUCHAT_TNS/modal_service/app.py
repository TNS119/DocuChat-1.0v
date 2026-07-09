import tempfile

import modal
from fastapi import UploadFile, File

from docling_service.documents_reader import read_document
from docling_service.serializer import serialize_documents

app = modal.App("docuchat-docling")

image = (
    modal.Image.debian_slim()
    .apt_install(
        "libgl1",
        "libglib2.0-0",
        "libsm6",
        "libxext6",
        "libxrender1",
        "libxcb1",
    )
    .pip_install_from_requirements("requirements.txt")
    .add_local_python_source("docling_service")
)


@app.function(image=image)
@modal.fastapi_endpoint(method="POST")
async def extract_documents(pdf: UploadFile = File(...)):

    pdf_bytes = await pdf.read()

    with tempfile.NamedTemporaryFile(
        suffix=".pdf",
        delete=True
    ) as temp_pdf:

        temp_pdf.write(pdf_bytes)
        temp_pdf.flush()

        docs = read_document(temp_pdf.name)

    return serialize_documents(docs)

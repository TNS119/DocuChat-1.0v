from services.modal_service import extract_documents

with open("sample.pdf", "rb") as f:
    docs = extract_documents(f.read())

print(f"Received {len(docs)} documents")

print(docs[0])
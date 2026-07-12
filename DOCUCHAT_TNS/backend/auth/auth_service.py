from datetime import datetime
from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from auth.password_handler import (
    hash_password,
    verify_password
)
from auth.jwt_handler import create_access_token
from services.mongodb import users_collection


def register_user(user):

    try:

        users_collection.insert_one(
            {
                "username": user.username,
                "password": hash_password(user.password),
                "created_at": datetime.utcnow()
            }
        )

        return {
            "success": True,
            "message": "User registered successfully."
        }

    except DuplicateKeyError:

        return {
            "success": False,
            "message": "Username already exists."
        }


def login_user(user):

    existing_user = users_collection.find_one(
        {
            "username": user.username
        }
    )

    if existing_user is None:

        return {
            "success": False,
            "message": "Invalid username or password."
        }

    if not verify_password(
        user.password,
        existing_user["password"]
    ):

        return {
            "success": False,
            "message": "Invalid username or password."
        }

    token = create_access_token(
        {
            "sub": existing_user["username"],
            "user_id": str(existing_user["_id"])
        }
    )

    return {
        "success": True,
        "message": "Login successful.",
        "username": existing_user["username"],
        "user_id": str(existing_user["_id"]),
        "token": token
    }
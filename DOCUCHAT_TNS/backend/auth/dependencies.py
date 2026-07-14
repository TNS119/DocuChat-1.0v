from fastapi import Cookie, HTTPException, status, Request

from auth.jwt_handler import verify_access_token


def get_current_user(
    request: Request,
    access_token: str = Cookie(default=None)
):

    token = access_token

    if token is None:
        auth_header = request.headers.get("authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1]

    if token is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first."
        )

    payload = verify_access_token(token)

    if payload is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token."
        )

    return {
        "username": payload["sub"],
        "user_id": payload["user_id"]
    }
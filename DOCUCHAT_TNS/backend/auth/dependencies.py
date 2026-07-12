from fastapi import Cookie, HTTPException, status

from auth.jwt_handler import verify_access_token


def get_current_user(
    access_token: str = Cookie(default=None)
):

    if access_token is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please login first."
        )

    payload = verify_access_token(access_token)

    if payload is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token."
        )

    return {
        "username": payload["sub"],
        "user_id": payload["user_id"]
    }
from fastapi import APIRouter

from auth.models import RegisterRequest
from auth.auth_service import register_user

from fastapi import Response, status
from auth.models import LoginRequest
from auth.auth_service import login_user

from fastapi import Depends
from auth.dependencies import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: RegisterRequest):
    return register_user(user)

# print("Auth router loaded")
# print(router.routes)



@router.post("/login")
def login(
    user: LoginRequest,
    response: Response
):

    result = login_user(user)

    if not result["success"]:

        response.status_code = status.HTTP_401_UNAUTHORIZED

        return result

    response.set_cookie(
        key="access_token",
        value=result["token"],
        httponly=True,
        secure=False,
        samesite="Lax"
    )

    return {
        "success": True,
        "message": result["message"],
        "username": result["username"]
    }



@router.get("/me")
def me(
    current_user = Depends(get_current_user)
):

    return {
        "success": True,
        "user": current_user
    }



from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "django-insecure-(=%78xr$qh)f^@)i=99)t*d^%reuly66hhf5h^_+4*_mjh($4x"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

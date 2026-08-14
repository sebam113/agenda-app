from pydantic import BaseModel
from typing import Optional

class ContactoCreate(BaseModel):
    nombre: str
    email: str
    telefono: Optional[str] = None
    nota: Optional[str] = None

class ContactoResponse(ContactoCreate):
    id: int

    class Config:
        orm_mode = True
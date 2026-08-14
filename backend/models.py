from sqlalchemy import Column, Integer, String
from database import Base

class Contacto(Base):
    __tablename__ = "contactos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    telefono = Column(String(30))
    nota = Column(String)
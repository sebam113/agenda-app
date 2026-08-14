from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import Optional, List

import models
import schemas
from database import engine, SessionLocal, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/contactos", response_model=schemas.ContactoResponse)
def crear_contacto(contacto: schemas.ContactoCreate, db: Session = Depends(get_db)):
    nuevo = models.Contacto(**contacto.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@app.get("/contactos", response_model=List[schemas.ContactoResponse])
def buscar_contactos(nombre: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Contacto)
    if nombre:
        query = query.filter(models.Contacto.nombre.ilike(f"%{nombre}%"))
    return query.all()
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional, List
import models
import schemas
from database import engine, SessionLocal, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.put("/contactos/{contacto_id}", response_model=schemas.ContactoResponse)
def actualizar_contacto(contacto_id: int, contacto: schemas.ContactoUpdate, db: Session = Depends(get_db)):
    existente = db.query(models.Contacto).filter(models.Contacto.id == contacto_id).first()
    if not existente:
        raise HTTPException(status_code=404, detail="Contacto no encontrado")
    for campo, valor in contacto.dict().items():
        setattr(existente, campo, valor)
    db.commit()
    db.refresh(existente)
    return existente
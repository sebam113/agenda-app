# Agenda-App

Proyecto fullstack de aprendizaje y portfolio, construido para dominar el ciclo completo de desarrollo: backend, frontend, base de datos y despliegue en producción.

El caso de uso actual es una agenda de contactos (CRUD), pero el dominio es intercambiable a propósito: el objetivo final es evolucionar hacia un sistema genérico reutilizable (agenda de turnos, clientes, socios, etc. — aplicable a un gimnasio, una barbería, una empresa de construcción, un supermercado) con autenticación, roles de administrador/usuario y CRUD completo.

## 🔗 Demo

- **Frontend (app en producción):** https://agenda-app-chi-bice.vercel.app
- **Backend (API):** https://agenda-app-sf2i.onrender.com
- **Docs interactivas de la API (Swagger):** https://agenda-app-sf2i.onrender.com/docs

> ⚠️ El backend está en el free tier de Render, que "duerme" tras 15 min de inactividad. El primer request puede tardar 30-50 segundos en responder mientras el servidor arranca — no es un bug.

## 🛠️ Stack tecnológico

**Backend**
- FastAPI (Python) — framework de API
- SQLAlchemy — ORM
- Pydantic — validación de datos (schemas)

**Frontend**
- React 19
- Vite — bundler / dev server

**Base de datos**
- PostgreSQL (hosteado en [Neon](https://neon.tech), free tier)

**Infraestructura / Despliegue**
- Backend desplegado en [Render](https://render.com) (free tier)
- Frontend desplegado en [Vercel](https://vercel.com) (free tier)
- Despliegue automático (auto-deploy) al hacer push a `main`
- Entorno de desarrollo local containerizado con Docker

## ✅ Funcionalidades actuales

CRUD de contactos:

- [x] Crear contacto (`POST /contactos`)
- [x] Listar / buscar contactos (`GET /contactos`)
- [x] Actualizar contacto completo (`PUT /contactos/{id}`)
- [ ] Actualizar contacto parcial (`PATCH /contactos/{id}`) — en desarrollo
- [ ] Eliminar contacto (`DELETE /contactos/{id}`) — pendiente

## 💻 Cómo correrlo localmente

Requisitos: Docker Desktop instalado.

```bash
# 1. Clonar el repo
git clone https://github.com/sebam113/agenda-app.git
cd agenda-app

# 2. Crear el archivo .env en /backend con las credenciales de la base de datos
# (ver .env.example si existe, o pedir las credenciales de Neon)

# 3. Levantar todo con Docker Compose
docker compose up
```

Esto levanta:
- Backend en `http://localhost:8000`
- Frontend en `http://localhost:5173`

## 📁 Estructura del proyecto

```
agenda-app/
├── backend/
│   ├── main.py         # Endpoints de la API
│   ├── models.py        # Modelos de SQLAlchemy (tabla contactos)
│   ├── schemas.py        # Schemas de Pydantic (validación)
│   └── database.py       # Conexión a la base de datos
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── components/    # Piezas genéricas (Hero, Footer, etc.)
│       └── features/
│           └── contactos/  # Todo lo relacionado al dominio "contactos"
│               ├── ContactosPage.jsx (o similar)
│               └── contactosApi.js  # Fetch logic, aislado por dominio
└── docker-compose.yml
```

El frontend está organizado por **features de dominio** (no por tipo de archivo): cada dominio tiene sus componentes y su propia lógica de conexión a la API, aislados de otros dominios. Esto facilita agregar nuevos dominios (ej. "turnos", "usuarios") sin tocar el código existente.

## 🗺️ Roadmap

Orden de próximos pasos:

1. Completar CRUD: `PATCH` y `DELETE` de contactos
2. Migrar `API_URL` hardcodeado a variable de entorno (`VITE_API_URL`) en el frontend
3. Adoptar Alembic para migraciones de base de datos
4. Autenticación propia (registro/login, hash con bcrypt, JWT)
5. Roles de administrador/usuario
6. Recuperación de cuenta (token temporal por email)
7. OAuth (Google/GitHub)

## 📚 Aprendizajes del proyecto

Algunos aprendizajes clave durante el desarrollo:

- Verificar siempre el contenido real de un archivo antes de asumir que un cambio se aplicó correctamente.
- Nunca commitear `.env` ni entornos virtuales; si algo se trackeó por error, `.gitignore` no lo cubre retroactivamente.
- El comportamiento de "app dormida" en el free tier de Render es esperado, no un error.
- La importancia de separar la lógica de fetch por dominio (`*Api.js`) para mantener el frontend escalable.

## 🤝 Sobre este proyecto

Este proyecto es parte de mi proceso de aprendizaje autodidacta en desarrollo backend, con orientación a ciberseguridad. Está en desarrollo activo — la meta es seguir evolucionándolo con autenticación, roles y funcionalidades más avanzadas.

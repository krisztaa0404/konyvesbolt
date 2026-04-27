# Könyvesbolt

Teljes körű online könyvesbolt webalkalmazás React + Spring Boot technológiával. Funkciói közé tartozik a könyvböngészés, vásárlás, kívánságlista kezelés, rendeléskövetés, szezonális akciók, és egy manager/admin felület a készlet- és rendeléskezeléshez.

## Technológiák

- **Frontend:** React 19, TypeScript, Material UI, TanStack Query, Zustand
- **Backend:** Spring Boot (Java 21), Spring Security, JPA/Hibernate, Liquibase
- **Adatbázis:** PostgreSQL 16

## Előfeltételek

- [Docker](https://www.docker.com/) és Docker Compose
- Java 21+
- Node.js 20+

## Indítás

Frontend és backend lokálisan fut, az adatbázis Dockerben.

### 1. Környezeti változók beállítása

```bash
cp .env.example .env
```

### 2. Adatbázis indítása

```bash
cd backend
docker-compose up -d
```

### 3. Backend indítása

```bash
cd backend
./mvnw spring-boot:run
```

### 4. Frontend indítása

```bash
cd frontend
npm install
npm run dev
```

### Elérhetőségek

| Szolgáltatás | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| pgAdmin | http://localhost:5050 |
| Swagger UI | http://localhost:8080/swagger-ui.html |

## Indítás Dockerrel (minden szolgáltatás konténerben)

```bash
cp .env.example .env
```

A `.env` fájlban állítsd be a frontend backend URL-t a konténernévre:
```
VITE_BACKEND_URL=http://backend:8080
```

```bash
docker-compose up --build
```

A frontend ebben az esetben http://localhost:3000 címen érhető el, a többi szolgáltatás ugyanazon a porton fut mint lokális indításnál.

## Projekt struktúra

```
konyvesbolt/
├── backend/                        # Spring Boot REST API
│   ├── src/main/java/              # Java forráskód
│   │   └── .../controller/        # REST végpontok
│   │   └── .../service/           # Üzleti logika
│   │   └── .../repository/        # Adatbázis réteg
│   │   └── .../entity/            # JPA entitások
│   │   └── .../dto/               # Adatátviteli objektumok
│   │   └── .../security/          # JWT, Spring Security konfiguráció
│   ├── src/main/resources/
│   │   └── db/changelog/          # Liquibase migrációk
│   └── Dockerfile
├── frontend/                       # React webalkalmazás
│   ├── src/
│   │   └── components/            # Újrafelhasználható UI komponensek
│   │   └── pages/                 # Oldalak (customer + manager)
│   │   └── services/              # API hívások (Axios)
│   │   └── store/                 # Zustand állapotkezelés
│   │   └── hooks/                 # Custom React hookok
│   │   └── router/                # Routing, route guard-ok
│   │   └── types/                 # TypeScript típusok
│   └── Dockerfile
├── docs/                           # Szoftverdokumentáció
├── prompts/                        # AI használat dokumentációja
├── docker-compose.yml
└── .env.example
```

## Dokumentáció

| Dokumentum | Elérhetőség |
|---|---|
| Szoftverdokumentáció (tech stack, funkcionális és nem-funkcionális követelmények) | [docs/documentation.md](docs/documentation.md) |
| AI használat elemzése, prompt példák | [prompts/ai-usage.md](prompts/ai-usage.md) |
| Backend telepítési részletek | [backend/README.md](backend/README.md) |
| Frontend telepítési részletek | [frontend/README.md](frontend/README.md) |

## Demo felhasználók

Az adatbázis indításkor automatikusan feltöltődik az alábbi tesztfiókokkal:

| Email | Jelszó | Szerepkör | Leírás |
|---|---|---|---|
| `user@test.com` | `password` | USER | Normál vásárló |
| `manager@test.com` | `password` | MANAGER | Készlet- és rendeléskezelés |
| `admin@test.com` | `password` | ADMIN | Teljes hozzáférés |
| `loyalty@test.com` | `password` | USER | Hűségprogramos tag (10% kedvezmény) |

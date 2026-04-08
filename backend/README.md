# Bookstore REST API

Spring Boot REST API for a bookstore with advanced PostgreSQL features including JSONB storage, array types, materialized views, and full-text search.

## Tech Stack

- **Java 21** with Spring Boot 4.0.3
- **PostgreSQL** with advanced features (JSONB, arrays, materialized views, full-text search)
- **Security:** JWT authentication with role-based authorization
- **Architecture:** Layered architecture with facade pattern
- **Audit:** Hibernate Envers for change tracking
- **Database Migration:** Liquibase

## Prerequisites

- Java 21+
- PostgreSQL 13+
- Maven 3.8+

## Setup

### 1. Environment Variables

Create the following environment variables or add to `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/bookstore
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Secret (required for production)
jwt.secret=your-secret-key-here
```

### 2. Database Setup

The application uses Liquibase for database migrations. Tables and materialized views will be created automatically on startup.

### 3. Run Application

```bash
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Documentation

**Swagger UI:** `http://localhost:8080/swagger-ui.html`

Interactive API documentation with all available endpoints and request/response schemas.

## Key Features

- **Advanced PostgreSQL:** JSONB storage for metadata, native array types, full-text search
- **Materialized Views:** Pre-computed analytics (top books, recommendations) with scheduled refresh
- **Security:** JWT authentication, BCrypt password hashing, role-based access control
- **Dynamic Filtering:** Specification pattern for complex queries
- **Audit Trail:** Complete change history on orders using Hibernate Envers
- **Stock Management:** Pessimistic locking prevents overselling
- **Discounts:** Seasonal discounts with flexible scoping (all books, specific books, or genres)

## Test Users

The following test accounts are created automatically via Liquibase (all passwords: `password`):

| Email              | Password   | Role    | Description                       |
|--------------------|------------|---------|-----------------------------------|
| `user@test.com`    | `password` | USER    | Regular user account              |
| `manager@test.com` | `password` | MANAGER | Manager with elevated permissions |
| `admin@test.com`   | `password` | ADMIN   | Full admin access                 |
| `loyalty@test.com` | `password` | USER    | Loyalty member with 10% discount  |
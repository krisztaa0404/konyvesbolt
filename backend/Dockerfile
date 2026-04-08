# Multi-stage build for production-like setup
FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd pom.xml ./

# Make Maven wrapper executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code and build
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose application port
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "app.jar"]

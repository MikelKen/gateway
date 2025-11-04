# Ejemplos de queries GraphQL para probar el Gateway

## Query de salud

query HealthCheck {
health
}

## Obtener todos los usuarios (desde service_erp)

query GetAllUsers {
users {
id
name
email
department
}
}

## Obtener un usuario específico

query GetUser($id: ID!) {
user(id: $id) {
id
name
email
department
}
}

## Obtener analíticas (desde service_bi)

query GetAnalytics {
analytics {
id
metric
value
timestamp
}
}

## Obtener productos (desde service_ml)

query GetProducts {
products {
id
name
price
category
}
}

## Obtener recomendaciones de AI

query GetRecommendations($userId: ID!) {
recommendations(userId: $userId) {
id
userId
productId
score
reason
}
}

## Mutation para crear usuario

mutation CreateUser($name: String!, $email: String!, $department: String) {
createUser(name: $name, email: $email, department: $department) {
id
name
email
department
}
}

## Variables de ejemplo para CreateUser:

{
"name": "Juan Pérez",
"email": "juan.perez@example.com",
"department": "Desarrollo"
}

## Mutation para crear producto

mutation CreateProduct($name: String!, $price: Float!, $category: String) {
createProduct(name: $name, price: $price, category: $category) {
id
name
price
category
}
}

## Variables de ejemplo para CreateProduct:

{
"name": "Laptop Dell",
"price": 1200.99,
"category": "Tecnología"
}

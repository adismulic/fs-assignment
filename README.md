# Fullstack Code Assignment

## Prerequisites
- [Node.js 20 or higher (LTS) and npm](https://nodejs.org/en/download).
- [Docker (optional)](https://docs.docker.com/engine/install/).
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Project Structure
```
/backend
/frontend
```

## Clone source code
```
git clone https://github.com/adismulic/fs-assignment.git && cd fs-assignment
```

## Backend

### Install
```
cd backend
npm install
```

### Environment
Create `.env` in backend or use example.env:
```
PORT=3006
DB_FILE=/tmp/products.db
```

### Run (dev)
```
npm start
```
Common scripts (adjust if different):
- `start`: start backend server
- `test`: run tests
- `lint`: run linter
- `lint:fix`: run linter and fix problems

##  Frontend

### Install
```
cd frontend
npm install
```

### Run (dev)
```
npm run dev
```
Open the printed local URL (e.g. http://localhost:5173).

## Docker (optional)
```
TODO
```

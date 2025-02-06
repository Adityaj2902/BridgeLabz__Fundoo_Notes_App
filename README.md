# Fundoo Notes App

## Overview

Fundoo Notes App is a RESTful API built with Node.js, Express, and TypeScript. It provides functionalities for user authentication, note management, and more.

## Table of Contents

- [Fundoo Notes App](#fundoo-notes-app)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Testing](#testing)
  - [Logging](#logging)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User registration and authentication
- CRUD operations for notes
- Middleware for authentication and error handling
- Logging with Winston and Morgan
- Swagger API documentation

## Project Structure

```plaintext
.
├── .env
├── .gitignore
├── .vscode/
│   └── settings.json
├── logs/
│   ├── requests/
│   │   ├── all.log
│   │   └── daily/
│   ├── server/
│   │   ├── all.log
│   │   ├── daily/
│   │   └── error.log
├── package.json
├── README.md
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── logger.ts
│   ├── controllers/
│   │   ├── note.controller.ts
│   │   └── user.controller.ts
│   ├── index.ts
│   ├── interfaces/
│   │   ├── note.interface.ts
│   │   └── user.interface.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   ├── note.model.ts
│   │   └── user.model.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── note.route.ts
│   │   └── user.route.ts
│   ├── services/
│   │   ├── note.service.ts
│   │   └── user.service.ts
│   ├── swagger/
│   │   ├── swagger.ts
│   │   └── swaggerDefinitions.ts
│   ├── utils/
│   ├── validators/
│   │   ├── note.validator.ts
│   │   └── user.validator.ts
├── tests/
│   ├── integration/
│   └── unit/
├── tsconfig.json
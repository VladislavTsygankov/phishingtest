# Phishing test

# Table of Contents

- [Clients app](#clients-app)
- [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Techstack](#techstack)
  - [Usage](#usage)
  - [Project structure](#project-structure)

## Introduction

Phishing sumulation application to simlate phishing request to chosen email address and awareness application to display and making new phishing attempts

## Techstack

- [MongoDB](https://www.mongodb.com/) - For storing user information and phishing attempts.
- [Refine](https://refine.dev/) - React-based framework for the rapid ✨ development of web applications. Used to display attempts and managing login to application
- [Nestjs](https://nestjs.com/) - Node.js framework to build backend part of applicaiton
- [Lerna](https://lerna.js.org/) - Javascript monorepo tool

## Usage

Download the app

`git clone https://github.com/`

Go to the root folder

`cd phishingtest`

create `.env` file in `./packages/phishing` and `./packages/simulation` with following examples

```
PORT=5000
MONGODB_URL=mongodb://mongodb:27017/
MONGODB_USER=root
MONGODB_PASSWORD=password
SIMULATION_API_URL=http://simulation:5001
CORS_ORIGINS=http://localhost:3000
```

```
PORT=5001
NODEMAILER_USER=tsygankov.vladislav.v@gmail.com
NODEMAILER_PASSWORD="pcjuvekecbravrhl"
RESOLVE_API_URL=http://localhost:5000
CORS_ORIGINS=http://localhost:3000
```

Run application in docker

`docker-compose up -d`

_Note: Frontend application running on http://localhost:3000/._

_Note: Backend application running on http://localhost:5000._


## Project structure

```
phishingrest
├── docker/
│   ├── frontend
│   │
│   ├── phishing
│   │
├── packages/
│   └── frontend/                     //frontend application
│   └── phishing/                     //backend servic
│
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── lerna.json
├── README.md
```

_Note: Monorepo structure managing by lerna._



# 📚 Student Management System - Full Stack Java Application


# 📋 Project Overview

A full-stack web application built with Spring Boot (Java) and React that performs CRUD operations (Create, Read, Update, Delete) for managing student records with MySQL database integration. This project demonstrates the implementation of RESTful APIs, database connectivity, and modern frontend development practices.

# ✨ Features

Backend Features (Spring Boot)

RESTful API endpoints for all CRUD operations

JPA/Hibernate integration with MySQL database

Proper HTTP status code handling

CORS configuration for frontend communication

Data validation and error handling

Clean layered architecture (Controller, Service, Repository)


# Frontend Features (React)

Component-based architecture

State management using useState and useEffect hooks

API integration using Fetch API

Form handling with validation

Navigation between different views

Loading states and error handling

Search functionality to filter students

# CRUD Operations

Operation	Description	API Endpoint

CREATE	Add new student	POST /api/students

READ	View all students	GET /api/students

READ	View single student	GET /api/students/{id}

UPDATE	Edit student	PUT /api/students/{id}

DELETE	Remove student	DELETE /api/students/{id}

# Architecture

The application follows a typical full-stack architecture:

Frontend (React - Port 3000) ↔ Backend (Spring Boot - Port 8080) ↔ Database (MySQL)

React app sends HTTP requests to Spring Boot REST APIs

Spring Boot processes requests and interacts with MySQL database

Data flows back as JSON responses to the React frontend

# 🛠️ Technologies Used

 
# Backend

Technology	Purpose

Java 17	Core programming language
Spring Boot 3.1	Application framework
Spring Data JPA	Database ORM
Hibernate	JPA implementation
MySQL 8.0	Database
Maven	Build tool and dependency management

# Frontend

Technology	Purpose

React 18	UI library for building components
JavaScript (ES6)	Programming language
Fetch API	Making HTTP requests to backend
React Hooks	State management (useState, useEffect)

# Development Tools

Tool	Purpose

Postman	API testing and documentation
Git	Version control
IntelliJ IDEA	Backend development
VS Code	Frontend development
MySQL Workbench	Database management

# 📁 Project Structure

student-management-system/
│
├── backend/ (Spring Boot Application)
│   ├── controller/         # REST API endpoints
│   ├── entity/              # JPA entity classes
│   ├── repository/          # Database access layer
│   └── resources/           # Configuration files
│
└── frontend/ (React Application)
    ├── public/              # Static files
    └── src/                  # React components and styles


# 🚀 Installation and Setup

Java 17 or higher

Node.js and npm

MySQL Server 8.0

Maven 3.8+

Git



# Contact

Your Name - Pachaiyappan E

Project Link: https://github.com/dhanapachai/student-management-system

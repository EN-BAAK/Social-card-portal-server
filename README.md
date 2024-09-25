# Social Card Portal

## Overview

Social Card Portal is a full-stack web project that allows users to create digital cards and manage media content.

### Features

- Admin dashboard for managing customers and media content
- Login functionality with phone number and password
- Ability to create, edit, and delete media and customer information
- Customization options for digital cards

### Authentication

- User authentication with mobile number and password
- Admin verification through cookies

#### Customers

- Manage customer information including name, domain name, and appearance settings
- Retrieve all customers or specific customer details by ID
- Create and edit customer data with link associations

#### Social Medias

- Store media details such as icon images and names in multiple languages
- CRUD operations for media content

#### Link

- Associate customers with social media links
- Create and manage links between customers and social media platforms

## Technologies Used

- Frontend: React, TypeScript, Bootstrap 5, SASS
- Backend: Express, MySQL, JavaScript

## Designed and Coded By

Bassel Abo Khabsa
https://github.com/EN-BAAK

## Usage

1. Clone the repository
2. Navigate to the repo directory: `cd ./repo`
3. Navigate to the database configuration directory: `cd ./config/dbConfig`
4. Add your database details
5. Navigate to the environment variables file: `cd ../.env`
6. Add dependencies
7. Install dependencies using `npm install`
8. To start:

- Start the server using `npm start` in the server folder
- Start with frontend:

1. Clone the Social Card Portal Frontend repo
2. Follow the usages steps in readme file
3. Start the server using `npm start` in the server folder

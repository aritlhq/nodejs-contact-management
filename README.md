# Node.js Contact Management

This is a contact management application built with Node.js, Express, and MySQL. The application is designed to help users manage their contacts.

## Technology Stack
| Tech Name | Desc                             |
| --------- | -------------------------------- |
| Express   | as a BE framework                |
| Joi       | as a validator                   |
| Winston   | as a logger                      |
| BCrypt    | as a password hasher             |
| UUID      | as a unique id generator         |
| Jest      | as a testing framework           |
| Babel     | as a transpiler                  |
| Supertest | as a testing library for Express |

## Features
- User Management
- Contact Management
- Address Management

### User Management Requirements
Docs: [User API Spec](docs/user.md)

User Data:
- Username
- Password
- Name

User API:
- Register User
- Login User
- Update User
- Get User
- Logout User

### Contact Management Requirements
Docs: [Contact API Spec](docs/contact.md)


Contact Data:
- First Name
- Last Name
- Email
- Phone Number

Contact API:
- Create Contact
- Update Contact
- Get Contact
- Search Contact
- Remove Contact

### Address Management Requirements
Docs: [Address API Spec](docs/address.md)

Contact Address Data:
- Street
- City
- Province
- Country
- Postal Code

Adress API:
- Create Address
- Update Address
- Get Address
- List Address
- Remove Address

## Directory Structure

| Directory           | Desc                                                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/applications/` | Serves as the base layer that provides configuration and initialization of core services (database, logging, and web server) for the contact management application. |
| `src/services/`     | Serves to store all application logic.                                                                                                                               |
| `src/controllers/`  | Serves to handle the API.                                                                                                                                            |
| `src/validations/`  | Serves to handle the API validation.                                                                                                                                 |
| `src/routes/`       | Serves to handle the API routes.                                                                                                                                     |

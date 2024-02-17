# Bus Booking System - Frontend

Welcome to the Bus Booking System Frontend! This web application allows users to search for available buses, make bookings, and manage their bookings conveniently.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)

## Introduction

The Bus Booking System Frontend is built using React.js, providing an intuitive user interface for managing bus bookings. Users can perform actions such as searching for buses, making bookings, and managing their bookings seamlessly through the frontend interface.

## Technologies Used

- React.js: A JavaScript library for building user interfaces.
- React Router: For managing navigation within the application.
- Bootstrap: For styling and layout of the user interface.
- Axios: For making HTTP requests to the backend APIs.
- React Toastify: For displaying notifications to users.

## Features

1. **User Authentication:**
   - Users can sign up, log in, and log out securely.

2. **Bus Search:**
   - Users can search for available buses based on various criteria such as origin, destination, date, etc.

3. **Booking Management:**
   - Users can make bookings for available buses and manage their bookings.
   - Features include adding, editing, and canceling bookings.

4. **Admin Panel:**
   - Administrators have access to an admin panel where they can manage buses, bookings, users, etc.
   - Admin functionalities include adding, editing, and deleting buses, routes, stations, etc.

5. **Passenger List PDF:**
   - Bus conductors/administrators can download PDFs of passenger lists for reference and management purposes.

## Setup Instructions

1. **Clone the Repository:**
    ```
    git clone <repository-url>
    ```

2. **Navigate to the Project Directory:**
    ```
    cd BusBookingSystemFrontend
    ```

3. **Install Dependencies:**
    ```
    npm install
    ```

4. **Run the Application:**
    ```
    npm start
    npm run dev
    ```
    The application will start running on `http://localhost:3001` for admin pannel and `http://localhost:3000` for frontend UI.


# Bus Booking System Backend

Welcome to the Bus Booking System Backend! This project provides the backend APIs for managing bus bookings, routes, users, and other related functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Introduction

The Bus Booking System Backend is a crucial component of the Bus Booking System project. It provides RESTful APIs that handle various operations such as creating, updating, and deleting bookings, managing routes, handling user authentication, and more.

## Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- Maven

## Features

- **User Management:** APIs for user registration, login, and authentication.
- **Booking Management:** APIs for creating, updating, and canceling bus bookings.
- **Route Management:** APIs for managing routes, including adding new routes, updating route details, and deleting routes.
- **Authorization and Authentication:** Integration with Spring Security for secure user authentication and authorization.
- **Error Handling:** Comprehensive error handling for API requests, including appropriate HTTP status codes and error messages.
- **Documentation:** Detailed API documentation to help developers understand and use the backend APIs effectively.

## Setup Instructions

1. **Clone the Repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd BusBookingSystemBackend
    ```

3. **Configure Database:**

    Configure your database settings in the `application.properties` file.

4. **Build and Run the Application:**

    ```bash
    mvn spring-boot:run
    ```

    The application will start running on `http://localhost:7071`.

## API Documentation

You can find the detailed API documentation in the `apidoc.txt` file in the project repository. Additionally, you can import the provided Postman collection `CDACBusBookingSystem.postman_collection.json` to explore and test the APIs interactively.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please ensure that your pull request follows the project's coding conventions and includes relevant tests if applicable.


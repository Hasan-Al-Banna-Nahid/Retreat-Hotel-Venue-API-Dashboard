# Retreat Booking Management API

This project provides a robust API for managing hotel and venue bookings for a retreat. It's built with Node.js, Express, and TypeScript, utilizing Prisma as an ORM for database interactions. The API supports various operations for managing bookings and venues, integrated with a live deployment for demonstration.

## Live Site

The API is deployed and accessible at:
[https://retreat-hotel-venue-api-dashboard.onrender.com/](https://retreat-hotel-venue-api-dashboard.onrender.com/)

## Technologies Used

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **TypeScript**: Statically typed superset of JavaScript.
*   **Prisma**: Next-generation ORM for Node.js and TypeScript.
*   **PostgreSQL**: Relational database (assumed, based on Prisma usage).
*   **Render**: Cloud platform for hosting the live API.
*   **Vercel**: (Potentially for frontend or serverless functions, though not explicit for this API).

## Project Structure

The project follows a modular and layered architecture to ensure separation of concerns and maintainability.

```
.
├───app.ts                # Main Express application setup
├───server.ts             # Server entry point and database connection
├───prisma/               # Prisma schema and migrations
│   ├───schema.prisma     # Database schema definition
│   ├───seed.ts           # Database seeding script
│   └───migrations/       # Database migration files
└───src/
    └───app/
        ├───common/       # Common utilities, middleware, and types
        │   ├───middleware.ts   # Global Express middleware
        │   ├───types.ts        # Shared TypeScript type definitions
        │   └───utils.ts        # Utility functions
        ├───config/       # Application configuration
        │   ├───constants.ts    # Global constants
        │   └───database.ts     # Database connection configuration
        └───modules/      # Feature-specific modules (e.g., bookings, venues)
            ├───bookings/
            │   ├───booking.controller.ts   # Handles booking-related requests
            │   ├───booking.interface.ts    # Booking model interface
            │   ├───booking.routes.ts       # Defines booking API endpoints
            │   ├───booking.service.ts      # Business logic for bookings
            │   └───booking.validation.ts   # Joi schema for booking validation
            └───venues/
                ├───venue.controller.ts     # Handles venue-related requests
                ├───venue.interface.ts      # Venue model interface
                ├───venue.routes.ts         # Defines venue API endpoints
                ├───venue.service.ts        # Business logic for venues
                └───venue.validation.ts     # Joi schema for venue validation
```

### How it Works

1.  **`server.ts`**: This is the application's entry point. It initializes the Express app (`app.ts`), sets up the database connection using Prisma, and starts the server.
2.  **`app.ts`**: Configures the Express application, including applying global middleware, setting up JSON body parsing, and integrating the defined API routes from various modules.
3.  **`src/app/config`**: Contains configuration files like `constants.ts` for global values and `database.ts` for Prisma client setup and connection.
4.  **`src/app/common`**:
    *   **`middleware.ts`**: Defines reusable middleware functions that can be applied globally or to specific routes (e.g., error handling, authentication, logging).
    *   **`types.ts`**: Holds shared TypeScript interfaces and types used across the application, promoting strong typing and code consistency.
    *   **`utils.ts`**: Contains general utility functions.
5.  **`src/app/modules`**: This directory houses the core business logic, organized by feature (e.g., `bookings`, `venues`). Each module typically contains:
    *   **`.routes.ts`**: Defines the API endpoints (GET, POST, PUT, DELETE) for the module and links them to specific controller methods.
    *   **`.validation.ts`**: Contains validation schemas (likely using a library like Joi or Zod) to ensure incoming request data adheres to expected formats and rules.
    *   **`.controller.ts`**: Responsible for handling incoming HTTP requests, calling the appropriate service methods, and sending back HTTP responses. It acts as the interface between the routes and the business logic.
    *   **`.service.ts`**: Encapsulates the business logic. It interacts with the database (via Prisma) and performs operations specific to the module (e.g., creating a booking, fetching venue details).
    *   **`.interface.ts`**: Defines the TypeScript interfaces for the data models specific to the module, ensuring type safety throughout the codebase.

### Database (Prisma)

*   **`prisma/schema.prisma`**: This file defines the application's database schema. It describes the models (e.g., `Booking`, `Venue`) and their relationships. Prisma uses this schema to generate a type-safe client and manage migrations.
*   **`prisma/migrations`**: Stores version-controlled database migrations. When the `schema.prisma` changes, a new migration file is generated to apply those changes to the database.
*   **`prisma/seed.ts`**: A script used to populate the database with initial data, useful for development and testing environments.

### API Endpoints

The API exposes endpoints for managing both bookings and venues. Below is a high-level overview. For detailed endpoints, please refer to the `.routes.ts` files within each module.

**Bookings:**
*   `GET /api/bookings`: Retrieve all bookings.
*   `GET /api/bookings/:id`: Retrieve a specific booking by ID.
*   `POST /api/bookings`: Create a new booking.
*   `PUT /api/bookings/:id`: Update an existing booking.
*   `DELETE /api/bookings/:id`: Delete a booking.

**Venues:**
*   `GET /api/venues`: Retrieve all venues.
*   `GET /api/venues/:id`: Retrieve a specific venue by ID.
*   `POST /api/venues`: Create a new venue.
*   `PUT /api/venues/:id`: Update an existing venue.
*   `DELETE /api/venues/:id`: Delete a venue.

### Deployment

The application is deployed on [Render](https://render.com/). Render provides a platform to host web services, databases, and more, allowing for continuous deployment directly from a Git repository.

The `vercel.json` file might indicate a setup for serverless functions or a frontend application hosted on Vercel, which could interact with this API. However, for the API itself, Render is explicitly mentioned.

---
This `README.md` provides a comprehensive overview of the Retreat Booking Management API.

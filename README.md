### Project Setup Instructions

1. Clone the project repository:
   - Use `git clone https://github.com/meghanaN05
/paytm.git`

To install the project, follow these steps:

1. For the frontend:

   - Run `npm install` in the `frontend` directory.
   - Use `npm run dev` to start the development server.

2. For the backend:
   - Run `npm install` in the `backend` directory.
   - Use `node index.js` to start the backend server.

### Endpoints:

- Frontend:

  - `/signup`: Sign up a new user.
  - `/signin`: Sign in an existing user.
  - `/dashboard`: View user dashboard.
  - `/send`: Send money to another user.
  - `/update`: Update user information.
  - `/logout`: Log out the user.

- Backend:
  - `POST /api/v1/user/signup`: Sign up a new user.
  - `POST /api/v1/user/signin`: Sign in an existing user.
  - `GET /api/v1/user/me`: Get user details.
  - `GET /api/v1/account/balance`: Get user balance.
  - `PUT /api/v1/user/update`: Update user information.
  - `GET /api/v1/user/bulk`: Get users based on filter.

### Setting up MongoDB URL and Password Hashing Secret Key

To set up the MongoDB URL and password hashing secret key:

1. Create a `.env` file in the `backend` directory.
2. Add the following environment variables:
   - `MONGO`: MongoDB connection URL.
   - `JWT_SECRET`: Secret key for password hashing.

Example `.env` file:

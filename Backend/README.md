# E-commerce Recommendation Engine Backend

This is the backend for the "AI-Powered E-commerce Recommendation Engine" project, built with **Node.js**, **Express**, and **MongoDB**. It provides APIs for managing products, users, orders, and recommendations, with a simple initial setup.

## Author

This backend was developed by **Vishal Singh**.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB**: Either a local instance or a MongoDB Atlas database.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository/Backend
```

### 2. Install Dependencies

Navigate to the `Backend` directory and install required packages:

```bash
npm install
```

### 3. Configuration

Create a `.env` file in the `Backend` directory to store environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourDatabaseName
```

Replace `yourDatabaseName` with the name of your MongoDB database. If you're using MongoDB Atlas, replace `MONGO_URI` with your connection string.

### 4. Folder Structure

The backend follows a simple structure:

```
Backend/
├── models/              # Contains Mongoose schemas for MongoDB
│   ├── Product.js
│   ├── User.js
│   └── Order.js
├── routes/              # Defines API routes
│   ├── productRoutes.js
│   ├── userRoutes.js
│   └── recommendationRoutes.js
├── .env                 # Environment variables (not included in Git)
├── server.js            # Main server file
└── package.json         # Dependencies and scripts
```

### 5. Run the Server

Start the server with the following command:

```bash
node server.js
```

The server will run on the port specified in the `.env` file (`5000` by default).

### 6. API Endpoints

#### Base URL: `/api`

- **Products** (`/products`):
  - `GET /api/products`: Get all products
  - `POST /api/products`: Add a new product

- **Users** (`/users`):
  - `POST /api/users`: Add a new user

- **Recommendations** (`/recommendations`):
  - `GET /api/recommendations`: Placeholder for recommendation engine

### 7. Troubleshooting

If you encounter issues, try the following steps:

- Ensure MongoDB is running and accessible with the correct connection string.
- Restart the server after making any changes.
- Double-check file paths and names if you see `MODULE_NOT_FOUND` errors.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See `LICENSE` for more information.



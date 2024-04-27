This project is an e-commerce website that allows users to browse products, add them to a cart, and check out. It serves as a platform to showcase and sell various items online.

## Technology Stack
- **Node.js**: For server-side logic.
- **Express.js**: Web application framework for Node.js.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB and Node.js for managing relationships between data, schema validation, etc.
- **EJS**: Templating engine to generate HTML markup with JavaScript.
- **Passport.js**: For user authentication.
- **MongoDB**: NoSQL database to store user and product data.
- **bcryptjs**: Library to hash passwords.

## Starting the Project
To start the project, navigate to the project directory and run:
```bash
node index.js



Endpoints
GET /products: Fetch all products.
Test : 
curl -X GET http://localhost:3000/products


POST /products: Add a new product.
Test : 
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name": "New Product", "description": "A new product description", "price": 100, "category": "General", "imageUrl": "http://example.com/image.jpg"}'

GET /products/:id: Fetch a specific product by ID.
Test : 
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name": "New Product", "description": "A new product description", "price": 100, "category": "General", "imageUrl": "http://example.com/image.jpg"}'

GET /products/:id: Fetch a specific product by ID.
curl -X GET http://localhost:3000/products/1234567890

POST /register: Register a new user.

curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "password123"}'

Test : 
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "password123"}'

POST /login: Log in a user. 
Test :
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"username": "existinguser", "password": "password123"}'


GET /logout: Log out a user. 
Test :
curl -X GET http://localhost:3000/logout


## Testing Endpoints
To test these endpoints, use a tool like Postman. Send the appropriate HTTP requests to the URLs specified above with necessary JSON payloads for POST requests.




## Mongoose Schemas
- **Product Schema**: Defines fields like name, description, price, category, imageUrl.
- **User Schema**: Handles user authentication with fields for username and password.

## Setting Up Mongoose Schemas
1. Define the schema in a new file within the models directory.
2. Import Mongoose and use `mongoose.Schema` to define fields.
3. Export the model using `mongoose.model()`.

## Using MongoDB Shell
1. Ensure MongoDB is installed and running.
2. Open a terminal or command prompt.
3. Connect to your database using `mongosh` and your database's URI.
4. Use commands like `db.collection.find()` to interact with your data.

For detailed documentation on Mongoose or MongoDB operations, refer to the official Mongoose and MongoDB documentation.


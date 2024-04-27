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
```



Endpoints
### GET /products: Fetch all products.
Test : 
```bash
curl -X GET http://localhost:3000/products
```


### POST /products: Add a new product.

```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name": "New Product", "description": "A new product description", "price": 100, "category": "General", "imageUrl": "http://example.com/image.jpg"}
```


### GET /products/:id: Fetch a specific product by ID.
Test : 
```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name": "New Product", "description": "A new product description", "price": 100, "category": "General", "imageUrl": "http://example.com/image.jpg"}'
```

### GET /products/:id: Fetch a specific product by ID.
```bash
curl -X GET http://localhost:3000/products/1234567890
```

### POST /register: Register a new user.

Test : 
```bash
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "password123"}'
```

### POST /login: Log in a user. 
Test :
```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"username": "existinguser", "password": "password123"}'
```


### GET /logout: Log out a user. 
Test :
```bash
curl -X GET http://localhost:3000/logout
```


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
To work efficiently with your project using the MongoDB shell, here are several fundamental operations you can perform, adjusted to the context of your project which involves products and user management:

### Starting MongoDB Shell
Open your terminal and run the `mongo` command to start the MongoDB shell.

### Switching Databases
Use the `use <databaseName>` command to switch to the database where your project data is stored. For example, if your project database is named `ecommerce`, you would enter `use ecommerce`.

### Listing Collections
Once you've selected your database, list all collections with `show collections`. This will show you collections like `products`, `users`, etc.

### Viewing Data
To view all documents within a collection, you would use `db.collectionName.find()`. For example, to see all products, you would use `db.products.find()`.

### Inserting Data
If you want to add a new product, you could use `db.collectionName.insertOne()` or `db.collectionName.insertMany()` for multiple entries. For a single product, the command might look like this: 
```javascript
db.products.insertOne({
  name: 'New Product',
  description: 'Description of the new product',
  price: 19.99,
  category: 'categoryName',
  imageUrl: 'http://example.com/image.jpg'
});
```

### Updating Data
To update a document in a collection, use `db.collectionName.updateOne()` or `db.collectionName.updateMany()`. For example, updating the price of a product could be done with:
```javascript
db.products.updateOne({ name: 'Existing Product' }, { $set: { price: 29.99 } });
```

### Deleting Data
To remove a document, the commands `db.collectionName.deleteOne()` or `db.collectionName.deleteMany()` come into play. To remove a single product by name, you would execute:
```javascript
db.products.deleteOne({ name: 'Outdated Product' });
```

### Exiting the Shell
When you are done, exit the shell with `exit`.

For a detailed list of operations and commands, the MongoDB documentation is a comprehensive resource. These basic commands will help you to manage the collections related to products and users for your e-commerce project directly from the MongoDB shell. Make sure to replace placeholder text with the actual names and values relevant to your project. 

For more complex operations or specific use cases, referring to the official MongoDB documentation or the MongoDB shell cheat sheets available on GitHub can be beneficial【138†source】【139†source】【140†source】【141†source】.

For detailed documentation on Mongoose or MongoDB operations, refer to the official Mongoose and MongoDB documentation.


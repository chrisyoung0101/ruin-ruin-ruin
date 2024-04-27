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

To work efficiently with your project using `mongosh`, the modern MongoDB shell, here are some fundamental operations you can perform:

### Starting MongoDB Shell
Open your terminal and run the `mongosh` command to start the MongoDB shell.

### Switching Databases
Use the `use <databaseName>` command to switch to the database where your project data is stored. For example, if your project database is named `ecommerce`, you would enter `use ecommerce`.

### Listing Collections
Once you've selected your database, list all collections with `show collections`. This will display collections such as `products`, `users`, etc.

### Viewing Data
To view all documents within a collection, use `db.collectionName.find()`. For example, to see all products, you would use `db.products.find()`.

### Inserting Data
To add a new product, use `db.collectionName.insertOne()` for a single entry. The command might look like this:
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
To update a document in a collection, use `db.collectionName.updateOne()`. For example:
```javascript
db.products.updateOne({ name: 'Existing Product' }, { $set: { price: 29.99 } });
```

### Deleting Data
To remove a document, use `db.collectionName.deleteOne()`. For example:
```javascript
db.products.deleteOne({ name: 'Outdated Product' });
```

### Exiting the Shell
When you're finished, you can exit the shell with the `exit` command.

These commands are basic and universal for managing collections and documents in MongoDB. For a more comprehensive guide, including best practices and advanced queries, you should refer to the official MongoDB documentation. Remember to replace placeholders with actual values pertinent to your specific database and collections.

Here's a cheat sheet to help you use `mongosh` on the command line for your MongoDB work with the e-commerce project:

### Getting Started with mongosh
- **Connect to MongoDB**: `mongosh "mongodb://localhost:27017"`
- **List all databases**: `show dbs`
- **Switch to a specific database**: `use <databaseName>`
- **List all collections**: `show collections`

### Working with Data
- **Create a new collection**: `db.createCollection("<collectionName>")`
- **Insert a document**: `db.<collectionName>.insertOne({<document>})`
- **Insert multiple documents**: `db.<collectionName>.insertMany([{<document1>}, {<document2>}, ...])`
- **Find documents**: `db.<collectionName>.find({<query>})`
- **Find all products**: 
- `db.products.find().pretty()`

- **Find a single document**: `db.<collectionName>.findOne({<query>})`
- **Update documents**: `db.<collectionName>.updateOne({<query>}, { $set: {<update>} })`
- **Delete a document**: `db.<collectionName>.deleteOne({<query>})`
- **Delete multiple documents**: `db.<collectionName>.deleteMany({<query>})`

### Additional Operations
- **Count documents**: `db.<collectionName>.countDocuments({<query>})`
- **Create an index**: `db.<collectionName>.createIndex({<field>: <1 for asc, -1 for desc>})`
- **Get collection stats**: `db.<collectionName>.stats()`
- **Drop a collection**: `db.<collectionName>.drop()`

### Querying with Operators
- **Search with equality**: `db.<collectionName>.find({<field>: <value>})`
- **Search with greater than**: `db.<collectionName>.find({<field>: {$gt: <value>}})`
- **Search with less than**: `db.<collectionName>.find({<field>: {$lt: <value>}})`
- **Search with in an array**: `db.<collectionName>.find({<field>: {$in: [<value1>, <value2>]}})`

### Using Logical Operators
- **Combine conditions with AND**: `db.<collectionName>.find({ $and: [{<condition1>}, {<condition2>}] })`
- **Combine conditions with OR**: `db.<collectionName>.find({ $or: [{<condition1>}, {<condition2>}] })`

Remember to replace `<databaseName>`, `<collectionName>`, `<document>`, `<query>`, `<update>`, `<field>`, and `<value>` with the actual values related to your project's database and collections.

This cheat sheet should provide you with the basic commands to manage your e-commerce website's database directly from the command line using `mongosh`. For more advanced operations or specific cases, consulting the official MongoDB documentation is recommended【156†source】【157†source】【158†source】.
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const registerRoutes = require('./routes/users');
const loginRoutes = require('./routes/auth');
const addCategory = require('./routes/category');

//database connection
connection();

/** middlewares */
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/category/", addCategory);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server connected to http://localhost:${port}`))
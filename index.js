// install express with `npm install express` 
const express = require('express')
const Deta = require("deta")

const deta = Deta('a0iplxoe_LiC7jntPYUBknd48oGYwJ6QiDJcy6v2Q')
const db = deta.Base('simpledb')

const app = express()

app.use(express.json())

/* Get User by Id */
app.get("/users/:id", async (req, res) => {
    const {
        id
    } = req.params;
    const user = await db.get(id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: "User Not Found"
        });
    }
});

/* Create a new user */
app.post('/users', async (req, res) => {
    const {
        name,
        age,
        hometown
    } = req.body;
    const toCreate = {
        name,
        age,
        hometown
    };
    const insertedUser = await db.put(toCreate); // put() will autogenerate a key for us
    res.status(201).json(insertedUser);
});

/* Update user */
app.put("/users/:id", async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        age,
        hometown
    } = req.body;
    const toPut = {
        key: id,
        name,
        age,
        hometown
    };
    const newItem = await db.put(toPut);
    return res.json(newItem);
});

/* Deleting user */
app.delete("/users/:id", async (req, res) => {
    const {
        id
    } = req.params;
    await db.delete(id);
    res.json({
        message: "user deleted successfully"
    });
});

app.get('/', (req, res) => res.send('Hello World!'))

// export 'app'
module.exports = app
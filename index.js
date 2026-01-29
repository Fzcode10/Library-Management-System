const express = require("express");

const booksRouter = require("./routes/books");
const usersRouter = require("./routes/users");

const app = express();

const PORT = 1970;

app.use(express.json());

app.get("/", (req, res) => { 
    res.status(200).json({
        message: "Home Page:-)"
    })
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

 

app.listen(PORT, () => {
    console.log(`App listen on link http://localhost:${PORT} `);
}) 


module.exports = app;
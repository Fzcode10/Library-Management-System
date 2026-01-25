const express = require("express");
const app = express()

const port = 1970;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Home Page:-)"
    })
});

// app.all('*', (req, res) => {
//     res.status(200).json({
//         message: "Not Built yet"
//     }) 
// })

app.listen(port, () => {
    console.log(`App listen on link http://localhost:${port} `);
})
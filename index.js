const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const visitRouter = require("./routes/visit-routes");
const commentRouter = require("./routes/comment-routes");
const blockedRouter = require("./routes/blocked-routes");

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 3000

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.use(visitRouter, commentRouter, blockedRouter)

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
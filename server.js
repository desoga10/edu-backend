const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const serverError = require('./middleware/serverError')
const app = express()


const PORT = process.env.PORT || 5000

//Allow access to .env file
dotenv.config()

//Database connection
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => {
  console.log("Connected to Mongo DB");
}
);

app.use(cors())
app.use(express.json());
app.use(morgan("common"))

//Invalid Route Error Handler
app.use(notFound);

//Server Error Middleware Handler
app.use(serverError)


app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})
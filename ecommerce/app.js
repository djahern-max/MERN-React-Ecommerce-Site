const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// dotenv.config();

//db connection Atlas
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('DB Connected'));

// mongoose.connection.on('error', err => {
//   console.log(`DB connection error: ${err.message}`);
// });

//db connection local

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB Connected'));

// app
const app = express();

app.get('/', (req, res) => {
  res.send('hello from node');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

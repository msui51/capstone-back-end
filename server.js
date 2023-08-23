const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


app.use(express.json());

const selectionsRouter = require('./routes/selections');
app.use('/selections', selectionsRouter);

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);


app.listen(PORT, ()=>{
    console.log(`running at localhost ${PORT}`);
})

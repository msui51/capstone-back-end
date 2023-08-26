const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.static('public'))

const selectionsRouter = require('./routes/selections');
app.use('/selections', selectionsRouter);

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);


app.listen(PORT, ()=>{
    console.log(`running at localhost ${PORT}`);
})

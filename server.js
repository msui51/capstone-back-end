const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


app.use(express.json());

const selectionsRouter = require('./routes/selections');
app.use('/selections', selectionsRouter);


app.listen(PORT, ()=>{
    console.log(`running at localhost ${PORT}`);
})

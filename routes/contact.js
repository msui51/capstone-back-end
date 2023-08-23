const express = require('express');
const router = express.Router();
const config = require('../knexfile.js');
const knex = require('knex')(config);
const { v4: uuidv4 } = require('uuid');

router
    .route('/')
    .post((req,res)=>{
        knex("contact_us")
            .insert({
                id: uuidv4(),
                name: req.body.name,
                email_address: req.body.email_address,
                message: req.body.message,
            })
            .then((data)=>{
                res.status(201).send('Form send successfully');
            })
            .catch((err)=>{
                res.status(400).send('Error')
            })
    })

module.exports = router;
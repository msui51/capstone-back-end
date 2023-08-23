const express = require('express');
const router = express.Router();
const config = require('../knexfile.js');
const knex = require('knex')(config);
const { v4: uuidv4 } = require('uuid');
const { body,validationResult } = require('express-validator');

router
    .post('/',
    body('name').notEmpty().withMessage('Please provide a name'),
    body('email_address').notEmpty().isEmail().withMessage('Please provide a valid email address'),
    body('message').notEmpty().withMessage('Please provide a message'),
    (req,res)=>{
        const errors = validationResult(req).formatWith(error => error.msg);
        console.log(errors)
        if(!errors.isEmpty()){
             return res.status(400).json({errors: errors.array()})
        }
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
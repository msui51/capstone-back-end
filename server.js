const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// creating socket.io server

const http= require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server (server, {
    cors:{
        origin:'http://localhost:3000'
    }
});


// connecting to the socket

io.on('connection', (socket)=>{
    console.log('socket id is' + socket.id)
    socket.on('send_message', (data)=>{
        io.sockets.emit('receive_message', data)
        console.log(data)
    })
   
   socket.on('newUsers', (user)=>{
        let users=[];
        users.push(user);
        console.log(users);
        io.emit('newUsers_response', user);
        console.log(users);
   })
})


// router for genres of music and show list

const selectionsRouter = require('./routes/selections');
app.use('/selections', selectionsRouter);

//router for submitting contact form

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

// initiate back-end server

server.listen(PORT, ()=>{
    console.log(`running at localhost ${PORT}`);
})

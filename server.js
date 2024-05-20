const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// const { instrument } = require("@socket.io/admin-ui");
// instrument(io, {
//     auth: false,
//     mode: "development",
//   });


// creating socket.io server

const http= require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server (server, {
    cors:{
        origin:'https://peppy-crumble-09a2e4.netlify.app/'
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

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });


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

const express = require('express'); //initialize the express project
const app = express(); //this is initializing our express application
const server = require('http').Server(app); //creating our server and specifying what app we are using
const io = require('socket.io')(server); //importing socket.io into our project
const { v4: uuidv4 } = require('uuid'); //importing the uuid library
const {ExpressPeerServer} = require('peer'); //importing peerJS
const peerServer = ExpressPeerServer(server, { 
    debug: true
});

app.set('view engine', 'ejs'); //initialize our first view
app.use(express.static('public'));

app.use('/peerjs', peerServer); // specifies what URL peerServer is going to be using
app.get('/', (req,res) => {     //basically shows at which URL our app is going to reside
res.redirect(`/${uuidv4()}`);   //redirecting our root url ; automatically creates a room ID and redirects us to it
})

app.get('/:room', (req,res) => {
    res.render('room', { roomId: req.params.room });
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId)=> {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId); //telling others that the user has connected
        
        socket.on('message', message => {
            io.to(roomId).emit('createMessage', message)
        })
    })
})


server.listen(process.env.PORT||3030);
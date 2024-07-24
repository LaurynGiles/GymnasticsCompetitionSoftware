import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST'],
  },
});

const groupUsers = {};

io.on('connection', (socket) => {  //Sets up a listener for new connections, socket object created for each connection
  console.log('A user connected', socket.id); //Logs new connection with unique socket ID

  socket.on('joinGroup', ({ groupId, judgeId }) => { //Event triggered when a user wants to join a group, with payload of groupID and judgeID
    if (!groupUsers[groupId]) {   //Checks if group already exists
      groupUsers[groupId] = [];   //Initializes new group if it doesn't exist
    }
    groupUsers[groupId].push(socket.id); //Adds new socket ID to group array.

    socket.join(`group_${groupId}`); //Adds the socket to a room named group_<groupID>
    io.to(`group_${groupId}`).emit('groupMessage', `Judge ${judgeId} joined group ${groupId}`); //Sends a message to all sockets indicating the join
  });

  socket.on('leaveGroup', ({ groupId, judgeId }) => { //Event triggered when a user wants to leave a group, with payload of groupID and judgeID
    socket.leave(`group_${groupId}`); //Removes the socket from a room named group_<groupID>
    groupUsers[groupId] = groupUsers[groupId].filter(id => id !== socket.id); //Removes the socket ID of the current connection from the group's array.

    io.to(`group_${groupId}`).emit('groupMessage', `Judge ${judgeId} left group ${groupId}`); //Sends a message to all sockets indicating the leave
  });

  socket.on('sendMessage', ({ groupId, message }) => { //Event triggered when a user wants to send a message to all sockets in their room
    io.to(`group_${groupId}`).emit('groupMessage', message); //Sends message to other sockets in group
  });

  socket.on('disconnect', () => { //Listens for the disconnect event
    console.log('A user disconnected', socket.id); //Logs socket disconnection
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
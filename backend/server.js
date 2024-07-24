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
const headJudges = {};

io.on('connection', (socket) => {  //Sets up a listener for new connections, socket object created for each connection
  console.log('A user connected', socket.id); //Logs new connection with unique socket ID

  socket.on('joinGroup', ({ groupId, judgeId, isHead }, callback) => { //Event triggered when a user wants to join a group, with payload of groupID and judgeID
    if (!groupUsers[groupId]) {   //Checks if group already exists
      if (!isHead) {
        console.log("Error: Group has not been started by a head judge")
        callback({ success: false, error: 'This event needs to be started by a Head judge' });
        return;
      }
      groupUsers[groupId] = [];   //Initializes new group if it doesn't exist
      headJudges[groupId] = judgeId;

    } else if (!isHead && !headJudges[groupId]) {
      console.log("Error: Group has not been started by a head judge")
      callback({ success: false, error: 'This event needs to be started by a Head judge' });
      return;
    }

    groupUsers[groupId].push(socket.id); //Adds new socket ID to group array.

    socket.join(`group_${groupId}`); //Adds the socket to a room named group_<groupID>
    io.to(`group_${groupId}`).emit('groupMessage', `Judge ${judgeId} joined group ${groupId}`); //Sends a message to all sockets indicating the join
    console.log(`socket joined group${groupId}`);

    callback({ success: true });
  });

  socket.on('leaveGroup', ({ groupId, judgeId }) => { //Event triggered when a user wants to leave a group, with payload of groupID and judgeID
    socket.leave(`group_${groupId}`); //Removes the socket from a room named group_<groupID>
    groupUsers[groupId] = groupUsers[groupId].filter(id => id !== socket.id); //Removes the socket ID of the current connection from the group's array.

    if (headJudges[groupId] === judgeId) {
      console.log("Head judge left group");
      delete headJudges[groupId];
    }

    io.to(`group_${groupId}`).emit('groupMessage', `Judge ${judgeId} left group ${groupId}`); //Sends a message to all sockets indicating the leave
  });

  socket.on('sendMessage', ({ groupId, message }) => { //Event triggered when a user wants to send a message to all sockets in their room
    console.log("Sending group message");
    io.to(`group_${groupId}`).emit('groupMessage', message); //Sends message to other sockets in group
  });

  socket.on('disconnect', () => { //Listens for the disconnect event
    console.log('A user disconnected', socket.id); //Logs socket disconnection

    for (const groupId in groupUsers) {
      groupUsers[groupId] = groupUsers[groupId].filter(id => id !== socket.id);

      if (groupUsers[groupId].length === 0) {
        delete groupUsers[groupId];
        delete headJudges[groupId];
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });
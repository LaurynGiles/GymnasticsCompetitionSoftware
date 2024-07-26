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

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('joinGroup', ({ group_id, judge_id, head_judge, judge_fname, judge_lname }, callback) => {

    console.log(`Judge ${judge_id} attempting to join group ${group_id}`);

    if (!groupUsers[group_id]) {
      if (!head_judge) {
        console.log("Error: Group has not been started by a head judge")
        callback({ success: false, error: 'This event needs to be started by a Head judge' });
        return;
      }

      groupUsers[group_id] = [];
      headJudges[group_id] = socket.id;
      console.log(`Head judge of group ${group_id} set to ${headJudges[group_id]}`);

      groupUsers[group_id].push(socket.id);

      socket.join(`group_${group_id}`);
      io.to(`group_${group_id}`).emit('groupMessage', `${judge_fname} ${judge_lname} has started the judging table`);
      console.log(`Socket ${socket.id} started group${group_id}`);
      console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);
      callback({ success: true, isHeadJudge: true });
      return;

    } else if (!head_judge && !headJudges[group_id]) {
      console.log("Error: Group has not been started by a head judge")
      callback({ success: false, error: 'This event needs to be started by a Head judge' });
      return;
    }

    io.to(headJudges[group_id]).emit('joinRequest', { group_id, judge_id, judge_fname, judge_lname, socket_id: socket.id });

    callback({ success: true, isHeadJudge: false, message: 'Join request sent, waiting for approval.' });
  });

  socket.on('approveJoinRequest', ({ group_id, judge_id, judge_fname, judge_lname, socket_id }) => {
    if (!groupUsers[group_id]) {
      groupUsers[group_id] = [];
    }

    groupUsers[group_id].push(socket_id);
    io.sockets.sockets.get(socket_id).join(`group_${group_id}`);

    io.to(socket_id).emit('joinApproved', { group_id });
    
    io.to(headJudges[group_id]).emit('judgeJoined', { group_id, judge_id, judge_fname, judge_lname, socket_id: socket.id });
    io.to(`group_${group_id}`).emit('groupMessage', `${judge_fname} ${judge_lname} has joined the judging table`);
    console.log(`Judge ${judge_id} approved to join group ${group_id}`);
    console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);
  });

  socket.on('rejectJoinRequest', ({ group_id, judge_id, judge_fname, judge_lname, socket_id }) => {
    io.to(socket_id).emit('errorMessage', { message: 'Your join request was rejected by the head judge.' });
    console.log(`Judge ${judge_id} rejected from joining group ${group_id}`);
  });

  socket.on('leaveGroup', ({ group_id, judge_id }) => {
    socket.leave(`group_${group_id}`);
    groupUsers[group_id] = groupUsers[group_id].filter(id => id !== socket.id);

    if (headJudges[group_id] === judge_id) {
      console.log("Head judge left group");
      delete headJudges[group_id];
    }

    io.to(`group_${group_id}`).emit('groupMessage', `Judge ${judge_id} left group ${group_id}`);
    console.log(`Socket left group${group_id}`);
    console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);
  });

  socket.on('sendMessage', ({ groupId, message }) => {
    console.log("Sending group message");
    io.to(`group_${groupId}`).emit('groupMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);

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
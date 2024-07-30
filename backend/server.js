import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',],
    methods: ['GET', 'POST'],
  },
});

const loggedInJudges = new Map();
const groupUsers = {};
const headJudges = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('login', ({ judge_id, judge_fname, judge_lname }, callback) => {
    console.log("Trying to log in judge");
    if (loggedInJudges.has(judge_id)) {
      console.log("Judge already logged in");
      callback({ success: false, message: `${judge_fname} ${judge_lname} is already logged in from another device.` });
    } else {
      loggedInJudges.set(judge_id, socket.id);
      
      console.log(`Judge ${judge_id} (${judge_fname} ${judge_lname}) logged in.`);
      callback({ success: true, judge_id, judge_fname, judge_lname });
    }
  });

  socket.on('logout', ({ judge_id }) => {
    if (loggedInJudges.has(judge_id)) {
      loggedInJudges.delete(judge_id);
      console.log(`Judge ${judge_id} logged out.`);

      for (const groupId in groupUsers) {
        groupUsers[groupId] = groupUsers[groupId].filter(id => id !== socket.id);

        if (headJudges[groupId] === socket.id) {
          delete headJudges[groupId];
          console.log(`Head judge of group ${groupId} (${judge_id}) logged out.`);
        }
  
        if (groupUsers[groupId].length === 0) {
          delete groupUsers[groupId];
        }
      }
  
      console.log(`Judge ${judge_id} removed from all groups.`);
    }
  });

  socket.on('joinGroup', ({ group_id, apparatus, judge_id, head_judge, judge_fname, judge_lname }, callback) => {

    console.log(`Judge ${judge_id} attempting to join group ${group_id}`);

    for (const groupId in groupUsers) {
      if (groupUsers[groupId].includes(socket.id)) {
        console.log("Error: Judge already in a group");
        callback({ success: false, error: 'You have already joined a group.' });
        return;
      }
    }
    
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
      console.log(`Socket ${socket.id} started group ${group_id}`);
      console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);
      callback({ success: true, isHeadJudge: true });
      return;

    } else if (!head_judge && !headJudges[group_id]) {
      console.log("Error: Group has not been started by a head judge")
      callback({ success: false, error: 'This event needs to be started by a Head judge' });
      return;
    }

    io.to(headJudges[group_id]).emit('joinRequest', { group_id, apparatus, judge_id, judge_fname, judge_lname, socket_id: socket.id });

    callback({ success: true, isHeadJudge: false, message: 'Join request sent, waiting for approval.' });
  });

  socket.on('approveJoinRequest', ({ group_id, apparatus, judge_id, judge_fname, judge_lname, socket_id }) => {
    if (!groupUsers[group_id]) {
      groupUsers[group_id] = [];
    }

    groupUsers[group_id].push(socket_id);
    io.sockets.sockets.get(socket_id).join(`group_${group_id}`);

    io.to(socket_id).emit('joinApproved', { group_id, apparatus });
    
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

    for (const [judge_id, socketId] of loggedInJudges.entries()) {
      if (socketId === socket.id) {
        loggedInJudges.delete(judge_id);
        
        for (const groupId in groupUsers) {
          groupUsers[groupId] = groupUsers[groupId].filter(id => id !== socket.id);
    
          if (headJudges[groupId] === socket.id) {
            delete headJudges[groupId];
            console.log(`Head judge of group ${groupId} (${judge_id}) disconnected.`);
          }
    
          if (groupUsers[groupId].length === 0) {
            delete groupUsers[groupId];
          }
        }
      }
    }
  });

  socket.on('judgeGymnast', ({ groupId, gymnast }) => {
    console.log(`Gymnast selected for judging: ${gymnast.gymnast_id} in group ${groupId}`);
    io.to(`group_${groupId}`).emit('nextGymnast', gymnast);
  });

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
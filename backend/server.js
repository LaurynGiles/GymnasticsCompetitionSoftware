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
const judgeDetails = new Map(); 
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
      judgeDetails.set(judge_id, { judge_fname, judge_lname });
      
      console.log(`Judge ${judge_id} (${judge_fname} ${judge_lname}) logged in.`);
      callback({ success: true, judge_id, judge_fname, judge_lname });
    }
  });

  socket.on('logout', ({ judge_id }) => {
    if (loggedInJudges.has(judge_id)) {
      loggedInJudges.delete(judge_id);
      judgeDetails.delete(judge_id);
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

  socket.on('joinGroup', ({group_id, apparatus, judge_id, head_judge, judge_fname, judge_lname }, callback) => {

    console.log(`Judge ${judge_id} attempting to join group ${group_id}`);
    console.log(`Head judge? ${head_judge}`);

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
      io.to(socket.id).emit('serverMessage', `Event ${group_id}, ${apparatus}:\nYou started the judging table.`);
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

  socket.on('approveJoinRequest', ({ judge, gymnast, judgingStarted, startScore, penalty}) => {
    const { group_id, apparatus, judge_id, judge_fname, judge_lname, socket_id } = judge;

    if (!groupUsers[group_id]) {
      groupUsers[group_id] = [];
    }

    io.to(`group_${group_id}`).emit('serverMessage', `Event ${group_id}, ${apparatus}:\n${judge_fname} ${judge_lname} has joined the judging table.`);

    groupUsers[group_id].push(socket_id);
    io.sockets.sockets.get(socket_id).join(`group_${group_id}`);

    io.to(socket_id).emit('joinApproved', { group_id, apparatus });
    io.to(socket_id).emit('serverMessage', `Event ${group_id}, ${apparatus}:\nYou joined the judging table.`);
    
    io.to(headJudges[group_id]).emit('judgeJoined', { group_id, judge_id, judge_fname, judge_lname, socket_id });

    console.log(`Judge ${judge_id} approved to join group ${group_id}`);
    console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);

    if (judgingStarted) {
      // console.log(`Gymnast selected for judging: ${gymnast.gymnast_id} in group ${group_id}`);

      if (gymnast) {
        io.to(socket_id).emit('serverMessage', `${gymnast.first_name} ${gymnast.last_name} (${gymnast.gymnast_id}) selected for judging.`)
        io.to(socket_id).emit('nextGymnast', gymnast);
      }

      if (startScore && penalty) {
        io.to(socket_id).emit('scoresUpdated', { startScore, penalty });
      }
      
    }
  });

  socket.on('rejectJoinRequest', ({ group_id, apparatus, judge_id, judge_fname, judge_lname, socket_id }) => {
    io.to(socket_id).emit('rejectionMessage', `Event ${group_id}, ${apparatus}:\nYour join request was rejected by the head judge.`);
    console.log(`Judge ${judge_id} rejected from joining group ${group_id}`);
  });

  socket.on('leaveGroup', ({ group_id, judge_id, judge_fname, judge_lname}) => {
    socket.leave(`group_${group_id}`);
    groupUsers[group_id] = groupUsers[group_id].filter(id => id !== socket.id);

    console.log(headJudges[group_id]);
    console.log(socket.id);
    if (headJudges[group_id] === socket.id) {
      console.log("Head judge left group");
      delete headJudges[group_id];
    }

    io.to(`group_${group_id}`).emit('serverMessage', `${judge_fname} ${judge_lname} left the group`);
    io.to(`group_${group_id}`).emit('judgeLeaveGroup', {judge_id, judge_fname, judge_lname, group_id});
    console.log(`Socket left group${group_id}`);
    console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);

    if (groupUsers[group_id].length === 0) {
      // If no users left in the group, remove the group
      delete groupUsers[group_id];
  }
  });

  socket.on('judgeGymnast', ({ groupId, gymnast }) => {
    console.log(`Gymnast selected for judging: ${gymnast.gymnast_id} in group ${groupId}`);
    io.to(`group_${groupId}`).emit('serverMessage', `${gymnast.first_name} ${gymnast.last_name} (${gymnast.gymnast_id}) selected for judging.`)
    io.to(`group_${groupId}`).emit('nextGymnast', gymnast);
  });

  socket.on('submitDeduction', ({ groupId, judgeId, firstName, lastName, deduction, analysis }) => {
    const headJudgeId = headJudges[groupId];
    if (headJudgeId) {
      io.to(headJudgeId).emit('receiveDeduction', {
        judgeId,
        name: `${firstName} ${lastName}`,
        deduction,
        analysis
      });
    }
  });

  socket.on('updateScores', ({ groupId, startScore, penalty }) => {
    const groupMembers = groupUsers[groupId] || [];
    groupMembers.forEach(memberSocketId => {
        if (memberSocketId !== socket.id) { // Exclude head judge
            io.to(memberSocketId).emit('scoresUpdated', { startScore, penalty });
        }
    });
    console.log(`Scores updated for group ${groupId}: Start Score - ${startScore}, Penalty - ${penalty}`);
  });

  socket.on('finalScoreSubmitted', ({ groupId, finalScore }) => {
    console.log(`Final score received from group ${groupId}: ${finalScore}`);

    // Optionally, broadcast this to all clients in the same group
    socket.to(`group_${groupId}`).emit('updateFinalScore', { finalScore });

  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);

    let disconnectedJudgeId = null;
    let groupIdToNotify = null;
    let judgeDetailsToNotify = { judge_fname: '', judge_lname: '' };

    // Identify the group and the judge_id
    for (const [judge_id, socketId] of loggedInJudges.entries()) {
        if (socketId === socket.id) {
            disconnectedJudgeId = judge_id;
            loggedInJudges.delete(judge_id);
            
            if (judgeDetails.has(judge_id)) {
              const { judge_fname, judge_lname } = judgeDetails.get(judge_id);
              judgeDetailsToNotify = { judge_fname, judge_lname };
              judgeDetails.delete(judge_id);
            }

            // Iterate over all groups to find the one the judge was part of
            for (const groupId in groupUsers) {
                if (groupUsers[groupId].includes(socket.id)) {
                    // Remove the judge from the group's user list
                    groupUsers[groupId] = groupUsers[groupId].filter(id => id !== socket.id);

                    if (headJudges[groupId] === socket.id) {
                        // Handle if the disconnected judge was the head judge
                        delete headJudges[groupId];
                        console.log(`Head judge of group ${groupId} (${judge_id}) disconnected.`);
                    }

                    if (groupUsers[groupId].length === 0) {
                        // If no users left in the group, remove the group
                        delete groupUsers[groupId];
                    } else {
                        // Notify all judges in the group about the disconnection
                        groupIdToNotify = groupId;
                    }
                    break; // Exit loop after finding the correct group
                }
            }
            break; // Exit loop after finding the correct judge
        }
    }

    if (groupIdToNotify) {
        io.to(`group_${groupIdToNotify}`).emit('judgeDisconnected', {
            judge_id: disconnectedJudgeId,
            group_id: groupIdToNotify
        });
        io.to(`group_${groupIdToNotify}`).emit('serverMessage', `${judgeDetailsToNotify.judge_fname} ${judgeDetailsToNotify.judge_lname} has disconnected from the group.`);
    }

  });

  socket.on('endEvent', async ({ group_id, event_id }) => {
    console.log(`Event ${event_id} ended, all member must leave the group.`);
    io.to(`group_${group_id}`).emit('eventEnded', { group_id});

  });

  socket.on('headJudgeMessage', ({ groupId, message }) => {
    console.log(`Head judge sending message to ${groupId}`);
    io.to(`group_${groupId}`).emit('groupMessage', `Head judge:\n${message}`);
  });

  socket.on('headRequestResubmission', ({ groupId, apparatus, judgeId, socketId }) => {
    if (socketId) {
      io.to(socketId).emit('resubmissionRequest', `Event ${groupId}, ${apparatus}:\nThe head judge has requested that you resubmit your score.`);
    } else {
      io.to(`group_${groupId}`).emit('resubmissionRequest', `Event ${groupId}, ${apparatus}:\nThe head judge has requested that all judges resubmit their scores.`);
    }
  });

  socket.on('judgeRequestResubmission', ({ groupId, judgeId, judge_fname, judge_lname }) => {
    const socketId = headJudges[groupId]
    console.log(`Sending resubmission request to head judge ${socketId}`);

    io.to(socketId).emit('judgeResubmission', {groupId, judgeId, judge_fname, judge_lname, socketId: socket.id});
  });

  socket.on('approveResubmissionRequest', ({ groupId, socketId }) => {
    if (socketId) {
      io.to(socketId).emit('resubmissionApproved', 'Your resubmission request was approved by the head judge.');
      console.log(`Resubmission request approved for judge ${socketId}`);
    }
  });
  
  socket.on('rejectResubmissionRequest', ({ groupId, socketId }) => {
    if (socketId) {
      io.to(socketId).emit('resubmissionRejected', 'Your resubmission request was rejected by the head judge.');
      console.log(`Resubmission request rejected for judge ${judgeId} in group ${groupId}`);
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
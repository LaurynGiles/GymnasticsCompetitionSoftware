import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*';

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// const io = new Server(server, {
//   cors: {
//       origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:5175', 'http://localhost:5000'],
//       methods: ['GET', 'POST'],
//       credentials: true,
//   },
// });

const loggedInJudges = new Map();
const loggedInAdmins = new Map();
const judgeDetails = new Map(); 
const groupUsers = {};
const headJudges = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('adminLogin', ({ admin_id, username }, callback) => {
    console.log("Trying to log in admin");

    if (loggedInAdmins.has(admin_id)) {
      console.log("Judge already logged in");
      callback({ success: false, message: `${username} is already logged in from another device.` });
    } else {
      loggedInAdmins.set(admin_id, socket.id);
      
      console.log(`Admin ${username} logged in.`);
      console.log(`Admins: ${loggedInAdmins.get(admin_id)}`);
      callback({ success: true, admin_id, username });
    }
  });

  socket.on('adminLogout', ({ admin_id }) => {
    if (loggedInAdmins.has(admin_id)) {
      loggedInAdmins.delete(admin_id);
      console.log(`Admin ${admin_id} logged out.`);
    }
  });

  socket.on('login', ({ judge_id, judge_fname, judge_lname }, callback) => {
    console.log("Trying to log in judge");
    if (loggedInJudges.has(judge_id)) {
      console.log("Judge already logged in");
      callback({ success: false, message: `${judge_fname} ${judge_lname} is already logged in from another device.` });
    } else {
      loggedInJudges.set(judge_id, socket.id);
      judgeDetails.set(judge_id, { judge_fname, judge_lname });
      
      console.log(`Judge ${judge_id} (${judge_fname} ${judge_lname}) logged in.`);
      io.to(socket.id).emit('serverMessage', `Welcome to ScoreMatics!`);
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

        if (headJudges[groupId] === judge_id) {
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

    console.log("GROUP USERS:", groupUsers);
    
    if (!groupUsers[group_id] || groupUsers[group_id].length === 0) {
      console.log(`GROUP users for groups: ${groupUsers[group_id]}`);
      if (!head_judge) {
        console.log("Error: Group has not been started by a head judge")
        callback({ success: false, error: 'This event needs to be started by a Head judge' });
        return;
      }

      groupUsers[group_id] = [];

      if (headJudges[group_id] != judge_id) {

        headJudges[group_id] = judge_id;
        console.log(`Head judge of group ${group_id} set to ${headJudges[group_id]}`);

        groupUsers[group_id].push(socket.id);

        console.log("GROUP USERS:", groupUsers[group_id]);

        socket.join(`group_${group_id}`);
        io.to(socket.id).emit('serverMessage', `Event ${group_id}, ${apparatus}:\nYou started the judging table.`);
        console.log(`Socket ${socket.id} started group ${group_id}`);
        console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);
        callback({ success: true, isHeadJudge: true, rejoin: false });

      } else {

        console.log(`Head judge of group ${group_id} rejoined: ${headJudges[group_id]}`);

        groupUsers[group_id].push(socket.id);

        console.log("GROUP USERS:", groupUsers[group_id]);

        socket.join(`group_${group_id}`);
        io.to(socket.id).emit('serverMessage', `Event ${group_id}, ${apparatus}:\nYou started the judging table.`);
        console.log(`Socket ${socket.id} started group ${group_id}`);
        console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);
        callback({ success: true, isHeadJudge: true, rejoin: true });

      }

      console.log(groupUsers[group_id])
      const judgesInGroup = groupUsers[group_id].map((judgeSocketId) => {
        const judgeId = Array.from(loggedInJudges.entries()).find(([, socketId]) => socketId === judgeSocketId)?.[0];
        if (judgeId && judgeDetails.has(judgeId)) {
          const { judge_fname, judge_lname } = judgeDetails.get(judgeId);
          return {
            judge_id: judgeId,
            first_name: judge_fname,
            last_name: judge_lname,
            socket_id: judgeSocketId
          };
        }
        return null;
      }).filter(Boolean);

      console.log(judgesInGroup);
      io.to(socket.id).emit('allJudgesInGroup', judgesInGroup);  // Send list of judges to the head judge
      return;

    } else if (!head_judge && !headJudges[group_id]) {
      console.log("Error: Group has not been started by a head judge")
      callback({ success: false, error: 'This event needs to be started by a Head judge' });
      return;

    } else if (head_judge && headJudges[group_id] == judge_id) {
      console.log(`Head judge of group ${group_id} rejoined: ${headJudges[group_id]}`);

      groupUsers[group_id].push(socket.id);

      console.log("GROUP USERS:", groupUsers[group_id]);

      socket.join(`group_${group_id}`);
      io.to(socket.id).emit('serverMessage', `Event ${group_id}, ${apparatus}:\nYou started the judging table.`);
      console.log(`Socket ${socket.id} started group ${group_id}`);
      console.log(`Group ${group_id} members: ${groupUsers[group_id]}`);

      callback({ success: true, isHeadJudge: true, rejoin: true });

      // console.log(judgesInGroup);
      console.log(loggedInJudges);
      const judgesInGroup = groupUsers[group_id].map((judgeSocketId) => {
        const judgeId = Array.from(loggedInJudges.entries()).find(([, socketId]) => socketId === judgeSocketId)?.[0];
        if (judgeId && judgeDetails.has(judgeId)) {
          const { judge_fname, judge_lname } = judgeDetails.get(judgeId);
          return {
            judge_id: judgeId,
            first_name: judge_fname,
            last_name: judge_lname,
            socket_id: judgeSocketId
          };
        }
        return null;
      }).filter(Boolean);

      console.log(judgesInGroup);
      io.to(socket.id).emit('allJudgesInGroup', judgesInGroup);  // Send list of judges to the head judge

      return;
      
    }

    io.to(loggedInJudges.get(headJudges[group_id])).emit('joinRequest', { group_id, apparatus, judge_id, judge_fname, judge_lname, socket_id: socket.id });

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

    const headJudgeSocketId = loggedInJudges.get(headJudges[group_id]);

    if (headJudgeSocketId) {
      const judgeList = groupUsers[group_id].map((socketId) => {
        const judgeId = Array.from(loggedInJudges.entries()).find(([id, sid]) => sid === socketId)?.[0];
        const details = judgeDetails.get(judgeId);
        return {
          judge_id: judgeId,
          first_name: details?.judge_fname,
          last_name: details?.judge_lname,
          socket_id: socketId,
        };
      });
  
      io.to(headJudgeSocketId).emit('allJudgesInGroup', judgeList);
    }
    
    // io.to(loggedInJudges.get(headJudges[group_id])).emit('judgeJoined', { judge_id, judge_fname, judge_lname, socket_id });

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

    console.log(loggedInJudges);
    console.log(headJudges[group_id]);
    console.log(loggedInJudges.get(headJudges[group_id]));
    console.log(socket.id);
    if (headJudges[group_id] === judge_id) {
      console.log("Head judge left group");
      // delete headJudges[group_id];
    }

    // loggedInJudges.delete(judge_id);
    io.to(`group_${group_id}`).emit('serverMessage', `${judge_fname} ${judge_lname} left the group`);
    io.to(`group_${group_id}`).emit('judgeLeaveGroup', {judge_id, judge_fname, judge_lname, group_id});

    // Prepare an updated list of judges in the group for the head judge
    const updatedJudgesList = groupUsers[group_id].map(socketId => {
      const judgeId = [...loggedInJudges.entries()].find(([_, id]) => id === socketId)?.[0];
      const { judge_fname, judge_lname } = judgeDetails.get(judgeId) || {};
      return { judge_id: judgeId, first_name: judge_fname, last_name: judge_lname, socket_id: socketId };
    }).filter(judge => judge.judge_id); // Ensure only valid judges are included
    
    // Send updated judge list to the head judge if they’re still in the group
    const headJudgeSocketId = loggedInJudges.get(headJudges[group_id]);
    if (headJudgeSocketId) {
      io.to(headJudgeSocketId).emit('allJudgesInGroup', updatedJudgesList);
    }

    console.log(`Updated group ${group_id} members: ${JSON.stringify(updatedJudgesList)}`);

    // If no users are left in the group, clean up the group data
    if (groupUsers[group_id].length === 0) {
      delete groupUsers[group_id];
      console.log(`Group ${group_id} deleted as it has no remaining members.`);
    }
  });

  socket.on('judgeGymnast', ({ groupId, gymnast }) => {
    console.log(`Gymnast selected for judging: ${gymnast.gymnast_id} in group ${groupId}`);
    io.to(`group_${groupId}`).emit('serverMessage', `${gymnast.first_name} ${gymnast.last_name} (${gymnast.gymnast_id}) selected for judging.`)
    io.to(`group_${groupId}`).emit('nextGymnast', gymnast);
  });

  socket.on('submitDeduction', ({ groupId, judgeId, firstName, lastName, deduction, analysis }) => {
    console.log(groupId)
    console.log(headJudges[groupId])
    console.log(loggedInJudges)
    const headJudgeId = loggedInJudges.get(headJudges[groupId]);
    console.log(`Head judge submission: ${headJudgeId}`);
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
  
    // Broadcast the final score to all clients in the group
    socket.to(`group_${groupId}`).emit('updateFinalScore', { finalScore });
    
    console.log(loggedInAdmins.size);
    // Notify all logged-in admins that results have been updated
    for (const [admin_id] of loggedInAdmins.entries()) {
      console.log(`Admin found: ${admin_id}, ${loggedInAdmins.get(admin_id)}`);
      io.to(loggedInAdmins.get(admin_id)).emit('resultsUpdated');
      console.log(`Notified admin ${admin_id} that results have been updated.`);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);

        // Check if it was an admin
    for (const [admin_id, adminSocketId] of loggedInAdmins.entries()) {
      if (adminSocketId === socket.id) {
        loggedInAdmins.delete(admin_id);
        console.log(`Admin ${admin_id} disconnected`);
        return;
      }
    }

    let disconnectedJudgeId = null;
    let groupIdToNotify = null;
    let judgeDetailsToNotify = { judge_fname: '', judge_lname: '' };

    // Identify the group and the judge_id
    for (const [judge_id, socketId] of loggedInJudges.entries()) {
        if (socketId === socket.id) {
            disconnectedJudgeId = judge_id;
            // loggedInJudges.delete(judge_id);
            
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

                    if (loggedInJudges.get(headJudges[groupId]) === socket.id) {
                        // Handle if the disconnected judge was the head judge
                        // delete headJudges[groupId];
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

  socket.on('headRequestResubmission', ({ groupId, apparatus, judgeId, socketId, type }) => {
    if (socketId) {
      io.to(socketId).emit('resubmissionRequest', `The head judge has requested that you resubmit your deductions, it was too ${type}.`);
    } else {
      io.to(`group_${groupId}`).emit('resubmissionRequest', `The head judge has requested that all judges resubmit their deductions, they were too ${type}.`);
    }
  });

  socket.on('judgeRequestResubmission', ({ groupId, judgeId, judge_fname, judge_lname }) => {
    const socketId = loggedInJudges.get(headJudges[groupId]);
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
      console.log(`Resubmission request rejected in group ${groupId}`);
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
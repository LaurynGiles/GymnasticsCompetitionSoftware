import db from '../models/index.js';

const { GymnastGroup,  TimeSlot, Session } = db;

export async function getAllGymnastGroups(req, res, next) {
    try {
        const allGymnastGroups = await GymnastGroup.findAll();
        res.status(200).json(allGymnastGroups);
    } catch (error) {
        next(error);
    }
}

export async function findGymnastGroup(req, res, next) {
    try {
        const groupId = req.params.id;
        const gymnastGroup = await GymnastGroup.findByPk(groupId);
        if (gymnastGroup) {
            res.status(200).json(gymnastGroup);
        } else {
            res.status(404).send('GymnastGroup not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function getGymnastGroupsByCompetition(req, res, next) {
    try {
        const competitionId = req.params.competition_id;

        // Find all time slots for the competition
        const timeSlots = await TimeSlot.findAll({
            where: { competition_id: competitionId },
        });

        // Extract time_slot_ids from time slots
        const timeSlotIds = timeSlots.map(slot => slot.time_slot_id);

        // Find all sessions related to those time slots
        const sessions = await Session.findAll({
            where: { time_slot_id: timeSlotIds },
        });

        // Group sessions by time_slot_id
        const sessionGroups = sessions.reduce((acc, session) => {
            const timeSlotId = session.time_slot_id;
            if (!acc[timeSlotId]) {
                acc[timeSlotId] = []; // Create an array for this time slot if it doesn't exist
            }
            acc[timeSlotId].push(session);
            return acc;
        }, {});

        // Assign labels "A", "B", "C" to sessions based on their time slot
        const labeledSessions = [];
        Object.entries(sessionGroups).forEach(([timeSlotId, sessionArray]) => {
            sessionArray.forEach((session, index) => {
                // Assign "A", "B", "C" based on index
                const label = ["A", "B", "C"][index] || ""; // Use index to get the label
                labeledSessions.push({ ...session.toJSON(), label }); // Store the session with its label
            });
        });

        // Extract session_ids from labeledSessions for querying gymnast groups
        const sessionIds = labeledSessions.map(session => session.session_id);

        // Find all gymnast groups related to those sessions
        const gymnastGroups = await GymnastGroup.findAll({
            where: { session_id: sessionIds },
            include: [{
                model: Session,
                attributes: ['session_id', 'time_slot_id'], // Get session_id and time_slot_id
                include: [{
                    model: TimeSlot,
                    attributes: ['date', 'report_time', 'competition_time', 'award_time'], // Get time slot details
                }],
            }],
        });

        // Include the assigned labels in the response
        const responseWithLabels = gymnastGroups.map(group => {
            const session = labeledSessions.find(s => s.session_id === group.session_id);
            return {
                ...group.toJSON(),
                sessionLabel: session ? session.label : null, // Attach the label if found
            };
        });

        res.status(200).json(responseWithLabels);
    } catch (error) {
        next(error);
    }
}


export async function createGymnastGroup(req, res, next) {
    try {
        const newGymnastGroup = await GymnastGroup.create(req.body);
        res.status(201).json(newGymnastGroup);
    } catch (error) {
        next(error);
    }
}

export async function updateGymnastGroup(req, res, next) {
    try {
        const groupId = req.params.id;
        const [updated] = await GymnastGroup.update(req.body, {
            where: { group_id: groupId }
        });
        if (updated) {
            const updatedGymnastGroup = await GymnastGroup.findByPk(groupId);
            res.status(200).json(updatedGymnastGroup);
        } else {
            res.status(404).send('GymnastGroup not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteGymnastGroup(req, res, next) {
    try {
        const groupId = req.params.id;
        const deleted = await GymnastGroup.destroy({
            where: { group_id: groupId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('GymnastGroup not found');
        }
    } catch (error) {
        next(error);
    }
}
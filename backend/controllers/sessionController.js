import db from '../models/index.js';

const { Session } = db;

export async function getAllSessions(req, res, next) {
    try {
        const allSessions = await Session.findAll();
        res.status(200).json(allSessions);
    } catch (error) {
        next(error);
    }
}

export async function findSession(req, res, next) {
    try {
        const sessionId = req.params.id;
        const session = await Session.findByPk(sessionId);
        if (session) {
            res.status(200).json(session);
        } else {
            res.status(404).send('Session not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createSession(req, res, next) {
    try {
        const newSession = await Session.create(req.body);
        res.status(201).json(newSession);
    } catch (error) {
        next(error);
    }
}

export async function updateSession(req, res, next) {
    try {
        const sessionId = req.params.id;
        const [updated] = await Session.update(req.body, {
            where: { session_id: sessionId }
        });
        if (updated) {
            const updatedSession = await Session.findByPk(sessionId);
            res.status(200).json(updatedSession);
        } else {
            res.status(404).send('Session not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteSession(req, res, next) {
    try {
        const sessionId = req.params.id;
        const deleted = await Session.destroy({
            where: { session_id: sessionId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Session not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function getSessionsByTimeSlot(req, res, next) {
    try {
      const { timeSlotId } = req.params;
      const sessions = await Session.findAll({ where: { time_slot_id: timeSlotId } });

      if (sessions) {
            res.status(200).json(sessions);
      } else {
            res.status(404).send('Session not found');
      }
    } catch (error) {
      next(error);
    }
}
import db from '../models/index.js';

const { Execution } = db;

export async function getAllExecutions(req, res, next) {
    try {
        const allExecutions = await Execution.findAll();
        res.status(200).json(allExecutions);
    } catch (error) {
        next(error);
    }
}

export async function findExecution(req, res, next) {
    try {
        const { eventId, gymnastId, judgeId } = req.params;
        const execution = await Execution.findOne({
            where: {
                event_id: eventId,
                gymnast_id: gymnastId,
                judge_id: judgeId
            }
        });
        if (execution) {
            res.status(200).json(execution);
        } else {
            res.status(404).send('Execution not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createExecution(req, res, next) {
    try {
        const newExecution = await Execution.create(req.body);
        res.status(201).json(newExecution);
    } catch (error) {
        next(error);
    }
}

export async function updateExecution(req, res, next) {
    try {
        const { eventId, gymnastId, judgeId } = req.params;
        const [updated] = await Execution.update(req.body, {
            where: {
                event_id: eventId,
                gymnast_id: gymnastId,
                judge_id: judgeId
            }
        });
        if (updated) {
            const updatedExecution = await Execution.findOne({
                where: {
                    event_id: eventId,
                    gymnast_id: gymnastId,
                    judge_id: judgeId
                }
            });
            res.status(200).json(updatedExecution);
        } else {
            res.status(404).send('Execution not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteExecution(req, res, next) {
    try {
        const { eventId, gymnastId, judgeId } = req.params;
        const deleted = await Execution.destroy({
            where: {
                event_id: eventId,
                gymnast_id: gymnastId,
                judge_id: judgeId
            }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Execution not found');
        }
    } catch (error) {
        next(error);
    }
}
import db from '../models/index.js';

const { Difficulty } = db;

export async function getAllDifficulties(req, res, next) {
    try {
        const allDifficulties = await Difficulty.findAll();
        console.log(allDifficulties);
        res.status(200).json(allDifficulties);
    } catch (error) {
        next(error);
    }
}

export async function findDifficulty(req, res, next) {
    try {
        const { eventId, gymnastId, judgeId } = req.params;
        const difficulty = await Difficulty.findOne({
            where: {
                event_id: eventId,
                gymnast_id: gymnastId,
                judge_id: judgeId
            }
        });
        if (difficulty) {
            res.status(200).json(difficulty);
        } else {
            res.status(404).send('Difficulty not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createDifficulty(req, res, next) {
    try {
        const newDifficulty = await Difficulty.create(req.body);
        res.status(201).json(newDifficulty);
    } catch (error) {
        next(error);
    }
}

export async function updateDifficulty(req, res, next) {
    try {
        const { eventId, gymnastId, judgeId } = req.params;
        const [updated] = await Difficulty.update(req.body, {
            where: {
                event_id: eventId,
                gymnast_id: gymnastId,
                judge_id: judgeId
            }
        });
        if (updated) {
            const updatedDifficulty = await Difficulty.findOne({
                where: {
                    event_id: eventId,
                    gymnast_id: gymnastId,
                    judge_id: judgeId
                }
            });
            console.log(updatedDifficulty);
            res.status(200).json(updatedDifficulty);
        } else {
            res.status(404).send('Difficulty not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteDifficulty(req, res, next) {
    try {
        const { eventId, gymnastId, judgeId } = req.params;
        const deleted = await Difficulty.destroy({
            where: {
                event_id: eventId,
                gymnast_id: gymnastId,
                judge_id: judgeId
            }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Difficulty not found');
        }
    } catch (error) {
        next(error);
    }
}
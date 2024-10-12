import db from '../models/index.js';
import { findJudgeByGsaId } from '../service/judgeService.js';

const { Judge } = db;

export async function getAllJudges(req, res, next) {
    try {
        const allJudges = await Judge.findAll();
        console.log(allJudges);
        res.status(200).json(allJudges);
    } catch (error) {
        next(error);
    }
}

export async function findJudge(req, res, next) {
    try {
        const judgeId = req.params.id;
        const judge = await Judge.findByPk(judgeId);
        if (judge) {
            res.status(200).json(judge);
        } else {
            res.status(404).send('Judge not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function findJudgeGsa(req, res, next) {
    try {
        const gsa_id = req.params.gsa_id;
        const judge = await findJudgeByGsaId(gsa_id);
        if (judge) {
            res.status(200).json(judge);
        } else {
            res.status(404).send('Judge not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function getJudgesByCompetition(req, res, next) {
    try {
        const competitionId = req.params.competitionId; // Get competition ID from URL params
        const judges = await Judge.findAll({
            where: { competition_id: competitionId } // Filter judges by competition ID
        });

        if (judges.length > 0) {
            res.status(200).json(judges);
        } else {
            res.status(404).send('No judges found for this competition');
        }
    } catch (error) {
        next(error);
    }
}

export async function createJudge(req, res, next) {
    try {
        const newJudge = await Judge.create(req.body);
        res.status(201).json(newJudge);
    } catch (error) {
        next(error);
    }
}

export async function updateJudge(req, res, next) {
    try {
        const judgeId = req.params.id;
        const [updated] = await Judge.update(req.body, {
            where: { judge_id: judgeId }
        });
        if (updated) {
            const updatedJudge = await Judge.findByPk(judgeId);
            res.status(200).json(updatedJudge);
        } else {
            res.status(404).send('Judge not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteJudge(req, res, next) {
    try {
        const judgeId = req.params.id;
        const deleted = await Judge.destroy({
            where: { judge_id: judgeId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Judge not found');
        }
    } catch (error) {
        next(error);
    }
}
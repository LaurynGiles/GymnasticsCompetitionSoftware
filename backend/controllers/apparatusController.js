import db from '../models/index.js';

const { Apparatus } = db;

export async function getAllApparatus(req, res, next) {
    try {
        const allApparatus = await Apparatus.findAll();
        console.log(allApparatus);
        res.status(200).json(allApparatus);
    } catch (error) {
        next(error);
    }
}

export async function findApparatus(req, res, next) {
    try {
        const apparatusId = req.params.id;
        const apparatus = await Apparatus.findByPk(apparatusId);
        if (apparatus) {
            res.status(200).json(apparatus);
        } else {
            res.status(404).send('Apparatus not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createApparatus(req, res, next) {
    try {
        const newApparatus = await Apparatus.create(req.body);
        res.status(201).json(newApparatus);
    } catch (error) {
        next(error);
    }
}

export async function updateApparatus(req, res, next) {
    try {
        const apparatusId = req.params.id;
        const [updated] = await Apparatus.update(req.body, {
            where: { apparatus_id: apparatusId }
        });
        if (updated) {
            const updatedApparatus = await Apparatus.findByPk(apparatusId);
            console.log(updatedApparatus);
            res.status(200).json(updatedApparatus);
        } else {
            res.status(404).send('Apparatus not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteApparatus(req, res, next) {
    try {
        const apparatusId = req.params.id;
        const deleted = await Apparatus.destroy({
            where: { apparatus_id: apparatusId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Apparatus not found');
        }
    } catch (error) {
        next(error);
    }
}
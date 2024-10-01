import db from '../models/index.js';

const { Qualification } = db;

export async function getAllQualifications(req, res, next) {
    try {
        const qualifications = await Qualification.findAll();
        res.status(200).json(qualifications);
    } catch (error) {
        next(error);
    }
}

export async function findQualification(req, res, next) {
    try {
        const qualificationId = req.params.id;
        const qualification = await Qualification.findByPk(qualificationId);
        if (qualification) {
            res.status(200).json(qualification);
        } else {
            res.status(404).send('Qualification not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createQualification(req, res, next) {
    try {
        const newQualification = await Qualification.create(req.body);
        res.status(201).json(newQualification);
    } catch (error) {
        next(error);
    }
}

export async function updateQualification(req, res, next) {
    try {
        const qualificationId = req.params.id;
        const [updated] = await Qualification.update(req.body, {
            where: { qualification_id: qualificationId }
        });
        if (updated) {
            const updatedQualification = await Qualification.findByPk(qualificationId);
            res.status(200).json(updatedQualification);
        } else {
            res.status(404).send('Qualification not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteQualification(req, res, next) {
    try {
        const qualificationId = req.params.id;
        const deleted = await Qualification.destroy({
            where: { qualification_id: qualificationId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Qualification not found');
        }
    } catch (error) {
        next(error);
    }
}

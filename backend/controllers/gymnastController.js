import Gymnast from '../models/gymnast.js';

export async function getAllGymnasts(req, res, next) {
    try {
        const allGymnasts = await Gymnast.findAll();
        res.status(200).json(allGymnasts);
    } catch (error) {
        next(error);
    }
}

export async function findGymnast(req, res, next) {
    try {
        const gymnastId = req.params.id;
        const gymnast = await Gymnast.findByPK(gymnastId);
        if (gymnast) {
            res.status(200).json(gymnast);
        } else {
            res.status(404).send('Gymnast not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createGymnast(req, res, next) {
    try {
        const newGymnast = await Gymnast.create(req.body);
        res.status(201).json(newGymnast);
    } catch (error) {
        next(error);
    }
}

export async function updateGymnast(req, res, next) {
    try {
        const gymnastId = req.params.id;
        const [updated] = await Gymnast.update(req.body, {
            where: { gymnast_id: gymnastId }
        });
        if (updated) {
            const updatedGymnast = await Gymnast.findByPk(gymnastId);
            res.status(200).json(updatedGymnast);
        } else {
            res.status(404).send('Gymnast not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteGymnast(req, res, next) {
    try {
        const gymnastId = req.params.id;
        const deleted = await Gymnast.destroy({
            where: { gymnast_id: gymnastId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Gymnast not found');
        }
    } catch (error) {
        next(error);
    }
}
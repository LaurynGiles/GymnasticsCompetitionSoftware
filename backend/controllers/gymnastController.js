import db from '../models/index.js';

const { Gymnast } = db;

export async function getAllGymnasts(req, res, next) {
    try {
        const allGymnasts = await Gymnast.findAll();
        console.log(allGymnasts);
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
        // const { gsa_id, first_name, last_name, date_of_birth, club, district, contact_number, ethnicity, group_id } = req.body;
        // console.log(gsa_id);
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
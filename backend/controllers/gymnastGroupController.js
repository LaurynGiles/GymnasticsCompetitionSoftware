import db from '../models/index.js';

const { GymnastGroup } = db;

export async function getAllGymnastGroups(req, res, next) {
    try {
        const allGymnastGroups = await GymnastGroup.findAll();
        console.log(allGymnastGroups);
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
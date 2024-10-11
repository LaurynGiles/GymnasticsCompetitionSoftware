import db from '../models/index.js';

const { Gymnast, Difficulty, Event, GymnastGroup } = db;

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
        const gymnast = await Gymnast.findByPk(gymnastId);
        if (gymnast) {
            res.status(200).json(gymnast);
        } else {
            res.status(404).send('Gymnast not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function getGymnastsByGroup(req, res, next) {
    try {
        const groupId = req.params.group_id;
        console.log(`GROUP: ${groupId}`);

        // Fetch all gymnasts associated with the given group ID
        const gymnasts = await Gymnast.findAll({
            where: { group_id: groupId },
        });

        console.log(`GYMNASTS: ${gymnasts}`);

        res.status(200).json(gymnasts);
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

export async function getGymnastsByEvent(req, res, next) {
    const { event_id } = req.params;

    console.log(event_id);

    try {
        const event = await Event.findByPk(event_id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        console.log(event);

        const groupId = event.group_id;

        console.log(groupId);

        const gymnasts = await Gymnast.findAll({
            where: { group_id: groupId },
        });

        console.log(gymnasts);

        const completedGymnasts = await Difficulty.findAll({
            where: { event_id },
            attributes: ['gymnast_id'],
        });

        const completedGymnastIds = completedGymnasts.map(d => d.gymnast_id);

        const result = gymnasts.map(gymnast => ({
            ...gymnast.toJSON(),
            completed: completedGymnastIds.includes(gymnast.gymnast_id),
        }));

        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching gymnasts:', error);
        next(error);
    }
}
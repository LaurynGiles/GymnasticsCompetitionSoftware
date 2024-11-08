import db from '../models/index.js';

const { Competition } = db;

export async function getAllCompetitions(req, res, next) {
    try {
        const allCompetitions = await Competition.findAll();
        res.status(200).json(allCompetitions);
    } catch (error) {
        next(error);
    }
}

export async function findCompetition(req, res, next) {
    try {
        const competitionId = req.params.id;
        const competition = await Competition.findByPk(competitionId);
        if (competition) {
            res.status(200).json(competition);
        } else {
            res.status(404).send('Competition not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createCompetition(req, res, next) {
    try {
        const newCompetition = await Competition.create(req.body);
        res.status(201).json(newCompetition);
    } catch (error) {
        next(error);
    }
}

export async function updateCompetition(req, res, next) {
    try {
        const competitionId = req.params.id;
        const [updated] = await Competition.update(req.body, {
            where: { competition_id: competitionId }
        });
        if (updated) {
            const updatedCompetition = await Competition.findByPk(competitionId);
            res.status(200).json(updatedCompetition);
        } else {
            res.status(404).send('Competition not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteCompetition(req, res, next) {
    try {
        const competitionId = req.params.id;
        const deleted = await Competition.destroy({
            where: { competition_id: competitionId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Competition not found');
        }
    } catch (error) {
        next(error);
    }
}

export const getCompetitionsByAdmin = async (req, res) => {
    const { admin_id } = req.params;

    try {
        const competitions = await Competition.findAll({
            where: { admin_id },
        });

        if (!competitions.length) {
            return res.status(404).json({ message: 'No competitions found for this admin.' });
        }

        res.status(200).json(competitions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching competitions.' });
    }
};
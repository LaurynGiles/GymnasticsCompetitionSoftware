import db from '../models/index.js';
const { Judge } = db;

export async function findJudgeByGsaId(gsa_id) {

    try {
        return await Judge.findOne({ where: { gsa_id } });
    } catch (error) {
        throw new Error('Database query failed');
    }
}
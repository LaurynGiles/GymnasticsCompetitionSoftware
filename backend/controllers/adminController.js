import db from '../models/index.js';

const { Admin } = db;

export async function getAllAdmins(req, res, next) {
    try {
        const allAdmins = await Admin.findAll();
        console.log(allAdmins);
        res.status(200).json(allAdmins);
    } catch (error) {
        next(error);
    }
}

export async function findAdmin(req, res, next) {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).send('Admin not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createAdmin(req, res, next) {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        next(error);
    }
}

export async function updateAdmin(req, res, next) {
    try {
        const adminId = req.params.id;
        const [updated] = await Admin.update(req.body, {
            where: { admin_id: adminId }
        });
        if (updated) {
            const updatedAdmin = await Admin.findByPk(adminId);
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).send('Admin not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteAdmin(req, res, next) {
    try {
        const adminId = req.params.id;
        const deleted = await Admin.destroy({
            where: { admin_id: adminId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Admin not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function checkAdminExists(req, res, next) {
    try {
        const { username } = req.params;
        const adminExists = await Admin.findOne({ where: { username } });

        console.log(adminExists)
        
        if (adminExists) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        next(error);
    }
}
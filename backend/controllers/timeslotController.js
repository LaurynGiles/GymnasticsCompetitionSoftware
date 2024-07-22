import db from '../models/index.js';

const { TimeSlot } = db;

export async function getAllTimeSlots(req, res, next) {
    try {
        const allTimeSlots = await TimeSlot.findAll();
        console.log(allTimeSlots);
        res.status(200).json(allTimeSlots);
    } catch (error) {
        next(error);
    }
}

export async function findTimeSlot(req, res, next) {
    try {
        const timeSlotId = req.params.id;
        const timeSlot = await TimeSlot.findByPk(timeSlotId);
        console.log(timeSlot);
        if (timeSlot) {
            res.status(200).json(timeSlot);
        } else {
            res.status(404).send('TimeSlot not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createTimeSlot(req, res, next) {
    try {
        const newTimeSlot = await TimeSlot.create(req.body);
        console.log(newTimeSlot);
        res.status(201).json(newTimeSlot);
    } catch (error) {
        next(error);
    }
}

export async function updateTimeSlot(req, res, next) {
    try {
        const timeSlotId = req.params.id;
        const [updated] = await TimeSlot.update(req.body, {
            where: { time_slot_id: timeSlotId }
        });
        if (updated) {
            const updatedTimeSlot = await TimeSlot.findByPk(timeSlotId);
            console.log(updatedTimeSlot);
            res.status(200).json(updatedTimeSlot);
        } else {
            res.status(404).send('TimeSlot not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteTimeSlot(req, res, next) {
    try {
        const timeSlotId = req.params.id;
        const deleted = await TimeSlot.destroy({
            where: { time_slot_id: timeSlotId }
        });
        if (deleted) {
            console.log("Deleted timeslot " + timeSlotId);
            res.status(204).send();
        } else {
            res.status(404).send('TimeSlot not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function getActiveTimeSlot(req, res, next) {
    try {
      const activeTimeSlot = await TimeSlot.findOne({
        where: { completed: false },
        order: [
          ['date', 'ASC'],
          ['competition_time', 'ASC']
        ]
      });
  
      console.log(activeTimeSlot);
      if (activeTimeSlot) {
        return res.status(200).json(activeTimeSlot);
      } else {
        return res.status(404).json({ message: 'No active TimeSlot found' });
      }
    } catch (error) {
      next(error);
    }
  }
import app from '../app.js';
import sequelize from '../config/db.js';

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const server = use(chaiHttp);

describe('API Tests', () => {
    before(async () => {
        try {
            await sequelize.sync({ force: true });
            console.log('Database synced successfully');
        } catch (error) {
            console.error('Error syncing database:', error);
        }
    });

    describe('TimeSlot API', () => {

        let createdTimeSlotId;

        it('should create a new timeslot', (done) => {
            const timeslot1 = {
                date: '2024-03-01',
                report_time: '08:00:00',
                competition_time: '09:00:00',
                award_time: '12:00:00'
            };

            server.request.execute(app)
                .post('/api/timeslots')
                .send(timeslot1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id');
                });

            const timeslot2 = {
                date: '2024-03-01',
                report_time: '08:00:00',
                competition_time: '09:00:00',
                award_time: '12:00:00'
            };
    
            server.request.execute(app)
                .post('/api/timeslots')
                .send(timeslot2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id');
                    createdTimeSlotId = res.body.time_slot_id;
                    done();
                });
        });

        it('should get the created timeslot', (done) => {
            server.request.execute(app)
                .get(`/api/timeslots/${createdTimeSlotId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id', createdTimeSlotId);
                    done();
                });
        });

        it('should update a timeslot', (done) => {
            const updatedTimeSlot = {
                date: '2024-04-01'
            };
    
            server.request.execute(app)
                .put(`/api/timeslots/${createdTimeSlotId}`)
                .send(updatedTimeSlot)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.date).to.equal('2024-04-01');
                    done();
                });
        });

        it('should get all timeslots', (done) => {
            server.request.execute(app)
                .get('/api/timeslots')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should delete a timeslot', (done) => {
            server.request.execute(app)
                .delete(`/api/timeslots/${createdTimeSlotId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Competition API', () => {

        let createdCompetitionId;

        it('should create a new competition', (done) => {
            const competition1 = {
                competition_name: 'Spring Invitational',
                start_date: '2024-03-01',
                end_date: '2024-03-03',
                location: 'Springfield',
                style: 'MAG'
            };

            server.request.execute(app)
                .post('/api/competitions')
                .send(competition1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('competition_id');
                });

            const competition2 = {
                competition_name: 'Summer Championships',
                start_date: '2024-06-15',
                end_date: '2024-06-17',
                location: 'Sunville',
                style: 'WAG',
            };
    
            server.request.execute(app)
                .post('/api/competitions')
                .send(competition2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('competition_id');
                    createdCompetitionId = res.body.competition_id;
                    done();
                });
        });

        it('should get the created competition', (done) => {
            server.request.execute(app)
                .get(`/api/competitions/${createdCompetitionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('competition_id', createdCompetitionId);
                    done();
                });
        });

        it('should update a competition', (done) => {
            const updatedCompetition = {
                end_date: '2024-06-18'
            };
    
            server.request.execute(app)
                .put(`/api/competitions/${createdCompetitionId}`)
                .send(updatedCompetition)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.end_date).to.equal('2024-06-18');
                    done();
                });
        });

        it('should get all competitions', (done) => {
            server.request.execute(app)
                .get('/api/competitions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should delete a competition', (done) => {
            server.request.execute(app)
                .delete(`/api/competitions/${createdCompetitionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Session API', () => {

        let createdSessionId;

        it('should create a new session', (done) => {
            const session1 = {
                competition_id: 1,
                level: '1',
                age: '8-9',
                time_slot_id: 1
            };

            server.request.execute(app)
                .post('/api/sessions')
                .send(session1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('session_id');
                });

            const session2 = {
                competition_id: 1,
                level: '3',
                age: '10-11',
                time_slot_id: 1
            };

            server.request.execute(app)
                .post('/api/sessions')
                .send(session2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('session_id');
                });

            const session3 = {
                competition_id: 1,
                level: '1',
                age: '7-8',
                time_slot_id: 1
            };
    
            server.request.execute(app)
                .post('/api/sessions')
                .send(session3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('session_id');
                    createdSessionId = res.body.session_id;
                    done();
                });
        });

        it('should get the created session', (done) => {
            server.request.execute(app)
                .get(`/api/sessions/${createdSessionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('session_id', createdSessionId);
                    done();
                });
        });

        it('should update a session', (done) => {
            const updatedSession = {
                level: '2'
            };
    
            server.request.execute(app)
                .put(`/api/sessions/${createdSessionId}`)
                .send(updatedSession)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.level).to.equal('2');
                    done();
                });
        });

        it('should get all sessions', (done) => {
            server.request.execute(app)
                .get('/api/sessions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should delete a session', (done) => {
            server.request.execute(app)
                .delete(`/api/sessions/${createdSessionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('GymnastGroup API', () => {

        let createdGymnastGroupId;

        it('should create a new gymnast group', (done) => {
            const gymnastGroup1 = {
                session_id: 1
            };

            server.request.execute(app)
                .post('/api/gymnastgroups')
                .send(gymnastGroup1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('group_id');
                });

            const gymnastGroup2 = {
                session_id: 1
            };
    
            server.request.execute(app)
                .post('/api/gymnastgroups')
                .send(gymnastGroup2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('group_id');
                    createdGymnastGroupId = res.body.group_id;
                    done();
                });
        });

        it('should get the created gymnast group', (done) => {
            server.request.execute(app)
                .get(`/api/gymnastgroups/${createdGymnastGroupId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('group_id', createdGymnastGroupId);
                    done();
                });
        });

        it('should update a gymnast group', (done) => {
            const updatedGymnastGroup = {
                session_id: 2
            };
    
            server.request.execute(app)
                .put(`/api/gymnastgroups/${createdGymnastGroupId}`)
                .send(updatedGymnastGroup)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.session_id).to.equal(2);
                    done();
                });
        });

        it('should get all gymnast groups', (done) => {
            server.request.execute(app)
                .get('/api/gymnastgroups')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should delete a gymnast group', (done) => {
            server.request.execute(app)
                .delete(`/api/gymnastgroups/${createdGymnastGroupId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Gymnast API', () => {

        let createdGymnastId;

        it('should create a new gymnast', (done) => {
            const gymnast1 = {
                gsa_id: '561234',
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '2000-01-01',
                club: 'Elite Gymnastics',
                district: 'CWGA',
                contact_number: '1234567890',
                ethnicity: 'Caucasian',
                group_id: 1
            };

            server.request.execute(app)
                .post('/api/gymnasts')
                .send(gymnast1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('gymnast_id');
                });

            const gymnast2 = {
                gsa_id: '456826',
                first_name: 'Sally',
                last_name: 'Williams',
                date_of_birth: '2005-05-20',
                club: 'Stellenbosch Gymnastics',
                district: 'CWGA',
                contact_number: '5691354852',
                ethnicity: 'Caucasian',
                group_id: 1
            };

            server.request.execute(app)
                .post('/api/gymnasts')
                .send(gymnast2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('gymnast_id');
                    createdGymnastId = res.body.gymnast_id;
                    done();
                });
        });

        it('should get the created gymnast', (done) => {
            console.log(createdGymnastId);
            server.request.execute(app)
                .get(`/api/gymnasts/${createdGymnastId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('gymnast_id', createdGymnastId);
                    done();
                });
        });

        it('should update a gymnast', (done) => {
            const updatedGymnast = {
                first_name: 'Jane',
                last_name: 'Smith',
                contact_number: '0987654321'
            };
    
            server.request.execute(app)
                .put(`/api/gymnasts/${createdGymnastId}`)
                .send(updatedGymnast)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.first_name).to.equal('Jane');
                    expect(res.body.last_name).to.equal('Smith');
                    expect(res.body.contact_number).to.equal('0987654321');
                    done();
                });
        });

        it('should get all gymnasts', (done) => {
            server.request.execute(app)
                .get('/api/gymnasts')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should delete a gymnast', (done) => {
            server.request.execute(app)
                .delete(`/api/gymnasts/${createdGymnastId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });
});
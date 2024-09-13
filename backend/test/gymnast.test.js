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

    describe('Admin API', () => {

        let createdAdminId;

        it('should create a new competition', (done) => {
            const admin1 = {
                username: 'admin1',
                password: 'password123',
                first_name: 'John',
                last_name: 'Doe',
                contact_number: '1234567890',
                email: 'john.doe@example.com'
            };

            server.request.execute(app)
                .post('/api/admins')
                .send(admin1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('admin_id');
            });

            const admin2 = {
                username: 'admin2',
                password: 'password456',
                first_name: 'Bob',
                last_name: 'Dylan',
                contact_number: '7894561232',
                email: 'bob.dylan@example.com'
            };
    
            server.request.execute(app)
                .post('/api/admins')
                .send(admin2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('admin_id');
                    createdAdminId = res.body.admin_id;
                    done();
            });
        });

        it('should get all admins', (done) => {
            server.request.execute(app)
                .get('/api/admins')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should update an admin', (done) => {
            const updatedAdmin = {
                contact_number: '0987654321'
            };
    
            server.request.execute(app)
                .put(`/api/admins/${createdAdminId}`)
                .send(updatedAdmin)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.contact_number).to.equal('0987654321');
                    done();
                });
        });

        it('should get the updated admin', (done) => {
            server.request.execute(app)
                .get(`/api/admins/${createdAdminId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('admin_id', createdAdminId);
                    done();
                });
        });

        it('should delete an admin', (done) => {
            server.request.execute(app)
                .delete(`/api/admins/${createdAdminId}`)
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
                admin_id: 1,
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
                admin_id: 1,
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

        it('should get all competitions', (done) => {
            server.request.execute(app)
                .get('/api/competitions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
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

        it('should get the updated competition', (done) => {
            server.request.execute(app)
                .get(`/api/competitions/${createdCompetitionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('competition_id', createdCompetitionId);
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

    describe('TimeSlot API', () => {

        let createdTimeSlotId;

        it('should create a new timeslot', (done) => {
            const timeslot1 = {
                competition_id: 1,
                date: '2024-03-01',
                report_time: '08:00:00',
                competition_time: '09:00:00',
                award_time: '12:00:00',
                complete: false
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
                competition_id: 1,
                date: '2024-03-01',
                report_time: '10:00:00',
                competition_time: '11:00:00',
                award_time: '14:00:00',
                complete: false
            };
    
            server.request.execute(app)
                .post('/api/timeslots')
                .send(timeslot2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id');
                });

            const timeslot3 = {
                competition_id: 1,
                date: '2024-03-01',
                report_time: '13:00:00',
                competition_time: '14:00:00',
                award_time: '17:00:00',
                complete: false
            };
        
            server.request.execute(app)
                .post('/api/timeslots')
                .send(timeslot3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id');
                });

            const timeslot4 = {
                competition_id: 1,
                date: '2024-03-02',
                report_time: '08:00:00',
                competition_time: '09:00:00',
                award_time: '12:00:00',
                complete: false
            };
            
            server.request.execute(app)
                .post('/api/timeslots')
                .send(timeslot4)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id');
                    createdTimeSlotId = res.body.time_slot_id;
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

        it('should get the current active TimeSlot', (done) => {
            server.request.execute(app)
              .get('/api/timeSlots/active/')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('time_slot_id');
                expect(res.body).to.have.property('date');
                expect(res.body).to.have.property('competition_time');
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

        it('should get the updated timeslot', (done) => {
            server.request.execute(app)
                .get(`/api/timeslots/${createdTimeSlotId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('time_slot_id', createdTimeSlotId);
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

    describe('Session API', () => {

        let createdSessionId;

        it('should create a new session', (done) => {
            const session1 = {
                time_slot_id: 1,
                complete: false
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
                time_slot_id: 2,
                complete: false
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
                time_slot_id: 3,
                complete: false
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

        it('should get all sessions', (done) => {
            server.request.execute(app)
                .get('/api/sessions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should get sessions with timeslot id 1', (done) => {
            const timeSlotId = 1;
            server.request.execute(app)
                .get(`/api/sessions/byTimeSlot/${timeSlotId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    res.body.forEach(session => {
                        expect(session).to.have.property('session_id');
                        expect(session).to.have.property('time_slot_id', timeSlotId);
                    });
                    done();
                });
        });

        it('should update a session', (done) => {
            const updatedSession = {
                time_slot_id: '3'
            };
    
            server.request.execute(app)
                .put(`/api/sessions/${createdSessionId}`)
                .send(updatedSession)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.time_slot_id).to.equal(3);
                    done();
                });
        });

        it('should get the updated session', (done) => {
            server.request.execute(app)
                .get(`/api/sessions/${createdSessionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('session_id', createdSessionId);
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
                session_id: 2
            };
    
            server.request.execute(app)
                .post('/api/gymnastgroups')
                .send(gymnastGroup2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('group_id');
                });
            
        
            const gymnastGroup3 = {
                session_id: 1
            };
        
            server.request.execute(app)
                .post('/api/gymnastgroups')
                .send(gymnastGroup3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('group_id');
                    createdGymnastGroupId = res.body.group_id;
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

        it('should get the updated gymnast group', (done) => {
            server.request.execute(app)
                .get(`/api/gymnastgroups/${createdGymnastGroupId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('group_id', createdGymnastGroupId);
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
                level: '1',
                age: '7-8',
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
                level: '2',
                age: '10-11',
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

        it('should get all gymnasts', (done) => {
            server.request.execute(app)
                .get('/api/gymnasts')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
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

        it('should get the updated gymnast', (done) => {
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

        it('should delete a gymnast', (done) => {
            server.request.execute(app)
                .delete(`/api/gymnasts/${createdGymnastId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });


    describe('Apparatus API', () => {

        let createdApparatusId;

        it('should create a new apparatus', (done) => {
            const apparatus1 = {
                apparatus_name: "Floor"
            };

            server.request.execute(app)
                .post('/api/apparatuses')
                .send(apparatus1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('apparatus_id');
                });

            const apparatus2 = {
                apparatus_name: "High Bar"
            };

            server.request.execute(app)
                .post('/api/apparatuses')
                .send(apparatus2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('apparatus_id');
                });

            const apparatus3 = {
                apparatus_name: "Parallel bar"
            };
    
            server.request.execute(app)
                .post('/api/apparatuses')
                .send(apparatus3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('apparatus_id');
                    createdApparatusId = res.body.apparatus_id;
                    done();
                });
        });

        it('should get all apparatuses', (done) => {
            server.request.execute(app)
                .get('/api/apparatuses')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should update a apparatus', (done) => {
            const updatedApparatus = {
                apparatus_name: "Vault"
            };
    
            server.request.execute(app)
                .put(`/api/apparatuses/${createdApparatusId}`)
                .send(updatedApparatus)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.apparatus_name).to.equal('Vault');
                    done();
                });
        });

        it('should get the updated apparatus', (done) => {
            server.request.execute(app)
                .get(`/api/apparatuses/${createdApparatusId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('apparatus_id', createdApparatusId);
                    done();
                });
        });

        it('should delete a apparatus', (done) => {
            server.request.execute(app)
                .delete(`/api/apparatuses/${createdApparatusId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Judge API', () => {

        let createdJudgeId, createdJudgeGSA;

        it('should create a new judge', (done) => {
            const judge1 = {
                gsa_id: 'J123456',
                first_name: 'Alice',
                last_name: 'Brown',
                club: 'North Gymnastics Club',
                level: '1',
                head_judge: true,
                role: 'D',
                gender: 'Female',
                contact_number: '4596257784',
                email: 'alice.brown@northgym.com'
            };

            server.request.execute(app)
                .post('/api/judges')
                .send(judge1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('judge_id');
                });

            const judge2 = {
                gsa_id: 'J654321',
                first_name: 'Bob',
                last_name: 'Smith',
                club: 'South Gymnastics Club',
                level: '2',
                head_judge: false,
                role: 'E',
                gender: 'Male',
                contact_number: '2267458125',
                email: 'bob.smith@southgym.com'
            };

            server.request.execute(app)
                .post('/api/judges')
                .send(judge2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('judge_id');
                });

            const judge3 = {
                gsa_id: 'J789012',
                first_name: 'Carol',
                last_name: 'Jones',
                club: 'East Gymnastics Club',
                level: '3',
                head_judge: true,
                role: 'D',
                gender: 'Female',
                contact_number: '4568162954',
                email: 'carol.jones@eastgym.com'
            };
    
            server.request.execute(app)
                .post('/api/judges')
                .send(judge3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('judge_id');
                    createdJudgeId = res.body.judge_id;
                    console.log(createdJudgeId);
                    createdJudgeGSA = res.body.gsa_id;
                    console.log(createdJudgeGSA);
                    done();
                });
        });

        it('should get all judges', (done) => {
            server.request.execute(app)
                .get('/api/judges')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should update a judge', (done) => {
            const updatedJudge = {
                club: 'Stellenbosch Gymnastics'
            };
    
            server.request.execute(app)
                .put(`/api/judges/${createdJudgeId}`)
                .send(updatedJudge)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.club).to.equal('Stellenbosch Gymnastics');
                    done();
                });
        });

        it('should get the updated judge using id', (done) => {
            server.request.execute(app)
                .get(`/api/judges/id/${createdJudgeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('judge_id', createdJudgeId);
                    done();
                });
        });

        it('should get the updated judge using gsa_id', (done) => {
            server.request.execute(app)
                .get(`/api/judges/gsa/${createdJudgeGSA}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('judge_id', createdJudgeId);
                    done();
                });
        });

        it('should delete a judge', (done) => {
            server.request.execute(app)
                .delete(`/api/judges/${createdJudgeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Event API', () => {

        let createdEventId;

        it('should create a new event', (done) => {
            const event1 = {
                group_id: 1,
                apparatus_id: 1,
                complete: false
            };

            server.request.execute(app)
                .post('/api/events')
                .send(event1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id');
                });

            const event2 = {
                group_id: 1,
                apparatus_id: 2,
                complete: false
            };

            server.request.execute(app)
                .post('/api/events')
                .send(event2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id');
                });

            const event3 = {
                group_id: 2,
                apparatus_id: 1,
                complete: false
            };
    
            server.request.execute(app)
                .post('/api/events')
                .send(event3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id');
                    createdEventId = res.body.event_id;
                    done();
                });
        });

        // it('should not create a duplicate event', (done) => {
        //     const duplicateEvent = {
        //         session_id: 1,
        //         apparatus_id: 1,
        //         complete: false
        //     };
    
        //     server.request.execute(app)
        //         .post('/api/events')
        //         .send(duplicateEvent)
        //         .end((err, res) => {
        //             expect(res).to.have.status(400); // Expecting a Bad Request or similar error
        //             expect(res.body).to.be.an('object');
        //             expect(res.body).to.have.property('message');
        //             done();
        //         });
        // });

        it('should get all events', (done) => {
            server.request.execute(app)
                .get('/api/events')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        // it('should get all events for given session IDs', (done) => {
        //     const sessionIds = [1, 2];
        //     server.request.execute(app)
        //         .post('/api/events/bySessions')
        //         .send({ sessionIds })
        //         .end((err, res) => {
        //             expect(res).to.have.status(200);
        //             expect(res.body).to.be.an('array');
        //             res.body.forEach(event => {
        //                 expect(event).to.have.property('event_id');
        //                 expect(sessionIds).to.include(event.session_id);
        //                 expect(event).to.have.property('apparatus_id');
        //                 expect(event.Apparatus).to.have.property('apparatus_name');
        //             });
        //             done();
        //         });
        // });

        it('should update a event', (done) => {
            const updatedEvent = {
                apparatus_id: 2
            };
    
            server.request.execute(app)
                .put(`/api/events/${createdEventId}`)
                .send(updatedEvent)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.apparatus_id).to.equal(2);
                    done();
                });
        });

        it('should get the updated event', (done) => {
            server.request.execute(app)
                .get(`/api/events/${createdEventId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', createdEventId);
                    done();
                });
        });

        it('should delete a event', (done) => {
            server.request.execute(app)
                .delete(`/api/events/${createdEventId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Difficulty API', () => {

        let createdDifficultyKey;

        it('should create a new difficulty score', (done) => {
            const difficulty1 = {
                event_id: 1,
                gymnast_id: 1,
                judge_id: 1,
                difficulty_score: 8.5,
                penalty_score: 0.3,
            };

            server.request.execute(app)
                .post('/api/difficulties')
                .send(difficulty1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', difficulty1.event_id);
                    expect(res.body).to.have.property('gymnast_id', difficulty1.gymnast_id);
                    expect(res.body).to.have.property('judge_id', difficulty1.judge_id);
                });

            const difficulty2 = {
                event_id: 1,
                gymnast_id: 1,
                judge_id: 2,
                difficulty_score: 8.0,
                penalty_score: 0.5,
            };

            server.request.execute(app)
                .post('/api/difficulties')
                .send(difficulty2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', difficulty2.event_id);
                    expect(res.body).to.have.property('gymnast_id', difficulty2.gymnast_id);
                    expect(res.body).to.have.property('judge_id', difficulty2.judge_id);
                });

            const difficulty3 = {
                event_id: 2,
                gymnast_id: 1,
                judge_id: 2,
                difficulty_score: 9.0,
                penalty_score: 0.2,
            };
    
            server.request.execute(app)
                .post('/api/difficulties')
                .send(difficulty3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', difficulty3.event_id);
                    expect(res.body).to.have.property('gymnast_id', difficulty3.gymnast_id);
                    expect(res.body).to.have.property('judge_id', difficulty3.judge_id);
                    createdDifficultyKey = { event_id: difficulty3.event_id, gymnast_id: difficulty3.gymnast_id, judge_id: difficulty3.judge_id };
                    done();
                });
        });

        it('should get all difficulty scores', (done) => {
            server.request.execute(app)
                .get('/api/difficulties')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should update a difficulty score', (done) => {
            const updatedDifficulty = {
                difficulty_score: 8.7,
                penalty_score: 0.1,
            };
    
            server.request.execute(app)
            .put(`/api/difficulties/${createdDifficultyKey.event_id}/${createdDifficultyKey.gymnast_id}/${createdDifficultyKey.judge_id}`)
            .send(updatedDifficulty)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.difficulty_score).to.equal(8.7);
                expect(res.body.penalty_score).to.equal(0.1);
                done();
            });
        });

        it('should get the updated difficulty score', (done) => {
            server.request.execute(app)
            .get(`/api/difficulties/${createdDifficultyKey.event_id}/${createdDifficultyKey.gymnast_id}/${createdDifficultyKey.judge_id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('event_id', createdDifficultyKey.event_id);
                expect(res.body).to.have.property('gymnast_id', createdDifficultyKey.gymnast_id);
                expect(res.body).to.have.property('judge_id', createdDifficultyKey.judge_id);
                done();
            });
        });

        it('should delete a difficulty score', (done) => {
            server.request.execute(app)
                .delete(`/api/difficulties/${createdDifficultyKey.event_id}/${createdDifficultyKey.gymnast_id}/${createdDifficultyKey.judge_id}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Execution API', () => {
        let createdExecutionKey;
    
        it('should create a new execution score', (done) => {
            const execution1 = {
                event_id: 1,
                gymnast_id: 1,
                judge_id: 1,
                execution_score: 8.5
            };
    
            server.request.execute(app)
                .post('/api/executions')
                .send(execution1)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', execution1.event_id);
                    expect(res.body).to.have.property('gymnast_id', execution1.gymnast_id);
                    expect(res.body).to.have.property('judge_id', execution1.judge_id);
                });
    
            const execution2 = {
                event_id: 1,
                gymnast_id: 1,
                judge_id: 2,
                execution_score: 8.0
            };
    
            server.request.execute(app)
                .post('/api/executions')
                .send(execution2)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', execution2.event_id);
                    expect(res.body).to.have.property('gymnast_id', execution2.gymnast_id);
                    expect(res.body).to.have.property('judge_id', execution2.judge_id);
                });
    
            const execution3 = {
                event_id: 2,
                gymnast_id: 1,
                judge_id: 2,
                execution_score: 9.0
            };
    
            server.request.execute(app)
                .post('/api/executions')
                .send(execution3)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', execution3.event_id);
                    expect(res.body).to.have.property('gymnast_id', execution3.gymnast_id);
                    expect(res.body).to.have.property('judge_id', execution3.judge_id);
                    createdExecutionKey = { event_id: execution3.event_id, gymnast_id: execution3.gymnast_id, judge_id: execution3.judge_id };
                    done();
                });
        });
    
        it('should get all execution scores', (done) => {
            server.request.execute(app)
                .get('/api/executions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    
        it('should update an execution score', (done) => {
            const updatedExecution = {
                execution_score: 8.7
            };
    
            server.request.execute(app)
                .put(`/api/executions/${createdExecutionKey.event_id}/${createdExecutionKey.gymnast_id}/${createdExecutionKey.judge_id}`)
                .send(updatedExecution)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.execution_score).to.equal(8.7);
                    done();
                });
        });
    
        it('should get the updated execution score', (done) => {
            server.request.execute(app)
                .get(`/api/executions/${createdExecutionKey.event_id}/${createdExecutionKey.gymnast_id}/${createdExecutionKey.judge_id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('event_id', createdExecutionKey.event_id);
                    expect(res.body).to.have.property('gymnast_id', createdExecutionKey.gymnast_id);
                    expect(res.body).to.have.property('judge_id', createdExecutionKey.judge_id);
                    done();
                });
        });
    
        it('should delete an execution score', (done) => {
            server.request.execute(app)
                .delete(`/api/executions/${createdExecutionKey.event_id}/${createdExecutionKey.gymnast_id}/${createdExecutionKey.judge_id}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('Completion Checks API', () => {

        it('should check event completion and mark as complete if all gymnasts have scores', (done) => {
            const eventId = 1;
            server.request.execute(app)
              .get(`/api/complete/event/${eventId}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.oneOf(['Event marked as complete.', 'Event not complete yet.']);
                done();
            });
        });

        it('should check session completion and mark as complete if all events are complete', (done) => {
            const sessionId = 1;
            server.request.execute(app)
              .get(`/api/complete/session/${sessionId}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.oneOf(['Session marked as complete.', 'Session not complete yet.']);
                done();
              });
        });

        it('should check timeslot completion and mark as complete if all sessions are complete', (done) => {
            const timeSlotId = 1;
            server.request.execute(app)
              .get(`/api/complete/timeSlot/${timeSlotId}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.oneOf(['TimeSlot marked as complete.', 'TimeSlot not complete yet.']);
                done();
              });
          });
    });
    
});
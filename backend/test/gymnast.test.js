import app from '../app.js';
import sequelize from '../config/db.js';

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const server = use(chaiHttp);


describe('API Tests', () => {
    before(async () => {
        // try {
        //     await sequelize.sync({ force: true });
        //     console.log('Database synced successfully');
        // } catch (error) {
        //     console.error('Error syncing database:', error);
        // }
    });

    describe('TimeSlot API', () => {
        it('should get all timeslots', (done) => {
            server.request.execute(app)
                .get('/api/timeslots')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('Competition API', () => {
        it('should get all competitions', (done) => {
            server.request.execute(app)
                .get('/api/competitions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('Session API', () => {
        it('should get all sessions', (done) => {
            server.request.execute(app)
                .get('/api/sessions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GymnastGroup API', () => {
        it('should get all gymnast groups', (done) => {
            server.request.execute(app)
                .get('/api/gymnastgroups')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('Gymnast API', () => {

        let createdGymnastId;

        it('should get all gymnasts', (done) => {
            server.request.execute(app)
                .get('/api/gymnasts')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should create a new gymnast', (done) => {
            const gymnast = {
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
                .send(gymnast)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('gymnast_id');
                    createdGymnastId = res.body.gymnast_id;
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
});
import app from '../app.js';

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const server = use(chaiHttp);

describe('Gymnast API', () => {
    let createdGymnastId;

    it('should get all gymnasts', (done) => {
        server.request.execute(app)
            .get('/api/gymnasts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done(); // Signal Mocha that the async operation is complete
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

        console.log(gymnast);

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
});
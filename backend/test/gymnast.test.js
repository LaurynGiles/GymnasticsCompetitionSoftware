// import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

chai.use(chaiHttp);

describe('Gymnast API', () => {
    it('should get all gymnasts', async () => {
        const res = await chai.request(app).get('/api/gymnasts');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });
});
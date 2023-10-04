const chai = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
const { expect } = chai;
const request = supertest(app);

describe('/healtz endpoint', () => {
  it('should return a 200 status for /healthz', async () => {
    const response = await request.get('/healthz');
    expect(response.status).to.equal(200);
  });
});
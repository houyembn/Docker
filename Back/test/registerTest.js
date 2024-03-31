const request = require('supertest');
const assert = require('assert');
const app = require("../Server");



describe('Enregistrement utilisateur', () => {
  it('enregistre un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/api/register/register')
      .send({
        name: 'User2',
        email: 'User2@example.com',
        password: 'User2',
        role: 'Employée'
      });

    assert.strictEqual(res.status, 200);

  });


});
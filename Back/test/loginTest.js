const request = require('supertest');
const assert = require('assert');
const app = require('../Server');

describe('utilisateur Login', () => {
  it('connecte un utilisateur existant avec les informations identification correcte', async () => {
    const res = await request(app)
      .post('/api/login/login-user')
      .send({
        email: 'User1@example.com',
        password: 'User1'
      });

    assert.strictEqual(res.status, 200);

  });
});

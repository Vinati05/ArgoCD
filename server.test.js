const request = require('supertest');
const app = require('./server');

describe('Student API', () => {
  test('GET /students returns 200', async () => {
    const res = await request(app).get('/students');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /students returns 201', async () => {
    const res = await request(app)
      .post('/students')
      .send({
        name: 'Kiran',
        age: 20,
        department: 'CSE'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Kiran');
  });

  test('Invalid student returns 404', async () => {
    const res = await request(app).get('/students/9999');

    expect(res.statusCode).toBe(404);
  });
});

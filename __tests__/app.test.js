const app = require('../app.js')
const request = require ('supertest');
const db = require ('../db/connection');
const seed = require ('../db/seeds/seed');
const testData = require ('../db/data/test-data/index.js');

afterAll(() => {
if (db.end) db.end();
});

beforeEach(() => seed(testData));

describe('GET /api/categories', () => {
    test('200: responds with an array of category objects, each of which should have the properties slug and description', () => {
        return request(app)
        .get('/api/categories').expect(200)
        .then((response) => {
            const {categories} = response.body;
        categories.forEach((category) => {
        expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String)
        });
        });
    });
    });
});

describe('GET incorrect path',()=>{
    test('404: non-existent route', ()=>{
        return request(app)
        .get('/apz')
        .expect(404)
        .then(({body})=>{
        expect(body).toEqual({msg: 'path not found!'});
        });
    });
});
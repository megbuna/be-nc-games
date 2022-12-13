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

describe('GET /api/reviews', () => {
    test('200: responds with an array of review objects, each of which should have the required properties', () => {
        return request(app)
        .get('/api/reviews').expect(200)
        .then((response) => {
            const {reviews} = response.body;
        reviews.forEach((review) => {
        expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(String),
        });
        });
        expect(reviews).toBeSortedBy('created_at', {descending: true});
    });
    });
});
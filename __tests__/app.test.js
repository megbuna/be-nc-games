const app = require('../app.js');
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

describe('GET incorrect api path',()=>{
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

describe('GET /api/reviews/:review_id', () => {
    test('200: responds with a review object, which should have the required properties', () => {
        const reviewId = 1
        return request(app)
        .get(`/api/reviews/${reviewId}`)
        .expect(200)
        .then((response) => {
        const {review} = response.body;
        expect(review).toMatchObject({
            title: 'Agricola',
            designer: 'Uwe Rosenberg',
            owner: 'mallionaire',
            review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: 'Farmyard fun!',
            category: 'euro game',
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 1
        });
    });
    });
    test('400: invalid review_id', () => {
        const reviewId = 'z'
        return request(app)
        .get(`/api/reviews/${reviewId}`)
        .expect(400)
        .then(({body}) => {
        expect(body).toEqual({msg: 'path not found!'});
        });
    });
        test('404: non-existent route', () =>{
            return request(app)
            .get('/api/reviews/66777')
            .expect(404)
            .then(({body}) => {
            expect(body).toEqual({msg: 'Not Found'});
            });
        });
    });

    describe('GET /api/users', () => {
        test('200: responds with an array of category objects, each of which should have the appropriate properties', () => {
            return request(app)
            .get('/api/users').expect(200)
            .then((response) => {
                const {users} = response.body;
            users.forEach((user) => {
            expect(user).toMatchObject({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
            });
            });
        });
        });
        test('404: non-existent route', ()=>{
            return request(app)
            .get('/apz')
            .expect(404)
            .then(({body})=>{
            expect(body).toEqual({msg: 'path not found!'});
            });
        });

    });


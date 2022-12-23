const app = require('../app.js');
const request = require ('supertest');
const db = require ('../db/connection');
const seed = require ('../db/seeds/seed');
const testData = require ('../db/data/test-data/index.js');

afterAll(() => {
if (db.end) db.end();
});

beforeEach(() => seed(testData));

describe('/api for all non-existent routes in app', () => {
    test('404: non existent path', () => {
        return request(app)
        .get('/not-a-route')
        .expect(404)
        .then(({body : {msg}}) => {
            expect(msg).toBe("path not found");
        })
    })
});

describe('GET /api', () => {
    test('200: responds with object of different endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeInstanceOf(Object)
        })
    })
});

describe('GET incorrect api path',()=>{
    test('404: non-existent route', ()=>{
        return request(app)
        .get('/apz')
        .expect(404)
        .then(({body})=>{
        expect(body).toEqual({msg: 'path not found'});
        });
    });
});

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
        expect(body).toEqual({msg: 'bad request'});
        });
    });
        test('404: non-existent route', () => {
            return request(app)
            .get('/api/reviews/66777')
            .expect(404)
            .then(({body}) => {
            expect(body).toEqual({msg: 'Not Found'});
            });
        });
    });


describe ('GET /api/reviews/:review_id/comments', () => {
    test('200: responds with a comment object, which should have the required properties', () => {
        const review_id = 3;
        return request(app)
        .get(`/api/reviews/${review_id}/comments`)
        .expect(200)
        .then(({body: {comments}}) => {
            expect(comments).toHaveLength(3);
            expect(comments).toBeSortedBy('created_at', { descending: true });
            comments.forEach((comment) => {
                expect(comment).toEqual(
                    expect.objectContaining({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        review_id: review_id
                })
                )
            })
        })
    });
    test('400: invalid review_id', () => {
        const reviewId = 'z'
        return request(app)
        .get(`/api/reviews/${reviewId}/comments`)
        .expect(400)
        .then(({body}) => {
        expect(body).toEqual({msg: 'bad request'});
        });
    });
        test('404: non-existent route', () => {
            return request(app)
            .get('/api/reviews/66777/comments')
            .expect(404)
            .then(({body}) => {
            expect(body).toEqual({msg: 'Not Found'});
            });
        });
    });

describe('POST /api/reviews/:review_id/comments',() => {
    test('201: responds with comments newly added to the database', () => {
        const comment1 = {
            username: 'mallionaire',
            body: 'Loving it!'
            };
        const reviewId = 2
        return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(comment1)
        .expect(201)
        .then((result) => {
        expect(result.body).toMatchObject({
            author: 'mallionaire',
            body: 'Loving it!',
            review_id: 2,
            comment_id: 7,
                votes:0,
                created_at: "2017-11-22T12:43:33.389Z",
            })
            });
            });

    test('400: when a key is null', () => {
            const reviewId = null
            return request(app)
            .get(`/api/reviews/${reviewId}`)
            .expect(400)
            .then(({body}) => {
            expect(body).toEqual({msg: 'bad request'});
            });
            });

    test('404: non-existent id', () => {
                return request(app)
                .get('/api/reviews/66777/comments')
                .expect(404)
                .then(({body}) => {
                expect(body).toEqual({msg: 'Not Found'});
                });
            });

    test('201: responds with comments and ignores irrelevant key', () => {
            const comment2 = {
                username: 'mallionaire',
                body: 'Loving it!',
                rank: 'Veteran'
            };
            const reviewId = 2
            return request(app)
            .post(`/api/reviews/${reviewId}/comments`)
            .send(comment2)
            .expect(201)
            .then((result) => {
            expect(result.body).toMatchObject({
                    author: 'mallionaire',
                    body: 'Loving it!',
                    review_id: 2,
                    comment_id: 7,
                    votes:0,
                    created_at: "2017-11-22T12:43:33.389Z",
            })
            });
            });

    test('400: empty input body', () => {
            const comment2 = {
                username: 'mallionaire',
                body: ''
            };
            const reviewId = 2
            return request(app)
            .post(`/api/reviews/${reviewId}/comments`)
            .send(comment2)
            .expect(400)
            .then(({body}) => {
                    expect(body).toEqual({msg: 'Bad Request'})
        });
        });

    test('404: non-existent username', () => {
        const comment2 = {
            username: 'mallionair',
            body: 'Loving it!'
        };
        const reviewId = 2
        return request(app)
        .post(`/api/reviews/${reviewId}/comments`)
        .send(comment2)
        .expect(404)
        .then(({body}) => {
                expect(body).toEqual({msg: 'Not Found'})
        });
        });
});

describe("PATCH /api/reviews/:review_id", () => {
    test('200: responds with newly updated review', () => {
        const reviewId = 1
        return request(app)
        .patch(`/api/reviews/${reviewId}`)
        .send({inc_votes : 1})
        .expect(200)
        .then(({body: {review}}) => {
            const updatedReview = review
            expect(updatedReview).toEqual(
                expect.objectContaining({
                    review_id: reviewId,
                    title: "Agricola",
                    designer: "Uwe Rosenberg",
                    owner: "mallionaire",
                    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: "Farmyard fun!",
                    category: 'euro game',
                    created_at: "2021-01-18T10:00:20.514Z",
                    votes: 2
                })
            )
        });
    });
    test('200: responds with newly updated review, ignoring extra properties', () => {
        const reviewId = 1
        return request(app)
        .patch(`/api/reviews/${reviewId}`)
        .send({
            inc_votes: 1,
            owner: "new owner"
        })
        .expect(200)
        .then(({body: {review}}) => {
            const updatedReview = review
            expect(updatedReview).toEqual(
                expect.objectContaining({
                    review_id: reviewId,
                    title: "Agricola",
                    designer: "Uwe Rosenberg",
                    owner: "mallionaire",
                    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: "Farmyard fun!",
                    category: 'euro game',
                    created_at: "2021-01-18T10:00:20.514Z",
                    votes: 2
                })
            )
        });
    });
    test('200: responds with newly updated review, negative inc_votes value', () => {
        const reviewId = 2
        return request(app)
        .patch(`/api/reviews/${reviewId}`)
        .send({inc_votes: -1})
        .expect(200)
        .then(({body: {review}}) => {
            const updatedReview = review
            expect(updatedReview).toEqual(
                expect.objectContaining({
                    review_id: reviewId,
                    title: 'Jenga',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: 'Fiddly fun for all the family',
                    category: 'dexterity',
                    created_at: "2021-01-18T10:01:41.251Z",
                    votes: 4
                })
            )
        });
    });
    test('404: valid id but does not exist, respond appropriately', () => {
        return request(app)
        .patch('/api/reviews/77')
        .send({inc_votes: 1})
        .expect(404)
        .then((response) => {
            const msg = response.body.msg
            expect(msg).toBe('Not found')
        })
    });
    test('400: invalid id, respond appropriately', () => {
        return request(app)
        .patch('/api/reviews/down6')
        .send({inc_votes: 50})
        .expect(400)
        .then((response) => {
            const msg = response.body.msg
            expect(msg).toBe('bad request')
        })
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
});



describe("DELETE /api/comments/:comment_id", () => {
    test("204: deletes comment, responds with no content", () => {
        const comment_id = 1
        return request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(204)
    });
    test('status:400, returns bad request when id is not valid', () => {
        return request(app)
        .delete('/api/comments/example')
        .expect(400)
        .then(( { body } ) => {
            expect(body.msg).toBe("bad request")
        });
    });
    test("status:404, returns not found when comment id is valid but doesn't exist", () => {
        return request(app)
        .delete('/api/comments/999')
        .expect(404)
        .then(( { body } ) => {
            expect(body.msg).toBe("Not found")
        });
    });
});


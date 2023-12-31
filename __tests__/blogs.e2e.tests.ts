import request from 'supertest'
import {app} from "../src/settings";



describe('/blogs', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('should return 200 and empty array', async () => {
        await request(app).get('/blogs')
            .expect(200, [])
    });
    it('should return 404 for not existing course', async () => {
        await request(app).get('/blogs/999999999')
            .expect(404)
    });
    it(`should'nt create course with incorrect title`, async () => {

        await request(app)
            .post('/blogs')
            .send({title: null, author: 'author', availableResolutions: ['P144']})
            .expect(400)

        await request(app).get('/blogs')
            .expect(200, [])

    });

    it(`should'nt create course with incorrect author`, async () => {

        await request(app)
            .post('/blogs')
            .send({title: 'title', author: null, availableResolutions: ['P144']})
            .expect(400)

        await request(app).get('/blogs')
            .expect(200, [])

    });

    it(`length title is not correct`, async () => {

        await request(app)
            .post('/blogs')
            .send({
                title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                author: 'author',
                availableResolutions: ['P144']
            })
            .expect(400)

        await request(app).get('/blogs')
            .expect(200, [])

    });

    it(`length title is not correct`, async () => {

        await request(app)
            .post('/blogs')
            .send({title: 'title', author: 'aaaaaaaaaaaaaaaaaaaaa', availableResolutions: ['P144']})
            .expect(400)

        await request(app).get('/blogs')
            .expect(200, [])

    });

    let createdBlogs: any = null

    it(`should'nt create course with incorrect availableResolutions`, async () => {

        const createResponse = await request(app)
            .post('/blogs')
            .send({title: 'title', author: 'author', availableResolutions: null})
            .expect(201)

        createdBlogs = createResponse.body

        await request(app).get('/blogs')
            .expect(200)

        expect(createdBlogs).toEqual({
            title: "title",
            author: "author",
            availableResolutions: [],
            canBeDownloaded: false,
            createdAt: expect.any(String),
            id: expect.any(Number),
            minAgeRestriction: null,
            publicationDate: expect.any(String),
        })
    })


    it(`should'nt update with incorrect input data`, async () => {
        await request(app)
            .put('/blogs/' + createdBlogs.id)
            .send({
                ...createdBlogs,
                title: ''
            })
            .expect(400)

        await request(app)
            .get('/blogs/' + createdBlogs.id)
            .expect(200, createdBlogs)
    });


    it(`should'nt update course that not exist`, async () => {
        await request(app)
            .put('/blogs/' + 2)
            .send({
                ...createdBlogs,
                title: 'sergei'
            })
            .expect(404)

    });
    it(`should update course with  correct input data`, async () => {

        await request(app)
            .put('/blogs/' + createdBlogs.id)
            .send({
                ...createdBlogs,
                title: 'yea',
                canBeDownloaded: undefined,
            })
            .expect(204)
    });
    it(`should delete both courses`, async () => {

        await request(app)
            .delete('/blogs/' + createdBlogs.id)
            .expect(204)

        await request(app)
            .get('/blogs/' + createdBlogs.id)
            .expect(404)

        await request(app)
            .get('/blogs')
            .expect(200, [])
    })


})
import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { prisma } from "../src/applications/database.js";
import { logger } from "../src/applications/logging.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await prisma.user.deleteMany({
            where: {
                username: "aristwn"
            }
        });
    });

    it('Should can regiter new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'aristwn',
                password: 'rahasia',
                name: 'Ari Setiawan'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("aristwn");
        expect(result.body.data.name).toBe("Ari Setiawan");
        expect(result.body.data.password).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'aristwn',
                password: 'rahasia',
                name: 'Ari Setiawan'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("aristwn");
        expect(result.body.data.name).toBe("Ari Setiawan");
        expect(result.body.data.password).toBeDefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});
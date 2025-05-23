import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";
import { createTestUser, removeTestUser } from "./test-util.js";

// Register User Test Suite
describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
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

// Login User Test Suite
describe("POST /api/users/login", function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should can login", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "aristwn",
                password: "rahasia",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("123456789");
    });

    it("Should reject if request is invalid", async () => {
        const result = await supertest(web)
           .post("/api/users/login")
           .send({
                username: "",
                password: "",
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("Should reject if username or password is wrong", async () => {
        const result = await supertest(web)
          .post("/api/users/login")
          .send({
                username: "aristwn",
                password: "passwordinisalah",
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

// Get User Test Suite
describe("GET /api/users/current", function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should can get current user", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "123456789");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("aristwn");
        expect(result.body.data.name).toBe("Ari Setiawan");
    });

    it("Should reject if request is invalid", async () => {
        const result = await supertest(web)
           .get("/api/users/current")
           .set("Authorization", "tokenngawur");

           logger.info(result.body);

           expect(result.status).toBe(401);
           expect(result.body.errors).toBeDefined();
    });
});
import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";
import { createTestUser, removeTestUser, removeAllTestContact, createTestContact, getTestContact } from "./test-util.js";

describe("POST /api/contacts", function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it("Should can create new contact", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "123456789")
            .send({
                first_name: "Ari",
                last_name: "Setiawan",
                email: "aristwn@stwn.com",
                phone: "081234567890"
            });

        logger.info(result.body);

        expect(result.status).toBe(201);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("Ari");
        expect(result.body.data.last_name).toBe("Setiawan");
        expect(result.body.data.email).toBe("aristwn@stwn.com")
        expect(result.body.data.phone).toBe("081234567890")
    });

    it("Should reject if request is invalid", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "tokenngawur")
            .send({
                first_name: "Ari",
                last_name: "Setiawan",
                email: "aristwn@stwn.com",
                phone: "081234567890"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it("Should reject if request is invalid", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "123456789")
            .send({
                first_name: "",
                last_name: "Setiawan",
                email: "aristwn@",
                phone: "081234567890382974982793729873982793792739872987987"
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it("Should can get contact", async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set("Authorization", "123456789");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
    });

    it("Should reject if request is invalid", async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
           .get("/api/contacts/" + testContact.id)
           .set("Authorization", "tokenngawur");

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it("Should reject if contact is not found", async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
          .get("/api/contacts/" + (testContact.id + 1))
          .set("Authorization", "123456789");

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});
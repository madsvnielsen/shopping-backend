import {describe, expect, test} from '@jest/globals';
import {app, server} from "../server"
import request from "supertest"




describe("get /test", () => {
    test("should return api key", async () => {
        return request(app)
            .get("/test")
            .then(data => {
                expect(data.status).toBe(200)
                expect(data.body).toBeTruthy()
            })
    });
});

describe("test database", () => {
    test("should say connected successfully", async () => {
        return request(app)
            .get("/dbtest")
            .then(data => {
                expect(data.status).toBe(200)
                expect(data.text).toBe("Connection has been established successfully.")
            })
    });
});

afterAll(() => {
    server.close()
})
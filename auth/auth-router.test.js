const request = require("supertest");

const server = require("../api/server.js");

const db = require("../database/dbConfig.js");

describe("auth router", () => {
  it("should run the tests", () => {
    expect(true).toBe(true); // simple assertion
    // initial test passes and fails as expected
  });

  describe("POST /register", () => {
    it.skip("should return 201 Created", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "JestTest2", password: "Tester2" })
        .then(res => {
          expect(res.status).toBe(201);
        })
        .then(res => {
          return db("users").truncate();
        });
    });

    it("Should return 500", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "JestTest3" })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe("POST /login", () => {
    it("should login a user", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "JestTest2", password: "Tester2" })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should deny login", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "trick", password: "tricky" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
});

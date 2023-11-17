const request = require("supertest");

// Unit testing learned from
// Gao, A. (2022) How to test express.js with jest and Supertest, Through the binary.
// Available at: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/ (Accessed: 17 November 2023).
describe("Express server GET favs check", () => {
  it("should get a 200 response when going to http://localhost:8080/favs", async () => {
    const res = await request("http://localhost:8080").get("/favs");
    expect(res.status).toBe(200);
  });
});

describe("Express server POST register check", () => {
  it("should get a 403 response when posting to register with no gmail username or password", async () => {
    const res = await request("http://localhost:8080").post("/favs/register");
    expect(res.status).toBe(403);
  });
});

describe("Express server POST login check", () => {
  it("should get a 200 response when posting to login page", async () => {
    const res = await request("http://localhost:8080").post("/favs/login");
    expect(res.status).toBe(200);
  });
});

describe("Express server GET 404 check", () => {
  it("should get a 404 response when going to root route that does not exist http://localhost:8080/", async () => {
    const res = await request("http://localhost:8080").get("/");
    expect(res.status).toBe(404);
  });
});

describe("Express server POST 400 check", () => {
  it("should get a 400 response when trying a add a fav with no fav even present", async () => {
    const res = await request("http://localhost:8080").post("/favs/search/add");
    expect(res.status).toBe(400);
  });
});

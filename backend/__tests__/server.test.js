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

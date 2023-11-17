const request = require("supertest");

// Unit testing learned from
// Gao, A. (2022) How to test express.js with jest and Supertest, Through the binary.
// Available at: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/ (Accessed: 17 November 2023).
describe("Express server port check", () => {
  it("should be running on port 8080", async () => {
    const response = await request("http://localhost:8080").get("/favs");
    expect(response.status).toBe(200);
  });
});

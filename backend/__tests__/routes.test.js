const request = require("supertest");

// Unit testing learned from
// Gao, A. (2022) How to test express.js with jest and Supertest, Through the binary.
// Available at: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/ (Accessed: 17 November 2023).

// To test routes first make sure backend server is running via "npm start"
// Then run tests from jest using "npm test" within the backend server directory

// Album Search
describe("POST album success check", () => {
  it("should get a 200 response when searching for an album", async () => {
    const res = await request("http://localhost:8080").post(
      "/favs/album-info?albumName=Greatest+Hits&artistName=Creed"
    );
    expect(res.status).toBe(200);
  });
});

describe("DELETE album wrong route request check", () => {
  it("should get a 404 response when attempting a delete on album info", async () => {
    const res = await request("http://localhost:8080").delete(
      "/favs/album-info?albumName=Greatest+Hits&artistName=Creed"
    );
    expect(res.status).toBe(404);
  });
});

// Favs
describe("GET favs success check", () => {
  it("should get a 200 response when going to http://localhost:8080/favs", async () => {
    const res = await request("http://localhost:8080").get("/favs");
    expect(res.status).toBe(200);
  });
});

describe("POST 400 Bad Request check", () => {
  it("should get a 400 response when trying a add a fav with no fav even present", async () => {
    const res = await request("http://localhost:8080").post("/favs/search/add");
    expect(res.status).toBe(400);
  });
});

// Register
describe("POST register Forbidden check", () => {
  it("should get a 403 response when posting to register with no gmail username or password", async () => {
    const res = await request("http://localhost:8080").post("/favs/register");
    expect(res.status).toBe(403);
  });
});

// 404 Check
describe("Express server GET 404 check", () => {
  it("should get a 404 response when going to route that does not exist http://localhost:8080/", async () => {
    const res = await request("http://localhost:8080").get("/");
    expect(res.status).toBe(404);
  });
});

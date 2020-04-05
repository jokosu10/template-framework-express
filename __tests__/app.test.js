const request = require("supertest");
const app = require("../servers/Index");

describe("Test /", () => {
  test("should return 200", async (done) => {
    const response = await request(app)
      .get("/api/test")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("Hello World!");
    done();
  });

  test("should return test api", async (done) => {
    const response = await request(app)
      .get("/api/jokosu10")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("Joko Susilo Ganteng");
    done();
  });
});
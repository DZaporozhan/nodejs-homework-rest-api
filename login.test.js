const express = require("express");
const AuthControllers = require("./controllers/UserController");
const request = require("supertest");
const { connectionToDB } = require("./db/connection");

const app = express();

app.get("/api/users/login", AuthControllers.singin);

describe("hooks", function () {
  beforeAll(async () => {
    await connectionToDB();
    app.listen(3000);
  });

  test("login", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ password: "123456789", email: "zaporozhan06@gmail.com" });
    console.log(response);
  });
});

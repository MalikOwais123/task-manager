import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../server.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

const testingUser = {
  email: "random_testing@yopmail.com",
  password: "123456789",
};

describe("Authentication API", function () {
  let mongoServer;
  let authToken;

  // Increase timeout for the entire suite
  this.timeout(10000); // 10 seconds timeout

  before(async function () {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async function () {
    await mongoose.disconnect();
    await mongoServer.stop();
    process.exit();
  });

  beforeEach(async function () {
    // await User.deleteOne({ email: testingUser.email });
  });

  afterEach(async function () {
    // Optionally, clean up tasks after each test if needed
    await Task.deleteMany({});
  });

  describe("GET /api/ping", function () {
    it("should return pong", async function () {
      const response = await request(app).get("/api/ping").expect(200);

      expect(response.body).to.have.property("message").that.includes("Pong");
    });
  });

  describe("POST /api/auth/signup", function () {
    it("should create a new user", async function () {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(testingUser)
        .expect(201);

      const userExists = await User.findOne({ email: testingUser.email });
      expect(userExists).to.exist;

      expect(response.body)
        .to.have.property("message")
        .that.includes("User registered successfully");
    });
  });

  describe("POST /api/auth/login", function () {
    it("should login a user", async function () {
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send(testingUser)
        .expect(200);

      authToken = loginResponse.body.token;

      expect(loginResponse.body).to.have.property("token").that.is.a("string");
    });
  });

  describe("POST /api/tasks", function () {
    it("should create a new task", async function () {
      const taskData = {
        title: "Test Task",
        description: "This is a test task",
      };

      // Make the request to create the task with the Bearer token in the header
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${authToken}`) // Add the Bearer token
        .send(taskData)
        .expect(201); // Assuming task creation returns 201

      // Check if the task was created in the database
      const task = await Task.findById(response.body._id);
      expect(task).to.exist;
      expect(task.title).to.equal(taskData.title);
      expect(task.description).to.equal(taskData.description);

      // Verify the response
      expect(response.body).to.have.property("title", taskData.title);
      expect(response.body).to.have.property(
        "description",
        taskData.description
      );
    });
  });
});

/*
    routes.test.js

    Testing routes for /search/mongo

    Author: Chris Doucette
    Creaton Date: Wednesday August 17, 2022
    Updates:
    Date,         Author,           Description
    Aug 18 2022,  Chris Doucette,   Troubleshooting 503 error on /search/mongo & got /search/mongo/:_id working
    Aug 18 2022,  Chris Doucette,   Added global user so to get the /search/mongo to pass
    
*/

const express = require("express");
const app = new express();

const router = require("../routes/search");
const router2 = require("../routes/auth");
const request = require("supertest");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// const PORT = process.env.PORT || 4000;

app.use("/search", router);
app.use("/auth", router2);

require("dotenv").config();
const dal = require("../model/mongo.db.config");

const { getUserById } = require("../model/controllers/m.auth.dal");

describe("Testing various routes", () => {
  beforeAll(async () => {
    try {
      await dal.connect();
      // You actually don't need global here, it works somehow without it, but it makes sense having it there.
      global.movieCollection = dal.db("sample_mflix").collection("movies");
      global.userCollection = dal.db("sample_mflix").collection("users");
      global.commentCollection = dal.db("sample_mflix").collection("comments");
      global.profileIcon = null;
      global.DEBUG = false;
      global.user = await getUserById("62fa3dbdc2d1679af2242785");
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    // Close Database here
    await dal.close();
  });

  test("responds to /search/mongo", async () => {
    const res = await request(app).get("/search/mongo?search=Walk");
    expect(res.header["content-type"]).toMatch(/html/);
    expect(res.statusCode).toBe(200);
  });

  test("responds to /search/mongo/:_id", async () => {
    const res = await request(app).get(
      "/search/mongo/573a1395f29313caabce1282"
    );
    expect(res.header["content-type"]).toMatch(/html/);
    expect(res.statusCode).toBe(200);
  });
});

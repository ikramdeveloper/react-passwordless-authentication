const express = require("express");
const cors = require("cors");
const dotenve = require("dotenv");
const stytch = require("stytch");
dotenve.config();
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET_KEY,
  env: stytch.envs.test,
});

const authMiddleware = (req, resp, next) => {
  const sessionToken = req.headers.sessiontoken;
  client.sessions
    .authenticate({ session_token: sessionToken })
    .then(() => next())
    .catch((err) => resp.status(401).json(err));
};

app.post("/login", async (req, resp) => {
  const { email } = req.body;
  const params = {
    email,
    login_magic_link_url: "http://localhost:3000/auth",
    signup_magic_link_url: "http://localhost:3000/auth",
  };

  const response = await client.magicLinks.email.loginOrCreate(params);
  resp.json(response);
});

app.post("/auth", async (req, resp) => {
  try {
    const token = req.body.token;
    const sessionToken = await client.magicLinks.authenticate(token, {
      session_duration_minutes: 30,
    });
    resp.json(sessionToken);
  } catch (err) {
    resp.json({ error: err });
  }
});

app.post("/test", authMiddleware, (req, resp) => {
  resp.json("It worked, this user is authenticated");
});

app.listen(PORT, console.log(`listening on port ${PORT}...`));

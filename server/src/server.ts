require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { PocketClient, Params } from "./lib/pocket";
import cors from "cors";
import path from "path";

const app = express();

app.use(bodyParser.json());

const pocket = new PocketClient(
  process.env.POCKET_CONSUMER_KEY!,
  process.env.POCKET_REDIRECT_URI!
);

const token = (string: string) => string.replace(/Bearer\ /, "") ?? "";

const clientPath = path.join(__dirname, "/../../client/build");

app.use(cors());
app.use(express.static(clientPath));

app.get("/auth", async (req, res) => {
  res.send({ url: pocket.getAuthorizationURL(await pocket.getRequestToken()) });
});

app.get("/auth/callback", async (req, res) => {
  const accessToken = await pocket.getAccessToken(
    String(req.query.requestToken)
  );
  res.redirect(`${process.env.CLIENT_URL!}?accessToken=${accessToken}`);
});

app.get("/api/list", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).end();
  }
  const accessToken = token(req.headers.authorization);
  res.send(await pocket.list(accessToken, req.query as Params));
});

app.post("/api/modify", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).end();
  }
  const accessToken = token(req.headers.authorization);
  res.send(await pocket.modify(accessToken, req.body));
});

app.get("*", (_req, res) => {
  res.sendFile(`${clientPath}/index.html`);
});

app.listen(process.env.PORT ?? 3000);

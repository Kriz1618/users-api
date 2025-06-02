import { Router } from "express";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.send("OK");
  });

  return router;
}

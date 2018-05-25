import express from "express";

class App {
  constructor() {
    this.app = express();
    this.app.set("port", process.env.PORT || 3000);
  }

  public app: express.Application;
}
export default new App().app;
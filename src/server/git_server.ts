import express, { RequestHandler, json } from "express";
import errorHandler from "errorhandler";
import { Server } from "http";
import  { WebApi } from "./Api/web_api";

import { IOContainer } from "../common/ioc_container";

/**
 * Main Server Application
 */
class GitServer {

  // region Fields

  private readonly _ioContainer: IOContainer;
  private _app: express.Application;
  private static readonly s_instance = new GitServer();
  private _server: Server;

  // endregion

  // region Ctor

  /**
   * Intialize a new instance of the class GitServer
   */
  private constructor() {
    this._app = express();
    this._app.set("port", process.env.PORT || 3000);
    this._ioContainer = new IOContainer();
  }

  // endregion

  // region Properties

  /**
   * Gets the server ports
   */
  public get Port(): number { return this._app.get("port"); }

  /**
   * Get server enviroment
   */
  public get Env(): string { return this._app.get("env"); }

  /**
   * Get the Singleton instance
   */
  public static get Instance(): GitServer {
    return this.s_instance;
  }

  /**
   * Get the global IOContainer
   */
  public get IOContainer(): IOContainer {
    return this._ioContainer;
  }

  // endregion

  // region Methods

  public registerApi(webApiInst: WebApi) {

    const configs = webApiInst.getExposedApi();

    configs.forEach(cfg => {

      this._app.get(cfg["0"], function(req, res) {
        const methodName = cfg["1"];
        const result = webApiInst.exec(methodName, req);
        if (typeof result == "string") {
          res.send(result);
          return;
        }
        res.send(JSON.stringify(result));
      });

    });
    return;
  }

  /**
   * Start the git server and return the Http server associates
   */
  public start(): Server  {

    if (this._server) {
      return this._server;
    }

    this._app.use(errorHandler());

    this._server = this._app.listen(this.Port, () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        this.Port,
        this.Env
      );
      console.log("  Press CTRL-C to stop\n");
    });

    return this._server;
  }

  // endregion
}

const singleton = GitServer.Instance;

export default singleton;
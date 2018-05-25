import GitService from "./Api/git_service";
import gitServer from "./git_server";

/**
 * Configure IOContainer
 */

// gitServer.IOContainer.store("config", Config.Load("./config.json"));

/**
 * Configure Api services
 */
gitServer.registerApi(new GitService(gitServer.IOContainer));

/**
 * Start Services
 */
const server = gitServer.start();
export default server;

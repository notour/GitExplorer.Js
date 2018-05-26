import { Request } from "express";
import * as shell from "shelljs";

import IOContainer from "../../common/ioc_container";
import WebApi from "./web_api";
import GitCommands from "./git_commands";

/**
 * Service that provide git results
 */
class GitService extends WebApi {

    // region Fields

    private readonly _ioc: IOContainer;

    // endregion

    // region Ctor

    /**
     * Initialize a new instance of the class GitService
     * @param ioc global container
     */
    public constructor(ioc: IOContainer) {
        super();

        this._ioc = ioc;
    }

    // endregion

    // region Methods

    /**
     * Return a config array that define as key the route and as value the method name
     */
    public getExposedApi(): [string, string][] {
        return [
            [ "/git/version", "getGitVersion" ],
            [ "/git/branchList", "branchList" ],
        ];
    }

    // region Web Methods

    public getGitVersion(): string {
        return GitCommands.GetVersion();
    }
    public branchList(): string {
        return GitCommands.BranchList();
    }

    // endregion

    // endregion
}

export default GitService;
class GitCommands {
    public GetVersion() {
        const shell = require("shelljs");
        const ret = shell.exec("git version");
        return ret.replace("\"", "");
    }

    public BranchList() {
        const shell = require("shelljs");
        const ret = shell.exec("git branch --list");
        return ret.replace("\"", "");
    }
}

const git_commands = new GitCommands();
export default git_commands;
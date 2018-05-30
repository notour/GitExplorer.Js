import * as shell from "shelljs";
import GitRepos from "../Config/git_repos";

class GitCommands {
    private static readonly config = GitRepos.Instance;

    public static GetVersion() {
        const config = GitRepos.Instance.ConfigFile;
        const ret = shell.exec("git version");
        return ret.stdout.replace("\"", "");
    }

    public static BranchList() {
        const directory = GitRepos.Instance.GitDirectory;
        const cmd = "git -C \"" + directory + "\" branch --list";
        const ret = shell.exec(cmd);
        let out = ret.stdout.replace("\"", "");
        if (out == "")
            out = ret.stderr;
        return out;
    }
}

export default GitCommands;
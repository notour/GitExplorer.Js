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
        const gitPath = GitRepos.Instance.GitPath;
        const cmd = gitPath + " -C \"" + directory + "\" branch --list";
        const ret = shell.exec(cmd);
        let out = ret.stdout.replace("\"", "");
        if (out == "")
            out = ret.stderr;
        else {
            out = out.replace(/(\r\n|\n|\r|\t)/gm, " ");
            out = out.replace(/\s+/g, " ");
            let branches = out.split(" ");
            function isNotEmpty(element: string, index: any, array: any) {
                return element != "";
            }
            branches = branches.filter(isNotEmpty);
            out = JSON.stringify(branches);
        }
        return out;
    }
}

export default GitCommands;
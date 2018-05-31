import * as shell from "shelljs";
import GitRepos from "../Config/git_repos";
import { IncomingMessage } from "http";

class GitCommands {
    private static readonly config = GitRepos.Instance;

    private static CommandLine() {
        const directory = GitRepos.Instance.GitDirectory;
        const gitPath = GitRepos.Instance.GitPath;
        const cmd = gitPath + " -C \"" + directory + "\" ";
        return cmd;
    }

    public static GetVersion() {
        const ret = shell.exec(this.CommandLine() + "version");
        let out = ret.stdout.replace("\"", "");
        if (out == "") {
            out = ret.stderr;
            return out;
        }
        return ret.stdout.replace("\"", "");
    }

    public static BranchList() {
        const ret = shell.exec(this.CommandLine() + "branch --list");
        let out = ret.stdout.replace("\"", "");
        if (out == "")
            out = ret.stderr;
        else {
            out = this.CleanRet(out);
            let branches = out.split(" ");
            function isNotEmpty(element: string, index: any, array: any) {
                return element != "";
            }
            branches = branches.filter(isNotEmpty);
            out = JSON.stringify(branches);
        }
        return out;
    }

    public static BranchHistory(branch: string) {
        const ret = shell.exec(this.CommandLine() + "log --oneline --no-color " + branch);
        let out = ret.stdout;
        if (out == "")
            out = ret.stderr;
        else {
            console.debug(out);
            let branches = out.split("\n");
            function isNotEmpty(element: string, index: any, array: any) {
                return element != "";
            }
            branches = branches.filter(isNotEmpty);
            out = JSON.stringify(branches);
        }
        return out;
    }

    public static Config() {
        const userName = shell.exec(this.CommandLine() + "config --get user.name").stdout;
        const userEmail = shell.exec(this.CommandLine() + "config --get user.email").stdout;
        const ret = [
            [ "Name", this.CleanRet(userName) ],
            [ "Email", this.CleanRet(userEmail) ]
        ];
        return JSON.stringify(ret);
    }

    private static CleanRet(out: string) {
        out = out.replace(/(\r\n|\n|\r|\t)/gm, " ");
        out = out.replace(/\s+/g, " ");
        return out.trim();
    }
}

export default GitCommands;
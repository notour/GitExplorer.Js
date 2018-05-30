import * as os from "os"; // used to get hostname
import * as fs from "fs"; // used to read/write json
import * as path from "path"; // for path.resolve
import { json } from "body-parser";

class GitRepos {
    private static readonly _instance = new GitRepos();
    private readonly _hostname = os.hostname();

    private _configFile = "";
    public get ConfigFile(): string {
        if (this._configFile == "")
            this._configFile = path.resolve(
                __dirname,
                "config_for_" + this._hostname + ".json");
        this._configFile = "D:\\Dev\\GitExplorer.Js\\src\\server\\Config\\config_for_i7tower.json";
        return this._configFile;
    }

    private _directory = "";
    public get GitDirectory(): string {
        if (this._directory == "")
            this.ReadOrCreateConfig();
        return this._directory;
    }

    private _gitPath = "";
    public get GitPath(): string {
        if (this._gitPath == "")
            this.ReadOrCreateConfig();
        return this._gitPath;
    }

    public static get Instance(): GitRepos {
        return this._instance;
    }

    private constructor() {
        this.ReadOrCreateConfig();
    }

    private ReadOrCreateConfig() {
        console.log(this.ConfigFile);
        const fileContent = fs.readFileSync(this.ConfigFile, "utf8");
        const jsonContent = JSON.parse(fileContent);
        this._directory = jsonContent.Directory;
        this._gitPath = jsonContent.GitPath;
    }
}

export default GitRepos;
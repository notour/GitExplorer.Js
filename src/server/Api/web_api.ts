import { Request } from "express";

/**
 * Web api
 */
abstract class WebApi {

    // region methods

    /**
     * Return a config array that define as key the route and as value the method name
     */
    public abstract getExposedApi(): [string, string][];

    /**
     * Execute the specific method by his name
     * @param methodName Method Name
     * @param req http request
     */
    public exec(methodName: string, req: Request): any {
        return (this as any)[methodName](req);
    }

    // endregion
}

export default WebApi;
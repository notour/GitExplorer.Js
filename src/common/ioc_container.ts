
class IOContainer {

    // region Fields

    private _storage: Map<string, any>;

    // endregion

    // region Ctor
    // endregion

    // region Methods

    /**
     * Store the specific object by the key
     * @param key unique key
     * @param inst instance associate to the key
     */
    public store(key: string, inst: any) {
        this._storage.set(key, inst);
    }

    /**
     * Get the item associate to the specific key
     * @param key unique key
     */
    public get<TInst>(key: string): TInst {
        return this._storage.get(key) as TInst;
    }

    // endregion
}

export default IOContainer;
import { UnitTestMocha } from "./unit_test_mocha";

export class UTestRunner {

    // region fields

    private readonly _testInstances: Map<string, UnitTestMocha>;

    // endregion

    // region ctor

    /**
     * Initialize a new instance of the class @UnitTestRunner
     */
    public constructor() {
        this._testInstances = new Map<string, UnitTestMocha>();
    }

    // endregion

    // region Methods

    /**
     * Register a specific unit test instance
     */
    public Register<TInst extends UnitTestMocha>(testType: new() => TInst): void {
        const newInstance = new testType();
        this._testInstances.set(testType.name, newInstance);
    }

    /**
     * Run the specific test in function of the argument pass
     */
    public Run() {

        const methodTestNames = this.ExtractTestMethodNames();

        if (methodTestNames.length > 0) {
            const excusiveTestMethod = this.SolveTestMethodPath(methodTestNames);

            excusiveTestMethod.forEach((value) => {
                value["0"].RunSpecific(value["1"]);
            });
        }
        else {
            this._testInstances. forEach((inst, key) => {
                inst.Run();
            });
        }
    }

    /**
     * Search into the nodeJS process.argv to extract all the 
     * parameters --ext-cmd-func="CLASS_NAME.METHOD_NAME"
     */
    private ExtractTestMethodNames(): Array<string> {
        const paramkey = "--ext-cmd-func=";

        const methodNames = new Array<string>();
        
        process.argv.slice(2).forEach((val, index) => {
            if (val.startsWith(paramkey)) {
                let methodName = "undefined";
                methodName = val.substr(paramkey.length).trim();

                let methodNameLenght = methodName.length;

                if (methodNameLenght < 3)
                throw "Missing method name";

                if (methodName[methodNameLenght - 1] == '"')
                    methodNameLenght--;

                if (methodName.startsWith('"'))
                    methodName = methodName.substr(1, methodNameLenght);

                if (methodName.length == 0)
                    throw "Missing method name";

                methodNames.push(methodName);
            }
        });

        return methodNames;
    }

    /**
     * Parse the method names formated like 'CLASS_NAME.METHOD_NAME' and search in the
     * instance recorded the if it exits.
     */
    private SolveTestMethodPath(methodNames: Array<string>): Array<[ UnitTestMocha, string ]> {

        const result = new Array<[ UnitTestMocha, string ]>();
        methodNames.forEach((mthd, index) => {
            const parts = mthd.split(".", 2);

            if (parts.length !== 2)
                throw mthd + " : is in invalid format. Must be in format : 'CLASS_NAME.METHOD_NAME' ";
                
            const className: string = parts[0];
            const methodName: string = parts[1];

            if (!this._testInstances.has(className))
            throw mthd + " : class Not Found";

            const inst: UnitTestMocha = this._testInstances.get(className);

            if (!inst.CheckIfMethodExist(methodName))
                throw mthd + " : Method Not Found";
            
            result.push([ inst, methodName ]);
        });

        return result;
    }

    // endregion
}
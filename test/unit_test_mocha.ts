import chai = require("chai");

const DESCRIPTION = 1;
const FUNCTION_TESTED = 0;

/**
 * Base class for all the mocha unit test
 */
export abstract class UnitTestMocha {

    // region Fields

    private readonly _chai: Chai.ChaiStatic;
    private readonly _testClassName: string;

    /**
     * Map that store the by unit test function name a description and the to method name tested
     */
    private readonly _testMethodMap: Map<string, [string, string ]>;

    // endregion

    // region Ctor

    /**
     * Initialize a new instance of the class @UnitTestMocha
     * @param testClassName name of the class tested
     */
    protected constructor(testClassName: string) {
        this._testClassName = testClassName;
        this._testMethodMap = new Map<string, [ string, string ]>();

        this._chai = chai;
    }

    // endregion

    // region Properties

    /**
     * Gets the assert entry point for the unit test "Chai" library
     */
    protected get Chai() {
        return this._chai;
    }

    // endregion

    // region Methods

    /**
     * Register a test method with a description of the test done
     * @param methodName name of the test method
     * @param functionTested define the true name of the method tested
     * @param lineDescription decription of the test done
     */
    protected RegisterTestMethod(methodName: string, functionTested: string, lineDescription: string) {

        this._testMethodMap.set(methodName, [ functionTested, lineDescription ]);
    }

    /**
     * Check if the method pass in argument is registred
     * @param methodName define the name of the method search
     */
    public CheckIfMethodExist(methodName: string): boolean {
        return this._testMethodMap.has(methodName);
    }

    /**
     * Run all the unit test registered
     */
    public Run() {
        describe(this._testClassName, () => {
            this._testMethodMap.forEach((desc, mthdName) => {
                describe(desc[FUNCTION_TESTED], () => {
                    it("[" + mthdName + "] " + desc[DESCRIPTION], () => { ((this as any)[mthdName])(); });
                });
            });
        });
    }

    /**
     * Run a specific unit test registered
     */
    public RunSpecific(methodName: string) {
        describe(this._testClassName, () => {

            if (!this._testMethodMap.has(methodName))
                throw "The method " + methodName + "is not registered";

            const info: [string, string] = this._testMethodMap.get(methodName);

            describe (info[FUNCTION_TESTED], () => {
                it("[" + methodName + "] " + info[DESCRIPTION], () => { UnitTestMocha.call(methodName, this); });
            });

        });
    }

    // endregion
}
import { UnitTestMocha } from "../unit_test_mocha";
import { IOContainer } from "../../src/common/ioc_container";
import { AssertionError } from "assert";

/**
 * Unit test associate to the class @IocContainer
 */
export class IOContainerUtest extends UnitTestMocha {

    // region Ctor

    /**
     * Initialize a new instance of the class @IocContainerUtest
     */
    public constructor() {
        super("IOContainer");

        super.RegisterTestMethod(this.IOContainer_Ctor.name, "constructor", "Instanciation Test", );
    }

    // endregion

    // region Methods

    /**
     * Test to create a simple @IOContainer
     */
    public IOContainer_Ctor(): void {
        const container = new IOContainer();

        this.Chai.assert.isNotNaN(container);
    }

    // endregion
}
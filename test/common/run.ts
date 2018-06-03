
import "ts-nameof";
import { UnitTestMocha } from "../unit_test_mocha";
import { IOContainerUtest } from "./ioc_container_utest";

import { UTestRunner } from "../utest_runner";

const testRunner = new UTestRunner();

testRunner.Register(IOContainerUtest);

testRunner.Run();
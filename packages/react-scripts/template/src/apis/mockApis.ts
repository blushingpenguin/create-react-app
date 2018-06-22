// This file is exported by the module, and should include mock set up
// calls for all API's, so this can be called before running unit tests
export function registerMockApis() {
    jest.mock("./exampleThingApi");
}
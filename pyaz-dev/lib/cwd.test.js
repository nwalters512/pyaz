import {resolveInCwd} from "./cwd";
describe("resolveInCwd", () => {
  it("works for file", () => {
    const spy = jest.spyOn(process, "cwd");
    spy.mockReturnValue("/foo/bar");
    expect(resolveInCwd("baz.js")).toEqual("/foo/bar/baz.js");
  });
});

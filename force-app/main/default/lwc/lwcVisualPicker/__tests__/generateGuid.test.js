// test/generateGuid.test.js
import generateGuid from "../generateGuid";

describe("generateGuid", () => {
  it("should return a string", () => {
    const guid = generateGuid();
    expect(typeof guid).toBe("string");
  });

  it("should return a valid GUID format", () => {
    const guid = generateGuid();
    const guidRegex =
      /^[a-f0-9]{4}[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    expect(guid).toMatch(guidRegex);
  });
});

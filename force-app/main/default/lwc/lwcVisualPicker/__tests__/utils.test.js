import * as utils from "../lwcVisualPickerUtils";

describe("getPreselectedValue", () => {
  const input = [
    { value: 1, selected: true },
    { value: 2, selected: false },
    { value: 3, selected: true }
  ];
  test("single selection", () => {
    expect(utils.getPreselectedValue(input, false)).toBe(1);
  });

  test("multiple selection", () => {
    expect(utils.getPreselectedValue(input, true)).toEqual([1, 3]);
  });
});


describe("processOptions", () => {
  const input = [
    { value: 1, selected: true, disabled: true },
    { value: 2, selected: false, disabled: true },
    { value: 3, selected: false, disabled: true }
  ];
  test("all disabled", () => {
    expect(utils.processOptions(input)[0].selected).toBeFalsy();
  });

});

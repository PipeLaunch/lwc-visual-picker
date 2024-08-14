// @ts-check

import generateGuid from "./generateGuid";

export { generateGuid };

/**
 * @description Normalize Boolean
 * @param {*} value value
 * @returns {boolean} value in boolean
 */
export function normalizeBoolean(value) {
  if (
    typeof value === "string" &&
    (value === "0" || value.toLowerCase() === "false")
  )
    return false;
  return Boolean(value);
}

/**
 * @description Validate string
 * @param {string} value
 * @returns
 */
export function validateString(value = "") {
  if (typeof value !== "string") return null;
  const _value = value.trim();
  return _value.length === 0 ? null : _value;
}

/**
 * @description validates size
 * @param {string} input
 * @returns {string}
 */
export function validateSize(input) {
  const VALID_TYPES = ["small", "medium", "large"];
  if (!input || typeof input !== "string" || !VALID_TYPES.includes(input)) {
    return VALID_TYPES[0];
  }
  return input;
}

/**
 * @description validates type
 * @param {string} input
 * @returns {string}
 */
export function validateType(input) {
  const VALID_TYPES = ["coverable", "non-coverable", "link", "vertical"];
  if (!input || typeof input !== "string" || !VALID_TYPES.includes(input)) {
    return VALID_TYPES[0];
  }
  return input;
}

/**
 * @description process options
 * @param {object[]} input
 * @param {string} type
 * @param {boolean} globalDisabled
 * @returns {object[]}
 */
export function processOptions(
  input,
  type = "coverable",
  globalDisabled = false
) {
  const processedArray = validateInputArray(input);
  const guid = generateGuid();
  return processedArray.map((item, index) => {
    return {
      ...item,
      _cardClasses: generateCardClasses(type),
      _id: `${guid}-${index}`,
      _hasVerticalIcons: computeHasVerticalIcons(item, type),
      value: item.value || item.label || index,
      disabled: globalDisabled ? true : normalizeBoolean(item.disabled),
      selected: checkIfAllItemsAreDisabled(input)
        ? false
        : normalizeBoolean(item.selected), // if all items are disabled, then not selected anything
      icon: computeIcon(item, type),
      cardHeader: computeCardHeader(item, type),
      cardTitle: computeCardTitle(item, type)
    };
  });
}

/**
 * @description get the preselected value (only the first selected find)
 * @param {object[]} input
 * @param {boolean} multiSelection
 * @returns {string|string[]|null}
 */
export function getPreselectedValue(input, multiSelection = false) {
  if (!input || !Array.isArray(input)) return null;

  if (multiSelection) {
    const selectedList = input
      .filter((item) => item.selected)
      .map((item) => item.value);
    return selectedList ? selectedList : null;
  }

  const findSelected = input.find((item) => item.selected);
  return findSelected ? findSelected.value : null;
}

/**
 * @description check if all items are disabled
 * @param {object[]} input
 * @returns {boolean} true if all items are disabled
 */
function checkIfAllItemsAreDisabled(input) {
  if (!input || !Array.isArray(input)) return false;
  const allDisabled = input.every((item) => normalizeBoolean(item.disabled));
  return allDisabled;
}

/**
 * @description only returns fallback if is coverable type
 * @param {object[]|any} input
 * @param {string} type
 * @returns {string}
 */
function computeIcon(input, type = "coverable") {
  if (type === "coverable") {
    return input.icon ?? "standard:unmatched";
  }
  return input.icon;
}

function computeHasVerticalIcons(input, type = "coverable") {
  return (type === "vertical" || type === "link") && input.icon ? true : false;
}

function computeCardHeader(input, type = "coverable") {
  return type === "vertical" ? input.label : input.cardHeader;
}

function computeCardTitle(input, type = "coverable") {
  return type === "vertical" ? input.description : input.cardTitle;
}

/**
 * @description generate card classes depending on the type
 * @param {string} type - type of the card: coverable, non-coverable, link, vertical
 * @returns {string} classes for the card
 */
function generateCardClasses(type = "coverable") {
  const baseClasses = [
    "slds-visual-picker__figure",
    "slds-align_absolute-center"
  ];
  if (type === "coverable") {
    baseClasses.push("slds-visual-picker__icon");
  } else {
    baseClasses.push("slds-visual-picker__text");
  }
  if (type === "vertical") baseClasses.push("custom-vertical-figure");
  return baseClasses.join(" ");
}

function validateInputArray(input) {
  if (!input) return [];
  if (!Array.isArray(input)) input = [input];
  if (
    input.length > 0 &&
    typeof input[0] === "object" &&
    Object.keys(input[0]).length === 0
  )
    return [];

  return input;
}

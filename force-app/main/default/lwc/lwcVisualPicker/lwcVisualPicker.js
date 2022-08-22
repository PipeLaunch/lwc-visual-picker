/**
 * @description       : LWC Visual Picker Component
 * @group             : Generic Components
 * @author            : samuel@pipelaunch.com
 * @last modified on  : 22-08-2022
 * @last modified by  : samuel@pipelaunch.com
 * @version           : 1.0 beta
 * @changelog         : 21-07-2022 - Change the getting variables
 **/
import { LightningElement, api, track } from "lwc";

import template_generic from "./generic.html";
import template_link from "./link.html";

import * as utils from "./lwcVisualPickerUtils";
import * as config from "./lwcVisualPickerConfig";

export default class LwcVisualPicker extends LightningElement {
  @api debug = false; // enable internal debug messages on console

  /**
   * @description text to be used as fieldset legend (at top)
   */
  @api legend = false;

  /**
   * @description use a guid to unique identify the radio group "name". With this
   * option you can have multiple radio groups on the same page and they will
   * be controlled by the same name.
   * If none value is provided, a random guid will be generated
   * @default random guid
   */
  @api get guid() {
    return this._guid;
  }
  _guid = utils.generateGuid();
  set guid(value) {
    this._guid = utils.validateString(value) || utils.generateGuid();
  }

  /**
   * @description global disable all inputs
   * @default false
   */
  @api get disabled() {
    return this._disabled;
  }
  _disabled = false;
  set disabled(value) {
    this._disabled = utils.normalizeBoolean(value);
    this._processOptions();
  }

  /**
   * @description make the input required
   * @default false
   */
  @api get required() {
    return this._required;
  }
  _required = false;
  set required(value) {
    this._required = utils.normalizeBoolean(value);
  }

  /**
   * @description Propagate events up with bubble and composed to use when the component
   * is nested
   * @default false
   */
  @api get propagateEvents() {
    return this._propagateEvents;
  }
  _propagateEvents = false;
  set propagateEvents(value) {
    this._propagateEvents = utils.normalizeBoolean(value);
  }

  /**
   * @description icons size. Valid values are: "small", "medium", "large"
   * @default small
   */
  @api
  get size() {
    return this.size;
  }
  _size = "small";
  set size(value) {
    this._size = utils.validateSize(value);
  }

  /**
   * @description true to enable multiple Selection (checkbox mode instead of radio)
   * @default false
   */
  @api
  get multipleSelection() {
    return this._multipleSelection;
  }
  _multipleSelection = false;
  set multipleSelection(value) {
    this._multipleSelection = utils.normalizeBoolean(value);
  }

  /**
   * @description type of the component. Valid types are: "coverable", "non-coverable", "link", "vertical"
   * @default coverable
   */
  @api
  get type() {
    return this._type;
  }
  _type = "coverable";
  set type(value) {
    this._type = utils.validateType(value);
    this._processOptions();
  }

  /**
   * @description pass the options (entries for each input)
   */
  @api get options() {
    return this._options;
  }
  _options = false;
  set options(value) {
    this._options = value;
    this._processOptions();
  }

  @track processedOptions = false; // processed options with internal properties that will be rendered
  _value = null; // selected value

  /**
   * @type {Boolean} - true if is coverable type
   */
  get isCoverableType() {
    return this.type === "coverable";
  }

  /**
   * @type {Boolean} - true if is vertical type
   */
  get isVerticalType() {
    return this.type === "vertical";
  }

  /**
   * @type {String} - input checkbox type
   */
  get computeInputType() {
    return this.multipleSelection ? "checkbox" : "radio";
  }

  /**
   * @type {String} - Classes for the parent element after slds-form-element__control (container of the inputs)
   */
  get computeClasses() {
    if (this._type === "vertical")
      return "slds-visual-picker slds-visual-picker_vertical custom-visual-picker_vertical";
    return `slds-visual-picker slds-visual-picker_${this._size}`;
  }

  /**
   * @type {Boolean} - only show when there are options
   */
  get computeHasOptions() {
    return this._options && this._options.length > 0;
  }

  render() {
    return this._type === "link" ? template_link : template_generic;
  }

  /**
   * @description Validate User Input for Custom Flow Screen Components
   * @returns {Object} - true if is va
   */
  @api validate() {
    if (this._required && !this.value) {
      return config.INVALID_PAYLOAD;
    }

    return { isValid: true };
  }

  @api get value() {
    return this._value;
  }

  /**
   * @description when user clicks on the input
   * @param {Object} evt
   */
  handleClickInput(evt) {
    const value = evt.target.value || null;

    if (this._multipleSelection) {
      if (evt.target.checked) {
        if (!Array.isArray(this._value)) this._value = [];
        this._value.push(value);
      } else {
        this._value = this._value.filter((v) => v !== value);
      }
    } else {
      this._value = value;
    }

    this._dispatchSelectedEvent();
    if (this.debug)
      console.log(
        `LwcVisualPicker: value changed to ${JSON.stringify(this.value)}`
      );
  }

  /**
   * @description Dispatch the selected event
   */
  _dispatchSelectedEvent() {
    this.dispatchEvent(
      new CustomEvent("valuechanged", {
        detail: this.value,
        composed: this._propagateEvents,
        bubbles: this._propagateEvents
      })
    );
  }

  /**
   * @description process options after all properties are set
   */
  _processOptions() {
    if (!this._options) return;
    this.processedOptions = utils.processOptions(
      this._options,
      this._type,
      this._disabled
    );
    this._value = utils.getPreselectedValue(
      this.processedOptions,
      this._multipleSelection
    );
    if (this.debug) console.log("Processed options", this._options);
  }
}

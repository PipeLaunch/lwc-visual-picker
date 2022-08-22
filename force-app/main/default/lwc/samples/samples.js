import { LightningElement } from "lwc";

// import LightningAlert from "lightning/alert"; // disabled to support local dev
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Samples extends LightningElement {
  sampleNonCoverableContent = [
    {
      label: "Lightning Professional",
      description: "Complete service CRM for teams of any size",
      selected: true,
      cardHeader: "$30",
      cardTitle: "USD/user/month *",
    },
    {
      label: "Lightning Enterprise",
      description: "Everything you need to take support to the next level",
      cardHeader: "$150",
      cardTitle: "USD/user/month *",
    },
    {
      label: "Lightning Unlimited",
      description: "Complete support with enterprise-grade customization",
      cardHeader: "$300",
      cardTitle: "USD/user/month *",
    },
  ];

  sampleCoverableContentRadio = [
    {
      label: "Connected App",
      icon: "utility:connected_apps",
    },
    {
      label: "Custom App",
      icon: "utility:custom_apps",
    },
  ];

  sampleCoverableContentCheckbox = [
    {
      label: "Account",
      icon: "standard:account",
    },
    {
      label: "Lead",
      icon: "standard:lead",
    },
    {
      label: "Orders",
      icon: "standard:orders",
    },
  ];

  sampleVertical = [
    {
      value: "1",
      label: "Item Text",
      description:
        "Some optional item description to help the user better understand what this option is about.",
    },
    {
      value: "2",
      label: "Item Text",
      description:
        "Some optional item description to help the user better understand what this option is about.",
    },
    {
      value: "3",
      label: "Item Text",
      description:
        "Some optional item description to help the user better understand what this option is about.",
      disabled: true,
    },
  ];

  sampleVerticalIcons = [
    {
      value: "1",
      label: "Item Text",
      icon: "standard:account",
      description:
        "Some optional item description to help the user better understand what this option is about.",
    },
    {
      value: "2",
      label: "Item Text",
      icon: "utility:dayview",
      description:
        "Some optional item description to help the user better understand what this option is about.",
    },
  ];

  sampleLink = [
    {
      label: "Share the knowledge",
      icon: "utility:knowledge_base",
      link: "https://www.salesforce.com/solutions/sales-cloud/knowledge-base/",
      description:
        "Harness your team's collective know-how with our powerful knowledge base",
    },
    {
      label: "Link without icon",
      link: "https://www.salesforce.com/solutions/sales-cloud/knowledge-base/",
      description:
        "Harness your team's collective know-how with our powerful knowledge base",
    },
  ];

  sampleEvents = [
    {
      value: "1",
      label: "Option 1",
      description:
        "Some optional item description to help the user better understand what this option is about.",
    },
    {
      value: "2",
      label: "Option 2",
      description:
        "Some optional item description to help the user better understand what this option is about.",
    },
  ];

  selectedValue = "none";

  handleValueChanged(evt) {
    const value =
      JSON.stringify(evt.detail) === "[]" ? "none" : JSON.stringify(evt.detail);
    this.selectedValue = value;
  }

  handleClickButtonValidate() {
    const elm = this.template.querySelector(
      "c-lwc-visual-picker[data-selector='lwc-visual-picker-validation']"
    );
    const validation = elm.validate();

    if (validation.isValid) {
      this.dispatchEvent(
        new ShowToastEvent({
          message: "Validation passed",
          variant: "success",
        })
      );
    } else {
      this.dispatchEvent(
        new ShowToastEvent({
          message: validation.errorMessage,
          variant: "error",
        })
      );
    }
  }
}

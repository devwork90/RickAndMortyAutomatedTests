import { Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SupportPage extends BasePage {
  readonly heading: Locator;

  constructor(page) {
    super(page);
    this.heading = page.locator("h1");
  }

  async verifyLoaded() {
    await this.verifyUrlContains("/support-us");
    await expect(this.heading).toContainText("Support The Rick and Morty API");
  }
}

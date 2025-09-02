import { Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DocsPage extends BasePage {
  readonly heading: Locator;

  constructor(page) {
    super(page);
    this.heading = page.locator("h1");
  }

  async verifyLoaded() {
    await this.verifyUrlContains("/documentation");
    await expect(this.heading).toContainText("Documentation");
  }
}

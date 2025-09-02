import { Page, Locator, expect } from "@playwright/test";

export class AboutPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h1");
  }

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/.*about/);
    await expect(this.heading).toContainText("About");
  }
}

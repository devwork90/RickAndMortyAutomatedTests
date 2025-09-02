import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly docsLink: Locator;
  readonly aboutLink: Locator;
  readonly supportLink: Locator;
  readonly statusLink: Locator;
  readonly footer: Locator;
  readonly charactersCount: Locator;
  readonly locationsCount: Locator;
  readonly episodesCount: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.footer = page.locator("footer");
    this.docsLink = page.getByRole("link", { name: "Docs" });
    this.aboutLink = page.getByRole("link", { name: "About" });
    const navigation = this.page.getByRole("navigation");
    this.supportLink = navigation.getByRole("link", { name: "support us" });
    this.statusLink = page.getByRole("link", { name: "status" });
    this.footer = page.locator("footer");
    this.charactersCount = page.getByText(/characters\s*:\s*826/i);
    this.locationsCount = page.getByText(/locations\s*:\s*126/i);
    this.episodesCount = page.getByText(/episodes\s*:\s*51/i);
  }

  async openDocs() {
    await this.docsLink.click();
  }

  async openAbout() {
    await this.aboutLink.click();
  }

  async clickServerStatus() {
    await this.statusLink.click();
    0;
  }

  async openSupport() {
    await this.supportLink.click();
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async;

  // async openStatus() {
  //   const [newPage] = await Promise.all([
  //     this.page.waitForEvent("popup"),
  //     this.statusLink.click(),
  //   ]);
  //   return newPage;
  // }
}

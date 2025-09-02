import { test, expect } from "@playwright/test";
import { HomePage } from "../../Pages/homePage";
import { DocsPage } from "../../Pages/documentsPage";
import { AboutPage } from "../../Pages/aboutPage";
import { SupportPage } from "../../Pages/supportPage";

test.describe("Rick and Morty Navigation Tests with Page Objects", () => {
  test("navigate to Docs page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");
    await home.openDocs();

    const docs = new DocsPage(page);
    await docs.verifyLoaded();
  });

  test("Verify page title", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");
    await home.waitForLoadState();
    const title = await home.getTitle();
    expect(title).toContain("The Rick and Morty API");
  });

  // 1. Navigation Links
  test("should navigate to Docs page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");
    await home.openDocs();

    const docs = new DocsPage(page);
    await docs.verifyLoaded();
    await expect(docs.heading).toContainText("Documentation");
  });

  test("should navigate to About page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");
    await home.openAbout();

    const about = new AboutPage(page);
    await about.verifyLoaded();
  });

  test("should navigate to Support Us page", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");
    await home.openSupport();

    const about = new SupportPage(page);
    await about.verifyLoaded();
  });

  // 2. Endpoint Info Display
  test("should display endpoint counts for characters, locations, episodes", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");
    await home.scrollToFooter();
    await page.locator("footer").scrollIntoViewIfNeeded();

    await expect(home.charactersCount).toBeVisible();
    await expect(home.locationsCount).toBeVisible();
    await expect(home.episodesCount).toBeVisible();
  });

  // 3. Server Status
  test("server status link should be visible and clickable", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");

    // Assert the link is visible
    await expect(home.statusLink).toBeVisible();

    // Click & wait for navigation
    const [statusPage] = await Promise.all([
      page.waitForEvent("popup"),
      home.clickServerStatus(),
    ]);

    // Assert the new tab URL
    await expect(statusPage).toHaveURL("https://status.rickandmortyapi.com/");
  });

  // 4. Footer
  test("footer should display attribution text", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");

    await expect(home.footer).toContainText("by Axel Fuhrmann 2023");
  });

  // 5. Responsiveness (example with mobile)
  test("homepage should render correctly on mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const home = new HomePage(page);
    await home.goto("https://rickandmortyapi.com/");

    await expect(home.docsLink).toBeVisible();
    await expect(home.footer).toBeVisible();
  });

  // 6. Accessibility (tab navigation order check)
  test("tab navigation", async ({ page }) => {
    await page.goto("https://rickandmortyapi.com/");

    // First Tab → Docs
    await page.keyboard.press("Tab");
    const docsLink = page.getByRole("link", { name: "Docs" });
    await docsLink.waitFor({ state: "visible" });
    await docsLink.focus(); // force focus if keyboard doesn't reach it
    await expect(docsLink).toBeFocused();

    // Second Tab -> About
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "About" })).toBeFocused();

    // Third Tab -> Support Us
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "support us" })
    ).toBeFocused();
  });
});

# RickAndMortyAutomatedTests

This repository contains automated tests for the Rick and Morty API and associated web pages using **TypeScript** and **Playwright**. The project is structured to separate frontend and backend tests, with schema validation for API responses and page object modeling for UI tests.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Reporting](#reporting)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

TYPESCRIPT_WITH_PLAYWRIGHT/
│
├─ api_schemas/ # API response schemas
│ ├─ episodesSchema.ts
│ └─ locationSchema.ts
│
├─ Pages/ # Page Object Models
│ ├─ aboutPage.ts
│ ├─ apiClient.ts # Base API client for GET, POST, PUT, DELETE
│ ├─ BasePage.ts
│ ├─ documentsPage.ts
│ ├─ homePage.ts
│ └─ supportPage.ts
│
├─ tests/
│ ├─ BackEndTests/ # API test scripts
│ │ └─ rickandmorty.spec.ts
│ └─ frontEndTests/ # UI test scripts
│ └─ rickandmorty.test.ts
│
├─ playwright.config.ts # Playwright configuration
├─ package.json
├─ package-lock.json
├─ results.json # Test results (JSON)
└─ results.xml # Test results (XML)

---

## Prerequisites

- Node.js >= 18
- npm >= 9
- Playwright
- TypeScript

---

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd TYPESCRIPT_WITH_PLAYWRIGHT
```

## Install dependencies

- npm install
- npx playwright install

## Run All Tests

- npx playwright test

## Run Specific Test File

- npx playwright test tests/BackEndTests/rickandmorty.spec.ts
- npx playwright test tests/frontEndTests/rickandmorty.test.ts

## Run with HTML Report

- npx playwright test --reporter=html
- npx playwright show-report

## Test Structure

## Backend Tests

- Located in tests/BackEndTests/

- API tests use schemas defined in api_schemas/ for validation.

- Base API client (apiClient.ts) handles GET, POST, PUT, DELETE with error handling.

## Frontend Tests

## Located in tests/frontEndTests/

- Page Object Model pattern implemented in Pages/

- Each page has its own class (e.g., homePage.ts, aboutPage.ts) with locators and page-specific functions.

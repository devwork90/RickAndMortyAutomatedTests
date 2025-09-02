import { test, expect } from "@playwright/test";
import { ApiClient } from "../../Pages/apiCLient";
import { locationSchema, Location } from "../../api_schemas/locationSchema";
import { stat } from "fs";
import { episodesSchema, Episode } from "../../api_schemas/episodesSchema";

const BASE_URL = "https://rickandmortyapi.com/api/";
// const ajv = new Ajv();

test.describe("Rick and Morty API Tests & Schema Validation", () => {
  test("GET /GET All Characters", async ({ request }) => {
    const apiClient = new ApiClient("https://rickandmortyapi.com/api", request);
    const response = await apiClient.getAll("/character");
    // Assert that the request was successful
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Parse response body
    const body = await response.json();

    // Check schema basics
    expect(body).toHaveProperty("info");
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBeTruthy();

    // Optional deeper checks
    expect(body.info).toHaveProperty("count");
    expect(body.results[0]).toHaveProperty("name");
    expect(body.results[0]).toHaveProperty("status");
  });

  test("GET / Get character by Id", async ({ request }) => {
    const apiClient = new ApiClient("https://rickandmortyapi.com/api", request);
    const response = await apiClient.GetById("/character", 2);

    // Assert that the request was successful
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Parse response body
    const body = await response.json();
    expect(body).toHaveProperty("id", 2);
    expect(body).toHaveProperty("name", "Morty Smith");
    expect(body).toHaveProperty("status", "Alive");
    expect(body).toHaveProperty("species", "Human");
  });

  test("GET / Get character by gender", async ({ request }) => {
    const apiClient = new ApiClient("https://rickandmortyapi.com/api", request);
    const response = await apiClient.getByParams("/character", {
      status: "alive",
      species: "human",
      gender: "female",
    });

    // Assert that the request was successful
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();

    // Check schema basics
    expect(body).toHaveProperty("info");
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBeTruthy();
    expect(body.results.length).toBeGreaterThan(0);
    body.results.forEach((character: { status: string; species: string }) => {
      expect(body.results[0].status.toLowerCase()).toBe("alive");
      expect(body.results[0].species.toLowerCase()).toBe("human");
      expect(body.results[0].gender.toLowerCase()).toBe("female");
    });
  });

  test("GET / Validate Location Schema", async ({ request }) => {
    const apiClient = new ApiClient("https://rickandmortyapi.com/api", request);
    const response = await apiClient.getAll("/location");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("info");
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBeTruthy();
    expect(body.results.length).toBeGreaterThan(0);
    body.results.forEach((locationData: Location) => {
      const { error } = locationSchema.validate(locationData);
      expect(error).toBeUndefined();
    });
  });

  test("GET / Validate Single Location Schema", async ({ request }) => {
    const apiClient = new ApiClient("https://rickandmortyapi.com/api", request);
    const response = await apiClient.GetById("/location", 3);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("id", 3);
    expect(body).toHaveProperty("name", "Citadel of Ricks");
    expect(body).toHaveProperty("type", "Space station");
    expect(body).toHaveProperty("dimension", "unknown");
    expect(body).toHaveProperty("residents");
    expect(Array.isArray(body.residents)).toBeTruthy();
    expect(body).toHaveProperty(
      "url",
      "https://rickandmortyapi.com/api/location/3"
    );
    expect(body).toHaveProperty("created");
    const { error } = locationSchema.validate(body);
    expect(error).toBeUndefined();
  });

  test("GET / Validate episodes Schema", async ({ request }) => {
    const apiClient = new ApiClient("https://rickandmortyapi.com/api", request);
    const response = await apiClient.getAll("/episode");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("info");
    expect(body).toHaveProperty("results");
    expect(Array.isArray(body.results)).toBeTruthy();
    expect(body.results.length).toBeGreaterThan(0);

    // Assert that at least one episode exists
    expect(body.results.length).toBeGreaterThan(0);

    body.results.forEach((episodeData: Episode) => {
      const { error } = episodesSchema.validate(episodeData);
      expect(error).toBeUndefined();
    });
  });
});

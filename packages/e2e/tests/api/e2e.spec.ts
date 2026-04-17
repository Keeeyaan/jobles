import { test, expect } from "@playwright/test";

test.describe("API Endpoint Tests", () => {
  test("GET /jobs returns an array", async ({ request }) => {
    const response = await request.get("/jobs");
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
});

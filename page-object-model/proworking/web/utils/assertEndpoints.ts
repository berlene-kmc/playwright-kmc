import { Page, Response, expect } from "@playwright/test";
import { env } from '../../config/env.config';

export class AssertEndpoint {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertEndpoint(
    endpoint: string,
    statusCode: number,
    triggerRequest: () => Promise<void>
  ) {
    let response: Response | null = null;

    try {
      const resArray = await Promise.all([
        this.page.waitForResponse((res) => res.url().includes(endpoint)),
        triggerRequest(),
      ]);
      response = resArray[0];

      if (!response) {
        throw new Error(`No response captured for endpoint: ${endpoint}`);
      }

      expect(response.status(), `Expected status ${statusCode}`).toBe(statusCode);

      console.log(`✅ API Endpoint "${endpoint}" returned status ${statusCode}`);

    } catch (e: any) {
      console.error(`❌ API Endpoint: ${endpoint}`);

      if (response) {
        console.error(`Status Code: ${response.status()}`);
        console.error(`Request Method: ${response.request().method()}`);
        
      } else {
        console.error("No response object captured.");
      }

      console.error(`Error: ${String(e).toUpperCase()}`);

      if (response) {
        try {
          const body = await response.text();
          try {
            console.error("Response body:\n", JSON.stringify(JSON.parse(body), null, 2));
          } catch {
            console.error("Raw response:\n", body);
          }
        } catch (err) {
          console.error("Error reading body:", err);
        }
      }
      
      throw e;
    }
  }

  async finalTestAssert(triggerRequest: () => Promise<void>) {
    await this.assertEndpoint(env.API_LOGIN, 200, triggerRequest);
  }

  async assertEndpointOnPage(
    page: Page,
    endpoint: string,
    expectedStatus: number
  ): Promise<void> {
    const response = await page.waitForResponse(
      (res) => res.url().includes(endpoint) && res.status() === expectedStatus,
      { timeout: 60000 }
    );

    console.log("✅ API found:", response.url());
  }
}

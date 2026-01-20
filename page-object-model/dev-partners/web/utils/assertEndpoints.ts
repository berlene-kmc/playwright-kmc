import { Page, Response, expect } from '@playwright/test';

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
      if (!response) throw new Error(`No response captured for endpoint: ${endpoint}`);

      expect(response.status(), `Expected status ${statusCode}`).toBe(statusCode);
      console.log(`✅ API Endpoint "${endpoint}" returned status ${statusCode}`);
    } catch (e: any) {
      console.error(`❌ API Endpoint: ${endpoint}`);
      if (response) {
        console.error(`Status Code: ${response.status()}`);
        console.error(`Request Method: ${response.request().method()}`);
      } else {
        console.error('No response object captured.');
      }
      throw e;
    }
  }
}



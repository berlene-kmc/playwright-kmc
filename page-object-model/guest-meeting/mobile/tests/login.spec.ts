import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { env } from '../../config/env.config';

test.describe('Login Tests', () => {

  test('Login with valid credentials', async ({ loginPage, assertEndpoint, dashboard }) => {
    await loginPage.goto();

    await assertEndpoint.assertEndpoint(
      env.API_LOGIN,
      200,
      async () => {
        await loginPage.login("berlene.bernabe@kmc.solutions", "Cats09122430!");
      }
    );
  });
});


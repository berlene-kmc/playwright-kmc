import { Page, Locator, expect } from '@playwright/test';
import chalk from 'chalk';

export class Signup {
  private page: Page;
  private googleButton: Locator;
  private inputEmail: Locator;
  private nextButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator
  private jobTitleInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.googleButton = this.page.locator('button').first();
    this.inputEmail = this.page.locator('input[type="email"]');
    this.nextButton = this.page.locator('//span[contains(text(), "Next")]');
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    this.jobTitleInput = this.page.locator('input[name="jobTitle"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.confirmPasswordInput = this.page.locator('input[name="confirmPassword"]');
    this.continueButton = this.page.locator('//button[contains(text(), "Continue")]');
  }

// GOOGLE SIGN UP
//   async clickContinueButton() {
//     try {
//       await expect(this.googleButton).toBeVisible();
//       await this.googleButton.click();
//       console.log(chalk.green('✅ Clicked Google Signup Button'));

//     } catch (e: any) {
//       throw new Error(chalk.red(`Error clicking Google Signup Button: ${e.message}`));
//     }
//   }

//   async inputEmailAddress(email: string) {
//     try {
//       await expect(this.inputEmail).toBeVisible();
//       await this.inputEmail.fill(email);
//       console.log(chalk.green(`✅ Filled Email Address: ${email}`));  

//     } catch (e: any) {
//       throw new Error(chalk.red(`Error filling Email Address: ${e.message}`));
//     }
//   }

//   async clickNextButton() {
//     try {
//       await expect(this.nextButton).toBeVisible();
//       await this.nextButton.click();
//       console.log(chalk.green('✅ Clicked Next Button'));
      
//     } catch (e: any) {
//       throw new Error(chalk.red(`Error clicking Next Button: ${e.message}`));
//     }
//   } 

  async inputEmailAddress(email: string) {
    try {
      await expect(this.inputEmail).toBeVisible();
      await this.inputEmail.fill(email);
      console.log(chalk.green(`✅ Filled Email Address: ${email}`));  

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling Email Address: ${e.message}`));
    }
  }

  async inputFirstName(firstName: string) {
    try {
      await expect(this.firstNameInput).toBeVisible();
      await this.firstNameInput.fill(firstName);
      console.log(chalk.green(`✅ Filled First Name: ${firstName}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling First Name: ${e.message}`));
    }   
  }

  async inputLastName(lastName: string) {
    try {
      await expect(this.lastNameInput).toBeVisible();
      await this.lastNameInput.fill(lastName);
      console.log(chalk.green(`✅ Filled Last Name: ${lastName}`));   

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling Last Name: ${e.message}`));
    }   
  }

  async inputJobTitle(jobTitle: string) {
    try {
      await expect(this.jobTitleInput).toBeVisible();
      await this.jobTitleInput.fill(jobTitle);
      console.log(chalk.green(`✅ Filled Job Title: ${jobTitle}`)); 

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling Job Title: ${e.message}`));
    }   
  }

  async inputPassword(password: string) {
    try {
      await expect(this.passwordInput).toBeVisible();
      await this.passwordInput.fill(password);
      console.log(chalk.green(`✅ Filled Password`));

    } catch (e: any) {  
      throw new Error(chalk.red(`Error filling Password: ${e.message}`));
    }
   }

   async inputConfirmPassword(confirmPassword: string) {
    try {
      await expect(this.confirmPasswordInput).toBeVisible();
      await this.confirmPasswordInput.fill(confirmPassword);
      console.log(chalk.green(`✅ Filled Confirm Password`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling Confirm Password: ${e.message}`));
    }   
   }  

    async clickAgree() {
        try {
        const agreeButton = this.page.locator('//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]');
        await expect(agreeButton).toBeVisible({ timeout: 60000 });
        await expect(agreeButton).toBeEnabled({ timeout: 60000 });
        await agreeButton.click();
        console.log(chalk.green('✅ Clicked agree button'));

        } catch (e: any) {
        throw new Error(chalk.red(`Error clicking agree button: ${e.message}`));
        }
    }

    async clickContinueButton() {
        try {
        await expect(this.continueButton).toBeVisible({ timeout: 60000 });
        await expect(this.continueButton).toBeEnabled({ timeout: 60000 });
        await this.continueButton.click();
        console.log(chalk.green('✅ Clicked Continue button'));     
        
        } catch (e: any) {
        throw new Error(chalk.red(`Error clicking Continue button: ${e.message}`));
        }   
    }

   async completeSignup(email: string, firstName: string, lastName: string, jobTitle: string, password: string, confirmPassword: string) {
    await this.clickAgree();
    await this.inputEmailAddress(email);
    await this.inputFirstName(firstName);
    await this.inputLastName(lastName);
    await this.inputJobTitle(jobTitle);
    await this.inputPassword(password);
    await this.inputConfirmPassword(confirmPassword);
    await this.clickContinueButton();
   }    
}
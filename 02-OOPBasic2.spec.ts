import { test, expect } from '@playwright/test'; 

// Build a TestUser class with email, role, fullName().
// Make all fields private; expose only what tests need.
// Instantiate two users; pass them into a login test.

class TestUser { 

  private email: string; 

  private role: string; 

  private firstName: string; 

  private lastName: string;
  

  
  constructor(email: string, role: string, firstName: string, lastName: string) 
  { 

    this.email     = email; 

    this.role      = role; 

    this.firstName = firstName; 

    this.lastName  = lastName; 

  } 

  // Only expose what tests need 

  getEmail(): string  { return this.email; } 

  getRole(): string   { return this.role; } 

  fullName(): string  { return `${this.firstName} ${this.lastName}`; } 

} 


// ── Fixtures ────────────────────────────────────────────────── 

const adminUser  = new TestUser('Mariana.admin@test.com',  'admin',  'Mariana', 'Test'); 

const regularUser = new TestUser('Booker.viewer@test.com', 'viewer', 'Booker', 'Test'); 


  

// ── Tests ───────────────────────────────────────────────────── 

test('admin user can log in and sees dashboard', async ({ page }) => { 

  await page.goto('https://www.saucedemo.com/'); 

  await page.fill('[data-test=username]', 'performance_glitch_user');
    // adminUser.getEmail()); 

  await page.fill('[data-test=password]', 'secret_sauce'); 

  await page.click('[data-test=login-button]'); 

  

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await expect(page.locator('[data-test=title]')).toHaveText('Products');


}); 

  

test('viewer user is redirected to read-only view', async ({ page }) => { 

  await page.goto('https://www.saucedemo.com/'); 

  await page.fill('[data-test=username]', 'visual_user');
    //regularUser.getEmail()); 

  await page.fill('[data-test=password]', 'secret_sauce'); 

  await page.click('[data-test=login-button]'); 

  

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await expect(page.locator('[data-test=title]')).toHaveText('Products');

console.log(adminUser); // Mariana
console.log(regularUser); // Booker

}); 
// deleting below comments

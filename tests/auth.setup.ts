import { test as setup, expect } from "@playwright/test";

const authFile = ".auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://taejai-staging.opendream.in.th/th");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await page.getByPlaceholder("พิมพ์อีเมลของคุณ").fill("toy.taemin@gmail.com");
  await page.getByPlaceholder("พิมพ์อีเมลของคุณ").press("Enter");
  await page.getByPlaceholder("รหัสผ่าน").fill("11qq22ww");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

  await expect(
    page.getByRole("button", { name: "toy.taemin toy.taemin" })
  ).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});

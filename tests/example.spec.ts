import { test, expect } from "@playwright/test";
import path from "path";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("donation taejai", async ({ page }) => {
  await page.goto("https://taejai-staging.opendream.in.th/th");
  await page.getByRole("link", { name: "ปันอิ่มคนไร้บ้าน" }).click();
  await page.getByPlaceholder("0").click();
  await page.getByPlaceholder("0").fill("4444");
  await page.getByRole("link", { name: "บริจาค" }).first().click();
  await page.locator("label").filter({ hasText: "บัตรเครดิต" }).click();
  await page.getByLabel("หมายเลขบัตร").fill("4111 1111 1111 1111");
  await page.getByLabel("ชื่อบนบัตร").fill("toytaemin");
  await page.getByLabel("ชื่อบนบัตร").press("Tab");
  await page.getByLabel("วันหมดอายุ (MM/YY)").fill("11/43");
  await page.getByLabel("รหัส (CVV)").fill("345");
  await page.getByLabel("คำนำหน้า", { exact: true }).click();
  await page.getByLabel("นางสาว", { exact: true }).getByText("นางสาว").click();
  await page.getByLabel("ชื่อจริง").fill("toy");
  await page.getByLabel("นามสกุล").fill("test");
  await page.getByLabel("อีเมล").fill("toy.taemin@gmail.com");
  await page.getByLabel("เบอร์โทร").fill("08-4573-48977");
  await page.getByLabel("เลขบัตรประชาชน").fill("8-5903-84958-39-45");
  await page.getByRole("button", { name: "ยืนยันบริจาค" }).click();

  await expect(page.getByText("บริจาคสำเร็จ")).toBeVisible();
});

test("001 donation taejai with bank transfer", async ({ page }) => {
  await page.goto("https://taejai-staging.opendream.in.th/th");
  await page.getByRole("link", { name: "ปันอิ่มคนไร้บ้าน" }).click();
  await page.locator("label").filter({ hasText: "500บาท" }).click();
  await page.getByRole("link", { name: "บริจาค" }).first().click();
  await page.locator("label").filter({ hasText: "โอนเงิน" }).click();
  await page.getByLabel("คำนำหน้า", { exact: true }).click();
  await page.getByLabel("นางสาว", { exact: true }).getByText("นางสาว").click();
  await page.getByLabel("ชื่อจริง").fill("toy");
  await page.getByLabel("นามสกุล").fill("taemin");
  await page.getByLabel("อีเมล").fill("toy.taemin@gmail.com");
  await page.getByLabel("เบอร์โทร").fill("08-2457-48955");
  await page.getByLabel("เลขบัตรประชาชน").fill("3-4234-23423-42-34");
  await page.getByRole("button", { name: "ยืนยันบริจาค" }).click();

  await expect(page.getByText("ยืนยันการบริจาค")).toBeVisible();
  await page.getByLabel("จำนวน").click();
  await page.getByLabel("จำนวน").fill("500");
  await page.locator("#txt_file").click();
  await page
    .locator("#txt_file")
    .setInputFiles(path.join(__dirname, "files/1.jpg"));
  await page.locator("div").filter({ hasText: "หมายเหตุ" }).nth(3).click();
  await page.getByRole("button", { name: "ยืนยันบริจาค" }).click();

  await expect(page.getByText("เทใจได้รับข้อมูลแล้ว")).toBeVisible();
});

test("002 test check donation history", async ({ page }) => {
  await page.goto(
    "https://taejai-member-staging.opendream.in.th/th/transaction-history"
  );
  await expect(
    page.getByRole("link", { name: "ปันอิ่มคนไร้บ้าน" }).first()
  ).toBeVisible();
  await expect(page.getByText("4,444").first()).toBeVisible();
});

import { expect, test } from "@playwright/test";

test("validates the form, completes the training flow, and resets", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: /crear/i }).click();
  await expect(page.getByText("Campo requerido.")).toHaveCount(2);

  await page.getByLabel("Nombre del personaje").fill("Ariadna");
  await page.getByLabel("Tipo del personaje").selectOption("2");
  await page.getByRole("button", { name: /crear/i }).click();

  await expect(page.getByText(/Nombre:\s*Ariadna/i)).toBeVisible();
  await expect(page.getByText(/Tipo:\s*Guerrera/i)).toBeVisible();
  await expect(page.getByText(/Nivel:\s*1/i)).toBeVisible();

  await page.getByRole("button", { name: "Entrenar" }).click();
  await expect(page.getByText(/Nivel:\s*2/i)).toBeVisible();

  await page.getByRole("button", { name: "Entrenar" }).click();
  await expect(page.getByText(/Nivel:\s*3/i)).toBeVisible();

  await page.getByRole("button", { name: "Entrenar" }).click();
  await expect(page.getByText(/Nivel:\s*4/i)).toBeVisible();

  await page.getByRole("button", { name: "Entrenar" }).click();
  await expect(page.getByText(/Nivel:\s*5/i)).toBeVisible();

  await page.getByRole("button", { name: "Entrenar" }).click();
  await expect(page.getByRole("heading", { name: "¡¡Enhorabuena!!" })).toBeVisible();

  await page.getByRole("button", { name: "Volver a empezar" }).click();
  await expect(page.getByLabel("Nombre del personaje")).toBeVisible();
});

test("converts a character into an evil warrior", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Nombre del personaje").fill("Morgan");
  await page.getByLabel("Tipo del personaje").selectOption("3");
  await page.getByRole("button", { name: /crear/i }).click();
  await page.getByRole("button", { name: "Entrenar" }).click();
  await page.getByRole("button", { name: "Entrenar" }).click();
  await page.getByRole("button", { name: "Convertirse" }).click();

  await expect(page.getByText(/Tipo:\s*Demonio/i)).toBeVisible();
  await expect(page.getByText(/Nivel:\s*5/i)).toBeVisible();
});

test("loads about route through navigation and direct refresh", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Sobre mi" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "Sobre mi" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { name: "Sobre mi" })).toBeVisible();
});

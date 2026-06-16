import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./App";

function renderApp(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppRoutes />
    </MemoryRouter>
  );
}

describe("Medieval Cards React app", () => {
  it("shows form validation errors", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: /crear/i }));

    expect(screen.getAllByText("Campo requerido.")).toHaveLength(2);
  });

  it("creates and trains a character through completion", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByLabelText("Nombre del personaje"), "Ariadna");
    await user.selectOptions(screen.getByLabelText("Tipo del personaje"), "2");
    await user.click(screen.getByRole("button", { name: /crear/i }));

    expect(screen.getByText(/Nombre:\s*Ariadna/i)).toBeInTheDocument();
    expect(screen.getByText(/Tipo:\s*Guerrera/i)).toBeInTheDocument();
    expect(screen.getByText(/Nivel:\s*1/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    expect(screen.getByText(/Nivel:\s*2/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    expect(screen.getByText(/Nivel:\s*3/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Convertirse" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    expect(screen.getByText(/Nivel:\s*4/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    expect(screen.getByText(/Nivel:\s*5/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    expect(screen.getByText("¡¡Enhorabuena!!")).toBeInTheDocument();
  });

  it("converts a level-three character into an evil warrior", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByLabelText("Nombre del personaje"), "Morgan");
    await user.selectOptions(screen.getByLabelText("Tipo del personaje"), "3");
    await user.click(screen.getByRole("button", { name: /crear/i }));
    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    await user.click(screen.getByRole("button", { name: "Entrenar" }));
    await user.click(screen.getByRole("button", { name: "Convertirse" }));

    expect(screen.getByText(/Tipo:\s*Demonio/i)).toBeInTheDocument();
    expect(screen.getByText(/Nivel:\s*5/i)).toBeInTheDocument();
  });

  it("renders routes and header navigation", async () => {
    const user = userEvent.setup();
    renderApp("/about");

    expect(screen.getByRole("heading", { name: "Sobre mi" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Inicio" }));
    expect(
      screen.getByRole("heading", {
        name: /Bienvenido al increible juego/i,
      })
    ).toBeInTheDocument();
  });
});

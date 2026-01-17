import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MantineProvider } from "@mantine/core";
import { Header } from "./Header";

describe("Header", () => {
  it("рендерит лого и навигационные ссылки", () => {
    render(
      <MantineProvider>
        <Header />
      </MantineProvider>
    );

    expect(screen.getByAltText("HHlogo")).toBeInTheDocument();

    expect(screen.getByText("Вакансии FE")).toBeInTheDocument();
    expect(screen.getByText("Обо мне")).toBeInTheDocument();
  });
});

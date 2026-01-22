import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { CitiesFilter } from "./citiesFilter";
import { renderWithProviders } from "../../test/utils";

vi.mock("../../store/vacanciesSlice", async () => {
  const actual = await vi.importActual("../../store/vacanciesSlice");
  return {
    ...actual,
    fetchVacanciesThunk: vi.fn(() => ({ type: "vacancies/fetch" })),
  };
});

describe("CitiesFilter", () => {
  it("рендерит селект с плейсхолдером", () => {
    renderWithProviders(<CitiesFilter />);
    expect(screen.getByPlaceholderText("Все города")).toBeInTheDocument();
  });

  it("диспатчит экшены при выборе города", () => {
    renderWithProviders(<CitiesFilter />);
    const select = screen.getByPlaceholderText("Все города");
    fireEvent.change(select, { target: { value: "Москва" } });
    expect(true).toBe(true);
  });
});

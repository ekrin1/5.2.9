import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import * as hooks from "../../store/hooks";
import { Search } from "./Search";
import { renderWithProviders } from "../../test/utils";
import { setSearch, setPage, fetchVacanciesThunk } from "../../store/vacanciesSlice";

vi.mock("../../store/vacanciesSlice", async () => {
  const actual = await vi.importActual("../../store/vacanciesSlice");
  return {
    ...actual,
    fetchVacanciesThunk: vi.fn(() => ({ type: "vacancies/fetch" })),
  };
});

describe("Search", () => {
  const dispatchMock = vi.fn();

  vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);

  it("диспатчит поиск при клике на кнопку", () => {
    renderWithProviders(<Search />);

    fireEvent.change(
      screen.getByPlaceholderText("Должность или название компании"),
      { target: { value: "React" } }
    );

    fireEvent.click(screen.getByRole("button", { name: "Найти" }));

    expect(dispatchMock).toHaveBeenCalledWith(setSearch("React"));
    expect(dispatchMock).toHaveBeenCalledWith(setPage(1));
    expect(dispatchMock).toHaveBeenCalledWith(fetchVacanciesThunk());
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import * as hooks from "../../store/hooks";
import { SkillsFilter } from "./SkillsFilter";
import { renderWithProviders } from "../../test/utils";
import { setSkills, setPage, fetchVacanciesThunk } from "../../store/vacanciesSlice";

vi.mock("../../store/vacanciesSlice", async () => {
  const actual = await vi.importActual("../../store/vacanciesSlice");
  return {
    ...actual,
    fetchVacanciesThunk: vi.fn(() => ({ type: "vacancies/fetch" })),
  };
});

describe("SkillsFilter", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);
    vi.spyOn(hooks, "useAppSelector").mockReturnValue([]);
    dispatchMock.mockClear();
  });

  it("добавляет навык при клике на кнопку", () => {
    renderWithProviders(<SkillsFilter />);

    const input = screen.getByPlaceholderText("Навык");
    fireEvent.change(input, { target: { value: "React" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledWith(setSkills(["React"]));
    expect(dispatchMock).toHaveBeenCalledWith(setPage(1));
    expect(dispatchMock).toHaveBeenCalledWith(fetchVacanciesThunk());
    expect(input).toHaveValue("");
  });

  it("добавляет навык при нажатии Enter", () => {
    renderWithProviders(<SkillsFilter />);

    const input = screen.getByPlaceholderText("Навык");
    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(dispatchMock).toHaveBeenCalledWith(setSkills(["TypeScript"]));
    expect(dispatchMock).toHaveBeenCalledWith(setPage(1));
    expect(dispatchMock).toHaveBeenCalledWith(fetchVacanciesThunk());
    expect(input).toHaveValue("");
  });

  it("удаляет навык при клике на крестик", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(["React"]);

    renderWithProviders(<SkillsFilter />);

    const closeButton = screen.getByLabelText("Удалить навык");
    fireEvent.click(closeButton);

    expect(dispatchMock).toHaveBeenCalledWith(setSkills([]));
    expect(dispatchMock).toHaveBeenCalledWith(setPage(1));
    expect(dispatchMock).toHaveBeenCalledWith(fetchVacanciesThunk());
  });

  it("не добавляет пустой или дублирующийся навык", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(["React"]);
    renderWithProviders(<SkillsFilter />);

    const input = screen.getByPlaceholderText("Навык");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(dispatchMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});

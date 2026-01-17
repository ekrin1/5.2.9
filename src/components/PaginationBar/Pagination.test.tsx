import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { PaginationBar } from "./PaginationBar";

describe("PaginationBar", () => {
  it("вызывает onChange при смене страницы", () => {
    const onChange = vi.fn();

    render(
      <MantineProvider>
        <PaginationBar page={1} total={5} onChange={onChange} />
      </MantineProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(onChange).toHaveBeenCalledWith(2);
  });
});

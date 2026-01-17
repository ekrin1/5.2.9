import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { JobCard } from "./JobCard";
import type { JobType } from "../../services/types";

vi.mock('../../utils/workFormat', () => ({
  formatSalary: () => '100 000 – 150 000 ₽',
  formatExperience: () => 'От 1 года до 3 лет',
  getWorkFormat: () => ({ label: 'Можно удалённо', bg: '#eee', color: '#000' }),
}));

const vacancyMock: JobType = { 
  id: "1", name: "Frontend Developer", 
  salary: { from: 100000, to: 150000, 
    currency: "RUR", }, 
    experience: { 
      name: "От 1 года до 3 лет" 
    }, 
    employer: { 
      name: "HH" 
    }, 
    area: { 
      name: "Москва" }, 
    work_format: [ { 
      id: "REMOTE", 
      name: "Удалённая работа" 
    }, ], 
    alternate_url: "https://hh.ru/vacancy/123", 
    snippet: { 
      requirement: "Знание React и TypeScript", 
      responsibility: "Разработка новых компонентов" 
    }, }; 

  describe("JobCard", () => {
    it("рендерит название вакансии", () => {
      render(
        <MantineProvider>
          <MemoryRouter>
            <JobCard vacancy={vacancyMock} />
          </MemoryRouter>
        </MantineProvider>
      );
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });
});
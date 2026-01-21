import type { JobsResponse } from "./types";

const BASE_URL = "https://api.hh.ru/vacancies";

export async function fetchVacancies(params: {
  page: number;
  skills: string[];
  search: string;
  city: string;
}): Promise<JobsResponse> {
  const { page, skills, search, city } = params;

  const CITY_TO_AREA: Record<string, number> = {
    moscow: 1,
    petersburg: 2,
  };

  const area = CITY_TO_AREA[city];

  const query = new URLSearchParams({
    text: search,
    per_page: "10",
    page: (page - 1).toString(),
    industry: "7",
    professional_role: "96",
    ...(area ? { area: area.toString() } : {}),
    ...(skills.length ? { skill_set: skills.join(",") } : {}),
  });

  const res = await fetch(`${BASE_URL}?${query.toString()}`);
  if (!res.ok) throw new Error("Ошибка при загрузке данных");
  return res.json();
}

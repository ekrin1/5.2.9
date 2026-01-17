import { VacanciesPage } from "./pages/vacanciesPage/VacanciesPage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import { VacanciesList } from "./components/VacanciesList/VacanciesList";
import { MainLayout } from "./layouts/MainLayout";

import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

export const router = createBrowserRouter(

  createRoutesFromElements (

    <Route element={<MainLayout />}>
      <Route
        path="/"
        element={<Navigate to="/vacancies" replace />}
      />
      <Route path="vacancies/" element={<VacanciesPage />}>
        <Route index element={<VacanciesList />} />
        <Route path="moscow" element={<VacanciesList />} />
        <Route path="petersburg" element={<VacanciesList />} />
      </Route>
      <Route
        path="vacancies/:id"
        element={<VacancyPage />}
      />
    </Route>
  ),

  { basename: "/5.2.9" }

)

import { VacanciesPage } from "./pages/vacanciesPage/VacanciesPage";
import { VacancyPage } from "./pages/VacancyPage/VacancyPage";
import { VacanciesList } from "./components/VacanciesList/VacanciesList";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

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
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route
        path="vacancies/:id"
        element={<VacancyPage />}
        errorElement={<ErrorPage />}
      />

      <Route path="*" element={<ErrorPage />} />
      
    </Route>
  ),

  { basename: "/5.2.9" }

)

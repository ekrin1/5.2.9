import "@mantine/core/styles.css";

import { MainLayout } from "./layouts/MainLayout";
import { VacanciesPage } from './pages/vacanciesPage/VacanciesPage'

import { Routes, Route, Navigate } from 'react-router-dom'
import { VacancyPage } from './pages/vacancyPage/VacancyPage';


function App() {
  

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Route>
    </Routes>
  )
}

export default App

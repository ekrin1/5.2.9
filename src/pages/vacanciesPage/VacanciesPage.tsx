import { Search } from '../../components/search/Search'
import { FiltersSidebar } from '../../components/FiltersSidebar/FiltersSidebar';

import { Group } from "@mantine/core";
import { Outlet } from "react-router-dom";

import { useVacanciesUrl } from "../../hooks/useVacanciesUrl";

import styles from "./VacanciesPage.module.css";

export const VacanciesPage = () => {

    const {
    items,
    loading,
    totalPages,
    page,
    handlePageChange,
  } = useVacanciesUrl();

  return (

        <>
          
            <Search />

              <Group className={styles.main}>

                <FiltersSidebar />

                <Outlet
                  context={{
                  items,
                  loading,
                  totalPages,
                  page,
                  onPageChange: handlePageChange,
                 }}
                />

              </Group>

        </>
  )
}

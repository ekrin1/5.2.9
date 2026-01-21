import { Search } from '../../components/search/Search'
import { FiltersSidebar } from '../../components/FiltersSidebar/FiltersSidebar';
import { CitiesFilter } from '../../components/citiesFilter/citiesFilter';

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

                  <div className={styles.content}>
                    
                    <CitiesFilter />

                    <Outlet
                      context={{
                      items,
                      loading,
                      totalPages,
                      page,
                      onPageChange: handlePageChange,
                    }}
                    />

                  </div>

              </Group>

        </>
  )
}

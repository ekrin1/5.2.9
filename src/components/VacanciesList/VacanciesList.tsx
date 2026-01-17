import { JobCard } from '../jobCard/JobCard';
import { PaginationBar } from '../PaginationBar/PaginationBar';

import { Skeleton } from "@mantine/core";
import { useOutletContext } from "react-router-dom";

import { useAppSelector } from '../../store/hooks';
import type { JobType } from "../../services/types";

import styles from "./VacanciesList.module.css";

export const VacanciesList = () => {

  const { items, loading, totalPages, page, onPageChange } =
    useOutletContext<any>();

  const { error } = useAppSelector(s => s.vacancies);

    return (

        <div className={styles.vacancies}>
            {error && (
                <div className={styles.error}>
                {error}
                </div>
            )}
        
            {loading ? (
            Array.from({ length: 10 }).map((_, i) => 
            <Skeleton key={i} height={140} radius="md" mb="sm"  />)
            ) : (

                <>

                    {items.map((vacancy: JobType) => (
                        <JobCard key={vacancy.id} vacancy={vacancy} />
                    ))}

                    {totalPages > 1 && (
                        <PaginationBar
                        page={page}
                        total={totalPages}
                        onChange={onPageChange}
                        />
                    )}

                </>
            )}
        </div>
    )
}
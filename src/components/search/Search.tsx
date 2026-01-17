import { useState } from "react";
import { Group, Title, TextInput, Button } from "@mantine/core";
import styles from './Search.module.css';
;
import SearchIcon from '../../assets/search.svg?react';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchVacanciesThunk, setPage, setSearch } from "../../store/vacanciesSlice";

export const Search = () => { 

    const dispatch = useAppDispatch();
    const { search } = useAppSelector(
        (state) => state.vacancies
    );

    const [localSearch, setLocalSearch] = useState(search);

    const handleSearch = () => {
        dispatch(setSearch(localSearch));
        dispatch(setPage(1));
        dispatch(fetchVacanciesThunk());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
        handleSearch();
        }
    };

    return (

        <div className={styles.search_container}>
            <Group className={styles.search_group}>

                <div className={styles.search_titles}>
                    <Title className={styles.search_title}>
                        Список вакансий
                    </Title>
                    <p className={styles.search_subtitle}>
                        по профессии Frontend-разработчик
                    </p>
                </div>

                <Group className={styles.search_controls}>

                    <TextInput
                        className={styles.search_input}
                        placeholder="Должность или название компании"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        leftSection={<SearchIcon/>}
                        size="md"
                    />
                    <Button
                        className={styles.search_button}
                        onClick={handleSearch}
                        color="primary.4"
                        size="md"
                    >
                        Найти
                    </Button>

                </Group>

            </Group>
        </div>

    )
}
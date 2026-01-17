import type { JobType } from "../../services/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchVacanciesThunk } from "../../store/vacanciesSlice";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Text, Group, Loader, Container } from "@mantine/core";
import { JobCard } from "../../components/jobCard/JobCard";

import styles from "./VacancyPage.module.css";

export const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const state = location.state as { vacancy: JobType } | undefined;

  const dispatch = useAppDispatch();
  const { items: vacancies, loading } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    if (!vacancies.length) {
      dispatch(fetchVacanciesThunk());
    }
  }, [dispatch, vacancies.length]);

  const vacancy =
    state?.vacancy ||
    vacancies.find((vacancy) => vacancy.id === id) ||
    null;

  if (loading) {
    return <Loader />;
  }

  if (!vacancy) {
    return <Text>Вакансия не найдена</Text>;
  }

  return (

    <Container className={styles.container} mt="md">

            <Group className={styles.page}>

                <JobCard vacancy={vacancy} variant="page" />

                {vacancy.snippet ? (
                    <div className={styles.card}>
                    {vacancy.snippet.requirement && (
                        <Group className={styles["wrapper-descr"]}>
                        <Text className={styles["requirement__title"]}>
                            Требования:
                        </Text>
                        <Text className={styles.descr}>
                            {vacancy.snippet.requirement}
                        </Text>
                        </Group>
                    )}

                    {vacancy.snippet.responsibility && (
                        <Group className={styles["wrapper-descr"]}>
                        <Text className={styles["responsibility__title"]}>
                            Обязанности:
                        </Text>
                        <Text className={styles.descr}>
                            {vacancy.snippet.responsibility}
                        </Text>
                        </Group>
                    )}
                    </div>
                ) : (
                    <Text>Описание отсутствует</Text>
                )}
            </Group>

    </Container>
  );
};

import { Tabs } from '@mantine/core'
import styles from './citiesFilter.module.css'

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setPage, setCity } from "../../store/vacanciesSlice";

export const CitiesFilter = () => {

    const { city } = useAppSelector((state) => state.vacancies);
    const dispatch = useAppDispatch();

    const handleCityChange = (tab: "moscow" | "petersburg") => {
        dispatch(setCity(tab));
        dispatch(setPage(1));
    };

    return (
        <Tabs
            value={city ?? null}
            onChange={(v) => handleCityChange(v as "moscow" | "petersburg")}
            className={styles.tabs}
            color='darkPrimary.6'
        >
            <Tabs.List className={styles.tabs__list}>
                <Tabs.Tab className={styles.tabs__tab} value='moscow'>
                    Москва
                </Tabs.Tab>
                <Tabs.Tab className={styles.tabs__tab} value='petersburg'>
                    Санкт-Петербург
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}
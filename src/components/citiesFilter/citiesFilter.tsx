import { Tabs } from '@mantine/core'
import styles from './citiesFilter.module.css'

import { setPage, setCity } from '../../store/vacanciesSlice'
import { useAppDispatch, useAppSelector } from "../../store/hooks";


export const CitiesFilter = () => {
    const dispatch = useAppDispatch();
    const city = useAppSelector((state) => state.vacancies.city);

    const handleCityChange = (tab: "moscow" | "saint-petersburg") => {
        dispatch(setCity(tab));
        dispatch(setPage(1));
    };

    return (
        <Tabs
            value={city || null}
            onChange={(value) => handleCityChange(value as 'moscow' | 'saint-petersburg')}
            className={styles.tabs}
            color='darkPrimary.6'
        >
            <Tabs.List className={styles.tabs__list}>
                <Tabs.Tab className={styles.tabs__tab} value='moscow'>
                    Москва
                </Tabs.Tab>
                <Tabs.Tab className={styles.tabs__tab} value='saint-petersburg'>
                    Санкт-Петербург
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}
import { Tabs } from '@mantine/core'
import styles from './citiesFilter.module.css'

import { useNavigate, useParams  } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

export const CitiesFilter = () => {

    const navigate = useNavigate();
    const { city } = useParams<{ city?: string }>();
    const [searchParams] = useSearchParams();

    const handleCityChange = (value: string | null) => {
        if (!value) return;

        const query = searchParams.toString();
        navigate(
        `/vacancies/${value}${query ? `?${query}` : ""}`
        );
    };

    return (
        <Tabs
            value={city ?? null}
            onChange={handleCityChange}
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
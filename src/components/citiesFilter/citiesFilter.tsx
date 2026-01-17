import { Select } from '@mantine/core'
import location  from '../../assets/map-pin.svg'
import styles from './citiesFilter.module.css'

import { fetchVacanciesThunk, setPage, setCity } from '../../store/vacanciesSlice'
import { useAppDispatch, useAppSelector } from "../../store/hooks";


export const CitiesFilter = () => {
    const dispatch = useAppDispatch();
    const city = useAppSelector((state) => state.vacancies.city);

    const handleCityChange = (value: string | null) => {
        dispatch(setCity(value || "Все"));
        dispatch(setPage(1));
        dispatch(fetchVacanciesThunk());
    };

    return (
            <Select
                placeholder='Все города'
                data={['Все города', 'Москва', 'Санкт-Петербург']}
                value={city}
                onChange={handleCityChange}
                className={styles.select}
                comboboxProps={{ shadow: 'md' }}
                leftSection={ <img src={location} alt="location" /> }
            />
        )
}
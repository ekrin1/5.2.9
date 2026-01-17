import { Group, Image } from "@mantine/core";
import clsx from "clsx";
import styles from './Header.module.css';

import logo from '../../assets/logo.svg';
import circle from '../../assets/circle.svg';
import user from '../../assets/user_about.svg';

export const Header = () => { 

    return (

        <div className={styles.header_container}>
            <header className={styles.header}>

                <Group className={styles.logo}>
                    <Image className={styles.logo_image}
                    src={logo} alt="HHlogo" />
                </Group>

                <Group className={styles.nav_links}>
                    <a href="#"
                    className={clsx(styles.nav_link, styles['nav_link-vacancies'])}
                    >
                    Вакансии FE
                    <Image src={circle} alt="circle" />
                    </a>

                    <a href="#"
                    className={clsx(styles.nav_link, styles['nav_link-about'])}
                    >
                    Обо мне
                    <Image src={user} alt="circle" />
                    </a>
                </Group>

            </header>
        </div>
    )
}

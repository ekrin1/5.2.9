import { Card, Image, Title, Text, Group, Button } from "@mantine/core";

import { useNavigate } from "react-router-dom";

import catGif from "../../assets/cat.gif";
import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {

  const navigate = useNavigate();

  const handleBackToVacanciesPage = () => {
    navigate(`/vacancies`);
  };

  return (

    <Card className={styles.container}>
        
      <Group className={styles.wrapper}>

        <Group className={styles["wrapper-text"]}>
          <Title className={styles.title}>
            Упс! Такой страницы не существует
          </Title>
          <Text className={styles.text}>Давайте перейдём к началу.</Text>
        </Group>

        <Button
          onClick={handleBackToVacanciesPage}
          className={styles.button}
          color="primary.4"
        >
          На главную
        </Button>

      </Group>

      <Image className={styles.img} src={catGif} alt="Кот" />
    
    </Card>

  );
};

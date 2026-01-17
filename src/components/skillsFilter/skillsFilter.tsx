import { useState } from "react";
import { Group, Card, Text, Pill, PillGroup, TextInput, ActionIcon, CloseButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import styles from "./skillsFilter.module.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSkills, fetchVacanciesThunk, setPage } from "../../store/vacanciesSlice";

export const SkillsFilter = () => { 
     
    const [input, setInput] = useState("");

    const dispatch = useAppDispatch();
    const skills = useAppSelector((state) => state.vacancies.skills);

    const addSkill = () => {
        const trimmed = input.trim();
        if (trimmed && !skills.includes(trimmed)) {
        const updated = [...skills, trimmed];
        dispatch(setSkills(updated));
        dispatch(setPage(1));
        dispatch(fetchVacanciesThunk());
        }
        setInput("");
    };

    const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
        dispatch(setSkills(updated));
        dispatch(setPage(1));
        dispatch(fetchVacanciesThunk());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
        }
    };

    return ( 

        <Card className={styles.card}>
            <Text fw={600} mb='sm' className={styles.title}>
                Ключевые навыки
            </Text>

            <Group className={styles.form}>
                <TextInput 
                    placeholder="Навык"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.form_input}   
                />
                <ActionIcon
                    onClick={addSkill}
                    className={styles.form_button}
                    color="#228BE6"
                >
                    <IconPlus />
                </ActionIcon>
            </Group>

            <Group className={styles.pills}>
                <PillGroup>
                    {skills.map((skill) => (
                        <Pill 
                        key={skill} 
                        onRemove={() => removeSkill(skill)}
                        className={styles.pills_skill}
                        >
                            {skill}
                        <CloseButton
                            size={15}
                            iconSize={12}
                            onClick={() => removeSkill(skill)}
                            aria-label="Удалить навык"
                            ml={4}
                        />
                        </Pill>
                    ))} 
                </PillGroup>
            </Group>

        </Card>

    );
}
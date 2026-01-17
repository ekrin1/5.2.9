import { Pagination, Group, Center } from "@mantine/core";
import styles from "./PaginationBar.module.css";

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

export const PaginationBar: React.FC<Props> = ({ page, total, onChange }) => {
  
    return (
    <Center>

      <Pagination.Root
        className={styles.pagination}
        total={total}
        value={page}
        onChange={onChange}
        color="black.2"
        autoContrast
      >

        <Group className={styles.pagination_group}>
          <Pagination.First />
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
          <Pagination.Last />
        </Group>

      </Pagination.Root>

    </Center>
  );
};

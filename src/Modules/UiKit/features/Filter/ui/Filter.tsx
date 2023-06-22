import { memo, useCallback } from "react";
import { Icon } from "@iconify/react";
import cls from "./Filter.module.css";
import { Button } from "../../../shared";

interface FilterProps {
  setCanOpenFilter?: (canOpenFilter: boolean | any) => void;
}

export const Filter = memo((props: FilterProps) => {
  const {
    setCanOpenFilter = () => {
      return;
    },
  } = props;

  const openCloseFilter = useCallback(() => {
    setCanOpenFilter((prev: boolean) => !prev);
  }, [setCanOpenFilter]);

  return (
    <Button onClick={openCloseFilter} theme="background">
      <Icon className={cls.iconSize} icon="mdi:filter-outline" />
    </Button>
  );
});

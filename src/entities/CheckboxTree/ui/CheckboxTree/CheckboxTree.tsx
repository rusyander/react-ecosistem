import { CheckBox, CheckboxProps } from '../Checkbox/Checkbox';
import classnames from './CheckboxTree.module.scss';

interface Props {
  label: string;
  //   childCheckboxes: (CheckboxProps & { id: string })[];
  childCheckboxes: any;

  onChange: (id: string | string[]) => void;
}

export const CheckboxTree = ({ label, childCheckboxes, onChange }: Props) => {
  const isChecked: any = childCheckboxes.every(
    ({ isChecked }: any) => isChecked
  );
  const isIndeterminate: any = childCheckboxes.some(
    ({ isChecked }: any) => isChecked
  );
  const handleRootChange = () => {
    const ids = childCheckboxes
      .filter((child: any) => isChecked === child.isChecked)
      .map(({ id }: any) => id);
    onChange(ids);
  };
  return (
    <div className={classnames.mainContainer}>
      <CheckBox
        label={label}
        isChecked={isChecked}
        isIndeterminate={isIndeterminate}
        onChange={handleRootChange}
      />
      <div className={classnames.childContainer}>
        {childCheckboxes.map((props: any) => (
          <CheckBox
            {...props}
            key={props.id}
            onChange={() => onChange(props?.id)}
          />
        ))}
      </div>
    </div>
  );
};

import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FormsAndActionsModalContents.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';

import CheckboxTree from 'react-checkbox-tree';

interface FormsAndActionsModalContentsProps {
  className?: string;
  selectedField: any;
  closeModalFunction: any;
  getAccessTree: any;
  getAccessTreeData: any;
}

export const FormsAndActionsModalContents = memo(
  (props: FormsAndActionsModalContentsProps) => {
    const {
      className,
      closeModalFunction,
      selectedField,
      getAccessTree,
      getAccessTreeData,
    } = props;
    const userAcces = ['OS', 'OS_SYS_ADMIN'];
    const { t } = useTranslation('core');

    useEffect(() => {
      getAccessTree(userAcces);
      if (getAccessTreeData) {
        transformData(getAccessTreeData?.data?.access ?? []);
        setChecked(getAccessTreeData?.data?.accessData ?? []);
      }
    }, []);

    const handleSubmit = () => {
      console.log('sd');
    };

    // -----------------------

    const transformData = (data: any) => {
      const nodesData: any = [];

      const transformNode = (node: any) => {
        const transformedNode = {
          value: node.key,
          label: node.label,
          key: node.key,
          children: [],
        };

        if (node.children) {
          transformedNode.children = node.children.map(transformNode);
        }

        return transformedNode;
      };

      data.forEach((node: any) => {
        if (node.nodeType === 'APP') {
          nodesData.push(transformNode(node));
        }
      });

      setCheckboxTreeData(nodesData);

      return nodesData;
    };

    // -----------

    const nodes = [
      {
        value: 'frontend',
        label: 'Frontend',
        key: 'Frontend',
        children: [
          { value: 'html', label: 'HTML', key: 'HTML', disabled: true },
          { value: 'css', label: 'CSS', key: 'CSS' },
          { value: 'javascript', label: 'JavaScript', key: 'JavaScript' },
          // ...
        ],
        // ...
      },
    ];

    const value = {
      key: 'F#OS_POPULATED_LOCALITIES',
      label: 'Населенные пункты',
      nodeType: 'F',
      children: [
        {
          key: 'F#OS_POPULATED_LOCALITY_ADD_EDIT',
          label: 'Реквизиты населенных пунктов',
          nodeType: 'F',
          children: [
            {
              key: 'A#OS_POPULATED_LOCALITY_ADD',
              label: 'Добавление населенного пункта',
              nodeType: 'A',
              children: null,
            },
            {
              key: 'A#OS_POPULATED_LOCALITY_EDIT',
              label: 'Редактирование населенного пункта',
              nodeType: 'A',
              children: null,
            },
            {
              key: 'F#OS_GET_REGION',
              label: 'Справочник областей',
              nodeType: 'F',
              children: [],
            },
          ],
        },
        {
          key: 'A#OS_POPULATED_LOCALITY_DELETE',
          label: 'Удаление населенного пункта',
          nodeType: 'A',
          children: null,
        },
      ],
    };

    const value2 = {
      key: 'F#OS_POPULATED_LOCALITIES',
      label: 'Населенные пункты',
      nodeType: 'F',
      children: [
        {
          key: 'F#OS_POPULATED_LOCALITY_ADD_EDIT',
          label: 'Реквизиты населенных пунктов',
          nodeType: 'F',
          children: [
            {
              key: 'A#OS_POPULATED_LOCALITY_ADD',
              label: 'Добавление населенного пункта',
              nodeType: 'A',
              children: null,
            },
          ],
        },
        {
          key: 'A#OS_POPULATED_LOCALITY_DELETE',
          label: 'Удаление населенного пункта',
          nodeType: 'A',
          children: null,
        },
      ],
    };

    const nodes2 = [
      {
        value: value2.key,
        label: value2.label,
        key: value2.key,
        children: [{ value: value2.key, label: value2.label, key: value2.key }],
      },
    ];

    // const [checked, setChecked]: any = useState(['html', 'css']);
    const [checked, setChecked]: any = useState(
      getAccessTreeData?.data?.accessData ?? []
    );
    const [checkboxTreeData, setCheckboxTreeData]: any = useState();

    const [expanded, setExpanded]: any = useState([]);

    const onCheck = (value: any) => {
      setChecked(value);
    };

    const onExpand = (value: any) => {
      setExpanded(value);
    };

    console.log('getAccessTreeData', getAccessTreeData?.data?.access);
    console.log('checked', checked);

    return (
      <div
        className={classNames(cls.formsAndActionsModalContents, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName="CORE_ROLE_FORMS_ACTIONS" />
        <ModalHeader
          title={t('Формы и действия роли') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className="formContent">
          {checkboxTreeData && (
            <CheckboxTree
              checked={checked}
              expanded={expanded}
              // nodes={getAccessTreeData?.data?.access ?? []}
              // nodes={nodes}
              nodes={checkboxTreeData}
              onCheck={onCheck}
              onExpand={onExpand}
              iconsClass="fa5"
            />
          )}
          {/* <CheckboxTreeApp /> */}
        </VStack>
        <SubmitFormFooter
          onClose={closeModalFunction}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
);

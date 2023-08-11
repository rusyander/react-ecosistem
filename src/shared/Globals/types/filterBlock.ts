export interface FilterBlock {
  itemName: string;
  colName: string;
  value?: string;
  displayType: 'F' | 'FH' | 'DQ' | 'FF' | 'TA' | 'L' | 'FB' | 'DQF' | 'CH';
  dataType: 1 | 2 | 4 | 68; //1-string 2-number 4-сравнение 1 по 10 68- дата в коротком формате
  condition?: 'LIKE' | 'BETWEEN' | '=';
  upperSign?: 'NONE' | 'BOTH' | 'VALUE'; // только для строк
  likePercSign?: 'NONE' | 'RIGHT' | 'LEFT' | 'ALL'; // dataType 1 condition like - Kyда подставить процент % NONE / RIGHT/ LEFT /ALL
  filterGroup?: string; // групирования фильтров
  values?: string[]; // массив для condition BETWEEN
  dictCode?: string; // код справочника
  codeProperty?: string; // кодовое свойство справочника
  nameProperty?: string; // наименование свойство справочника
  attrCode?: string; // код атрибута
}

export interface GridRow {
  field: string;
  header?: string;
  size?: string;
  is_sortable_flag?: boolean;
  sort_col_name?: string;
  colType?: string;
}

//  displayType: ''; это тип поля ввода
// F - поле ввода
// FH - поле ввода скрытое
// DQ - справочник
// FF - Идентификационное поле для вызова справочника и поле описание
// TA - поле textArea
// L - выподающий список
// FB - поле с кнопкой для вызова справочника
// DQF - Справочник с идентификационным полем для вызова справочника и поле описание
// CH - поле ввода - чекбокс

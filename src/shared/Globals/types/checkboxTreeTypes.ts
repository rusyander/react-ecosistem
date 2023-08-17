export interface CheckboxTreeDataProps {
  comments: string | null;
  result: string;
  data: {
    access: AssesDataTree;
    accessData: string[];
  };
}

export interface AssesDataTree {
  children: AssesDataTree[];
  key: string;
  label: string;
  nodeType: string;
}

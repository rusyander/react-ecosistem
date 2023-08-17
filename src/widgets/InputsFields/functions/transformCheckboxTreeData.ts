export const transformCheckboxTreeData = (data: any) => {
  const nodesData: any = [];
  let counter = 0;

  const transformNode = (node: any) => {
    try {
      counter = counter + 1;
      const transformedNode = {
        value: node.key,
        label: node.label,
        key: node.key,
        children: node.children ? [] : null,
      };

      if (node?.children) {
        transformedNode.children = node?.children?.map(transformNode);
      }
      return transformedNode;
    } catch (e) {
      console.log(e);
    }
  };

  data?.forEach((node: any) => {
    nodesData.push(transformNode(node));
  });
  return nodesData;
};

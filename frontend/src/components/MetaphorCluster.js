import React, { useState } from "react";
import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import { useSelector, useDispatch } from "react-redux";
import { MainNode, CustomNode } from "./ChartBlock";

const chartsCoords = {
  0: [400, 10],
  1: [10, 200],
  2: [400, 350],
};

const createInitialSchema = (chartType, concept, cluster) => {
  const nodes = [
    {
      id: "main",
      content: concept,
      coordinates: [280, 280],
      render: MainNode,
    },
  ];
  const links = [];

  cluster.forEach((item, index) => {
    const id = `cluster-${index}`;
    nodes.push({
      id,
      data: { ...item, chartType },
      coordinates: chartsCoords[index],
      render: CustomNode,
    });
    links.push({
      input: "main",
      output: id,
    });
  });

  return createSchema({ nodes, links });
};

const MetaphorCluster = () => {

  const { chartType, values: { concept, cluster } } = useSelector(state => state.charts)

  const initialSchema = createInitialSchema(chartType, concept, cluster);
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div className="cluster-diagram">
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default MetaphorCluster;

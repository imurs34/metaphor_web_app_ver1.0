import Diagram, { createSchema } from "beautiful-react-diagrams";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openDetailedMetaphor } from "../store/actions/chartActions";

const CustomNode = (props) => (
  <div className={`p-2 big-rounded ${props.data.className}`}>
    <div className="">{props.content}</div>
  </div>
);

const MetaphorDetails = () => {
  const {
    details: {
      values: { key, raw, writing, explanation, charts, chartText },
    },
  } = useSelector((state) => state?.charts);
  const dispatch = useDispatch();
  const currentPage = Object.keys(explanation).indexOf(key) + 1;
  const totalPages = Object.keys(explanation).length - 1;

  const SPACE_BETWEEN = 70;
  const nodes = [];
  const links = [];
  charts.slice(0, 4).forEach((item, index) => {
    nodes.push({
      id: `main-${index}`,
      content: item[0],
      coordinates: [10, SPACE_BETWEEN * index + 10],
      render: CustomNode,
      data: {
        className:
          index === 0 ? "chart-detailed-first-left" : "chart-detailed-left",
      },
    });
    nodes.push({
      id: `node-${index}`,
      content: item[1],
      coordinates: [170, SPACE_BETWEEN * index + 10],
      render: CustomNode,
      data: {
        className:
          index === 0 ? "chart-detailed-first-right" : "chart-detailed-right",
      },
    });
    links.push({ input: `main-${index}`, output: `node-${index}` });
  });

  const chartSchema = createSchema({ nodes, links });

  const getPreviousPage = () => {
    if (currentPage <= 1) return;
    const newKey = Object.keys(explanation)[currentPage - 2]; // because it's [index + 1 - 2]
    dispatch(
      openDetailedMetaphor({
        explanation,
        key: newKey,
        ...explanation[newKey],
      })
    );
  };

  const getNextPage = () => {
    if (currentPage === totalPages) return;
    const newKey = Object.keys(explanation)[currentPage]; // because it's [index + 1]
    dispatch(
      openDetailedMetaphor({
        explanation,
        key: newKey,
        ...explanation[newKey],
      })
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Extender metaphor</h2>

        <div className="d-flex alig-items-center my-3 justify-content-center">
          <button
            className={`btn ${
              currentPage <= 1 ? "disabled" : ""
            } chart-detailed-right`}
            onClick={getPreviousPage}
          >
            &lt;
          </button>
          <button className="btn disabled">
            {currentPage} / {totalPages}
          </button>
          <button
            className={`btn chart-detailed-right ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={getNextPage}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-6" style={{ height: "300px" }}>
          <Diagram schema={chartSchema} />
        </div>
        <div className="col-6">
          {chartText.slice(0, 4).map((item, index) => (
            <p className="chart-text" key={`chart-text-${index}`}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="d-flex align-items-center">
        <h3>Topic</h3>
        <div className="bg-shadow mx-2 w-100 p-2">
          To explain the structure of DNA
        </div>
      </div>
      <div className="my-4 full-text-block">
        <p style={{ whiteSpace: "pre-line" }}>{writing}</p>
      </div>
    </div>
  );
};

export default MetaphorDetails;

import Diagram, { createSchema } from "beautiful-react-diagrams";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openDetailedMetaphor } from "../store/actions/chartActions";

const CustomNode = (props) => (
  <div className="p-2 big-rounded" style={{backgroundColor: props.data.color}}>
    <div className="">{props.content}</div>
  </div>
);

const MetaphorDetails = () => {
  const {
    details: {
      values: { key, raw, writing, explanation },
    },
  } = useSelector((state) => state?.charts);
  const dispatch = useDispatch();
  const currentPage = Object.keys(explanation).indexOf(key) + 1;
  const totalPages = Object.keys(explanation).length;

  const chartSchema = createSchema({
    nodes: [
      { id: "main", content: "DNA", coordinates: [10, 10], render: CustomNode, data: { color: "indianred" } },
      { id: "node-1", content: key, coordinates: [100, 10], render: CustomNode, data: { color: "aqua" } },
    ],
    links: [{ input: "main", output: "node-1" }],
  });

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
            className={`btn btn-info ${currentPage <= 1 ? "disabled" : ""}`}
            onClick={getPreviousPage}
          >
            &lt;
          </button>
          <button className="btn btl-link disabled">
            {currentPage} / {totalPages}
          </button>
          <button
            className={`btn btn-info ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={getNextPage}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-4">
          <Diagram schema={chartSchema} />
        </div>
        <div className="col-8">
          <p>{raw}</p>
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

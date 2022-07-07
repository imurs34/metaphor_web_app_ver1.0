import React from "react";
import { useSelector } from "react-redux";

import MetaphorCluster from "./MetaphorCluster";

const MetaphorIdea = () => {
  const {
    values: { concept, property },
  } = useSelector((state) => state.charts);

  return (
    <div>
      <h2>Explore metaphor ideas</h2>

      <div className="row my-3">
        <div className="col-2">
          <b>Concept</b>
        </div>
        <div className="col bg-shadow text-uppercase">{concept}</div>
        <div className="col-2">
          <b>Vehicle</b>
        </div>
        <div className="col bg-shadow"></div>
      </div>
      <div className="row my-3">
        <div className="col-2">
          <b>Propetry</b>
        </div>
        <div className="col bg-shadow">{property}</div>
      </div>
      <div className="row my-3">
        <div className="col-2">
          <b>Goals</b>
        </div>
        <div className="col bg-shadow"></div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              defaultValue="35"
              id="customRange"
            />
            <div className="d-flex justify-content-between">
              <p className="m-0 p-0">
                <b>Coherent</b>
              </p>
              <p className="m-0 p-0">
                <b>Creative</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              defaultValue="80"
              id="customRange"
            />
            <div className="d-flex justify-content-between">
              <p className="m-0 p-0">
                <b>Concrete</b>
              </p>
              <p className="m-0 p-0">
                <b>Abstract</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <MetaphorCluster />
      </div>
    </div>
  );
};

export default MetaphorIdea;

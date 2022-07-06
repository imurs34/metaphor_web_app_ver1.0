import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDetailedMetaphor,
  openVehicleChart,
} from "../store/actions/chartActions";

const MainNode = (props) => (
  <div className="p-3 bg-dark main-chart-block">
    <div className="text-white text-uppercase">{props.content}</div>
  </div>
);

const CustomNode = (props) => {
  const { chartType, values } = useSelector((state) => state.charts);
  const dispatch = useDispatch();

  if (chartType === "label") {
    return (
      <div
        className="px-3 py-3 bg-dark cluster-chart-block"
        onClick={() => dispatch(openVehicleChart(values))}
      >
        <div className="text-white">
          <p>{props.data.cluster_label.join(" | ")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-3 bg-dark cluster-chart-block">
      <div className="text-white">
        {props.data.vehicle.map((item, index) => (
          <div key={`cluster-item-${index}`} className="d-flex text-center">
            <p
              className="m-1 cluster-item"
              data-toggle="tooltip"
              data-placement="bottom"
              title={props.data.meaning[item]}
            >
              {item}
            </p>
            {Object.keys(props.data.explanation).includes(item) && (
              <p
                className="m-1 cluster-item-plus"
                onClick={() =>
                  dispatch(
                    openDetailedMetaphor({
                      key: item,
                      explanation: props.data.explanation,
                      ...props.data.explanation[item],
                    })
                  )
                }
              >
                +
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { MainNode, CustomNode };

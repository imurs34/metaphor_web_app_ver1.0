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
        className={`px-3 py-3 bg-dark cluster-chart-block cluster-block-${props.data.index}`}
        onClick={() => dispatch(openVehicleChart(values))}
      >
        <div className="text-white">
          <p>{props.data.cluster_label.join(" | ")}</p>
        </div>
      </div>
    );
  }

  const getItemColor = (index, length) => {
    if (index < 2) {
      return "chart-item-1"
    }
    if (index < 3) {
      return "chart-item-2";
    }
    if (index < 5) {
      return "chart-item-3"
    }
    if (index < 6) {
      return "chart-item-4"
    }
    return "chart-item-5";
  };

  return (
    <div className="px-3 py-3 bg-dark cluster-chart-block">
      <div className="text-white">
        {props.data.vehicle.map((item, index) => (
          <div key={`cluster-item-${index}`} className="d-flex text-center">
            <p
              className={`m-1 cluster-item text-black ${getItemColor(
                index,
                props.data.vehicle.length
              )}`}
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

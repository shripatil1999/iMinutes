import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./Taskpiechart.css";

export const options = {
  // className: "w-full",
  pieSliceText: "label",
  // width: 400,
  // maxWidth: 400,
  // minWidth: 300,
  height: 300,
  pieStartAngle: 100,
  legend: { position: "none" },
  animation: {
    startup: true,
    easing: "linear",
    duration: 1000,
  },
};

const TaskPieChart = () => {
  var counterOpen = 1;
  var counterOverdue = 2;
  var counterCompleted = 3;

  const data = [
    ["Status", "Tasks Status in Percentage"],
    ["Not Started", 0],
    ["Overdue", counterOverdue],
    ["On Going", counterOpen],
    ["Completed", counterCompleted],
  ];
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      // width={"100%"}
      // height={"100%"}
      className=" w-full flex mx-auto "
    />
  );
};

export default TaskPieChart;

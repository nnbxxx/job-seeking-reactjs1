import React from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

const DemoPie = () => {
  const data = [
    { type: "1a", value: 27 },
    { type: "2b", value: 25 },
    { type: "3c", value: 18 },
    { type: "4d", value: 15 },
    { type: "5e", value: 10 },
    { type: "6f", value: 5 },
  ];
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      text: (d: any) => `${d.type}\n ${d.value}`,
      position: "spider",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <>
      <div style={{ backgroundColor: "white", borderRadius: "40px" }}>
        {" "}
        <Pie {...config} title={"thống kê biểu đồ "} />
      </div>
    </>
  );
};

export default DemoPie;
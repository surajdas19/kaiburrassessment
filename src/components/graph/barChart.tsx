import { ProductChart } from "@/types/productTypes";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const BarChart= (props:any) => {

  const [chartData,setChartData]=useState<ProductChart>({})

  useEffect(()=>{
    setChartData({})
    if(props?.chartData){
      setChartData(props?.chartData)
    }
  },[props])

  console.log(chartData);
  

  return (
    <Plot
      data={[
        {
          x:chartData.product,
          y:chartData.stock,
          type: "bar",
          mode: "text",
          marker: { color: "#BEADFA" },
        },
      ]}
      layout={{
        height: 440,
        title: `Product Stock Graph`,
        xaxis: {
          title: "Product",
        },
        yaxis: {
          title: "Stock",
        },
        datarevision: chartData?.product?.length
      }}
      style={{borderRadius:10}}
      config={{ displayModeBar: false,responsive:true}}
    />
  );
};

export default BarChart
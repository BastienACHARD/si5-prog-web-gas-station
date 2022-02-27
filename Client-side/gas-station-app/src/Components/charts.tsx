import React from 'react';
import CanvasJSReact from "../lib/canvajs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const charts= (props:any) =>  {
    const options = {
            animationEnabled: true,
            theme: "dark2",
            title: {
                text: "Graph of gaz type and price by city"
            },
            axisY: {
            title: "Price by Type",
                scaleBreaks: {
                    autoCalculate: true,
                    type: "wavy",
                    lineColor: "white"
                }
            },
            data: [{
                type: "column",
                indexLabel: "{y}",      
                indexLabelFontColor: "white",
                dataPoints: [
                         {"label":"SP98","y":props.v1 === NaN? 0:props.v1},
                         {"label":"E10","y":  props.v2=== NaN? 0:props.v2 },
                         {"label":"SP95","y":  props.v4=== NaN? 0:props.v4 }




                ]
            }]
        }
  return (
    <div >
      <CanvasJSChart options = {options} 
            />
        </div>
  );}

  export default charts;
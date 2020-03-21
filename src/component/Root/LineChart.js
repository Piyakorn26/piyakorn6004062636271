import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import Plot from 'react-plotly.js';

var Count=[],Error=[];
class LineChart extends Component {
  constructor(props){
    super(props);
    Count=[];
    Error=[];
    this.props.Data.map(x=>{return Count.push(x.count)});
    this.props.Data.map(x=>{return Error.push(x.err)});
    console.log(Count);
    console.log(Error);
    }

  render() {
    return (
      <div>
          <Plot
              data={[
                  {
                      x:Count,
                      y:Error,
                      type:'scatter'
                  }
              ]}
              latout={{width:500,height:300,title:Error}}
          />
      </div>
    )
  }
}

export default LineChart;

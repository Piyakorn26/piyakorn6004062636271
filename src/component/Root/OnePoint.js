import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import LineChart from './LineChart.js'
import '../Custom.css';
import math from 'mathjs';

class OnePoint extends Component {
  constructor(props){
    super(props);
    this.state={Arr:[],x:"",E:"",submitted:true};
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.OnePointMethod=this.OnePointMethod.bind(this);
  }
  clear(event){
    event.preventDefault();
    this.setState({Arr:[]});
    this.setState({x:""});
    this.setState({E:""});
    this.setState({submitted:true});
  }
  handleSubmit(event) {
    let str=this.state.E;
    let c=0;
    for(let i=0;i<str.length;i++){
      if(str[i]==="x"||str[i]==="X"){
        c++;
      }
    }
    if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.x!==""){
      this.OnePointMethod();
      this.setState({submitted:false});
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
    this.setState({Arr:[]});
  }
  OnePointMethod(event){
      var func=(x)=>{
          let scope={x:x}
          let code=math.compile(this.state.E);
          return code.eval(scope);
      };
      var err=(x0,x1)=>{return Math.abs((x1-x0)/x1)*100};
      var arr;
      var data={x:0,err:"",fx:0,count:1};
      var t=true;
      var xOld=parseFloat(this.state.x);
      while(t){
        data.x=func(xOld);
        data.fx=func(data.x);
        data.err=err(xOld,data.x);
        arr=this.state.Arr;
        arr.push({x:data.x,err:data.err,count:data.count});
        if(func(data.x)===0||data.count>15){
          t=false;
        }
        data.count++;
        xOld=data.x;
      }
  }
  render() {
    const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                        <td>{props.data.x}</td>
                                        <td><progress class="progress is-danger" value={props.data.err} max="100">{props.data.err}%</progress></td>
                                        </tr>);
                                        }
    let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>});
    return (
      <div className="columns has-background-white">
                  <div className="column is-2">
                      <a href="#F"><div className="box has-text-centered is-custom">
                          <strong>Equation</strong>
                      </div></a>

                      <br/><br/>
                      <a href="#T"><div className="box has-text-centered is-custom">
                          <strong>Table</strong>
                      </div></a>
                      <br/><br/>
                      <a href="#C"><div className="box has-text-centered is-custom">
                          <strong>Chart</strong>
                      </div></a>
                      <br/><br/>
                  </div>
                  <div className="column is-10 is-custom">
                      <form id="F"onSubmit={this.handleSubmit}>
                          <h1 className="title is-1 has-text-danger"><strong>Equation</strong></h1>
                          <hr className="is-divider"/>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    Equation :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-large" name="E" type="text" style={{width:"100vh"}} value={this.state.E} onChange={this.handleChange} placeholder="Enter Equation" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    X0 :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-large" name="x" type="number" style={{width:"110vh"}} step="any" value={this.state.x} onChange={this.handleChange} placeholder="Enter X0"/>
                              </p>
                          </div>
                          <div className="field has-addons">
                              <div className="control">
                                  <input type="submit" value="Submit" className="button is-success is-rounded"/>
                              </div>
                              <div className="control">
                                  <button className="button is-warning is-rounded" onClick={this.clear}>  Reset  </button>
                              </div>
                          </div>
                      </form>
                      {(this.state.submitted)
                        ? <div></div>
                        : <div><div className="box has-background-light" id="T">
                          <h1 className="title is-1 has-text-dark">Table</h1>
                          <hr className="is-divider"/>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth ">
                            <thead>
                              <tr><th>n</th>
                                  <th>X</th>
                                  <th>ERR</th>
                                  <th>ERR Progress Bar</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows}
                            </tbody>
                        </table>
                        </div>
                        <div className="box has-background-light" id="C">
                        <h1 className="title is-1 has-text-dark">Chart</h1>
                        <hr className="is-divider"/>
                        <LineChart Data={this.state.Arr}/>
                        </div>
                        </div>
                        }

                  </div>
      </div>
    );
  }
}
export default OnePoint;

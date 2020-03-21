import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import LineChart from './LineChart.js'
import '../Custom.css';
import math from 'mathjs';
class Secant extends Component {
  constructor(props){
    super(props);
    this.state={Arr:[],x0:"",x1:"",E:"",submitted:true};
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SecantMethod=this.SecantMethod.bind(this);
  }
  clear(event){
    event.preventDefault();
    this.setState({Arr:[]});
    this.setState({x0:""});
    this.setState({x1:""});
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
    if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.x0!==""&&this.state.x1!==""){
      this.SecantMethod();
      this.setState({submitted:false});
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
    this.setState({Arr:[]});
  }
  SecantMethod(event){
      var func=(x)=>{
          let scope={x:x}
          let code=math.compile(this.state.E);
          return code.eval(scope).toFixed(6);
      };
      var err=(x0,x1)=>{return Math.abs((x1-x0)/x1)*100};
      var arr;
      var data={x0:0,x1:0,xn:0,err:"",fx0:0,fx1:0,fxn:0,count:1};
      var t=true;
      data.x0=parseFloat(this.state.x0);
      data.x1=parseFloat(this.state.x1);
      var xOld=data.x1;
      while(t){
        data.fx0=func(data.x0);
        data.fx1=func(data.x1);
        data.xn=parseFloat(data.x1-((data.fx1*(data.x0-data.x1))/(data.fx0-data.fx1)));
        data.fxn=func(data.xn);
        data.err=err(xOld,data.xn);
        arr=this.state.Arr;
        arr.push({x0:data.x0,x1:data.x1,xn:data.xn,err:data.err,fx0:data.fx0,fx1:data.fx1,fxn:data.fxn,count:data.count});
        if(data.err===0||data.count>15){
          t=false;
        }
        data.count++;
        xOld=data.xn;
        data.x0=data.x1;
        data.x1=data.xn;
      }
  }
  render() {
    const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                        <td>{props.data.xn}</td>
                                        <td>{props.data.fxn}</td>
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
                      <form id="F" onSubmit={this.handleSubmit}>
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
                                  <input className="input is-black is-large" name="x0" type="number" style={{width:"110vh"}} step="any" value={this.state.x0} onChange={this.handleChange} placeholder="Enter X0"/>
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    X1 :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-large" name="x1" type="number" style={{width:"110vh"}} step="any" value={this.state.x1} onChange={this.handleChange} placeholder="Enter X1" />
                              </p>
                          </div><br/>
                          <div className="field has-addons">
                              <div className="control">
                                  <input type="submit" value="Submit" className="button is-success is-rounded"/>
                              </div>
                              <div className="control">
                                  <button className="button is-warning is-rounded" onClick={this.clear}>  Reset  </button>
                              </div>
                          </div>
                      </form>
                      {(!this.state.submitted)
                        && <div><div className="box has-background-light" id="T">
                            <h1 className="title is-1 has-text-dark">Table</h1>
                            <hr className="is-divider"/>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth ">
                            <thead>
                              <tr><th>n</th>
                                  <th>X</th>
                                  <th>func(X)</th>
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
export default Secant;

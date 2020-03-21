import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import '../Custom.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';
import Algebrite from 'algebrite';

var I,integral,error,GraphData=[];
class CompositeSimpson extends Component {
  constructor(props){
    super(props);
    this.state={submitted:false,a:"",b:"",e:"",n:"",showOutput:false};
    I=0;
    GraphData=[];
    integral=0;
    error=0;
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CompositeSimpson=this.CompositeSimpson.bind(this);
  }
  clear(event){
    event.preventDefault();
    this.setState({submitted:false,a:"",b:"",e:"",n:"",showOutput:false});
    I=0;
    GraphData=[];
    integral=0;
    error=0;
  }
  handleSubmit(event) {
    let str=this.state.e;
    let c=0;
    for(let i=0;i<str.length;i++){
      if(str[i]==="x"||str[i]==="X"){
        c++;
      }
    }
    if((str.length!==0)&&(c!==0)&&this.state.submitted){
      GraphData=[];
      this.CompositeSimpson();
      this.setState({submitted:false,showOutput:true});
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
  }
  CompositeSimpson(event){
    var func=(x)=>{
        let scope={x:x}
        let code=math.compile(this.state.e);
        return code.eval(scope);
      }

    var graph=(a,b,h)=>{
      for(let i=a;i<b;i+=h){
          GraphData.push({x:[i,parseFloat(i+h)],y:[func(i),parseFloat(func(i+h))],type:'scatter',fill:'tozeroy'});
      }
      console.log(GraphData);
    }

    var integrate=(a, b)=> {
        let expr = math.compile(Algebrite.integral(Algebrite.eval(this.state.e)).toString());
        return expr.eval({x:b}) - expr.eval({x:a});
    }

    var sumFunc2=(start,n,h,count)=>{
      var sum = 0;
      var temp=start;
      for (var i=count ; i<n ; i+=2) {
          sum += func(temp);
          console.log("at start "+start+" func i is "+func(temp));
          temp+=h;
      }
      return parseFloat(sum);
    }
    var sumFunc=(start,end,h)=>{
        var sum = 0;
        for (var i=start ; i<end ; i+=h) {
            sum += func(i);
            console.log("sumFunc at i= "+i+"at h = "+h+" = "+func(i));
        }
        return parseFloat(sum);
    }

    var a=parseFloat(this.state.a);
    var b=parseFloat(this.state.b);
    var n=parseInt(this.state.n);
    var h=(b-a)/n;
    console.log("H is "+h);
    var evenX=a+h*2,oddX=a+h;
    I=(h/3)*(func(a)+func(b)+4*sumFunc(a+h,b,h*2)+2*sumFunc(a+h*2,b,h*2));
    integral=integrate(a,b);
    error=parseInt(((integral-I)/integral)*100);
    error=error.toFixed(1);
    graph(a,b,h);
  }
  render() {
    return (

      <div className="columns has-background-white">
                  <div className="column is-2">
                      <a href="#F"><div className="box has-text-centered is-custom">
                          <strong>Equation</strong>
                      </div></a>

                      <br/><br/>
                      <a href="#T"><div className="box has-text-centered is-custom">
                          <strong>Graph</strong>
                      </div></a>
                      <br/><br/>
                      <a href="#C"><div className="box has-text-centered is-custom">
                          <strong>Output</strong>
                      </div></a>
                      <br/><br/>
                      <a href="#C"><div className="box has-text-centered is-custom">
                          <strong>Progress bar</strong>
                      </div></a>
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
                                  <input className="input is-black is-large" name="e" type="text" style={{width:"100vh"}} value={this.state.e} onChange={this.handleChange} placeholder="Enter Equation" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    a :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-large" name="a" type="number" style={{width:"110vh"}} step="any" value={this.state.a} onChange={this.handleChange} placeholder="Enter a"/>
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    b :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-large" name="b" type="number" style={{width:"110vh"}} step="any" value={this.state.b} onChange={this.handleChange} placeholder="Enter b" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    n :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-large" name="n" type="number" style={{width:"110vh"}} value={this.state.n} onChange={this.handleChange} placeholder="Enter n"/>
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
                      {(this.state.showOutput)&&
                          <div>
                              <div className="box has-background-dark" id="T">
                                  <h1 className="title is-1 has-text-white">Graph</h1>
                                  <hr className="is-divider"/>
                                  <div>
                                      <Plot
                                          data={GraphData}
                                          latout={{width:500,height:300}}
                                      />
                                  </div>
                              </div>
                              <div className="box has-background-dark" id="C">
                                  <h1 className="title is-1 has-text-white">Output</h1>
                                  <hr className="is-divider"/>
                                  <h2 className="title is-2 has-text-white"><strong>The I is {I}</strong></h2><br/><br/>
                                  <h2 className="title is-2 has-text-white"><strong>The exact integral is {integral}</strong></h2><br/><br/>
                                  <h2 className="title is-2 has-text-white"><strong>The Error is {error}%</strong></h2>
                              </div>
                          </div>
                      }

                  </div>
      </div>
    );
  }
}
export default CompositeSimpson;

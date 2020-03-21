import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {InputNumber} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';
import Plot from 'react-plotly.js';

var MatrixInput,X,Y,L,Fx,newX,newLine;
class Lagrange extends Component{
  constructor(props){
    super(props);
    MatrixInput=[];
    X=[];
    Y=[];
    L=[];
    Fx=0;
    newX=0;
    newLine=0;
    this.state={showMatrix:false,showOutput:false,N:"",Arr:[]};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.Lagrange=this.Lagrange.bind(this);
  }
  createMatrix(n) {
    MatrixInput=[];
        for (var i=0 ; i<n ; i++) {
            MatrixInput.push(<InputNumber style={{
                width: "20%",
                height: "40%",
                fontSize: "18px"
            }}
                className="input is-primary"
                id={"x"+i} key={"x"+i}
                placeholder={"x"+i} />);
            MatrixInput.push(<InputNumber style={{
                width: "20%",
                height: "40%",
                fontSize: "18px"
            }}
                className="input is-danger"
                id={"y"+i} key={"y"+i}
                placeholder={"y"+i} />);
            MatrixInput.push(<br key={"br"+i}/>)
        }
        MatrixInput.push(<br key={"mid"}/>)
        MatrixInput.push(<InputNumber style={{
            width: "20%",
            height: "40%",
            fontSize: "18px"
        }}
            className="input is-primary"
            id={"exact"} key={"exact"}
            placeholder={"Position of X"} />);
        MatrixInput.push(<br key={"last"}/>)
    }

    clear(event){
      event.preventDefault();
      this.setState({showMatrix:false,showOutput:false,N:""});
      MatrixInput=[];
    }

    handleSubmit(event) {
      let N=parseInt(this.state.N);
      if(N!==0||N!==""){
        this.createMatrix(N);
        this.setState({showMatrix:true});
      }
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
      this.setState({showMatrix:false,showOutput:false});
      MatrixInput=[];
    }

    initMatrix() {
        X=[];
        Y=[];
        for(var i=0 ; i<this.state.N ; i++) {
            X.push(parseFloat(document.getElementById("x"+(i)).value));
            Y.push(parseFloat(document.getElementById("y"+(i)).value));
        }
        newX=parseFloat(document.getElementById("exact").value);
        console.log(X);
        console.log(Y);
    }


    Lagrange(n) {
        this.initMatrix();
        L=[];
        Fx=0;
        for(let i=0;i<n;i++){
            var temp=1;
            for(let j=n-1;j>=0;j--){
                if(i!==j){
                    temp*=(X[j]-newX)/(X[j]-X[i])
                }
            }
            L.push(temp);
        }
        for(let i=0;i<n;i++){
            Fx+=Y[i]*L[i];
        }
        newLine={x:[],y:[],type:'scatter'}
        let flag=true;
        for(let z=0;z<X.length;z++){
          if(X[z]<newX){
            newLine.x.push(X[z]);
            newLine.y.push(Y[z]);
          }
          else{
            if(flag){
              newLine.x.push(newX);
              newLine.y.push(Fx);
              flag=false;
            }
            newLine.x.push(X[z]);
            newLine.y.push(Y[z]);
          }
        }
        this.setState({showOutput: true});
    }




    render() {


      return (
        <div className="columns has-background-light">
                    <div className="column is-2">
                        <a href="#N"><div className="box has-text-centered is-custom">
                            <strong>Enter N</strong>
                        </div></a>

                        <br/><br/>
                        <a href="#M"><div className="box has-text-centered is-custom">
                            <strong>Data</strong>
                        </div></a>
                        <br/><br/>
                        <a href="#O"><div className="box has-text-centered is-custom">
                            <strong>Output</strong>
                        </div></a>
                    </div>
                    <div className="column is-10 is-custom">
                        <form id="N"  onSubmit={this.handleSubmit}>
                        <h1 className="title is-1 has-text-danger"><strong>Enter Number of Points</strong></h1>
                        <hr className="is-divider"/>
                        <div className="field has-addons">
                            <p className="control">
                              <a className="button is-static is-large" href="#undefined" >
                                  N :
                              </a>
                            </p>
                            <p className="control">
                                <input className="input is-black is-large" name="N" type="number" style={{width:"100vh"}} value={this.state.N} onChange={this.handleChange} min="2" max="10" placeholder="Enter Number of Points" />
                            </p>
                        </div>
                        <br/>
                        <div className="field has-addons">
                            <div className="control">
                                <input type="submit" value="Submit" className="button is-success is-rounded"/>
                            </div>
                            <div className="control">
                                <button className="button is-warning is-rounded" onClick={this.clear}>  Reset  </button>
                            </div>
                        </div>
                        </form>


                        <div>
                        {(this.state.showMatrix)&&
                          <div id="M" className="box has-background-light">
                              <h1 className="title is-1 has-text-dark"><strong>Enter Data values</strong></h1>
                              <hr className="is-divider"/>
                                  <div>
                                      <strong className="title is-3 has-text-dark">Enter Data values :</strong>
                                      <br/><br/>
                                      <div>{MatrixInput}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.Lagrange(this.state.N)}>  Submit  </button>
                                  </div>
                              </div>
                          </div>
                        }
                        </div><br/>



                    <div>
                    {(this.state.showOutput)&&
                      <div id="O" className="box has-background-light">
                          <h1 className="title is-1 has-text-dark"><strong>Output</strong></h1>
                          <hr className="is-divider"/>
                          <div>
                              <Plot
                                  data={[
                                      {
                                          x:X,
                                          y:Y,
                                          type:'scatter'
                                      }
                                      ,newLine
                                  ]}
                                  latout={{width:500,height:300}}
                              />
                          </div>
                          <br/><br/>
                          <h2 className="title is-2 has-text-dark"><strong>The Divided Differences at {newX} is {Fx}</strong></h2>
                      </div>
                    }
                  </div>
              </div>
        </div>
      );
    }
}
export default Lagrange;

import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {Input} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';
import math from 'mathjs';

var MatrixA=[],MatrixB=[],Output=[],A=[],B=[],C=0,X;
class Gauss extends Component{
  constructor(props){
    super(props);
    this.state={showMatrix:false,showOutput:false,N:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.Gauss=this.Gauss.bind(this);
  }
  createMatrix(n) {
    MatrixA=[];
    MatrixB=[];
        for (var i=1 ; i<=n ; i++) {
            for (var j=1 ; j<=n ; j++) {
                MatrixA.push(<Input style={{
                    width: "10%",
                    height: "40%",
                    fontSize: "18px",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                }}
                type="number"
                className="input is-primary"
                id={"a"+i+""+j} key={"a"+i+""+j}
                placeholder={"a"+i+""+j} />)
            }
            MatrixA.push(<br key={"br"+i}/>)
            MatrixB.push(<Input style={{
                width: "10%",
                height: "40%",
                fontSize: "18px",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
            }}
            type="number"
            className="input is-danger"
            id={"b"+i} key={"b"+i}
            placeholder={"b"+i} />)
        }
    }

    clear(event){
      event.preventDefault();
      this.setState({showMatrix:false,showOutput:false,N:""});
      MatrixA=[];
      MatrixB=[];
      Output=[];
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
      MatrixA=[];
      MatrixB=[];
    }

    initMatrix() {
      A=[];
      B=[];
      C=0;
      Output=[];
        for(var i=0 ; i<this.state.N ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.N ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }

    Gauss(n) {
        this.initMatrix();
        /*if (A[0][0] === 0) {
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
          }

    //Forward
        for(var k=0 ; k<n ; k++) {
            for(var i=k+1 ; i<n ; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j=k ; j<n ; j++) {
                    A[i][j] = A[i][j] - factor*A[k][j];
                }
                B[i] = B[i] - factor*B[k];
            }
        }
        for(let i=0;i<n-1;i++){
            for(let j=i+1;j<n;j++){
                var ratio=A[j][i]/A[i][i];
                for(let k=i+1;k<n;k++){
                    A[j][k]=A[j][k]-ratio*A[i][k];
                }
                B[j]=B[j]-ratio*B[i];
                for(let j=i+1;j<n;j++){
                    A[j][i]=0;
                }
            }
        }

    //Backward
        X = new Array(n);
        X[n-1] = B[n-1] / A[n-1][n-1];
        for(i=n-2 ; i>=0 ; i--) {
            var sum = B[i];
            for (j=i+1 ; j<n ; j++) {
                sum = sum - A[i][j]*X[j];
            }
            X[i] = sum / A[i][i];
        }
        X[n-1]=B[n-1]/A[n-1][n-1];
        for(let i=n-2 ; i>=0 ; i--) {
            var sum = 0;
            for (let j=i+1 ; j<n ; j++) {
                sum = sum - A[i][j]*X[j];
            }
            X[i] = (B[i]-sum) / A[i][i];
        }



        for (i=0 ; i<n ; i++) {
            Output.push((X[i]).toFixed(1));
        }*/
        //forward
        for(let i=0;i<n-1;i++){
            for(let j=i+1;j<n;j++){
                var ratio=A[j][i]/A[i][i];
                for(let k=i+1;k<n;k++){
                    A[j][k]=A[j][k]-ratio*A[i][k];
                }
                B[j]=B[j]-ratio*B[i];
                for(let j=i+1;j<n;j++){
                    A[j][i]=0;
                }
            }
        }
        console.log(A);
        X=math.usolve(A,B);
        for (let i=0 ; i<n ; i++) {
            Output.push((X[i][0]).toFixed(1));
        }
        console.log(X);
        this.setState({showOutput: true});
    }

    render() {
      const DataRow=(props)=>{return (<tr><td>{C+1}</td>
                                          <td>{Output[C++]}</td>
                                           {/* <td><progress class="progress is-danger" value={props.data.err} max="100">{props.data.err}%</progress></td> */}
                                           </tr>);
                                           }
      let rows=Output.map(x =>{return <DataRow key={C+1}/>});
      return (
        <div className="columns has-background-white">
                    <div className="column is-2">
                        <a href="#N"><div className="box has-text-centered is-custom">
                            <strong>Enter N</strong>
                        </div></a>

                        <br/><br/>
                        <a href="#M"><div className="box has-text-centered is-custom">
                            <strong>Matrix</strong>
                        </div></a>
                        <br/><br/>
                        <a href="#O"><div className="box has-text-centered is-custom">
                            <strong>Output</strong>
                        </div></a>
                        <br/><br/>
            
                    </div>
                    <div className="column is-10 is-custom">
                        <form id="N" onSubmit={this.handleSubmit}>
                        <h1 className="title is-1 has-text-danger"><strong>Enter Matrix dimentions</strong></h1>
                        <hr className="is-divider"/>
                        <div className="field has-addons">
                            <p className="control">
                              <a className="button is-static is-large" href="#undefined" >
                                  N :
                              </a>
                            </p>
                            <p className="control">
                                <input className="input is-black is-large" name="N" type="number" style={{width:"100vh"}} value={this.state.N} onChange={this.handleChange} min="2" max="10" placeholder="Enter Matrix dimentions" />
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
                              <h1 className="title is-1 has-text-danger"><strong>Enter Matrix values</strong></h1>
                              <hr className="is-divider"/>
                                  <div>
                                      <strong className="title is-3 has-text-dark">Enter Matrix values :</strong>
                                      <br/><br/>
                                      <div>{MatrixA}</div>
                                      <br/><br/>
                                      <strong className="title is-3 has-text-dark">Enter Vector values :</strong>
                                      <br/><br/>
                                      <div>{MatrixB}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.Gauss(this.state.N)}>  Submit  </button>
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
                          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth ">
                          <thead>
                            <tr><th>N</th>
                                <th>Xn</th>
                               
                            </tr>
                          </thead>
                          <tbody>
                          {rows}
                          </tbody>
                      </table>
                      </div>
                    }
                  </div>
              </div>
        </div>
      );
    }
}
export default Gauss;

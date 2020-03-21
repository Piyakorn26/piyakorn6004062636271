import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {Input,Table} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';
import math from 'mathjs';

var MatrixA=[],VectorB=[],VectorX=[],A=[],B=[],X=[],DataTable=[],Columns,Error,count=0;
class CG extends Component{
  constructor(props){
    super(props);
    this.state={showMatrix:false,showOutput:false,N:"",Arr:[]};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.CG=this.CG.bind(this);
    this.initColumns=this.initColumns.bind(this);
    this.appendDataTable=this.appendDataTable.bind(this);
  }
  createMatrix(n) {
    MatrixA=[];
    VectorB=[];
    VectorX=[];
        for (var i=1 ; i<=n ; i++) {
            for (var j=1 ; j<=n ; j++) {
                MatrixA.push(<Input style={{
                    width: "10%",
                    height: "40%",
                    fontSize: "18px",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                }}
                className="input is-primary"
                id={"a"+i+""+j} key={"a"+i+""+j}
                placeholder={"a"+i+""+j} />)
            }
            MatrixA.push(<br key={"br"+i}/>)
            VectorB.push(<Input style={{
                width: "10%",
                height: "40%",
                fontSize: "18px",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
            }}
            className="input is-danger"
            id={"b"+i} key={"b"+i}
            placeholder={"b"+i} />)
            VectorX.push(<Input style={{
                width: "10%",
                height: "40%",
                fontSize: "18px",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
            }}
            className="input is-success"
            id={"x"+i} key={"x"+i}
            placeholder={"x"+i} />)
        }
    }

    clear(event){
      event.preventDefault();
      this.setState({showMatrix:false,showOutput:false,N:""});
      MatrixA=[];
      VectorB=[];
      VectorX=[];
      Error=[];
    }

    handleSubmit(event) {
      let N=parseInt(this.state.N);
      if(N!==0&&N!==""){
        this.createMatrix(N);
        this.setState({showMatrix:true});
      }
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
      this.setState({showMatrix:false,showOutput:false});
      MatrixA=[];
      VectorB=[];
      VectorX=[];
      Error=[];
    }

    initMatrix() {
        A=[];
        B=[];
        X=[];
        Error=[];
        for(var i=0 ; i<this.state.N ; i++) {
            A[i] = [];
            for(var j=0 ; j<this.state.N ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
            X.push(parseFloat(document.getElementById("x"+(i+1)).value));
        }
    }


    CG(n) {
        this.initMatrix();
        var R = math.subtract(math.multiply(A,X), B);
        console.log(R)
        count=0;
        DataTable=[];
        var D = math.multiply(R, -1);
        var alpha;
        console.log(D)
        do {

            var Lambda = (math.multiply(math.multiply(math.transpose(D), R), -1)) /
                    (math.multiply(math.multiply(math.transpose(D), A), D))

            X = math.add(X, math.multiply(Lambda, D));

            R = math.subtract(math.multiply(A, X), B);

            Error = Math.sqrt(math.multiply(math.transpose(R), R)).toFixed(6);
            if(Error>0){
              alpha = (math.multiply(math.multiply(math.transpose(R), A), D)) /
                      math.multiply(math.transpose(D), math.multiply(A, D)).toFixed(6);
            }
            else{
              alpha ="";
            }

            this.appendDataTable(Lambda, JSON.stringify(X).split(',').join(",\n"), Error,alpha);
            D = math.add(math.multiply(R, -1), math.multiply(alpha, D))

        }while (Error > 0.000001);
        this.initColumns();
        this.setState({showOutput: true});
    }

    initColumns() {
      Columns=[
        {
          title: "Iteration",
          dataIndex: "iteration",
          key: "iteration"
        },
        {
          title: "Lambda",
          dataIndex: "lambda",
          key: "lambda"
        },
        {
          title: "VectorX",
          dataIndex: "X",
          key: "X"
        },
        {
          title: "Error",
          dataIndex: "error",
          key: "error"
        },
        {
          title: "Alpha",
          dataIndex: "alpha",
          key: "alpha"
        }
      ];
    }

    appendDataTable(lambda,x,error,alpha) {
      DataTable.push({
           iteration: count++,
           lambda: lambda,
           X:x,
           error: error,
           alpha:alpha
       });
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
                            <strong>Matrix</strong>
                        </div></a>
                        <br/><br/>
                        <a href="#O"><div className="box has-text-centered is-custom">
                            <strong>Output</strong>
                        </div></a>
                        <br/><br/>
                    </div>
                    <div className="column is-10 is-custom">
                        <form id="N"  onSubmit={this.handleSubmit}>
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
                              <h1 className="title is-1 has-text-dark"><strong>Enter Matrix values</strong></h1>
                              <hr className="is-divider"/>
                                  <div>
                                      <strong className="title is-3 has-text-dark">Enter Matrix values :</strong>
                                      <br/><br/>
                                      <div>{MatrixA}</div>
                                      <br/><br/>
                                      <strong className="title is-3 has-text-dark">Enter Vector values :</strong>
                                      <br/><br/>
                                      <div>{VectorB}</div>
                                      <br/><br/>
                                      <strong className="title is-3 has-text-dark">Enter X values :</strong>
                                      <br/><br/>
                                      <div>{VectorX}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.CG(this.state.N)}>  Submit  </button>
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
                          <Table columns={Columns} bordered dataSource={DataTable}
                          bodyStyle={{fontWeight: "bold", fontSize: "16px", color: "dark", overflowX: "scroll", border:"3px solid dark"}}></Table>
                      </div>
                    }
                  </div>
              </div>
        </div>
      );
    }
}
export default CG;

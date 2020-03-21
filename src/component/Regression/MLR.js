import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {InputNumber,Table} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';
import math from 'mathjs';

var MatrixInput,X,Y,Gx,A,Matrix,M,Vector,Columns,dataSource,tempX,Sr,SYX;
class MLR extends Component{
  constructor(props){
    super(props);
    MatrixInput=[];
    X=[];
    Y=[];
    Matrix=[];
    M=0;
    Gx="";
    Vector=[];
    Columns=[]
    Sr=0;
    SYX=0;
    dataSource=[];
    tempX=[];
    this.state={showMatrix:false,showOutput:false,N:"",M:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.MLR=this.MLR.bind(this);
  }
  createMatrix(n) {
    MatrixInput=[];
        for (var i=0 ; i<this.state.M;i++) {
          for (var j=0 ; j<this.state.N ;j++) {
              MatrixInput.push(<InputNumber style={{
                  width: "10%",
                  height: "40%",
                  fontSize: "18px",
              }}
              className="input is-primary"
              id={"x"+i+""+j} key={"x"+i+""+j}
              placeholder={"x"+i+""+j} />);
          }
            MatrixInput.push(<InputNumber style={{
                width: "10%",
                height: "40%",
                fontSize: "18px"
            }}
                className="input is-danger"
                id={"y"+i} key={"y"+i}
                placeholder={"y"+i} />);
            MatrixInput.push(<br key={"br"+i}/>)
        }
        MatrixInput.push(<br key={"last"}/>)
    }

    clear(event){
      event.preventDefault();
      this.setState({showMatrix:false,showOutput:false,N:"",M:""});
      MatrixInput=[];
      Matrix=[];
      M=0;
      Gx="";
      Vector=[];
      Columns=[];
      Sr=0;
      SYX=0;
      dataSource=[];
      tempX=[];
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
        tempX=[];
        Matrix=[];
        Vector=[];
        Gx="";
        Sr=0;
        SYX=0;
        dataSource=[];
        for(var i=0 ; i<this.state.M ; i++) {
            tempX[i]=[];
            for(let j=0;j<this.state.N ; j++){
                tempX[i][j]=parseFloat(document.getElementById("x"+i+""+j).value)
            }
            Y.push(parseFloat(document.getElementById("y"+(i)).value));
        }
        for(var i=0 ; i<this.state.N ; i++) {
            X[i]=[];
            for(let j=0;j<this.state.M ; j++){
                X[i][j]=tempX[j][i];
            }
        }
    }

    initColumns() {
      Columns=[];
      Columns.push({
          title: "At a",
          dataIndex: "a",
          key: "a"
      });
      Columns.push({
          title: "Value",
          dataIndex: "v",
          key: "v"
      },);
    }

    MLR(n) {
        this.initMatrix();
        var sumX=(j)=>{
            var temp=0;
            for(let i=0;i<this.state.M;i++){
                temp+=X[j-1][i];
            }
            return temp;
        }
        var sumXX=(j,k)=>{
            var temp=0;
            for(let i=0;i<this.state.M;i++){
                temp+=X[j-1][i]*X[k-1][i];
            }
            return temp;
        }
        var sumY=()=>{
            var temp=0;
            for(let i=0;i<this.state.M;i++){
                temp+=Y[i];
            }
            return temp;
        }
        var sumXY=(j)=>{
            var temp=0;
            for(let i=0;i<this.state.M;i++){
                temp+=X[j-1][i]*Y[i];
            }
            return temp;
        }
        for(let i=0;i<=this.state.N;i++){
            Matrix[i]=[];
            for(let j=0;j<=this.state.N;j++){
                if(i===0&&j===0){
                    Matrix[i][j]=parseInt(this.state.M);
                }
                else if(i===0){
                    Matrix[i][j]=sumX(j);
                }
                else if(j===0){
                    Matrix[i][j]=sumX(i);
                }
                else{
                    Matrix[i][j]=sumXX(i,j);
                }
            }
        }
        for(let i=0;i<=this.state.N;i++){
          if(i===0){
              Vector.push(sumY());
          }
          else{
              Vector.push(sumXY(i));
          }
        }
        A=math.lusolve(Matrix,Vector);
        this.initColumns();
        var tempA=[];
        for(let i=0;i<A.length;i++){
          dataSource.push({a:i,v:A[i][0].toFixed(6)});
          tempA.push((parseFloat(A[i][0])).toFixed(1));
          console.log(tempA[i]);
        }
        for(let i=0;i<this.state.M;i++){
            var sum=Y[i];
            console.log("sum at i="+i+" is ="+sum);
            for(let j=0;j<A.length;j++){
                if(j===0){
                  sum-=tempA[j];
                  console.log("sum at i="+i+" j="+j+" is ="+sum);
                }
                else{
                  sum-=tempA[j]*X[j-1][i];
                  console.log("sum at i="+i+" j="+j+" is ="+sum);
                }
            }
            sum=Math.pow(sum,2);
            Sr+=sum;
        }
        Sr.toFixed(4);
        SYX=Math.sqrt(Sr/(this.state.M-(A.length+1)));
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
                        <h1 className="title is-1 has-text-danger"><strong>Enter Matrix dimentions</strong></h1>
                        <hr className="is-divider"/>
                        <div className="field has-addons">
                            <p className="control">
                              <a className="button is-static is-large" href="#undefined" >
                                  Number of X :
                              </a>
                            </p>
                            <p className="control">
                                <input className="input is-black is-large" name="N" type="number" style={{width:"100vh"}} value={this.state.N} onChange={this.handleChange} min="2" max="10" placeholder="Enter Number of X" />
                            </p>
                        </div>
                        <br/>
                        <div className="field has-addons">
                            <p className="control">
                              <a className="button is-static is-large" href="#undefined" >
                                  Number of row :
                              </a>
                            </p>
                            <p className="control">
                                <input className="input is-black is-large" name="M" type="number" style={{width:"100vh"}} value={this.state.M} onChange={this.handleChange} min="2" max="10" placeholder="Enter Number of Rows" />
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
                                      <button className="button is-success is-rounded" onClick={()=>this.MLR(this.state.N)}>  Submit  </button>
                                  </div>
                              </div>
                          </div>
                        }
                        </div><br/>



                    <div>
                    {(this.state.showOutput)&&
                      <div id="O" className="box has-background-light">
                          <h1 className="title is-1 has-text-dark"><strong>Output</strong></h1>
                          <hr className="is-divider"/><br/><br/>
                          <Table columns={Columns} bordered dataSource={dataSource}
                          bodyStyle={{fontWeight: "bold", fontSize: "16px", color: "dark", overflowX: "scroll", border:"2px solid white"}}></Table>
                          <br/>
                          <h2 className="title is-2 has-text-dark"><strong>Sr = {Sr}</strong></h2>
                          <h2 className="title is-2 has-text-dark"><strong>SYX = {SYX}</strong></h2>
                          <br/>
                      </div>
                    }
                  </div>
              </div>
        </div>
      );
    }
}
export default MLR;

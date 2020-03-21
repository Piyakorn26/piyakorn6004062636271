import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {InputNumber,Table} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';
import math from 'mathjs';

var MatrixInput,X,Y,Gx,A,Matrix,M,Vector,Columns,dataSource,Sr,SYX;
class Polynomial extends Component{
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
    this.state={showMatrix:false,showOutput:false,N:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.Polynomial=this.Polynomial.bind(this);
  }
  createMatrix(n) {
    MatrixInput=[];
        for (var i=0 ; i<n ; i++) {
            MatrixInput.push(<InputNumber style={{
                width: "10%",
                height: "40%",
                fontSize: "18px"
            }}
                className="input is-primary"
                id={"x"+i} key={"x"+i}
                placeholder={"x"+i} />);
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
        MatrixInput.push(<br key={"mid"}/>)
        MatrixInput.push(<InputNumber style={{
            width: "20%",
            height: "40%",
            fontSize: "18px"
        }}
            className="input is-primary"
            id={"m"} key={"m"}
            placeholder={"Enter M"} />);
        MatrixInput.push(<br key={"last"}/>)
    }

    clear(event){
      event.preventDefault();
      this.setState({showMatrix:false,showOutput:false,N:""});
      MatrixInput=[];
      Matrix=[];
      M=0;
      Gx="";
      Vector=[];
      Columns=[]
      Sr=0;
      SYX=0;
      dataSource=[];
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
        M=0;
        Matrix=[];
        Vector=[];
        dataSource=[];
        Gx="";
        Sr=0;
        SYX=0;
        for(var i=0 ; i<this.state.N ; i++) {
            X.push(parseFloat(document.getElementById("x"+(i)).value));
            Y.push(parseFloat(document.getElementById("y"+(i)).value));
        }
        M=parseInt(document.getElementById("m").value);
        console.log(X);
        console.log(Y);
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

    Polynomial(n) {
        this.initMatrix();
        var sumX=(m)=>{
            var temp=0;
            for(let i=0;i<n;i++){
                temp+=Math.pow(X[i],m);
            }
            return temp;
        }
        var sumY=()=>{
            var temp=0;
            for(let i=0;i<n;i++){
                temp+=Y[i];
            }
            return temp;
        }
        var sumXY=(m)=>{
            var temp=0;
            for(let i=0;i<n;i++){
                temp+=Math.pow(X[i],m)*Y[i];
            }
            return temp;
        }
        var func=(x,y,str)=>{
            let scope={x:x,y:y}
            let code=math.compile(str);
            return code.eval(scope);
          }
        for(let i=0;i<=M;i++){
            Matrix[i]=[];
            var count1=i;
            var count2=count1;
            for(let j=0;j<=M;j++){
                if(i===0&&j===0){
                    Matrix[i][j]=parseInt(n);
                    count2++;
                }
                else if(i===j){
                    Matrix[i][j]=sumX(2*i);
                    count2++;
                }
                else{
                    Matrix[i][j]=sumX(count2);
                    count2++;
                }
            }
        }
        for(let i=0;i<=M;i++){
          if(i===0){
              Vector.push(sumY());
          }
          else{
              Vector.push(sumXY(i));
          }
        }
        console.log(Matrix);
        console.log(Vector);
        A=math.lusolve(Matrix,Vector);
        this.initColumns();
        for(let i=0;i<A.length;i++){
          if(i===0){
              Gx+="y-"+A[i][0];
          }
          else if(i===1){
              Gx+="-"+A[i][0]+"x";
          }
          else{
              Gx+="-"+A[i][0]+"x^"+i;
          }
          dataSource.push({a:i,v:A[i][0].toFixed(6)});
        }
        for(let i=0;i<this.state.N;i++){
          Sr+=Math.pow(func(X[i],Y[i],Gx),2);
        }
        SYX=Math.sqrt(Sr/(this.state.N-(M+1)));
        this.setState({showOutput: true});

    }
    render() {
      return (
        <div className="columns has-background-white">
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
                        <form id="N" onSubmit={this.handleSubmit}>
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
                                      <strong className="title is-3 has-text-darks">Enter Data values :</strong>
                                      <br/><br/>
                                      <div>{MatrixInput}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.Polynomial(this.state.N)}>  Submit  </button>
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
export default Polynomial;

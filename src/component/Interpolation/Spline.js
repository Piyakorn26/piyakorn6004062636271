import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {InputNumber} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';
import Plot from 'react-plotly.js';

var MatrixInput,X,Y,Fx,newX,newLine,A,B,C,D,E;
class Spline extends Component{
  constructor(props){
    super(props);
    MatrixInput=[];
    X=[];
    Y=[];
    A=[];
    B=[];
    C=[];
    D=[];
    E=[];
    Fx=0;
    newX=0;
    newLine=0;
    this.state={showMatrix:false,showOutput:false,N:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.Spline=this.Spline.bind(this);
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
        A=[];
        B=[];
        C=[];
        D=[];
        E=[];
        Fx=0;
        for(var i=0 ; i<this.state.N ; i++) {
            X.push(parseFloat(document.getElementById("x"+(i)).value));
            Y.push(parseFloat(document.getElementById("y"+(i)).value));
        }
        newX=parseFloat(document.getElementById("exact").value);
    }


    Spline(n) {
        this.initMatrix();
        var i,n=this.state.N;
        for(i=0;i<n;i++){
          //เติมให้เต็มไปด้วย 0 ทั้งหมด
          A.push(0);
          B.push(0);
          C.push(0);
          D.push(0);
          E.push(0);
        }
        console.log("At DO10");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        for(i=1;i<n-1;i++){
            A[i]=(X[i]-X[i-1]);
            B[i]=2*(X[i+1]-X[i-1]);
            C[i]=X[i+1]-X[i];
            D[i]=6*(Y[i+1]-Y[i])/(X[i+1]-X[i])+6*(Y[i-1]-Y[i])/(X[i]-X[i-1]);
        }
        console.log("At DO20");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        B[0]=1;
        C[0]=0;
        D[0]=0;
        A[n-1]=0;
        B[n-1]=1;
        D[n-1]=0;
        console.log("At 20Continue");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        for(i=1;i<n;i++){
          A[i]=A[i]/B[i-1];
          B[i]=B[i]-A[i]*C[i-1];
        }
        console.log("At DO30");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        for(i=1;i<n;i++){
          D[i]=D[i]-A[i]*D[i-1];
        }
        console.log("At DO35");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        E[n-1]=D[n-1]/B[n-1];
        console.log("At Continue35");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        for(i=n-2;i>=0;i--){
          E[i]=(D[i]-C[i]*E[i+1])/B[i];
        }
        console.log("At DO40");
        console.log(A);
        console.log(B);
        console.log(C);
        console.log(D);
        console.log(E);
        for(i=1;i<n;i++){
          if(newX>=X[i-1]&&newX<=X[i]){
            var D1=X[i]-newX;
            var D2=newX-X[i-1];
            var DD=X[i]-X[i-1];
            var T1=E[i-1]*D1*D1*D1/(6*DD);
            var T2=E[i]*D2*D2*D2/(6*DD);
            var T3=(Y[i-1]/DD-E[i-1]*DD/6)*D1;
            var T4=(Y[i]/DD-E[i]*DD/6)*D2;
            Fx=T1+T2+T3+T4;
            console.log("At DO50");
            console.log(D1);
            console.log(D2);
            console.log(DD);
            console.log(T1);
            console.log(T2);
            console.log(T3);
            console.log(T4);
            console.log(Fx);
          }
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
        console.log(X);
        console.log(Y);
        console.log(newLine);
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
                        <br/><br/>
                        <a href="#C"><div className="box has-text-centered is-custom">
                          <strong>Progress bar</strong>
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
                                      <strong className="title is-3 has-text-dark">Enter Data values :</strong>
                                      <br/><br/>
                                      <div>{MatrixInput}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.Spline(this.state.N)}>  Submit  </button>
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
export default Spline;

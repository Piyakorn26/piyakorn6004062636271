import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import {Input,Table} from 'antd';
import 'antd/dist/antd.css';
import '../Custom.css';

var MatrixA=[],MatrixB=[],MatrixC=[],Error=[],A=[],B=[],C=[],DataTable=[],Columns=[],count=0;
class GaussS extends Component{
  constructor(props){
    super(props);
    this.state={showMatrix:false,showOutput:false,N:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.GaussS=this.GaussS.bind(this);
    this.initColumns=this.initColumns.bind(this);
    this.appendDataTable=this.appendDataTable.bind(this);
  }
  createMatrix(n) {
    MatrixA=[];
    MatrixB=[];
    MatrixC=[];
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
            MatrixB.push(<Input style={{
                width: "10%",
                height: "40%",
                fontSize: "18px",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
            }}
            className="input is-danger"
            id={"b"+i} key={"b"+i}
            placeholder={"b"+i} />)
            MatrixC.push(<Input style={{
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
      MatrixB=[];
      MatrixC=[];
      Error=[];
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
      MatrixC=[];
      Error=[];
    }

    initMatrix() {
        A=[];
        B=[];
        C=[];
        Error=[];
        for(var i=0 ; i<this.state.N ; i++) {
            A[i] = [];
            C[i] = [];
            for(var j=0 ; j<this.state.N ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
            C[i].push(parseFloat(document.getElementById("x"+(i+1)).value));
        }
    }


    GaussS(n) {
        this.initMatrix();
        var k=0;
        var Err=()=>{
          var temp;
          for(let i=0;i<n;i++){
              Error[i]=[];
              for(let j=0;j<C[i].length;j++){
                if(j===0){
                  Error[i].push(100);
                }
                else{
                  temp=Math.abs((C[i][j]-C[i][j-1])/C[i][j]);
                  Error[i].push(temp.toFixed(6));
                }
              }
          }
          console.log(Error);
        }

        do{
            for(let i=0;i<n;i++){
                let sum=0;
                let z=0;;
                for(let j=0;j<n;j++){
                    if(i!==j){
                        if(z<i){
                            sum=sum+A[i][j]*C[j][k+1];
                        }
                        else{
                            sum=sum+A[i][j]*C[j][k];
                        }
                    }
                    z++;
                }
                C[i].push((B[i]-sum)/A[i][i]);
            }
            k++;
        }while(k<10);
        Err();
        this.initColumns();
        this.appendDataTable();
        this.setState({showOutput: true});
    }

    initColumns() {
      Columns=[];
      Columns.push({
          title: "Iteration",
          dataIndex: "i",
          key: "i"
      });
        for (var i=1 ; i<=this.state.N ; i++) {
            Columns.push({
                title: "X"+i,
                dataIndex: "x"+i,
                key: "x"+i
            },);
            Columns.push({
                title: "Error"+i,
                dataIndex: "error"+i,
                key: "error"+i
            },);
        }
    }

    appendDataTable() {
        count=0;
        DataTable=[];
        for (let i=0 ; i<C[1].length ; i++) {
            var str ='';
            str+= '{"i": '+ ++count +',';
            for(let j=0 ; j<this.state.N ;j++){
                str+='"x'+(j+1)+'": '+C[j][i].toFixed(6)+', "error'+(j+1)+'": '+Error[j][i];
                if (j !== this.state.N-1) {
                    str += ','
                }
            }
            str += '}';
            DataTable.push(JSON.parse(str));
        }
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
                                      <div>{MatrixB}</div>
                                      <br/><br/>
                                      <strong className="title is-3 has-text-dark">Enter X values :</strong>
                                      <br/><br/>
                                      <div>{MatrixC}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.GaussS(this.state.N)}>  Submit  </button>
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
                          bodyStyle={{fontWeight: "bold", fontSize: "16px", color: "dark", overflowX: "scroll", border:"2px solid dark"}}></Table>
                      </div>
                    }
                  </div>
              </div>
        </div>
      );
    }
}
export default GaussS;

import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import Navbar from './Navbar.js';
import Banner from './Banner.js';
import Bisection from './Root/Bisection.js';
import FalsePosition from './Root/FalsePosition.js';
import OnePoint from './Root/OnePoint.js';
import NewtonRaphson from './Root/NewtonRaphson.js';
import Secant from './Root/Secant.js';
import Homepage from './Homepage.js';
import Cramer from './Algebra/Cramer.js'
import Gauss from './Algebra/Gauss.js'
import GaussJ from './Algebra/GaussJ.js'
import MIM from './Algebra/MIM.js'
import LU from './Algebra/LU.js'
import Jacobi from './Algebra/Jacobi.js'
import GaussS from './Algebra/GaussS.js'
import CG from './Algebra/CG.js'
import NewtonDD from './Interpolation/NewtonDD.js';
import Lagrange from './Interpolation/Lagrange.js';
import Spline from './Interpolation/Spline.js';
import Trapezoidal from './Integration/Trapezoidal.js';
import CompositeTrapezoidal from './Integration/CompositeTrapezoidal.js';
import Simpson from './Integration/Simpson.js';
import CompositeSimpson from './Integration/CompositeSimpson.js';
import ForwardH1 from './Differentiation/ForwardH1.js';
import ForwardH2 from './Differentiation/ForwardH2.js';
import BackwardH1 from './Differentiation/BackwardH1.js';
import BackwardH2 from './Differentiation/BackwardH2.js';
import CentralH1 from './Differentiation/CentralH1.js';
import CentralH2 from './Differentiation/CentralH2.js';
import Polynomial from './Regression/Polynomial.js';
import MLR from './Regression/MLR.js';
class App extends Component {
constructor(props){
    super(props);
    this.state={title:"Numerical Method"};
    this.setTitle=this.setTitle.bind(this);
}

setTitle(data){
  this.setState({title:data});
}

  render() {
    const container=()=>{
      switch (this.state.title) {
        case "Bisection": return <Bisection title={this.state.title}/>;
        case "False Position": return <FalsePosition title={this.state.title} sss={"11"}/>;
        case "One-Point Iteration": return <OnePoint title={this.state.title}/>;
        case "Newton-Raphson": return <NewtonRaphson title={this.state.title}/>;
        case "Secant": return <Secant title={this.state.title}/>;
        case "Cramer's Rule": return <Cramer title={this.state.title}/>;
        case "Gauss Elimination": return <Gauss title={this.state.title}/>;
        case "Gauss-Jordan": return <GaussJ title={this.state.title}/>;
        case "Matrix Inversion": return <MIM title={this.state.title}/>;
        case "LU Decomposition": return <LU title={this.state.title}/>;
        case "Jacobi Iteration": return <Jacobi title={this.state.title}/>;
        case "Gauss-Seidel Iteration": return <GaussS title={this.state.title}/>;
        case "Conjugate Gradient": return <CG title={this.state.title}/>;
        case "Newton's Divided-Differences": return <NewtonDD title={this.state.title}/>;
        case "Lagrange Polynomials": return <Lagrange title={this.state.title}/>;
        case "Spline Interpolation": return <Spline title={this.state.title}/>;
        case "Trapezoidal's Rule": return <Trapezoidal title={this.state.title}/>;
        case "CompositeTrapezoidal's Rule": return <CompositeTrapezoidal title={this.state.title}/>;
        case "Simpson's Rule": return <Simpson title={this.state.title}/>;
        case "CompositeSimpson's Rule": return <CompositeSimpson title={this.state.title}/>;
        case "Forward Divided-Differences(h)": return <ForwardH1 title={this.state.title}/>;
        case "Forward Divided-Differences(h^2)": return <ForwardH2 title={this.state.title}/>;
        case "Backward Divided-Differences(h)": return <BackwardH1 title={this.state.title}/>;
        case "Backward Divided-Differences(h^2)": return <BackwardH2 title={this.state.title}/>;
        case "Central Divided-Differences(h)": return <CentralH1 title={this.state.title}/>;
        case "Central Divided-Differences(h^2)": return <CentralH2 title={this.state.title}/>;
        case "Polynomial Regression": return <Polynomial title={this.state.title}/>;
        case "Multiple Linear Regression": return <MLR title={this.state.title}/>
        default: return <Homepage title={this.state.title}/>
      }
    }
    return (
      <div>
          <Navbar setTitle={this.setTitle}/>
          {(this.state.title!=="Numerical Method")&&<Banner title={this.state.title}/>}
          <div>{container()}</div>

      </div>

    );
  }
}
export default App;

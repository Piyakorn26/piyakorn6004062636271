import React, { Component } from 'react';
//import 'bulma/css/bulma.css';
class Navbar extends Component {
  render() {
    const setTitle=this.props.setTitle;
    return (
          <nav className="navbar is-fixed-top is-danger">
              <div className="navbar-brand">
                  <a className="navbar-item" href="#undefined" onClick={()=>setTitle("WELCOME")}>
                      <strong>Home</strong>
                  </a>
              </div>
              <div className="navbar-menu">
                  <div className="navbar-end">
                      <div className="navbar-item has-dropdown is-hoverable">
                          <a  className="navbar-link has-text-black" href="#undefined"><strong>Root of Equations</strong></a>
                          <div className="navbar-dropdown">
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Bisection")}><strong>Bisection Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("False Position")}><strong>False Position Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("One-Point Iteration")}><strong>One-Point Iteration Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Newton-Raphson")}><strong>Newton-Raphson Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Secant")}><strong>Secant Method</strong></a>
                              <hr className="navbar-divider"/>
                          </div>
                      </div>
                      <div className="navbar-item has-dropdown is-hoverable">
                          <a  className="navbar-link has-text-black" href="#undefined"><strong>Linear Algebraic</strong></a>
                          <div className="navbar-dropdown">
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Cramer's Rule")}><strong>Cramer's Rule</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Gauss Elimination")}><strong>Gauss Elimination Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Gauss-Jordan")}><strong>Gauss-Jordan Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Matrix Inversion")}><strong>Matrix Inversion Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("LU Decomposition")}><strong>LU Decomposition Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Jacobi Iteration")}><strong>Jacobi Iteration Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Gauss-Seidel Iteration")}><strong>Gauss-Seidel Iteration Method</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Conjugate Gradient")}><strong>Conjugate Gradient Method</strong></a>
                              <hr className="navbar-divider"/>
                          </div>
                      </div>
                      <div className="navbar-item has-dropdown is-hoverable">
                          <a  className="navbar-link has-text-black" href="#undefined"><strong>Interpolation and Extrapolation</strong></a>
                          <div className="navbar-dropdown">
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Newton's Divided-Differences")}><strong>Newton's Divided-Differences</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Lagrange Polynomials")}><strong>Lagrange Polynomials</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Spline Interpolation")}><strong>Spline Interpolation</strong></a>
                              <hr className="navbar-divider"/>
                          </div>
                      </div>
                      <div className="navbar-item has-dropdown is-hoverable">
                          <a  className="navbar-link has-text-black" href="#undefined"><strong>Regression</strong></a>
                          <div className="navbar-dropdown">
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Polynomial Regression")}><strong>Polynomial Regression</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Multiple Linear Regression")}><strong>Multiple Linear Regression</strong></a>
                              <hr className="navbar-divider"/>
                          </div>
                      </div>
                      <div className="navbar-item has-dropdown is-hoverable">
                          <a  className="navbar-link has-text-black" href="#undefined"><strong>Integration Techniques</strong></a>
                          <div className="navbar-dropdown">
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Trapezoidal's Rule")}><strong>Trapezoidal's Rule</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("CompositeTrapezoidal's Rule")}><strong>CompositeTrapezoidal's Rule</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Simpson's Rule")}><strong>Simpson's Rule</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("CompositeSimpson's Rule")}><strong>CompositeSimpson's Rule</strong></a>
                              <hr className="navbar-divider"/>
                          </div>
                      </div>
                      <div className="navbar-item has-dropdown is-hoverable">
                          <a  className="navbar-link has-text-black" href="#undefined"><strong>Numerical Differentiation</strong></a>
                          <div className="navbar-dropdown">
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Forward Divided-Differences(h)")}><strong>Forward Divided-Differences(h)</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Forward Divided-Differences(h^2)")}><strong>Forward Divided-Differences(h^2)</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Backward Divided-Differences(h)")}><strong>Backward Divided-Differences(h)</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Backward Divided-Differences(h^2)")}><strong>Backward Divided-Differences(h^2)</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Central Divided-Differences(h)")}><strong>Central Divided-Differences(h)</strong></a>
                              <hr className="navbar-divider"/>
                              <a className="navbar-item" href="#undefined" onClick={()=>setTitle("Central Divided-Differences(h^2)")}><strong>Central Divided-Differences(h^2)</strong></a>
                              <hr className="navbar-divider"/>
                          </div>
                      </div>

                  </div>
              </div>
          </nav>
    );
  }
}
export default Navbar;

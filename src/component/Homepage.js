import React, { Component } from 'react';
import 'bulma/css/bulma.css';
class Homepage extends Component {

  render() {
    return (
      <div className="Homepage">
          <div className="body has-text-centered">
              <br/><br/>
              <div className="black-cover">
              <br/>
              {this.props.title}
              </div>
          </div>
      </div>
    );
  }
}
export default Homepage;


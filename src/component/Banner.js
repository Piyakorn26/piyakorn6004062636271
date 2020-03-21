import React, { Component } from 'react';
//import 'bulma/css/bulma.css';
import '../css/Banner.css'
class Banner extends Component {

  render() {
    return (
      <div className="body is-custom">
                  <br/>
                  <center><strong className="Title">{this.props.title}</strong></center>
      </div>
    );
  }
}
export default Banner;

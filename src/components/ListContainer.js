import React, { Component } from 'react';

import MembersPage from '../pages/MembersPage';

class ListContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: <MembersPage catalog={this.props.catalog} setContent={this.setContent}/>,
    };
  }

  setContent = (page) => {
    this.setState({
      content: page
    });
  };

  render() {
    return (
      <div className='row'>
        <div className='col'>
          {<MembersPage catalog={this.props.catalog} setContent={this.setContent}/>}
        </div>
      </div>
    );
  }
}

export default ListContainerComponent;

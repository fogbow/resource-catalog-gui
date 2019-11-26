import React, { Component } from 'react';

import ServicesListComponent from './ServicesList';

import '../styles/main.css'

class MembersListComponent extends Component {
  renderMembersList = () => {
    return Object.keys(this.props.catalog).map((member) => {
      return (
        <div className="row">
          <div className="col">
            <div className="btn-group members-list" role="group">
              <button type="button" className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown" aria-haspopup="false" aria-expanded="true"
                      id="membersDropdown">
                {member}
              </button>
              <ServicesListComponent services={this.props.catalog[member]}/>
            </div>
          </div>
        </div>
      )
    });
  };

  render() {
    return (
      <div>
        {this.renderMembersList()}
      </div>
    );
  }
}

export default MembersListComponent;

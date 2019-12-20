import React, { Component } from 'react';

import ServicesListComponent from './ServicesList';

import '../styles/main.css'

class MembersListComponent extends Component {
  renderMembersList = () => {
    return Object.keys(this.props.catalog).map((member) => {
      let memberServices = this.props.catalog[member];
      let isLocal = memberServices.length > 0 && memberServices[0]['location'].startsWith('http://');

      return (
        <div className="row" key={member}>
          <div className="col">
            <div className="btn-group members-list" role="group">
              <button type="button" className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      id="membersDropdown">
                {member.concat(isLocal ? ' (local)' : '')}
              </button>
              <ServicesListComponent services={memberServices}/>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <p>Select a federation member below to check its services catalog:</p>
        {this.renderMembersList()}
      </div>
    );
  }
}

export default MembersListComponent;

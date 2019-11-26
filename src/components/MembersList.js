import React, { Component } from 'react';

import ServicesListComponent from './ServicesList';

import '../styles/main.css'

class MembersListComponent extends Component {
  renderMembersList = () => {
    return Object.keys(this.props.catalog).map((member) => {
      let memberServices = this.props.catalog[member];
      let isLocal = memberServices.length === 1 && memberServices[0]['serviceType'] === 'local';

      return (
        <div className="row" key={member}>
          <div className="col">
            <div className="btn-group members-list" role="group">
              <button type="button" className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown" aria-haspopup="false" aria-expanded="true"
                      id="membersDropdown">
                {member.concat(isLocal ? ' (local)' : '')}
              </button>
              <ServicesListComponent services={memberServices}/>
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

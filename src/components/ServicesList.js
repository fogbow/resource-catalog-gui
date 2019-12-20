import React, { Component } from 'react';

import { env } from '../defaults/rcs.conf';

class ServicesListComponent extends Component {
  renderServicesList = () => {
    return (
      <ul className="dropdown-menu order-dropdown" aria-labelledby="membersDropdown">
        {
          this.props.services.map((service, idx) => {
            let serviceType = service['serviceType'];
            let loc = service['location'];
            let serviceLocation = loc.startsWith('http://') ? loc : env.rcsUrl.concat(loc);

            return (
              <li className="dropdown-item" key={idx}>
                <a className="btn btn-link" href={serviceLocation} target="_blank"
                   rel="noopener noreferrer">
                    {env.services[serviceType]}
                </a>
              </li>
            );
        })}
      </ul>
    );
  };

  render() {
    return (
      <div>
        {this.renderServicesList()}
      </div>
    );
  }
}

export default ServicesListComponent;

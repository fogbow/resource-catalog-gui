import React, { Component } from 'react';

import { env } from '../defaults/rcs.conf';

const services = {
  'local': 'Local Provider Catalog',
  'ras': 'Resource Allocation Service',
  'fns': 'Federated Network Service',
  'as': 'Authentication Service',
  'ms': 'Membership Service',
  'rcs': 'Resource Catalog Service'
};

class ServicesListComponent extends Component {
  renderServicesList = () => {
    return (
      <ul className="dropdown-menu order-dropdown" aria-labelledby="membersDropdown">
        {
          this.props.services.map((service, idx) => {
            let serviceType = service['serviceType'];
            let loc = service['location'];
            let serviceLocation = serviceType === 'local' ? loc : env.rcsUrl.concat(loc);

            return (
              <li className="btn btn-link dropdown-item" key={idx}>
                <a className="btn btn-link" href={serviceLocation} target="_blank"
                   rel="noopener noreferrer">
                    {services[serviceType]}
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

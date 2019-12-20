import React, { Component } from 'react';

import ExpirationForm from '../components/ExpirationForm';
import CatalogProvider from '../providers/catalog.provider';

class ConfigMenuComponent extends Component {
  refreshCatalogs = () => {
    let provider = new CatalogProvider();

    Object.keys(this.props.catalog).map((member) => {
      return this.props.catalog[member].map(async(service) => {
        try {
          let serviceType = service['serviceType'];
          if (serviceType !== 'local') {
            await provider.deleteCache(member, serviceType);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

  render() {
    return (
      <div className='row config-menu'>
        <div className='col'>
          <div className='dropdown'>
            <button type='button' className='btn btn-default dropdown-toggle'
                    data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                <span className='glyphicon glyphicon-cog mr-sm-1' aria-hidden='true'></span>
              Options
            </button>
            <ul className='dropdown-menu order-dropdown'>
              <li className="btn btn-default dropdown-item" onClick={this.refreshCatalogs}>
                Refresh remote catalogs
              </li>
              <li className='btn btn-default dropdown-item' data-toggle='modal' data-target='#form'>
                Update remote catalogs refresh interval
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ExpirationForm/>
        </div>
      </div>
    );
  }
}

export default ConfigMenuComponent;

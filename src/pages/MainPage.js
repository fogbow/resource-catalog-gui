import React, { Component } from 'react';

import MembersListComponent from '../components/MembersList';
import ConfigMenuComponent from '../components/ConfigMenu';
import CatalogProvider from '../providers/catalog.provider';

import '../styles/main.css'

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      catalog: {}
    };
  }

  componentDidMount = () => {
    this.getMembers();
  };

  getMembers = async() => {
    let provider = new CatalogProvider();

    try {
      let response = await provider.get();
      this.initializeCatalog(response.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  initializeCatalog = (members) => {
    members.map(async(member) => {
      let provider = new CatalogProvider();

      try {
        let response = await provider.getCatalog(member);
        let memberServices = {[member]: response.data.services};

        this.setState((state, props) => {
          return {
            isLoaded: true,
            catalog: Object.assign(state.catalog, memberServices)
          };
        });
      } catch (error) {
        console.log(error);

        this.setState({
          isLoaded: true,
          error: error
        });
      }
    });
  };

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <nav className='navbar navbar-default main-nav'></nav>
          </div>
        </div>
        <div className='row main-view'>
          <div className='col'>
            <h1>Fogbow Resource Catalog Service</h1>
            <ConfigMenuComponent catalog={this.state.catalog}/>
            <MembersListComponent catalog={this.state.catalog} className="members-list"/>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

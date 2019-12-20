import React, { Component } from 'react';

import CatalogProvider from '../providers/catalog.provider';

class ExpirationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expiration: 1
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async(event) => {
    event.preventDefault();

    let provider = new CatalogProvider();
    let body = { value: this.state.expiration };

    try {
      await provider.setExpiration(body);
      this.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  resetForm = () => {
    this.setState({
      expiration: 1
    });
  };

  render() {
    return (
      <div className='modal' id='form' tabIndex='-1' role='dialog' aria-hidden='true'
           aria-labelledby='example'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Update catalog refresh interval</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'
                      onClick={this.resetForm}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>

            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <label htmlFor='expiration'>Interval (minutes)</label>
                  <input value={this.state.expiration} onChange={this.handleChange}
                         className='form-control' type='number' min='1' name='expiration' required/>
                </div>
              </form>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'
                      onClick={this.resetForm}>
                Close
              </button>
              <button type='button' className='btn btn-primary' data-dismiss='modal'
                      onClick={this.handleSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpirationForm;

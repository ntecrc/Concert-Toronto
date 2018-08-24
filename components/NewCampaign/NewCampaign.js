import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import web3 from '../../etherium/web3';
import factory from '../../etherium/factory';

import './NewCampaign.css';

export default class NewCampaign extends Component {
    state = {
        minimumContribution: '',
        description: '',
        errorMessage: '',
        loading: false
    };

    createCampaing = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
              .createCampaign(this.state.minimumContribution, this.state.description)
              .send({
                from: accounts[0]
              });
          } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        console.log('Contract Created');
        this.setState({ loading: false });
    };

    render() {
        return(
            <div className='new-contract-container'>
                <div className='secondary-container'>
                    {
                        this.state.loading ? (
                            <div>
                                <span>Your Event is Being Created</span>
                                <LinearProgress />
                                <br />
                                <LinearProgress color="secondary" />
                            </div>
                        ) : (
                            <div>
                                <div className='txt-field'>
                                    <TextField
                                        value={this.state.description}
                                        label='Description'
                                        onChange={event =>
                                            this.setState({ description: event.target.value })}
                                    />
                                </div>
                                <div className='txt-field'>
                                    <TextField
                                        label='Minimum (wei)'
                                        value={this.state.minimumContribution}
                                        type="number"
                                        onChange={event =>
                                            this.setState({ minimumContribution: event.target.value })}
                                    />
                                </div>
                            </div>
                        )
                    }
                    <div className='new-container-btn'>
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={this.createCampaing}
                            disabled={this.state.loading}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
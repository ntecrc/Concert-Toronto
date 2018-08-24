import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import queryString  from '../../lib/query-string-master';

import Campaign from '../../etherium/campaign';
import web3 from '../../etherium/web3';

class SpendingNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }
    async componentDidMount() {

    }

    makeNewRequest = async () => {
        const parsed = queryString.parse(window.location.search);
        const campaign = Campaign(parsed.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
              .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
              .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        console.log('Created new Request')
        this.setState({ loading: false });
    }

    render(){
        return(
            <div>
                <h3>Create a New Spending Request For This Event</h3>
                <Card>
                        <CardContent>
                        <div className='txt-field'>
                            <TextField
                                label='Description'
                                value={this.state.description}
                                onChange={event =>
                                    this.setState({ description: event.target.value })}
                            />
                        </div>
                        <div className='txt-field'>
                            <TextField
                                label='Recipient'
                                value={this.state.recipient}
                                // type="number"
                                onChange={event =>
                                    this.setState({ recipient: event.target.value })}
                            />
                        </div>
                        <div className='txt-field'>
                            <TextField
                                label='Amount ETH'
                                value={this.state.value}
                                type="number"
                                onChange={event =>
                                    this.setState({ value: event.target.value })}
                            />
                        </div>
                        <div className='txt-field'>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={this.makeNewRequest}
                                // disabled={this.state.loading}
                            >
                                Create
                            </Button>
                        </div>
                        </CardContent>
                </Card>
            </div>
        )
    }
}

export default withRouter(SpendingNew)
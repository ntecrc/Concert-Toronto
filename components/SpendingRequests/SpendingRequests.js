import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import queryString  from '../../lib/query-string-master';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Campaign from '../../etherium/campaign';
import web3 from '../../etherium/web3';

export default class SpendingRequests extends Component {

    state = {
        requestCount: '',
        contributersCount: '',
        requests: [],
        contribution: '',
        loading: false
    }

    async componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        const campaign = Campaign(parsed.address);

        const requestCount = await campaign.methods.getRequestsCount().call();
        const contributersCount = await campaign.methods.contributersCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
              .fill()
              .map((element, index) => {
                return campaign.methods.requests(index).call();
              })
        );

        this.setState({
            requestCount: requestCount,
            contributersCount: contributersCount,
            requests: requests
        })
    }

    onApprove = async(id) => {
        this.setState({loading: true});

        const parsed = queryString.parse(window.location.search);
        const campaign = Campaign(parsed.address);
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            });
        } catch(err) {
            console.log('onApprove Error', err);
        }
        console.log('Approved');
        this.setState({loading: false});
    }

    onFinalize = async (id) => {
        this.setState({loading: true});
        const parsed = queryString.parse(window.location.search);
        const campaign = Campaign(parsed.address);
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.finalizeRequest(id).send({
                from: accounts[0]
              });
        } catch (err) {
            console.log('--->', err);
        }
        console.log('Spend Request Finalized', )
        this.setState({loading: false});
    };

    contributeToCampaign = async() => {
        const parsed = queryString.parse(window.location.search);

        const campaign = Campaign(parsed.address);
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.contribution, 'ether')
            });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false})
    }

    render() {
        return(
            <div>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Approvals</TableCell>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Finalize</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.requests.map((n, index) => {
                                    return(
                                        <TableRow key={n.address}>
                                            <TableCell>
                                                {n.description}
                                            </TableCell>
                                            <TableCell>
                                                {n.approvalCount}
                                            </TableCell>
                                            <TableCell>
                                                {n.recipient.substring(0, 6)} ...
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained"
                                                    onClick={ () => {
                                                        this.onApprove(index)
                                                    }}
                                                >
                                                    Approve
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained"
                                                    onClick={ () => {
                                                        this.onFinalize(index)
                                                    }}
                                                >
                                                    Finalize
                                                </Button> 
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                

                <div className='txt-field'>
                        <TextField
                            label='ETH'
                            value={this.state.contribution}
                            type="number"
                            onChange={event =>
                                this.setState({ contribution: event.target.value })}
                        />
                </div>

                <Button
                        variant="contained" 
                        color="primary"
                        onClick={this.contributeToCampaign}
                        disabled={this.state.loading}
                    >
                        Contribute
                </Button>
            </div>
        )
    }
}
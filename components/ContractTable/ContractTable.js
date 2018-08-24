import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import factory from '../../etherium/factory';
import Campaign from '../../etherium/campaign';
import web3 from '../../etherium/web3';

class ContractTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            loading: true,
            errorMessage: '',
            selectedContract: ''
        }
        
    }

    async componentDidMount() {
        const contractsCount = await factory.methods.getContractsCount().call();
        
        const campaigns = await Promise.all(
            Array(parseInt(contractsCount))
              .fill()
              .map((element, index) => {
                return factory.methods.deployedCampaigns(index).call();
              })
        );

        this.setState({ contracts: campaigns });
    }

    


    render() {
        return(
            <div>
                <h3>Current Events Near You</h3>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Minimum Contribution</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.contracts.map(n => {
                                    return (
                                        <TableRow key={n.contractAddress}>
                                            <TableCell>
                                                {n.contractAddress.substring(0, 6)} ...
                                            </TableCell>
                                            <TableCell>
                                                {n.description}
                                            </TableCell>
                                            <TableCell>
                                                {n.minimum}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained" 
                                                    color="primary"
                                                    onClick={() => { 
                                                        this.props.history.push(`/details?address=${n.contractAddress}`) 
                                                    }}
                                                    >
                                                    Show Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withRouter(ContractTable);
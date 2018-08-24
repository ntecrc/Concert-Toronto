import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter  } from "react-router-dom";
import Button from '@material-ui/core/Button';

import ContractTable from './components/ContractTable/ContractTable';
import NewCampaign from './components/NewCampaign/NewCampaign';
import CampaignDetail from './components/CampaignDetail/CampaignDetail';
import SpendingNew from './components/SpendingNew/SpendingNew';
import SpendingRequests from './components/SpendingRequests/SpendingRequests';
import LandingPage from './components/LandingPage/LandingPage';

// css
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/home" component={Home} />
          <Route exact path="/new" component={NewCampaign} />
          <Route exact path="/details" component={CampaignDetail} />
          <Route exact path="/spending-new" component={SpendingNew} />
          <Route exact path="/spending-requests" component={SpendingRequests} />
          <Route exact path='/' component={LandingPage} />
        </div>
      </Router>
    );
  }
}

const RouteButton = withRouter(({ history }) => (
  <Button
    variant="contained" 
    color="primary"
    onClick={() => { history.push('/new') }}
  >
    New Event
  </Button>
))

const Home = () =>  (
  <div >
    <div className='create-new-contract'>
        <RouteButton />
    </div>
    <ContractTable />
  </div>
)

export default App;

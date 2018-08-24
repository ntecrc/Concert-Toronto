import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

// css
import './LandingPage.css'

class LandingPage extends Component {
    render() {
        return(
            <div className='main-landing-container'>
                <div className='first-card--landing'>
                    <div className='card-landing card-1'>
                        <div className='img-container--landing'>
                            <h3>Snaples</h3>
                            <p className='imside-para'>
                                Organize events, raise funds and throw epic parties with the transparency of the Block Chain Smart Contracts.
                                Powered With 
                                Ethereum Currency
                            </p>
                        </div>
                        <div className='main-button'>
                            <div className='main-button-cotainer'>
                                <Button
                                    onClick={ () => {
                                        this.props.history.push('/home');
                                    } }
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='card-playbox'>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage)
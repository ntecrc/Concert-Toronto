import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xafB4D2c8066F89DA6A432bed7f335AE38Aa89089'
);

export default instance;
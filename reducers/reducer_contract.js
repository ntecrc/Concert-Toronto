export default function(state=null, action) {
    let currentCampaign = {}

    switch(action.type){
        default:
            return currentCampaign
        
        case 'SET_CURRENT_CAMPAIGN':
            return action.payload
    }
}
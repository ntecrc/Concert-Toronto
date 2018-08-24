pragma solidity ^0.4.17;


contract CampaignFactory {
    
    struct contractObject  {
        address     contractAddress;
        string      description;
        uint        minimum;
    }
    
    contractObject[] public deployedCampaigns;
    
    

    function createCampaign(uint minimum, string description) public {
        address newCampaignAddress = new Campaign(minimum, msg.sender, description);
        contractObject memory newObject = contractObject({
            contractAddress: newCampaignAddress,
            description: description,
            minimum: minimum
        });
        deployedCampaigns.push(newObject);
    }
    
    function getContractsCount() public view returns (uint) {
        return deployedCampaigns.length;
    }
    
    
}

contract Campaign {
    
    struct Request {
        string      description;
        uint        value;
        address     recipient;
        bool        complete;
        uint        approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[]   public requests;
    address     public manager;
    uint        public minimumContribution;
    mapping(address => bool) public approvers;
    uint public contributersCount;
    string      public description;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor (uint minimum, 
                 address sender, 
                 string adescription ) public payable {
        manager = sender;
        minimumContribution = minimum;
        description = adescription;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        contributersCount++;
    }
    
    function createRequest(string adescription, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: adescription,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    // members approve requests
    function approveRequest(uint index) public payable{
        Request storage request = requests[index];
        // Person has already donated
        require(approvers[msg.sender]);
        // Person has not already voted
        require(!request.approvals[msg.sender]);
        // Now add this person's vote
        request.approvalCount++; // increment approval count
        request.approvals[msg.sender] = true;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (contributersCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address, string
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          contributersCount,
          manager, 
          description
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}
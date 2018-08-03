pragma solidity ^0.4.17;

contract Owned {
    address venueOwner;
    
    function Owned() public {
        venueOwner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == venueOwner);
        _;
    }
    
}

contract Concert is Owned {
   
    struct concertInfo {
       bytes8 artistFirstName;
       bytes8 artistLastName;
       bytes16 concertName;
       
       // TODO date/time of concert
}
   
   
   
   uint     public ticketCount;
   uint     public ageLimit;
   uint     public ticketPrice;
   address  public venueOwner;
   address  public artistAcct;
   address  public fan;
   concertInfo[] public newConcert;
   
   
   // TODO function for venueOwner to set date/time, artist, ticketPrice, ticketCount, ageLimit
   function setConcert (bytes8 _artistFirstName, bytes8 _artistLastName, bytes16 _concertName) public onlyOwner {
    //   ticketCount = _ticketcount;
    //   ageLimit = _ageLimit;
       concertInfo memory newConInfo = concertInfo({
           
           artistFirstName: _artistFirstName,
           artistLastName: _artistLastName,
           concertName: _concertName
       
       }); 
       newConcert.push(newConInfo);
   }
   // TODO function for Artist to get paid
   
   // TODO function for venueOwner to get paid
   
   // TODO function for fan to buy ticket 
 
}

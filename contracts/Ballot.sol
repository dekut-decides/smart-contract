// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Ballot  {
   
  struct Candidate {
   string name;
   uint voteCount;                            
  }

  struct Voter {
   bool authorized; 
   bool voted;
   uint vote;
  }

  address public owner;
  string public electionName;                   
  mapping(address => Voter) public voters;
  Candidate[] public candidates;                
  uint public totalVotes;                        
  uint public auctionEnd;
  enum State { Created,Registration, Voting, Ended}
  State public state;

     modifier inState(State _state) {
       require(state == _state);
        _;
    }

  event ElectionResult(string name, uint voteCount);  

  constructor(string memory _name, uint durationMinutes) {
     owner = msg.sender;
     electionName = _name; 
     auctionEnd = block.timestamp + (durationMinutes * 1 minutes);

   state = State.Created;

  }

  modifier ownerOnly() {
     require(msg.sender == owner);
     _;
  }
  
   function getAllCandidates() public view returns (Candidate[] memory) {
    return candidates;
    }

  function addCandidate(string memory _name) public ownerOnly inState(State.Created)  {
     candidates.push(Candidate(_name, 0));
  }

  function getState() public view returns(uint) {
     return uint(state); 
  }

   function getAuctionEnd() public view returns(uint) {
     return uint(auctionEnd); 
  }
    function getElectionName() public view returns(string memory) {
     return electionName; 
  }

    function startRegistration() public inState(State.Created) ownerOnly{
        state = State.Registration;
    }
  
  function authorize(address _person) public ownerOnly inState(State.Registration)  {
     voters[_person].authorized = true;
  }
  
    function startVote() public  inState(State.Registration) ownerOnly {
        state = State.Voting;
    }

  function vote(uint _voteIndex) public inState(State.Voting) {
     require(!voters[msg.sender].voted);
     require(voters[msg.sender].authorized);

     voters[msg.sender].vote = _voteIndex;
     voters[msg.sender].voted = true;


     candidates[_voteIndex].voteCount += 1;
     totalVotes +=1;
  }

   function endElection() public inState(State.Voting) ownerOnly {
        state = State.Ended;
      // if (block.timestamp = (auctionEnd)*10){
      //    terminateContract();
      // }
    }

   function terminateContract() public payable inState(State.Ended) ownerOnly {
      require(block.timestamp >= auctionEnd);
      for(uint i=0; i <candidates.length; i++){
          emit ElectionResult(candidates[i].name,candidates[i].voteCount);
        }
       selfdestruct(payable(owner)); 
   }

}
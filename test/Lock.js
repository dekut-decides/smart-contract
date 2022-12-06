const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");                                                               //const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
describe("Ballot", function () {
  // define a fixture to reuse the same setup in every test. use loadFixture to run this setup once, snapshot that state, and reset Hardhat Network to that snapshot in every test.
  async function deployTestElectionFixture() {
    const electionDuration = 40;
    const electionEnd = (await time.latest()) + electionDuration;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy("Test",electionDuration);
    return { ballot, electionDuration,owner, otherAccount ,electionEnd};
  }
  describe("Deployment", function () {
    it("Should set the right election duration", async function () {
      const { ballot,electionDuration} = await loadFixture(deployTestElectionFixture);
      expect(Math.trunc(await ballot.getAuctionEnd()/100000)).to.equal(Math.trunc(((await time.latest()) + electionDuration)/100000));
    });

    it("Should set the right owner", async function () {
      const { ballot, owner } = await loadFixture(deployTestElectionFixture);
      expect(await ballot.owner()).to.equal(owner.address);
    });
  });
});






























































  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { ballot, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployTestElectionFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(ballot.withdraw()).to.changeEtherBalances(
  //         [owner, ballot],
  //         [lockedAmount, -lockedAmount]
  //       );
  //      });
  //  });


// describe("Validations", function () {
//       it("Shouldn't fail if the election duration has ended and the owner calls it", async function () {
//         const { ballot, electionEnd } = await loadFixture(
//           deployTestElectionFixture
//         );
//         // Transactions are sent using the first signer by default
//         //await time.increaseTo(electionEnd);
//         await expect(ballot.terminateContract()).not.to.be.reverted;
//       });
//     });


  //      describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { ballot, unlockTime, lockedAmount } = await loadFixture(
  //         deployTestElectionFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(ballot.withdraw())
  //         .to.emit(ballot, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });


  //         it("Should revert with the right error if called from another account", async function () {
  //       const { ballot, unlockTime, otherAccount } = await loadFixture(
  //         deployTestElectionFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);
  //       // We use ballot.connect() to send a transaction from another account
  //       await expect(ballot.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });
      


  //          it("Should receive and store the funds to ballot", async function () {
  //     const { ballot, lockedAmount } = await loadFixture(
  //       deployTestElectionFixture
  //     );

  //     expect(await ethers.provider.getBalance(ballot.address)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });


   

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { ballot } = await loadFixture(deployTestElectionFixture);

  //       await expect(ballot.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });
  //    });
  //    });
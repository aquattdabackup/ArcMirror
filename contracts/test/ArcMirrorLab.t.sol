// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;
import {ArcMirrorLab, ArcMirrorForwarder} from "../src/ArcMirrorLab.sol";
interface Vm {function deal(address,uint256) external;function etch(address,bytes calldata) external;function expectRevert(bytes4) external;function prank(address) external;}
contract MockUSDC {
 mapping(address=>uint256) public balanceOf;
 mapping(address=>mapping(address=>uint256)) public allowance;
 function mint(address who,uint256 value) external {balanceOf[who]+=value;}
 function approve(address spender,uint256 value) external returns(bool){allowance[msg.sender][spender]=value;return true;}
 function transferFrom(address from,address to,uint256 value) external returns(bool){require(allowance[from][msg.sender]>=value,"allowance");require(balanceOf[from]>=value,"balance");allowance[from][msg.sender]-=value;balanceOf[from]-=value;balanceOf[to]+=value;return true;}
}
contract Reenter {
 ArcMirrorLab public target;bool public rejected;
 function set(ArcMirrorLab t) external {target=t;}
 receive() external payable {(bool ok,)=address(target).call{value:1}(abi.encodeCall(ArcMirrorLab.dust,()));rejected=!ok;}
}
contract Reject {receive() external payable {revert();}}
contract LabTest {
 Vm constant vm=Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
 address payable constant A=payable(address(0xB0B));address payable constant B=payable(address(0xCA401));
 ArcMirrorLab lab;MockUSDC token;
 function setUp() public {lab=new ArcMirrorLab(A,B);MockUSDC impl=new MockUSDC();vm.etch(address(lab.USDC()),address(impl).code);token=MockUSDC(address(lab.USDC()));vm.deal(address(this),1 ether);}
 function assertEmpty() internal view {require(address(lab).balance==0,"Lab retained native");require(address(lab.forwarder()).balance==0,"Forwarder retained native");require(token.balanceOf(address(lab))==0,"Lab retained token");}
 function testNativeMultiHop() public {lab.nativeForward{value:0.001 ether}();require(A.balance==0.001 ether);assertEmpty();}
 function testTwoIdenticalAndRepeated() public {token.mint(address(this),400);for(uint i;i<2;i++){token.approve(address(lab),200);lab.twoIdenticalTransfers(100);require(token.allowance(address(this),address(lab))==0);assertEmpty();}require(token.balanceOf(A)==400);}
 function testDust() public {lab.dust{value:1}();require(A.balance==1);assertEmpty();}
 function testBatch() public {lab.batch{value:3}(1,2);require(A.balance==1&&B.balance==2);assertEmpty();}
 function testZeroAmountsRejected() public {vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.nativeForward();vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.dust();vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.twoIdenticalTransfers(0);vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.batch{value:1}(0,1);}
 function testCapsRejected() public {vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.nativeForward{value:0.01 ether+1}();vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.twoIdenticalTransfers(5001);vm.expectRevert(ArcMirrorLab.InvalidAmount.selector);lab.dust{value:1e12}();}
 function testMissingAllowance() public {token.mint(address(this),200);vm.expectRevert(ArcMirrorLab.ExactAllowanceRequired.selector);lab.twoIdenticalTransfers(100);}
 function testUnlimitedAllowanceRejected() public {token.approve(address(lab),type(uint256).max);vm.expectRevert(ArcMirrorLab.ExactAllowanceRequired.selector);lab.twoIdenticalTransfers(1);}
 function testInsufficientUSDCAtomicity() public {token.mint(address(this),150);token.approve(address(lab),200);(bool ok,)=address(lab).call(abi.encodeCall(ArcMirrorLab.twoIdenticalTransfers,(100)));require(!ok);require(token.balanceOf(A)==0);require(token.balanceOf(address(this))==150);require(token.allowance(address(this),address(lab))==200);assertEmpty();}
 function testIntentionalFailure() public {vm.expectRevert(ArcMirrorLab.IntentionalFailure.selector);lab.intentionalFailure();assertEmpty();}
 function testSweepFixedDestination() public {vm.deal(address(lab),100);vm.prank(B);lab.sweep();require(A.balance==100);assertEmpty();}
 function testCannotCallForwarder() public {ArcMirrorForwarder f=lab.forwarder();vm.expectRevert(ArcMirrorForwarder.OnlyLab.selector);f.forward{value:1}();}
 function testReentrancyRejected() public {Reenter receiver=new Reenter();lab=new ArcMirrorLab(payable(address(receiver)),B);receiver.set(lab);lab.dust{value:10}();require(receiver.rejected());assertEmpty();}
 function testRejectedRecipientRollsBack() public {Reject receiver=new Reject();ArcMirrorLab other=new ArcMirrorLab(A,payable(address(receiver)));(bool ok,)=address(other).call{value:3}(abi.encodeCall(ArcMirrorLab.batch,(1,2)));require(!ok&&A.balance==0&&address(other).balance==0);}
 function testInvalidRecipient() public {vm.expectRevert(ArcMirrorLab.InvalidRecipient.selector);new ArcMirrorLab(payable(address(0)),B);vm.expectRevert(ArcMirrorLab.InvalidRecipient.selector);new ArcMirrorLab(A,A);}
 function testFuzzBatchConserves(uint128 seed) public {uint256 amount=uint256(seed)%lab.MAX_NATIVE();if(amount<2)amount=2;lab.batch{value:amount}(1,amount-1);require(A.balance+B.balance==amount);assertEmpty();}
}

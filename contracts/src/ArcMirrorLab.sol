// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

interface IArcUSDC {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

/// @notice A bounded experiment contract. Recipient addresses cannot be changed.
/// @dev Mainnet deployment and Arc-specific runtime validation are still pending.
contract ArcMirrorForwarder {
    address payable public immutable recipient;
    address public immutable lab;
    error OnlyLab();
    error ForwardFailed();
    constructor(address payable recipient_) { recipient = recipient_; lab = msg.sender; }
    function forward() external payable {
        if (msg.sender != lab) revert OnlyLab();
        (bool ok,) = recipient.call{value: address(this).balance}("");
        if (!ok || address(this).balance != 0) revert ForwardFailed();
    }
    function sweep() external {
        (bool ok,) = recipient.call{value: address(this).balance}("");
        if (!ok) revert ForwardFailed();
    }
}

contract ArcMirrorLab {
    IArcUSDC public constant USDC = IArcUSDC(0x3600000000000000000000000000000000000000);
    uint256 public constant MAX_NATIVE = 0.01 ether; // 0.01 USDC at 18 decimals on Arc.
    uint256 public constant MAX_ERC20 = 10_000; // 0.01 USDC at 6 decimals.
    address payable public immutable recipientA;
    address payable public immutable recipientB;
    ArcMirrorForwarder public immutable forwarder;
    uint256 private entered = 1;
    error InvalidRecipient();
    error InvalidAmount();
    error ReentrantCall();
    error TransferFailed();
    error ResidualBalance();
    error ExactAllowanceRequired();
    error IntentionalFailure();
    event Scenario(uint8 indexed scenarioId, uint256 amountRaw, uint8 decimals);

    constructor(address payable a, address payable b) {
        if (a == address(0) || b == address(0) || a == b || a == address(this) || b == address(this)) revert InvalidRecipient();
        recipientA = a; recipientB = b;
        forwarder = new ArcMirrorForwarder(a);
    }
    modifier guarded() {
        if (entered != 1) revert ReentrantCall();
        entered = 2;
        _;
        if (address(this).balance != 0) revert ResidualBalance();
        entered = 1;
    }
    function nativeForward() external payable guarded {
        _nativeAmount(msg.value);
        forwarder.forward{value: msg.value}();
        emit Scenario(1, msg.value, 18);
    }
    function twoIdenticalTransfers(uint256 amount6) external guarded {
        if (amount6 == 0 || amount6 > MAX_ERC20 / 2) revert InvalidAmount();
        uint256 total = amount6 * 2;
        if (USDC.allowance(msg.sender, address(this)) != total) revert ExactAllowanceRequired();
        if (!USDC.transferFrom(msg.sender, recipientA, amount6)) revert TransferFailed();
        if (!USDC.transferFrom(msg.sender, recipientA, amount6)) revert TransferFailed();
        emit Scenario(2, total, 6);
    }
    function dust() external payable guarded {
        if (msg.value == 0 || msg.value >= 1e12) revert InvalidAmount();
        _send(recipientA, msg.value);
        emit Scenario(3, msg.value, 18);
    }
    function batch(uint256 amountA, uint256 amountB) external payable guarded {
        _nativeAmount(msg.value);
        if (amountA == 0 || amountB == 0 || amountA > msg.value || amountB != msg.value - amountA) revert InvalidAmount();
        _send(recipientA, amountA); _send(recipientB, amountB);
        emit Scenario(4, msg.value, 18);
    }
    /// @notice Explicit revert, independent of assumptions about Arc zero-address sends.
    function intentionalFailure() external pure { revert IntentionalFailure(); }
    /// @notice Only recovers forced native funds to the fixed recipient; no owner/admin role.
    function sweep() external guarded { _send(recipientA, address(this).balance); }
    function _nativeAmount(uint256 value) private pure { if (value == 0 || value > MAX_NATIVE) revert InvalidAmount(); }
    function _send(address payable recipient, uint256 value) private { (bool ok,) = recipient.call{value: value}(""); if (!ok) revert TransferFailed(); }
}

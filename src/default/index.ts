import { Transfer as TransferEvent } from "../../generated/puffETH/ERC20";
import { ADDRESS_ZERO, ADDRESS_ZKNOVA_PUFFERETH ,PUFFERETH} from "../utils/constants";
import {
  loadOrCreatePoint,
  toLowerCase,
  loadOrCreateTotalPoint,
} from "../utils/point";
import { Transfer } from "../../generated/schema";

/**
 * 
 return (
      BigInt(weightBalance) * BigInt(timestamp) -
      (BigInt(timeWeightAmountIn) - BigInt(timeWeightAmountOut))
    );
    => Sum{(Time_current - Time_n) * Amount_n}
 * @param event 
 */
export function handleTransfer(event: TransferEvent): void {

  const stakeToken = toLowerCase(event.address);
  const transferShares = event.params.value;
  const from = toLowerCase(event.params.from);
  const to = toLowerCase(event.params.to);
  const timestamp = event.block.timestamp;

  const increase = timestamp.times(transferShares);
  // from: Bytes! # address
  // to: Bytes! # address
  // value: BigInt! # uint256
  // blockNumber: BigInt! 
  // blockTimestamp: BigInt!
  // transactionHash: Bytes!


  if (to.equals(ADDRESS_ZKNOVA_PUFFERETH) && stakeToken.equals(PUFFERETH)) {
    // mint or receive token from others
    const point = loadOrCreatePoint(stakeToken);
    point.timeWeightAmountIn = point.timeWeightAmountIn.plus(increase);
    point.balance = point.balance.plus(transferShares);
    point.weightBalance = point.balance;
    point.save();
  } 
}

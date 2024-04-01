import { Transfer as TransferEvent } from "../../generated/puffETH/ERC20";
import { ADDRESS_ZERO, ADDRESS_ZKNOVA_PUFFERETH } from "../utils/constants";
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
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  const stakeToken = toLowerCase(event.address);
  const tokenAddress = stakeToken.toHexString();
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
  entity.from = from;
  entity.to = to;
  entity.value = transferShares;
  entity.blockTimestamp = event.block.timestamp;
  const totalPoint = loadOrCreateTotalPoint();

  if (to.notEqual(ADDRESS_ZERO) && to.equals(ADDRESS_ZKNOVA_PUFFERETH)) {
    // mint or receive token from others
    const point = loadOrCreatePoint(to);
    point.timeWeightAmountIn = point.timeWeightAmountIn.plus(increase);
    point.balance = point.balance.plus(transferShares);
    point.weightBalance = point.balance;
    
    point.save();
  } 

  totalPoint.save();
  entity.save();
}

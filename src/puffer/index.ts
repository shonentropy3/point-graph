import { handleTransfer as defaultHandleTransfer } from "../default/index";
import { Transfer as TransferEvent } from "../../generated/puffETH/ERC20";

export function handleTransfer(event: TransferEvent): void {
  return defaultHandleTransfer(event);
}

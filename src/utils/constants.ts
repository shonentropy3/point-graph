import { Address, BigInt, Bytes, log, store } from "@graphprotocol/graph-ts";

export const ETHER_ONE = BigInt.fromString("1000000000000000000");
export const DENOMINATOR_number = 10000;
export const DENOMINATOR = BigInt.fromI32(DENOMINATOR_number);

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);
export const BIGINT_TWO = BigInt.fromI32(2);
export const BYTES_ZERO = Bytes.fromI32(0);

export const ADDRESS_ZERO = Address.fromHexString(
  "0x0000000000000000000000000000000000000000".toLowerCase()
);
export const ADDRESS_ZERO_BYTES = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000".toLowerCase()
);
export const ADDRESS_ZKNOVA_PUFFERETH = Address.fromHexString(
  "0xAd16eDCF7DEB7e90096A259c81269d811544B6B6".toLowerCase()
);
export const PUFFERETH = Address.fromHexString(
  "0xD9A442856C234a39a81a089C06451EBAa4306a72".toLowerCase()
);
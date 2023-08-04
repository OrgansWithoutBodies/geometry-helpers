import {
  Channel,
  ExclusivePercNumber,
  HexChannelNumber,
  NonZeroNumber,
  PercNumber,
} from "type-library";
import { ArrV2 } from "type-library/dist/vectors";

function valueNonZeroGuard<TNum extends number>(
  value: TNum
): value is TNum & NonZeroNumber {
  return value !== 0;
}

// if we're already sure we're nonZero, we don't need to check again
// TODO do something for dividing by 1?
export function divideByNonZero<TNum extends number>(
  numerator: TNum,
  denominator: TNum & NonZeroNumber
): TNum {
  return (numerator / denominator) as TNum;
}

export function divideOrThrow<TNum extends number>(
  numerator: TNum,
  denominator: TNum
): TNum {
  const denominatorNonZero = valueNonZeroGuard(denominator);
  if (!denominatorNonZero) {
    throw new Error("Tried to divide by zero!");
  }
  return divideByNonZero(numerator, denominator);
}

// this is sorta a 1d affine - generic affine 'normalize'?
export function normalize<
  TOrigin extends number,
  TTarget extends number = number
>(value: TOrigin, originRange: [TOrigin, TOrigin]): PercNumber & TTarget {
  const originSize = (originRange[1] - originRange[0]) as TOrigin;

  const valueDiffFromOrigin = value - originRange[0];

  const percFromOrigin = divideOrThrow(
    valueDiffFromOrigin,
    originSize
  ) as PercNumber & TTarget;

  return percFromOrigin;
}

// map from [0,1] to whatever other range
export function deNormalize<TTarget extends number = number>(
  value: PercNumber,
  targetRange: [TTarget, TTarget]
): TTarget {
  const targetSize = targetRange[1] - targetRange[0];
  return (targetRange[0] + value * targetSize) as TTarget;
}

export const normalizeHexChannelNumber = (value: HexChannelNumber<Channel>) =>
  normalize(value, [0, 255] as ArrV2<HexChannelNumber<Channel>>);

export const deNormalizeToHexChannelNumber = (value: PercNumber) =>
  deNormalize(value, [0, 255] as ArrV2<HexChannelNumber<Channel>>);

export function linearTransform<
  TOrigin extends number,
  TTarget extends number = number
>(
  value: TOrigin,
  originRange: ArrV2<TOrigin>,
  targetRange: ArrV2<TTarget>
): TTarget {
  return deNormalize(normalize(value, originRange), targetRange);
}
// either === 1 => return typeof other, either === 0 => return 0
// if neither are 0 or 1, then we can never reach 0 or 1
// could also do some more type magic outside this square
// 4 different 'zones' - 1<x, 0<x<1, -1<x<0, x<-1 - this is symmetric around 0
type MultiplyPercs<
  TFirstPerc extends PercNumber,
  TSecondPerc extends PercNumber
> = TFirstPerc extends 0
  ? // 0 takes priority over 1
    0
  : TSecondPerc extends 0
  ? 0
  : TFirstPerc extends 1
  ? TSecondPerc
  : TSecondPerc extends 1
  ? TFirstPerc
  : // Neither is 0 or 1, so our number is no longer either of the endpoints
    ExclusivePercNumber;

// one number between 0 & 1 * another number between 0 * 1 will always be between 0 * 1
// so once we're in terms of [0,1] we can safely apply any other [0,1] transform & still be sure we're in [0,1]
export function multiplyPercs<
  TFirstPerc extends PercNumber,
  TSecondPerc extends PercNumber
>(
  firstPerc: TFirstPerc,
  secondPerc: TSecondPerc
): MultiplyPercs<TFirstPerc, TSecondPerc> {
  return (firstPerc * secondPerc) as MultiplyPercs<TFirstPerc, TSecondPerc>;
}

// TODO CheckDiffZero? so we can invert type & safely apply divisions

import {
  Channel,
  HexChannel,
  HexChannelNumber,
  HexString,
  PercNumber,
} from "type-library";
import { deNormalize } from "../utils/normalize";

// export type HexChannel = `${HexDigit}${HexDigit}`;
type Interpolator<TInterpolating> = (
  zero: TInterpolating,
  one: TInterpolating,
  value: PercNumber
) => TInterpolating;

type ColorInterpolator = Interpolator<HexString>;

// export interface IGradientStep<
//   TZero extends HexString,
//   TOne extends HexString,
//   TInterpolator extends ColorInterpolator
// > {
//   getPointAt(
//     perc: PercNumber
//     // TODO this can probably be brought into the ColorInterpolator type
//   ): PercNumber extends 0 ? TZero : PercNumber extends 1 ? TOne : HexString;

//   changeEndpointColor<TNewZero extends HexString,TNewOne extends HexString>(newZero:TNewZero,newOne:TNewOne)=>IGradientStep<TNewZero,TNewOne,TInterpolator>;
//   changeInterpolator<TNewInterpreter extends ColorInterpolator>(
//     newInterpolator: TNewInterpreter
//   ): IGradientStep<TZero, TOne, TNewInterpreter>;
// }
//

// map from hex string to 3ple in range0255integers -

const hexChannelNumberToHexChannelString = (
  channelNumber: HexChannelNumber<Channel>
): HexChannel => channelNumber.toString(16).padStart(2, "0") as HexChannel;

const hexChannelStringToHexChannelNumber = (
  channel: HexChannel
): HexChannelNumber<Channel> => {
  return Number.parseInt(channel, 16) as HexChannelNumber<Channel>;
};

const interpolateChannel: Interpolator<HexChannel> = (
  channelZero,
  channelOne,
  interpolatedValue
) => {
  const zeroNumber = hexChannelStringToHexChannelNumber(channelZero);
  const oneNumber = hexChannelStringToHexChannelNumber(channelOne);

  const interpolatedHexChannelNumber = Math.round(
    deNormalize(interpolatedValue, [zeroNumber, oneNumber])
  ) as HexChannelNumber<Channel>;
  const interpolatedHexChannelString = hexChannelNumberToHexChannelString(
    interpolatedHexChannelNumber
  );

  return interpolatedHexChannelString;
};

const hexStringToChannels = (
  str: HexString
): [HexChannel, HexChannel, HexChannel] => {
  const channelRed = str.slice(0, 2) as HexChannel;
  const channelGreen = str.slice(2, 4) as HexChannel;
  const channelBlue = str.slice(4, 6) as HexChannel;
  return [channelRed, channelGreen, channelBlue];
};
const channelTripletToHexString = ([r, g, b]: [
  HexChannel,
  HexChannel,
  HexChannel
]): HexString => {
  return `#${r + g + b}`;
};

export const naiveColorInterpolator: ColorInterpolator = (zero, one, val) => {
  const [zeroR, zeroG, zeroB] = hexStringToChannels(zero);
  const [oneR, oneG, oneB] = hexStringToChannels(one);

  const intR = interpolateChannel(zeroR, oneR, val);
  const intG = interpolateChannel(zeroG, oneG, val);
  const intB = interpolateChannel(zeroB, oneB, val);

  return channelTripletToHexString([intR, intG, intB]);
};

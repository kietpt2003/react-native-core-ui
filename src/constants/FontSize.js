import { RFValue } from '@utils';
import { scale } from 'd4dpocket';

const STANDARD_SCREEN_HEIGHT = 720;

const tiny = RFValue(8, STANDARD_SCREEN_HEIGHT);

const fontSize9 = RFValue(9, STANDARD_SCREEN_HEIGHT);

const smallest = RFValue(10, STANDARD_SCREEN_HEIGHT);

const fontSize11 = RFValue(11, STANDARD_SCREEN_HEIGHT);

const fontSize12 = RFValue(12, STANDARD_SCREEN_HEIGHT);

const small = RFValue(12, STANDARD_SCREEN_HEIGHT);

const smaller = RFValue(13, STANDARD_SCREEN_HEIGHT);

const fontSize14 = RFValue(14, STANDARD_SCREEN_HEIGHT);

const normal = RFValue(15, STANDARD_SCREEN_HEIGHT);

const fontSize16 = RFValue(16, STANDARD_SCREEN_HEIGHT);

const large = RFValue(17, STANDARD_SCREEN_HEIGHT);

const larger = RFValue(18, STANDARD_SCREEN_HEIGHT);

const fontSize18 = RFValue(18, STANDARD_SCREEN_HEIGHT);

const fontSize19 = RFValue(19, STANDARD_SCREEN_HEIGHT);

const fontSize20 = RFValue(20, STANDARD_SCREEN_HEIGHT);

const fontSize26 = RFValue(26, STANDARD_SCREEN_HEIGHT);

const huge = RFValue(21, STANDARD_SCREEN_HEIGHT);

const huger = RFValue(22, STANDARD_SCREEN_HEIGHT);

const bigger = RFValue(24, STANDARD_SCREEN_HEIGHT);

const fontSize24 = RFValue(24, STANDARD_SCREEN_HEIGHT);

const biggest = RFValue(30, STANDARD_SCREEN_HEIGHT);

const biggest2 = RFValue(29, STANDARD_SCREEN_HEIGHT);

const biggest3 = RFValue(35, STANDARD_SCREEN_HEIGHT);

const biggest40 = RFValue(40, STANDARD_SCREEN_HEIGHT);

const biggest4 = RFValue(45, STANDARD_SCREEN_HEIGHT);

const biggest5 = RFValue(60, STANDARD_SCREEN_HEIGHT);

const biggest6 = RFValue(64, STANDARD_SCREEN_HEIGHT);

const HIT_SLOP = {
  top: scale(25),
  bottom: scale(25),
  left: scale(25),
  right: scale(25),
};

export default {
  tiny,
  fontSize9,
  smallest,
  fontSize11,
  fontSize12,
  small,
  smaller,
  fontSize14,
  normal,
  fontSize16,
  large,
  larger,
  fontSize18,
  fontSize19,
  fontSize20,
  fontSize26,
  huge,
  huger,
  bigger,
  fontSize24,
  biggest,
  biggest2,
  biggest3,
  biggest40,
  biggest4,
  biggest5,
  biggest6,
  HIT_SLOP,
};
import React from 'react'
import { View } from 'react-native'
import { WEB } from '@estuary/rn-core-ui/utils'
import { colors } from '@estuary/rn-core-ui/themes'
import { Text } from '@estuary/rn-core-ui';

import {
  androidDepth,
  interpolate,
  parseShadow,
} from '../../../src/utils'
import AndroidShadow from './AndroidShadow';
import { shadowStyles } from './styles/shadowStyles';
import IOSShadow from './IOSShadow';
import WebShadow from './WebShadow';
import CustomSlider from './CustomSlider';
import { Dropdown } from '../Dropdowns/Dropdown';

const DISTANCE = 10;
const MIN_PERCENT_X = 70;
const MIN_PERCENT_Y = 50;
const MAX_PERCENT_Y = 98;

function similarityPercent(
  num1: number,
  num2: number,
): number {
  if (DISTANCE <= 0) return 0

  const diff = Math.abs(num1 - num2)

  if (diff >= DISTANCE) return 0

  return Math.round((1 - diff / DISTANCE) * 100)
}

function percentToAlpha(
  percent: number,
  minAlpha = 0.2
): number {
  const p = Math.max(0, Math.min(100, percent))
  return minAlpha + (p / 100) * (1 - minAlpha)
}

const ShadowScreen = () => {
  const [shadowColor, setShadowColor] = React.useState(colors.black);
  const [shadowOffSet, setShadowOffset] = React.useState({
    width: 0,
    height: 1,
  });
  const [tmpShadowOffSet, setTmpShadowOffset] = React.useState({
    width: 0,
    height: 1,
  });

  const [shadowOpacity, setShadowOpacity] = React.useState(0.18);
  const [shadowRadius, setShadowRadius] = React.useState(1.00);

  const [elevation, setElevation] = React.useState(1);
  const [tmpElevation, setTmpElevation] = React.useState(1);

  const [perfectY, setPerfectY] = React.useState(1);

  const percentX = similarityPercent(shadowOffSet.width, 0);
  const percentY = similarityPercent(shadowOffSet.height, perfectY);

  const onChangeShadow = () => {
    if (elevation >= 1) {
      const s = parseShadow(androidDepth.penumbra[elevation - 1]);
  
      const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5);
  
      const opacity = Number(
        interpolate(elevation - 1, 1, 24, 0.2, 0.6).toFixed(2)
      );
  
      const radius = Number(
        interpolate(s.blur, 1, 38, 1, 16).toFixed(2)
      );

      setPerfectY(y);

      setShadowOpacity(opacity);
      setShadowRadius(radius);
    }
  }

  const onSelectDropdown = (value: number) => {
    setElevation(value);

    const s = parseShadow(androidDepth.penumbra[value - 1]);
    const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5);
    setShadowOffset(prev => ({
      ...prev,
      width: 0,
      height: y,
    }));
  }

  const matchingPercent = React.useMemo(() => {
    if (percentX < MIN_PERCENT_X) return 0

    if (
      shadowOffSet.width === 0 &&
      shadowOffSet.height === perfectY
    ) {
      return MAX_PERCENT_Y
    }

    // Weighted average
    const weightX = 0.3
    const weightY = 0.7

    return Math.round(
      percentX * weightX + percentY * weightY
    )
  }, [percentX, percentY, shadowOffSet, perfectY])

  const matchingColor = React.useMemo(() => {
    if (matchingPercent >= MAX_PERCENT_Y) {
      return colors.green_00A720
    }

    if (matchingPercent >= MIN_PERCENT_Y) {
      return `rgba(246, 191, 50, ${percentToAlpha(matchingPercent)})`
    }

    return colors.red_E00102
  }, [matchingPercent])

  React.useEffect(() => {
    onChangeShadow();
  }, [elevation, shadowOffSet.width])

  return (
    <View style={shadowStyles.container}>
      <View style={shadowStyles.actionsContainer}>
        <CustomSlider
            minimumValue={-512}
            maximumValue={512}
            step={1}
            onValueChange={
              (v) =>
                setShadowOffset(prev => ({
                  ...prev,
                  width: v,
                }))
            }
            value={WEB ? shadowOffSet.width : tmpShadowOffSet.width}
            onSlidingComplete={
              WEB ?
                undefined :
                (v) =>
                  setTmpShadowOffset(prev => ({
                    ...prev,
                    width: v,
                  }))
            }
            content={'X: '}
            inputValue={shadowOffSet.width?.toString() || ''}
            onChangeText={
              (t) =>
                setShadowOffset(prev => ({
                  ...prev,
                  width: Number(t),
                }))
            }
          />

          <CustomSlider
            minimumValue={-512}
            maximumValue={512}
            step={1}
            onValueChange={
              (v) =>
                setShadowOffset(prev => ({
                  ...prev,
                  height: v,
                }))
            }
            value={WEB ? shadowOffSet.height : tmpShadowOffSet.height}
            onSlidingComplete={
              WEB ?
                undefined :
                (v) =>
                  setTmpShadowOffset(prev => ({
                    ...prev,
                    height: v,
                  }))
            }
            content={'Y: '}
            inputValue={shadowOffSet.height?.toString() || ''}
            onChangeText={
              (t) =>
                setShadowOffset(prev => ({
                  ...prev,
                  height: Number(t),
                }))
            }
          />

          <CustomSlider
            minimumValue={1}
            maximumValue={24}
            step={1}
            onValueChange={setElevation}
            value={WEB ? elevation : tmpElevation}
            onSlidingComplete={
              WEB ?
                undefined :
                setTmpElevation
            }
            content={'Z: '}
            inputValue={elevation?.toString() || ''}
            onChangeText={
              (t) =>
                setElevation(Number(t))
            }
          />
      </View>
      <Dropdown
        value={elevation}
        options={[
          { label: 'Perfect Sample 1', value: 1 },
          { label: 'Perfect Sample 2', value: 2 },
          { label: 'Perfect Sample 3', value: 3 },
          { label: 'Perfect Sample 4', value: 4 },
          { label: 'Perfect Sample 5', value: 5 },
          { label: 'Perfect Sample 6', value: 6 },
          { label: 'Perfect Sample 7', value: 7 },
          { label: 'Perfect Sample 8', value: 8 },
          { label: 'Perfect Sample 9', value: 9 },
          { label: 'Perfect Sample 10', value: 10 },
          { label: 'Perfect Sample 11', value: 11 },
          { label: 'Perfect Sample 12', value: 12 },
          { label: 'Perfect Sample 13', value: 13 },
          { label: 'Perfect Sample 14', value: 14 },
          { label: 'Perfect Sample 15', value: 15 },
          { label: 'Perfect Sample 16', value: 16 },
          { label: 'Perfect Sample 17', value: 17 },
          { label: 'Perfect Sample 18', value: 18 },
          { label: 'Perfect Sample 19', value: 19 },
          { label: 'Perfect Sample 20', value: 20 },
          { label: 'Perfect Sample 21', value: 21 },
          { label: 'Perfect Sample 22', value: 22 },
          { label: 'Perfect Sample 23', value: 23 },
          { label: 'Perfect Sample 24', value: 24 },
        ]}
        onChange={onSelectDropdown}
      />
      <Text color={matchingColor}>Matching Shadow: {matchingPercent}%</Text>
      <View style={shadowStyles.boxContainer}>
        <AndroidShadow elevation={elevation} />
        <IOSShadow shadowColor={shadowColor} shadowOffSet={shadowOffSet} shadowOpacity={shadowOpacity} shadowRadius={shadowRadius} />
        <WebShadow shadowOffSet={shadowOffSet} shadowOpacity={shadowOpacity} shadowRadius={shadowRadius} />
      </View>
    </View>
  )
}

export default ShadowScreen;

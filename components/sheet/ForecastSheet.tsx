import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import ForecastSheetBackground from './ForecastSheetBackground';
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import ForecastControl from './elements/ForecastControl';
import Seperator from './elements/Seperator';

const ForecastSheet = () => {
    const {width,height} = useApplicationDimensions();
    const snapPoints = ['38.5%', '83%'];
    const firstSnapPoint = height * (parseFloat(snapPoints[0])/100)
    const cornerRadius = 44;

  return (
    <BottomSheet 
    snapPoints={snapPoints}
    handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: 'rgba(0,0,0,0.3)'
    }}
    backgroundComponent={() => (
        <ForecastSheetBackground width={width} height={firstSnapPoint} cornerRadius={cornerRadius}/>
  )}
    >
      <ForecastControl/>
      <Seperator width={width} height={3}/>
    </BottomSheet>
  )
}

export default ForecastSheet

const styles = StyleSheet.create({})
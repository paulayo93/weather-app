import { StyleSheet } from "react-native";
import React from "react";
import HomeBackground from "../components/HomeBackground";
import WeatherInfo from "../components/section/WeatherInfo";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";
import { currentWeather } from "../data/currentWeather";

const Home = () => {
  return (
    <>
      <HomeBackground />
      <WeatherInfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
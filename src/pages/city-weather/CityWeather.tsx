// CityWeatherDetails.tsx

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography, Grid, Box } from "@mui/material";
import { RootState } from "../../store/store";
import { fetchWeatherByCityId } from "../../store/slices/city-weather/cityWeatherSlice";
import { Action } from "@reduxjs/toolkit";

export const CityWeather: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cityId = Number(id);
  const dispatch = useDispatch();
  const { loading, weatherData, error } = useSelector(
    (state: RootState) => state.cityWeather,
  );

  useEffect(() => {
    dispatch(fetchWeatherByCityId(cityId) as unknown as Action);
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h5">{error}</Typography>;
  }

  if (!weatherData) {
    return <Typography variant="h5">No data available</Typography>;
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Grid style={{ width: "100%", height: "100vh" }} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">{weatherData.city}</Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container>
          <Grid item xs={6}>
            <Grid marginBottom={5} item xs={12}>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
                alt="Weather Icon"
                style={{
                  width: "100px",
                  background: "gray",
                  borderRadius: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">
                Today -{" "}
                {new Date(
                  (weatherData.fiveDaysForecast[0].dateTime - 1) * 1000,
                ).toLocaleDateString()}
                °C
              </Typography>
              <Typography variant="h5">
                Temperature: {weatherData.temperature} °C
              </Typography>
              <Typography variant="h5">
                Description: {weatherData.weatherDescription}
              </Typography>
              <Typography variant="h5">
                Humidity: {weatherData.humidity}%
              </Typography>
              <Typography variant="h5">
                Wind Speed: {weatherData.windSpeed} m/s
              </Typography>
              <Typography variant="h5">
                Pressure: {weatherData.pressure} hPa
              </Typography>
              <Typography variant="h5">
                Visibility: {weatherData.visibility} meters
              </Typography>
              <Typography variant="h5">
                Sunrise: {formatTime(weatherData.sunrise)}
              </Typography>
              <Typography variant="h5">
                Sunset: {formatTime(weatherData.sunset)}
              </Typography>
            </Grid>
          </Grid>
          <Grid bgcolor={"#8f8f8f30"} paddingY={1.5} paddingX={5} item xs={6}>
            <Typography fontSize={28} marginBottom={5}>
              5 days forecast
            </Typography>
            <Box gap={5} display="flex" flexDirection={"column"}>
              {weatherData.fiveDaysForecast.map((item, index) => {
                if ((index + 1) % 8 === 0) {
                  console.log(item);
                  return (
                    <>
                      <Box
                        gap={5}
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"row"}
                      >
                        <Box>
                          <img
                            src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                            alt=""
                          />
                        </Box>
                        <Box display={"flex"} gap={5}>
                          <Typography variant="body2" component="p">
                            Date:{" "}
                            {new Date(
                              (item.dateTime - 1) * 1000,
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" component="p">
                            Temperature: {item.temperature}°C
                          </Typography>
                          <Typography variant="body2" component="p">
                            Weather: {item.weatherDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );
                }
              })}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

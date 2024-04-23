import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ForecastData, WeatherData } from "./city-weather.interface";

export const fetchWeatherByCityId = createAsyncThunk(
  "weather/fetchWeatherByCityId",
  async (cityId: number) => {
    try {
      const apiKey = "08eef4b90074e6d38726f67dca0722f3"; // Замените 'your_api_key' на ваш API-ключ
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${apiKey}`,
      );
      console.log(response);
      const data: WeatherData = {
        city: response.data.city.name,
        temperature: response.data.list[0].main.temp,
        weatherDescription: response.data.list[0].weather[0].description,
        icon: response.data.list[0].weather[0].icon,
        humidity: response.data.list[0].main.humidity,
        windSpeed: response.data.list[0].wind.speed,
        pressure: response.data.list[0].main.pressure,
        visibility: response.data.list[0].visibility,
        sunrise: response.data.city.sunrise,
        sunset: response.data.city.sunset,
        fiveDaysForecast: response.data.list.map((item: any) => ({
          dateTime: item.dt,
          temperature: item.main.temp,
          weatherDescription: item.weather[0].description,
          icon: item.weather[0].icon,
        })) as ForecastData[], 
      };
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    loading: false,
    weatherData: null as WeatherData | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCityId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCityId.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherByCityId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default weatherSlice.reducer;

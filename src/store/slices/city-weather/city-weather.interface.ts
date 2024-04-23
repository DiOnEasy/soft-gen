export interface WeatherData {
  city: string;
  temperature: number;
  weatherDescription: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  fiveDaysForecast: ForecastData[]; 
}

export interface ForecastData {
  dateTime: number;
  temperature: number;
  weatherDescription: string;
  icon: string;
}
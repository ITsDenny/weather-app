import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import weatherServices from './services/apiServices'; 
import _ from 'lodash';
import moment from 'moment'; 
import WeatherDetail from './weatherDetail'
import CountryFlag from 'react-native-country-flag';

const Index = () => {
  const [search, setSearch] = useState('');
  const [debounceValue,setDebounceValue] = useState('')
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const debouncedSetValue = useCallback(
    _.debounce((value) => {
      setDebounceValue(value);
    }, 1500),
    []
  );

  const updateSearch = (value) => {
    setSearch(value);
    debouncedSetValue(value);
  };


  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await weatherServices.weatherByCity(city);
      setWeatherData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debounceValue) {
      fetchWeather(debounceValue);
    }
  }, [debounceValue]);

  return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search Location"
          onChangeText={updateSearch}
          value={search}
          platform="default"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          weatherData && (
            <View style={styles.weatherContainer}>
              <Text style={styles.cityName}>{weatherData.name} - {weatherData.sys.country}</Text>
              <CountryFlag isoCode={weatherData.sys.country} size={30} />
              <Image
                style={styles.weatherIcon}
                source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` }}
              />
              <Text style={styles.temperature}>{Math.round(weatherData.main.temp - 273.15)}°C</Text>
              <Text style={styles.description}>{weatherData.weather[0].description}</Text>
              <View style={styles.additionalInfo}>
                <WeatherDetail icon="water" label="Humidity" value={`${weatherData.main.humidity}%`} />
                <WeatherDetail icon="weather-windy" label="Wind Speed" value={`${weatherData.wind.speed} m/s`} />
                <WeatherDetail icon="eye" label="Visibility" value={`${weatherData.visibility / 1000} km`} />
                <WeatherDetail icon="gauge" label="Pressure" value={`${weatherData.main.pressure} hPa`} />
                <WeatherDetail icon="weather-sunset-up" label="Sunrise" value={moment.unix(weatherData.sys.sunrise).format('HH:mm A')} />
                <WeatherDetail icon="weather-sunset-down" label="Sunset" value={moment.unix(weatherData.sys.sunset).format('HH:mm A')} />
              </View>
            </View>
          )
        )}
        {/* {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error fetching weather data. Please try again.</Text>
          </View>
        )} */}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 18,
    backgroundColor:'skyblue'
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333333',
    fontStyle:'italic'
  },
  weatherIcon: {
    width: 200,
    height: 200,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#666666',
  },
  additionalInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Index;

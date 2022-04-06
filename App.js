import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { NativeBaseProvider } from 'native-base';
import { VStack, Box, Divider, Button, Spacer, Input, Heading, Center } from 'native-base';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export default function App() {
  /* const [value, setValue] = useState('');
  const [temp, setTemp] = useState('');
  const [typecity, setTypeCity] = useState('Vladivostok');
  const [city, setCity] = useState('Vladivostok');
  const [img, setimg] = useState('');
  const [disc, setdisc] = useState('');

  const citySelect = (e) => {
    e.preventDefault();
    setCity(typecity);
  }; 

  useEffect(() => {
    axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fc50e5fe3acdddbea0f8fd6d9795f8b&units=metric`,
    )
      .then((res) => {
        console.log(res.data);
        setValue(res.data);
        setTemp(res.data.main);
        setimg(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`);
        setdisc(res.data.weather[0].description);
      })
      .catch((reject) => {
        console.log(reject);
        setValue('City not found');
      });
  }, [city]); */


  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('tamilnadu');
  const [state, setState] = useState('tamilnadu');

  // API KEY AND URL
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${state}&appid=0fc50e5fe3acdddbea0f8fd6d9795f8b&units=metric`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <View /* style={styles.container} */>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <Center >
          <Heading m={5}>React Weather App</Heading>
          <div >
            <div>
              <Input
                type="text"
                placeholder="Enter Location"
                onChange={inputHandler}
                value={getState}
              />
              <Button>Search</Button>
            </div>

            <div style={{ width: '60vw' }}>
              {apiData.main ? (
                <Center >
                  <img
                    src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                    alt="weather status icon"
                    width="60px"
                  />

                  <p className="h2">
                    {kelvinToFarenheit(apiData.main.temp)}&deg; C
                  </p>

                  <p className="h5">
                    <i className="fas fa-map-marker-alt"></i>{' '}
                    <strong>{apiData.name}</strong>
                  </p>

                  <div>
                    <div >
                      <p>
                        <i ></i>{' '}
                        <strong>
                          {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                        </strong>
                      </p>
                      <p>
                        <i ></i>{' '}
                        <strong>
                          {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                        </strong>
                      </p>
                    </div>
                    <div>
                      <p>
                        {' '}
                        <strong>{apiData.weather[0].main}</strong>
                      </p>
                      <p>
                        <strong>
                          {' '}
                          {countries.getName(apiData.sys.country, 'en', {
                            select: 'official',
                          })}
                        </strong>
                      </p>
                    </div>
                  </div>
                </Center>
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          </div>
        </Center>
      </NativeBaseProvider>
    </View>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { NativeBaseProvider } from 'native-base';
import { VStack, Box, Divider, Button, Spacer, Input, Heading, Center } from 'native-base';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [value, setValue] = useState('');
  const [temp, setTemp] = useState('');
  const [typecity, setTypeCity] = useState('');
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
      .then((resolve) => {
        console.log(resolve.data);
        setValue(resolve.data);
        setTemp(resolve.data.main);
        setimg(`http://openweathermap.org/img/wn/${resolve.data.weather[0].icon}.png`);
        setdisc(resolve.data.weather[0].description);
      })
      .catch((reject) => {
        console.log(reject);
        setValue('City not found');
      });
  }, [city]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* {console.log(city)}
      <Paper className="paper">
        <form onSubmit={citySelect}>
          <TextField
            className="elementcenter"
            placeholder="Enter city name"
            value={typecity}
            onChange={(e) => setTypeCity(e.target.value)}
          />
          <Button type="submit" name="btn">
            <SendIcon style={{ outline: "none" }} />
          </Button>
        </form>
        <br />
        <h6 className="fontcss">{value.name}</h6>

        <img src={img} alt="weather icon" className="imgcss" />
        <h6 className="fontcss">{disc}</h6>

        <div className="elementcenter">
          <p>
            Min
            <br />
            {`${Math.floor(temp.temp_min - 273.15)}° C`}
          </p>
          <h6 className="fontcss">{`${Math.floor(temp.temp - 273.15)}° C`}</h6>
          <p>
            Max
            <br />
            {`${Math.floor(temp.temp_max - 273.15)}° C`}
          </p>
        </div>
      </Paper> */}

      <NativeBaseProvider>
        <Center pt={5}>
          {/* <form onSubmit={citySelect}>
            <Button type="submit" name="btn">
              <SendIcon style={{ outline: "none" }} />
            </Button>
          </form> */}

          <form onSubmit={citySelect}>
            <Input
              className="elementcenter"
              placeholder="Enter city name"
              value={typecity}
              onChange={(e) => setTypeCity(e.target.value)}
            />
            <Button type="submit" name="btn">Select</Button>

            {console.log(citySelect)}
          </form>


          <Divider m={5} />

          <Heading>{city} - {temp.temp}°C</Heading>
        </Center>

        <Box border="1" borderRadius="md" m={25}>
          <VStack space="4" divider={<Divider />}>
            <Box px="4" p="4" background="#dce8eb" rounded={5}>{disc}</Box>
          </VStack>
        </Box>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './style/AppStyle';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; 
import Tour from './Tour';
import * as Font from 'expo-font';

const API_KEY = "f9d4846a063e41feba84db650d400655";
const GOOGLE_API_KEY = Location.setGoogleApiKey();

export default function App() {
  useEffect(() => {
    getLocation();
    // const isFetching = true;
    // isFetching && getLocation();
    // loadFonts();
    return () => {
      // isFetching = false;
    }
  }, [])
  const [ready, setReady] = useState(true);
  const [granted, setGranted] = useState(true);
  const [lang, setLang] = useState("Kor");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setGranted(false);
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    // const location = await Location.reverseGeocodeAsync({latitude,longitude},{ useGoogleMaps:GOOGLE_API_KEY });
    setLatitude(latitude);
    setLongitude(longitude);
  }
  // const loadFonts = async () => {
  //   await Font.loadAsync({
  //     APPLESDGOTHICNEOH: require('./assets/fonts/APPLESDGOTHICNEOH.TTF'),
  //     APPLESDGOTHICNEOL: require('./assets/fonts/APPLESDGOTHICNEOL.TTF')
  //   })
  //   setReady(true);
  //   console.log("1."+ready);
  // }

  return (
    <>
    {ready && 
      <View style={styles.container}>  
        <View style={styles.header}>
        
          <MaterialIcons name="card-travel" size={25} color="black" />
          <Text style={ styles.title}>투어정보</Text>
      </View>
      <View style={styles.content}> 
        {longitude && latitude &&
          <Tour mapX={longitude} mapY={latitude} lang={lang}  />}
      </View>
    </View> }
    </>
    
  );
}

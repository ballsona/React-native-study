// import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, Fontisto  } from '@expo/vector-icons';
import * as Location from 'expo-location';

//숨겨야 하지만 귀찮다. 나중에 숨기자.
const API_KEY = "f9d4846a063e41feba84db650d400655";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const icons = {
//   "Clouds": 
// }
export default function App() {
  const [city,setCity]= useState("");
  const [days, setDays]= useState([]);
  const [ok,setOk] = useState(true);
  const getWeather = async()=>{
      const {granted} =  await Location.requestForegroundPermissionsAsync();
      if (!granted){
        setOk(false);
      }
      const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
      const location = await Location.reverseGeocodeAsync({latitude,longitude},{ useGoogleMaps: false});
      setCity(location[0].city);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
      const json = await response.json();
      setDays(json.daily);
  }
  useEffect(()=>{
    getWeather();
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.weather}>
          {days.length === 0 ? 
            (<View style={styles.day}>
                <ActivityIndicator color="white" style={{marginTop:10}} size="large" />
            </View>) : 
            days.map((day,index)=>
              <View key={index} style={styles.day}>
                  <Text style={styles.temperature}>{parseFloat(day.temp.day).toFixed(1)}도</Text>
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.tinyDescription}>{day.weather[0].description}</Text>
              </View> )
          }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F5B99D",
  },
  city:{
    flex:1.5,
    justifyContent:"center",
    alignItems:"center"
  },
  cityName:{
    fontSize:60,
    fontWeight:"500",
  },
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:"flex-start",
    paddingHorizontal:20
  },
  temperature: {
    marginTop:50,
    fontSize:90,
    color: "white"
  },
  description:{
    fontSize:50,
    color: "white"
  },
  tinyDescription:{
    fontSize:25,
    color: "white"
  }
});

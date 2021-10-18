import React,{useState} from 'react';
import { View,Text,StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { theme } from './color';

export default function App() {
  const [working, setWorking] = useState(true);
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  return (
    //Header
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
            <Text style={{...styles.btnText,color: working? "white":theme.grey}}>Work</Text>
        </TouchableOpacity >
         <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: working ? theme.grey : "white" }}>Travel</Text>
        </TouchableOpacity>
      </View>
      {/* <StatusBar style="white" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal:30
  },
  header: {
    flexDirection: "row",
    marginTop: 60,
    justifyContent:"space-between"
  },
  btnText: {
    fontSize: 30,
    fontWeight: "700",
    color: "white"
  }
})
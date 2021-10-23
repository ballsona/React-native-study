import React,{useState, useEffect} from 'react';
import {
  View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput,
  ScrollView,Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto,FontAwesome } from "@expo/vector-icons";
import { theme } from './color';
import { styles } from './TodoStyle';

const STORAGE_KEY = "@toDos";
const WORKING_KEY = "@isWorking";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [toDos, setToDos] = useState({}); 
  useEffect(() => {
    loadTodos();
    // return () => saveWorking();
  }, [])
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const textHandler = (payload) => {
    setText(payload);
  }
  const saveTodos = async(toSave) => {
    try {
      const s = JSON.stringify(toSave); //Object => String
      await AsyncStorage.setItem(STORAGE_KEY, s);
    } catch (e) {
      console.log(e);
    }
  }
  // const saveWorking = async () => {
  //   try {
  //     const w = JSON.stringify(working);
  //     await AsyncStorage.setItem(WORKING_KEY, w);
  //     console.log("unmount");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  const loadTodos = async () => {
    // Android Emulator에서 데이터를 불러오지 못하는 상황.. 아이폰은 잘됨. 후 
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      const w = await AsyncStorage.getItem(WORKING_KEY);
      setToDos((s != null) ? JSON.parse(s) : null); //String => Object
      // setWorking(w);
      console.log("setState");
    } catch (e) {
      console.log(e); 
    }
  }
  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = {
      ...toDos,
      [Date.now()]: { text, working, done }
    }
    setToDos(newTodos);
    setText("");
    await saveTodos(newTodos);
  }
  const deleteTodo = (key) => {
    // Alert.prompt("Delete","Do you really want to delete?")
    Alert.alert("Delete", "Are U sure to Delete?",[
      { text: "Cancel" },
      {
        text: "Sure",
        style: "destructive",
        onPress: () => {
          const tempTodos = { ...toDos };
          delete tempTodos[key];
          setToDos(tempTodos);
          saveTodos(tempTodos);
        }
      }])
  }
  const doneTodo = (key) => {
    const tempTodos = {
      ...toDos,
      [key]: { text:text, working:working,done: true }
    };
    setToDos(tempTodos);
    saveTodos(tempTodos);
  }
  console.log("render");
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
      <TextInput placeholder={working ? "What to Do" : "Where to Go"} onChangeText={textHandler} value={text}
        onSubmitEditing={addTodo} style={styles.input} returnKeyType="done"/>
      <ScrollView>
        {Object.keys(toDos).map((key) => 
            toDos[key].working === working ?
            <View style={styles.toDo} key={key}>
              <TouchableOpacity onPress={() => doneTodo(key)}>
                {toDos[key].done === false ?
                  <FontAwesome name="square-o" size={22} color="white" /> :
                  <FontAwesome name="check-square-o" size={24} color="white" />
                }
              </TouchableOpacity>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={()=>deleteTodo(key)}>
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </TouchableOpacity>
              </View>
         : null   
        )}
      </ScrollView>
      {/* <StatusBar style="white" /> */}
    </View>
  )
}



// 챌린지
// 1. late select 가 Work / Travel 인지 저장해놨다가 다시 켤때 그대로 이어가기 ?
// -> whffkdhffjdun
// 2. Done 만들어서 todo 완료되었으면 done 으로 체크할 수 있도록
// => 개어루열니아루가이및ㄴ ㅏ아무것도 모르겟어 내일한다 
// 3. todo 수정가능하게 
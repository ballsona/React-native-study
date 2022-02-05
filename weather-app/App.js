import React,{useState, useEffect} from 'react';
import {
  View, Text, StatusBar, TouchableOpacity, TextInput,
  ScrollView,Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto,FontAwesome5,MaterialIcons  } from "@expo/vector-icons";
import { theme } from './color';
import { styles } from './TodoStyle';

const STORAGE_KEY = "@toDos";
const WORKING_KEY = "@isWorking";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [nowEditingKey, setNowEditingKey] = useState("");
  const [editText, setEditText] = useState("");
  const [done, setDone] = useState(false);
  const [toDos, setToDos] = useState({}); 
  //컴포넌트 초기 렌더링 될때만 함수 호출
  useEffect(() => {
    loadTodos();
  }, [])
  //working 값 바뀔때마다 함수 호출
  useEffect(() => {
    saveWorking(working);
  }, [working])
  
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
  const saveWorking = async (working) => {
    try {
      const w = JSON.stringify(working);
      await AsyncStorage.setItem(WORKING_KEY, w);
    } catch (e) {
      console.log(e);
    }
  }
  const loadTodos = async () => {
    // Android Emulator에서 데이터를 불러오지 못하는 상황.. 아이폰은 잘됨. 후 
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      const w = await AsyncStorage.getItem(WORKING_KEY); //working 불러오기
      if (s) setTodos(JSON.parse(s));
     
      setToDos((s != null) ? JSON.parse(s) : null); //String => Object
      setWorking((w != null ? JSON.parse(w) : true)); //저장된 working값이 없다면 true로 세팅해주기.
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
  const editTodo = (key) => {
    setNowEditingKey(key);
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
    const tempTodos = { ...toDos };
    tempTodos[key].done = !tempTodos[key].done;
    setToDos(tempTodos);
    saveTodos(tempTodos);
  }
  const editTextHandler = (payload) => {
    setEditText(payload)
  }
  const editTextSubmit = (key) => {
    const tempTodos = { ...toDos };
    tempTodos[key].text = editText;
    setEditText("");
    setNowEditingKey("");
    setToDos(tempTodos);
    saveTodos(tempTodos);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
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
      {/* TodoList  */}
      <ScrollView>
        {Object.keys(toDos).map((key) => 
            toDos[key].working === working ?
            <View style={styles.toDo} key={key}>
              <View style={styles.toDoContent}>
                <TouchableOpacity onPressOut={() => doneTodo(key)}>
                  {toDos[key].done 
                    ? <FontAwesome5 name="check-square" size={24} color="white" />
                    : <FontAwesome5 name="square" size={24} color="white" />
                  }
                </TouchableOpacity>
                {nowEditingKey && key === nowEditingKey 
                  ? <TextInput placeholder={toDos[key].text} onChangeText={editTextHandler} value={editText}
                      onSubmitEditing={()=>editTextSubmit(key)} style={styles.editInput} returnKeyType="done" />
                  : <Text style={{ ...styles.toDoText, textDecorationLine: toDos[key].done ? "line-through" : "none" }}>{toDos[key].text}</Text>
                }
              </View>
              <View style={styles.toDoFunction}>
                <TouchableOpacity onPress={()=>editTodo(key)} style={styles.editBtn}>
                  <MaterialIcons name="mode-edit" size={22} color={theme.grey} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteTodo(key)} >
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </TouchableOpacity>
              </View>
            </View>
         : null   
        )}
      </ScrollView>
      {/* <StatusBar style="white" /> */}
    </View>
  )
}



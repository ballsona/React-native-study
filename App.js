import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
// import Message from './Message';
import { styles } from './style/AppStyle';

export default function App() {
  const [chats, setChats] = useState({});
  const [myChat, setMyChat] = useState("");
  const onChatChange = (payload) => {
    setMyChat(payload);
  }
  const onChatSave = () => {
    if (myChat === "") return;
    const newChats = {
      ...chats,
      [Date.now()]:{text:myChat, isUser:true}
    }
    setChats(newChats);
    setMyChat(""); 
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* setting과 history..? 를 구현할 것 */}
        {/* SafeAreaView */}
        <Text style={styles.title}>How's Your Day</Text>
        {/* <View style={styles.headerFunction}>
          <Text>A</Text>
          <Text>B</Text>
        </View> */}
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.chats}>
          {/* 채팅이 올라오게 될 것. */}
          {Object.keys(chats).map((key) => 
            <Text key={key} style={styles.chat}>{chats[key].text}</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.messageBar}>
        <TextInput value={myChat} onChangeText={onChatChange} onSubmitEditing={onChatSave}
          style={styles.messageInput} />
      </View>
    </View>
  );
}


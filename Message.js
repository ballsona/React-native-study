import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat,InputToolbar  } from 'react-native-gifted-chat';
import { DefaultMessage, AutoMessage } from './ChatBot';
import * as Location from 'expo-location';

const API_KEY = "f9d4846a063e41feba84db650d400655";
export default function Message() {
    useEffect(() => {
        getWeather();
        setMessages(DefaultMessage);
    }, [])
    const [granted, setGranted] = useState(true);
    const [messages, setMessages] = useState([]);

    const getWeather = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setGranted(false);
        }
        const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
        const location = await Location.reverseGeocodeAsync({latitude,longitude},{ useGoogleMaps: false});
        console.log(location);
    }
    const addAutoMessage = (text) => {
        if (text === "Weather")
            setMessages(previousMessages => GiftedChat.append(previousMessages, AutoMessage.weather))
        else if (text === "Clear")
            setMessages([]);
    }

    const sendHandler = useCallback((newMessage  = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
        addAutoMessage(newMessage[0].text)
    }, [])

    const qreplyHanlder = useCallback((newQReply = []) => {
        if (newQReply[0].value === "start") {
            setMessages(previousMessages => GiftedChat.append(previousMessages, AutoMessage.weather))
        } else if (newQReply[0].value === "notStart") {
            setMessages(messages[0]);
        }
    })
    // console.log(messages)
    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => sendHandler(newMessage)}
            onQuickReply = {newQReply => qreplyHanlder(newQReply)}
            user={{ _id: 100 }} />
    )
}
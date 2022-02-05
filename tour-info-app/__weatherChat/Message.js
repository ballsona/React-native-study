// import React, { useState, useCallback, useEffect } from 'react'
// import { StyleSheet, Text, View } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { morningM, AutoMessage } from './AutoMessages';
// import * as Location from 'expo-location';

// const API_KEY = "f9d4846a063e41feba84db650d400655";

// export default function Message() {
//     useEffect(() => {
//         getWeather();
//         setMessages(morningM); //(1)
//     }, [])
//     const [messages, setMessages] = useState([]);
//     const [granted, setGranted] = useState(true);
//     const [city, setCity] = useState("");
//     const [weather, setWeather] = useState([]);
//     const [weatherM, setWeatherM] = useState({});

//     const getWeather = async () => {
//         const { granted } = await Location.requestForegroundPermissionsAsync();
//         if (!granted) setGranted(false);
//         const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
//         const location = await Location.reverseGeocodeAsync({latitude,longitude},{ useGoogleMaps: false});
//         setCity(location[0].city);
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
//         const json = await response.json();
//         setWeather([json.main.temp, json.weather[0].description ]);
//         setWeatherM({
//             _id: Date.now() + Math.random(),
//             text: `${city}'s current temperature is ${parseFloat(weather[0]).toFixed(1)}degrees and the weather is ${weather[1]}.`,
//             createdAt: new Date(),
//             quickReplies : weatherQR,
//             user: chabotInfo
//         })
//         console.log(weatherM);
//     }

//     const sendAutoMessage = (userText) => {
//     }

//     const sendHandler = useCallback((newMessage = []) => {
//         //사용자가 message 작성시, 사용자 답변에 맞는 auto응답 찾아서 보내주기.
//         setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
//         sendAutoMessage(newMessage[0].text); 
//     }, [])

//     const qreplyHanlder = useCallback((newQReply = []) => {
//         if (newQReply[0].value === "morning_YES") {
//             setMessages(previousMessages => GiftedChat.append(previousMessages, weatherM)) //(2)
//         } else if (newQReply[0].value === "weather_YES") {
//             setMessages(previousMessages => GiftedChat.append(previousMessages, AutoMessage.dayPlan)); //(3)
//         }
//     })
//     return (
//         <GiftedChat
//             messages={messages}
//             onSend={newMessage => sendHandler(newMessage)}
//             onQuickReply = {newQReply => qreplyHanlder(newQReply)}
//             user={{ _id: 100 }}
//         />
//     )
// }

// const chabotInfo = {
//     _id: 0,
//     name: "Chatbot",
//     avatar: 'https://placeimg.com/140/140/any'
// }

// const weatherQR = {
//     type: 'radio', // or 'checkbox',
//     keepIt: true,
//     values: [
//         {
//             title: 'Yes',
//             value: 'weather_YES'
//         }
//     ],
// }

// //Weather 불러오기. => Component 분리 시도..?
// //자동 메세지 만들기
// //style
// //morning/night  ==How??
// //setting
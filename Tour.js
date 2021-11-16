import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from './style/TourStyle';
import axios from 'axios';

const API_KEY = "rW41y1VNJf0D1utkoK2qCb5DK%2FvkuHDMXZBwXP%2F3S9m93UW4fLpX4eKO1Fi9%2Fji69jOpayWyP5271jD97We20g%3D%3D";

export default function Tour({ mapX, mapY, lang, fontStyle}) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        getTourItems();
    },[])
    // console.log(mapX, mapY);
    const getTourItems = async () => {
        var newItems = [];
        await axios.get(`http://api.visitkorea.or.kr/openapi/service/rest/${lang}Service/areaBasedList?ServiceKey=${API_KEY}&areaCode=35&MobileOS=ETC&MobileApp=AppTest`)
            .then(response  => {
                const res = response.data.response;
                const Items = res.body.items.item;
                Items.map(item => {
                    newItems.push(item);
                })
            });
        setItems(newItems);
    }
    //FlatList 구현...
    return (
        <ScrollView>
            {items.map((item) =>    
                <View key={item.contentid} style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Image style={{ height: '80%', width: '90%' }}
                        source={{ uri: item.firstimage }} />
                    <Text style={styles.itemAddr}>{item.addr1}</Text>
                </View>
            )}
        </ScrollView>
    );
}

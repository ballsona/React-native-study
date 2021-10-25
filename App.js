import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Message from './Message';
import { styles } from './style/AppStyle';
import { FontAwesome } from '@expo/vector-icons'; 

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* SafeAreaView */}
        <Text style={styles.title}>How's Your Day</Text>
        {/* <View style={styles.headerFunction}>
          <Text>A</Text>
          <Text>B</Text>
        </View> */}
      </View>
      <View style={styles.body}>
        <Message />
      </View>
    </View>
  );
}


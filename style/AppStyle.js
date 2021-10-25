import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "tomato"
    },
    header: {
        flexDirection: "row",
        flex: 1.3,
        // backgroundColor: "green",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        paddingHorizontal: 15,
        marginTop: 30,
        fontSize: 20,
        fontWeight:"500"
    },
    headerFunction: {
        flexDirection:"row"
    },
    body: {
        flexDirection: "column",
        flex:8,
        backgroundColor:"purple"
    },
    chats: {
        flexDirection: "column-reverse",
        marginVertical: 15,
        paddingHorizontal:15
    },
    chat: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical:5
    },
    messageBar: {
        flexDirection: "column",
        flex:1.5,
        backgroundColor:"yellow"
    },
    messageInput: {
        backgroundColor: "white",
        flex:0.5
    }
})
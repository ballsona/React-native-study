import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#dbf5ff"
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    content: {
        flex: 8,
    },
    title: {
        fontSize:17,
        fontWeight: "600",
        marginTop:3
    }
})
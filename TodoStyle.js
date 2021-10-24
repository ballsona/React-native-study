import { StyleSheet } from 'react-native';
import { theme } from './color';

export const styles = StyleSheet.create({
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
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal : 10,
    paddingVertical:10,
    marginVertical:20,
    borderRadius:13,
    fontSize:15
  },
  toDo: {
    flexDirection:"row",
    backgroundColor: theme.toDoBg,
    paddingHorizontal: 25,
    paddingVertical:20,
    marginBottom:15,
    borderRadius: 7,
    justifyContent:"space-between",
  },
  toDoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  toDoFunction: {
    flexDirection: "row",
    alignItems:"center",
  },
  toDoText: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    paddingHorizontal:15
  },
  editBtn: {
    paddingRight:5
  },
  editInput: {
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    
  }
})
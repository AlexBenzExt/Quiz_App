import {Component} from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"


interface Iprops{
    navigation?:any
}


class Home extends Component<Iprops>{


navigationHandler=()=>{
 this.props.navigation.navigate("Questions")
}


    render(){
        return <View style={styles.main}>
         <Text style={styles.text}>JavaScript Quiz</Text>
         <TouchableOpacity style={styles.button} onPress={this.navigationHandler} >
            <Text style={styles.btnTxt}>Start</Text>
         </TouchableOpacity>
        </View>
    }
}


export default Home;



const styles=StyleSheet.create({
    main:{
        backgroundColor:"black",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        gap:30
    },

   text:{
    fontSize:30,
    color:"white"
   },
   button:{
    backgroundColor:"white",
    width:"50%",
    height:40,
    borderRadius:25,

   },

   btnTxt:{
    textAlign:"center",
    fontSize:20,
    color:"black",
    marginTop:4
   }
})
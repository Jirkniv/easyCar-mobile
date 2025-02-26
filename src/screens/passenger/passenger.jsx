import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
//import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./passenger.style.js";
import { useState } from "react";
import icons from "../../constants/icons.js";


function Passenger(props) {




    return <View style={styles.container}>
      
        <View style={styles.footer}>
            <View style={styles.footerText}>
                <Text>Encontre a sua carona</Text>
            </View>

            <View style={styles.footerFields}>
                <Text>Origem</Text>
                <TextInput style={styles.input} />
            </View>

            <View style={styles.footerFields}>
                <Text>Destino</Text>
                <TextInput style={styles.input} />
            </View>

            <View style={styles.footerFields}>
                <Text>Motorista</Text>
                <TextInput style={styles.input} />
            </View>
        </View>
        <MyButton text="CONFIRMAR" theme="red" />
    </View>
}

export default Passenger;
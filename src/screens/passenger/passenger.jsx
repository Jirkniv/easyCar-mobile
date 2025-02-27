import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./passenger.style.js";
import { useState } from "react";
import icons from "../../constants/icons.js";


function Passenger(props) {

   // const [myLocation, setMyLocation] = useState(null);
    // setMyLocation({
    //     latitude: 20,
    //     longitude: 20
    //     });

    return <View style={styles.container}>
      
         <MapView style={styles.map} provider={PROVIDER_DEFAULT} initialRegion={{
            latitude:-19.515013 ,
            longitude: -42.611602,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
            }}>


            <Marker coordinate={{latitude:-19.515013 , longitude: -42.611602}} title="Unileste" description="coronel Fabriciano" image={icons.location} style={styles.marker}>


            </Marker>

        </MapView> 

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
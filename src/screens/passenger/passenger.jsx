import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./passenger.style.js";
import { useState, useEffect } from "react";
import icons from "../../constants/icons.js";
import { requestForegroundPermissionsAsync , getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";


function Passenger(props) {

    const userId = 1;
    const [myLocation, setMyLocation] = useState({});
    const [pickupAdress, setPickupAdress] = useState('');
    const [dropOffAdress, setDropOffAdress] = useState('');
    const [title, setTitle] = useState('');

    async function RequestRideFromUser(){
        const response = {}
        return response;
    }

    async function RequestPermissionAndGetLocation(){
        const {granted} = await requestForegroundPermissionsAsync();

        if(granted){
            const currentPosition = await getCurrentPositionAsync();

            if(currentPosition.coords){
                return currentPosition.coords;
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    async function RequestAdressName(lat, long) {
        const response= await reverseGeocodeAsync({
            latitude: lat,
            longitude: long
        });
        if (response[0].street && response[0].streetNumber && response[0].district){
            setPickupAdress(response[0].street + " " +
            response[0].streetNumber + " - " +
            response[0].district);
        }
    }
    async function LoadScreen(){
        const response = await RequestRideFromUser();
  if (!response.ride_id) {

        const location = {latitude: -23.561747, longitude: -46.656244};

        //const location = await RequestPermissionAndGetLocation();

        if(location.latitude){
          setTitle('Encontre a sua carona');  
          setMyLocation(location);

          RequestAdressName(location.latitude , location.longitude);
        }
        
    }  else {
        Alert.alert("Não foi possivle obter sua localização");""
    }
  }

    async function askForRide() {
        const json = {
            passenger_id: userId,
            pickup_address: pickupAdress,
            dropOffAdress: dropOffAdress,
            pickup_latitude: myLocation.latitude,
            pickup_longitude: myLocation.longitude
        }
        console.log("Eviar post para o servidor",json);
          props.navigation.goBack();
    }

  
    useEffect(() => {
        LoadScreen();
    },[])

    
      return <View style={styles.container}>
      
        {myLocation.latitude ?
        <>
             <MapView style={styles.map} provider={PROVIDER_DEFAULT} initialRegion={{
            latitude:myLocation.latitude,
            longitude: myLocation.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
            }}>


            <Marker coordinate={{latitude: myLocation.latitude , longitude: myLocation.longitude}} title="Unileste" description="coronel Fabriciano" image={icons.location} style={styles.marker}>


            </Marker>

        </MapView> 

        <View style={styles.footer}>
            <View style={styles.footerText}>
                <Text>{title}</Text>
            </View>

            <View style={styles.footerFields}>
                <Text>Origem</Text>
                <TextInput style={styles.input} value={pickupAdress} onChangeText={(text) => setPickupAdress(text)} />
            </View>

            <View style={styles.footerFields}>
                <Text>Destino</Text>
                <TextInput style={styles.input} value={dropOffAdress} onChangeText={(text) => setDropOffAdress(text)} />
            </View>
{/* 
            <View style={styles.footerFields}>
                <Text>Motorista</Text>
                <TextInput style={styles.input} />
            </View> */}
        </View>
        <MyButton text="CONFIRMAR" theme="default" onClick={askForRide} />

         </>
          : <View style={styles.loading}>
                <ActivityIndicator size="large" />
             </View>}
        
    </View>
}

export default Passenger;
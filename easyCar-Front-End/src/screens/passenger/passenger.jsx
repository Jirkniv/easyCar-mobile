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
    const [status, setStatus] = useState('');
    const [rideId, setRideId] = useState(0);
    const [driverName, setDriverName] = useState('');

    async function RequestRideFromUser(){
      //  const response = {}
          const response = {
            /*    ride_id: 3,
                passenger_user_id: 3,
                passenger_name: "Marcio Antunes",
                passenger_phone: "(11) 99999-9999",
                pickup_address: "Rua do Gasometro, 55 - Bras",
                pickup_date: "2025-02-17",
                dropoff_address: "Praça da Sé",
                status: "P",
                driver_user_id: null,
                driver_name: null,
                pickup_latitude: -23.561747,
                pickup_longitude: -46.656244
               */
                ride_id: 1,
                passenger_user_id: 1,
                passenger_name: "Heber Stein Mazutti",
                passenger_phone: "(11) 99999-9999",
                pickup_address: "Praça Charles Miller - Pacaembu",
                pickup_date: "2025-02-19",
                pickup_latitude: "-23.543132",
                pickup_longitude: "-46.665389",
                dropoff_address: "Shopping Center Norte",
                status: "A",
                driver_user_id: 2,
                driver_name: "João Martins",
                driver_phone: "(11) 5555-5555"
                
          }  
     
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
        } else {
        Alert.alert("Não foi possivle obter sua localização");""
        }
    }  else {
        setTitle(response.status == "P" ? 'Aguardando uma carona' : 'Carona encontrada');  
        setMyLocation({
            latitude: Number(response.pickup_latitude),
            longitude: Number(response.pickup_longitude)
        });
        setPickupAdress(response.pickup_address);
        setDropOffAdress(response.dropoff_address);
        setStatus(response.status);
        setRideId(response.ride_id);
        setDriverName(response.driver_name + " - " + response.driver_phone);    }
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

    async function cancelRide(){
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        }
        console.log("Cancelar Carona", json);
        props.navigation.goBack();
 
    }
    
    async function finishRide(){
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        }
        console.log("Finalizar Carona", json);
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
                <TextInput style={styles.input} value={pickupAdress} onChangeText={(text) => setPickupAdress(text)} editable={status=="" ? true : false} />
            </View>

            <View style={styles.footerFields}>
                <Text>Destino</Text>
                <TextInput style={styles.input} value={dropOffAdress} onChangeText={(text) => setDropOffAdress(text)} 
                editable={status=="" ? true : false} />
            </View>

            {status == "A" &&
             <View style={styles.footerFields}>
                <Text>Motorista</Text>
                <TextInput style={styles.input} value={driverName} editable={false}/>
            </View> }

           
        </View>
        {status == "" && <MyButton text="CONFIRMAR" theme="default" onClick={askForRide} /> }

        {status == "P" && <MyButton text="CANCELAR" theme="red" onClick={cancelRide} /> }

        {status == "A" && <MyButton text="FINALIZAR CARONA" theme="red" onClick={finishRide} />}

         </>
          : <View style={styles.loading}>
                <ActivityIndicator size="large" />
             </View>}
        
    </View>
}

export default Passenger;
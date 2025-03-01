import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./passenger.style.js";
import { useState, useEffect } from "react";
import icons from "../../constants/icons.js";
import { requestForegroundPermissionsAsync , getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";
import { api, handleError } from "../../constants/api.js";

function Passenger(props) {

    const userId = 8;
    const [myLocation, setMyLocation] = useState({});
    const [pickupAdress, setPickupAdress] = useState('');
    const [dropOffAdress, setDropOffAdress] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [rideId, setRideId] = useState(0);
    const [driverName, setDriverName] = useState('');

    async function RequestRideFromUser(){
        try {

            const response = await api.get("/rides", {
                params:{
                    passenger_user_id: userId,
                    pickup_date: new Date().toISOString("pt-BR", { timeZone: "America/Sao_Paulo" }).substring(0, 10),
                    status_not: "F"
                }
            });

            if (response.data[0]){
                return response.data[0];
            } else{
                return {};
            }
        } catch (error) {
            handleError(error);
            props.navigation.goBack();
        }  
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
       
        try {
            const json = {
                        passenger_user_id: userId,
                        pickup_address: pickupAdress,
                        dropOffAdress: dropOffAdress,
                        pickup_latitude: myLocation.latitude,
                        pickup_longitude: myLocation.longitude
                    }
            const response = await api.post("/rides", json);

            if (response.data){
                props.navigation.goBack();
            } 
        } catch (error) {
            handleError(error);
           
        } 
    }

    async function cancelRide(){
      
        try {
           
            const response = await api.delete("/rides/" + rideId);

            if (response.data){
                props.navigation.goBack();
            } 
        } catch (error) {
            handleError(error);
           
        } 
 
    }
    
    async function finishRide(){
        
        try {
           const json = {
            passenger_user_id: userId,
            ride_id: rideId
        }
            const response = await api.put("/rides/" + rideId+ "/finish", json);

            if (response.data){
                props.navigation.goBack();
            } 
        } catch (error) {
            handleError(error);
           
        } 

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

        {status == "F" && <MyButton text="CONFIRMAR" theme="default" onClick={askForRide} /> }

        {status == "P" && <MyButton text="CANCELAR" theme="red" onClick={cancelRide} /> }

        {status == "A" && <MyButton text="FINALIZAR CARONA" theme="red" onClick={finishRide} />}

         </>
          : <View style={styles.loading}>
                <ActivityIndicator size="large" />
             </View>}
        
    </View>
}

export default Passenger;
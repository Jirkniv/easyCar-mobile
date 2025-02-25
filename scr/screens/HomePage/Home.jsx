import React from 'react';
import { ImageBackground, Image, Text ,TouchableOpacity, Alert} from 'react-native';
import  icons  from '../../constants/icons.js';
import  {styles} from './st.style.js';
const Home = () => {

  function OpenPassanger(){
    Alert.alert('Passageiro');
  }

  function OpenDriver(){
    Alert.alert('Motorista');
  }
  return (
    <ImageBackground source={icons.back} resizeMode="cover" style={styles.bg}>
      <Image source={icons.logo} style={styles.logo} />
    <TouchableOpacity style={styles.btn} onPress={OpenPassanger}>
        <Image source={icons.passenger}   />
        <Text style={styles.title}>Passageiro</Text>
        <Text style={styles.text}>Encontre uma carona para você</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn} onPress={OpenDriver}>
        <Image source={icons.driver}   />
        <Text style={styles.title}>Motorista</Text>
        <Text style={styles.text}>Encontre uma corrida para você</Text>
    </TouchableOpacity>
    
    </ImageBackground>
  );
}

export default Home

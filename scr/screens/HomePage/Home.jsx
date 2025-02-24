import React from 'react';
import { ImageBackground } from 'react-native-web';
import icons from '../../constants/icons';
import { styles } from '..Home/st.style.js';

const Home = () => {
  return (
    <div>
     <ImageBackground source={icons.back} resizeMode="cover" 
     style={styles.bg}>
            <Image style={styles.logo} source={icons.car}></Image>
     </ImageBackground>
    </div>
  )
}

export default Home

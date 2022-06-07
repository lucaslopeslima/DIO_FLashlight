import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import imagedark from './assets/icons/logo-dio-white.png';
import imagelight from './assets/icons/logo-dio.png';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const collorOff = '#454545';

const App = () => {
  //const toggle = true; //false
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(toggle => {
      return !toggle;
    });
  };
  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(toggle => {
        return !toggle;
      });
    });
    //chama quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={'black'} />
      <View>
        <TouchableOpacity style={style.container} onPress={handleToggle}>
          <Icon
            name={toggle ? 'flashlight' : 'flashlight-off'}
            size={50}
            color={toggle ? 'yellow' : collorOff}
          />
          <Image
            source={toggle ? imagelight : imagedark}
            style={toggle ? style.imgcontainer : style.imgcontaineroff}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgcontainer: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  imgcontaineroff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
    tintColor: collorOff,
  },
});

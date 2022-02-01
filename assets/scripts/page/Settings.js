import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Settings = () => {

  // get saved settings
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('Chart');
    if (value !== null) {   
        setShow(value);
    }else {
        setShow('on');
      }
  } catch (error) {
    console.log('Error get');
  }
};

// get name for button
const getNameButton = () => {
  _retrieveData();
  return show
}

// text for button (Chart)
const [show, setShow] = useState(getNameButton());

// save data show or no chart
const _storeData = async () => {
  try {
    await AsyncStorage.setItem(
      'Chart',
      setVariableSave()
    );
  } catch (error) {
    console.log('Error set');
  }
}

// set value for save
const setVariableSave = () => {
  if (show == 'on') {
    return 'off'
  } else {
    return 'on'
  }
}
  
  return(
    <SafeAreaView>
      <View style = {styles.lineWrapper}>
        <View style = {styles.lineWrapper}>
          <Text style = {styles.text}>
            Графік
          </Text>
        </View>
        
        <View style = {styles.lineWrapper}>
          <Button
          onPress={() => {
            _storeData();
            _retrieveData();
          }}
          title={show+' '}
        style = {styles.button}
        />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    height : 50,
    flex : 1,
    flexDirection: 'row',
    padding: 10
  },
  text: {
    alignSelf: "center",
    flex: 1,
    fontSize: 20
  },
  button: {
    flex: 1,
    padding: 10,
    alignSelf: "center"
  }
})
  export default Settings;
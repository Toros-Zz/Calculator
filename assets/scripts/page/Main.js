import React, { useState } from 'react';
import { Text, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  View, 
  StyleSheet, 
  Button, 
  Image, 
  ScrollView, 
  ImageBackground
} from 'react-native';

// import MainLanguages from '../MainLanguages.js';

const menu = ({ navigation}) => {
  const [sumInvest, setSumInvest] = useState('');
  const [persentIndex, setPersentIndex] = useState('');
  const [persentProfit, setProvit] = useState('');
  const [years, setYears] = useState('');
  const [errorInput, setEerrorInput] = useState('');

  // const imageBg = require('../../background.png');

  const imageSettings = require('../../settings.png');

    const clientInfo = {
        invest: 0, 
        persentIndex: 0,
        persentProfit: 0,
        years: 0
    };

    // завантаження сцени з таблицею
    const loadSceneTable = () => {
        setEerrorInput(' ');
        navigation.navigate('Результат', clientInfo);
    }

    // завантаження налаштувань
    const loadSceneSettings = () => {
        navigation.navigate('Налаштування');
    }

  //  перевірка чи введені дані відповідають нормам для обрахунку  
    const checkInput = () => {
        if(isNaN(sumInvest)){
           setEerrorInput('*некоректна сума вкладу');
        } else if (isNaN(persentIndex)){
           setEerrorInput('*некоректний відсоток індексації');
        } else if (isNaN(persentProfit)){
          setEerrorInput('*некоректний відсоток дохідності');
        } else if (isNaN(years)){
          setEerrorInput('*некоректна кількість років');
        } else {
          loadSceneTable()
        }
    }



    // збереження данних в один об'єкт
    const setClientInfo = () => {
        clientInfo.invest = Number(sumInvest);
        clientInfo.persentIndex = Number(persentIndex);
        clientInfo.persentProfit = Number(persentProfit);
        clientInfo.years = Number(years);
    }

// Online calculate
    const getSumLastYear = () => {
      let sumStart = Number(sumInvest);
      let sumEndYear = 0;
      let sumNewYear = 0;
       
    for (let i=1; i<=years; i++) {
      // складний відсоток
      sumNewYear = sumStart + sumEndYear;
      sumEndYear = sumNewYear + (sumNewYear * (Number(persentProfit)/100));

      // індексація
      if (i>1){
        sumStart += sumStart * (Number(persentIndex)/100);
      }
    }

    if (!isNaN(sumEndYear) && sumEndYear>0) {
      return 'Кінцева сума ' + sumEndYear.toFixed(2);
    }
  }


  return (
    <SafeAreaView style={{padding: 10}}>
      
      <ScrollView>
        {/* Сума вкладу */}
        <View style={input.sett}>
          <Text style={input.name}>
            Сума вкладу
          </Text>

          {/* settings Button */}
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() => {loadSceneSettings()}}
          >
            <Image
              style={input.logo}
              source={imageSettings}
            />
          </TouchableOpacity>
        </View>
        
      <TextInput
        style={input.type}
        keyboardType = 'numeric'
        placeholder="Сума вкладу"
        onChangeText={sumInvest => {setSumInvest(sumInvest);  setEerrorInput(' ')}}
        defaultValue={sumInvest}
      />
        
        {/* Кількість років */}
        <Text style={input.name}>
        Кількість років
      </Text>
      <TextInput
        style={{paddingBottom:30}, input.type}
        keyboardType = 'numeric'
        placeholder="Кількість років"
        onChangeText={years => {setYears(years); setEerrorInput(' ')}}
        defaultValue={years}
      />

        {/* Індексація */}
        <Text style={input.name}>
        Індексація,%
        </Text>
      <TextInput
        style={input.type}
        keyboardType = 'numeric'
        placeholder="Індексація щорічно, %"
        onChangeText={persentIndex => {setPersentIndex(persentIndex); setEerrorInput(' ')}}
        defaultValue={persentIndex}
      />

        {/* % дохідності */}
        <Text style={input.name}>
        Відсоток дохідності
        </Text>
      <TextInput
        style={input.type}
        keyboardType = 'numeric'
        placeholder="Відсоток дохідності"
        onChangeText={persentProfit => {setProvit(persentProfit); setEerrorInput(' ')}}
        defaultValue={persentProfit}
      />

      {/* Кнопка */}
      <View style={{padding: 10, paddingTop: '10%'}}>
        <Button
       onPress={() => {
           setClientInfo();
           checkInput();
       }}
       title="Детальніше"
        />
        <Text style={input.wrongInput}>{errorInput}</Text>
      </View>

       {/* Миттєвий розрахунок */}
      <Text style={input.liveOutput}>{getSumLastYear()}</Text>
      {/* </ImageBackground> */}
      </ScrollView>
      
    </SafeAreaView>
  );
}

const input = StyleSheet.create({
    type: {
    height: 40, 
    borderWidth: 1,
    borderColor: 'silver',
    padding : '2%',
    fontSize: 17
    },
    name: {
      paddingTop: 10, 
      paddingBottom: 5, 
      fontSize: 20,
      flex: 1
    },
     liveOutput: {
      paddingTop: 10, 
      paddingBottom: 5, 
      fontSize: 22
    },
    wrongInput:{
      color: 'red'
    },
    imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    },
    sett: {
      flex : 1,
      flexDirection: 'row'
    },
    logo: {
      width: 25,
      height: 25,
    },
    settings: { 
      backgroundColor:'#1E6738',
    }
  });

export default menu;
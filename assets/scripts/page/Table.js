import React, { useState } from 'react';
import { Text, SafeAreaView, Dimensions, View, StyleSheet, ScrollView, FlatList, ImageBackground} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const table = ({ route }) => {

   // get saved settings
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Chart');
      if (value !== null) {   
        setShow(value);
      } else {
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



  // text info fo show (Chart)
  const [show, setShow] = useState(getNameButton());



  // window size
  const [window, setWindow] = useState((Dimensions.get("window").width)-0);

  // array for results
  const [result, setresult] = useState([
  ]);

  //accept to create table
  const [createTable, setCreateTable] = useState(true);
  
  // update window size
  Dimensions.addEventListener('change', () => {
    setWindow((Dimensions.get("window").width)-0);
  });

  // bg image
  // const imageBg = require('../../background.png');

// data for chart
const data = {
  labels: [],
  datasets: [
    {
      data: []
    }
  ]
};



const createTableInfo = () => {
  let sumNewYear = route.params.invest;
  let sumStart = route.params.invest;
  let persentProfit = (route.params.persentProfit / 100);
  let sumEndYear = 0;
  let sumProfit = 0;
  let sumIndex = 0;
  let persentIndex = (route.params.persentIndex / 100);

    // table head
    result.push( { 
      year: 'Рік',
      sumStart: 'Сума вкладу',
      sumIndex: '% індексації',
      profit : '% дохідності',
      sumByYear: 'Кінецева сума'
    });

  for(let i=1; i<=route.params.years; i++){
    // складний відсоток
    sumNewYear = sumStart + sumEndYear;
    sumProfit = sumNewYear * persentProfit;
    sumEndYear = sumNewYear + sumProfit;

    // індексація
    if(i>1){
      sumIndex = sumStart * persentIndex;
      sumStart += sumIndex;
    }
    
      // Новий елемент в кінець масива для виводу
    result.push( { 
      year: i,
      sumStart: sumStart.toFixed(2),
      sumIndex: sumIndex.toFixed(2),
      profit : sumProfit.toFixed(2), //new Intl.NumberFormat().format(...)
      sumByYear: sumEndYear.toFixed(2)
    });
  }
}

const drawChart = () =>{
  if (show == 'on') {
    return ( <BarChart
          data={data}
          width={window}
          height={220}
          yAxisSuffix="k"
          withHorizontalLabels = {true}
          withVerticalLabels = {true}
          chartConfig={chartConfig}
          showBarTops = {true}
          showValuesOnTopOfBars = {false}
          fromZero = {true}
          horizontalLabelRotation = {0}
          verticalLabelRotation = {0}
        />)
  }
  return 
}


// set data for chart
  const dataChart = () =>{
    for(let i=1; i<=route.params.years; i++){
      data.labels.push(result[i].year) ;
      data.datasets[0].data.push(result[i].sumByYear/1000);
    }
  }

  // lock copying table data
  if(createTable){
    createTableInfo();
    setCreateTable(false);
  }
  
  dataChart();

// table output style
const renderItem = ({item}) => (
  <View style={output.lineWrapper}>
    <Text style={output.year}>{item.year}</Text>
    <Text style={output.sumStart}>{item.sumStart}</Text>
    <Text style={output.profit}>{item.profit}</Text>
    <Text style={output.sumByYear}>{item.sumByYear}</Text>


    {/* <Text style={output.year}>{item.year}</Text>
    <Text style={output.sumStart}>{item.sumStart}</Text>
    <Text style={output.profit}>{item.profit}</Text>
    <Text style={output.sumByYear}>{item.sumByYear}</Text> */}

    {/* Індексація */}
    {/* <Text style={output.sumIndex}>{item.sumIndex}</Text> */}
    
  </View>
);
    return ( 
      <SafeAreaView>

        {/* chart */}
        <ScrollView>
        {/* <ImageBackground source={imageBg}  style={output.imageBg}> */}

          {/* chart output */}
          <View>
          {drawChart()}
          </View>
        

        {/* <View style={output.lineWrapper}> 
           <Text style={output.year}>Рік</Text>
          <Text style={output.sumStart}>Сума вкладу</Text>
          <Text style={output.profit}>% дохідності</Text>
          <Text style={output.sumByYear}>Кінецева сума</Text> */}

           {/* Індексація */}
            {/* <Text style={output.sumIndex}>{item.sumIndex}</Text> */}
    
        {/* </View> */}
       <View>
       <FlatList
        data={result}
        renderItem={renderItem}
        keyExtractor = {item => String(item.year)}
       />
       </View>
       {/* </ImageBackground> */}
       </ScrollView>
      </SafeAreaView>
  );
}

// config for chart
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 100) => `rgba(235, 14, 14, ${opacity})`,
  barPercentage: 1/2.5
}

// style for output
const output = StyleSheet.create({
    lineWrapper : {
      height : 50,
      flex : 1,
      flexDirection: 'row'
    },
    year : {
      textAlign: 'center',
      height : 50,
      lineHeight : 50,
      flex : 1,
      backgroundColor: '#E4E4E4',
      fontSize: 15
    },
    sumStart : {
     paddingLeft: 10,
      height : 50,
      lineHeight : 50,
      flex : 3,
      backgroundColor: '#EEEEEE',
      fontSize: 15
    },
    profit : {
      paddingLeft: 10,
      height : 50,
      lineHeight : 50,
      flex : 3.75,
      backgroundColor: '#E4E4E4',
      fontSize: 15
    },
    sumIndex : {
      paddingLeft: 10,
      height : 50,
      lineHeight : 50,
      flex : 3,
      backgroundColor: '#E4E4E4',
      fontSize: 15
    },
   sumByYear : {
      paddingLeft: 10,
      height : 50,
      lineHeight : 50,
      flex : 4.5,
      backgroundColor: '#EEEEEE',
      fontSize: 15
   },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    }
  });

 export default table;
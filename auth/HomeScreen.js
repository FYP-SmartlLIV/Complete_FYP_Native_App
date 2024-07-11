import { StyleSheet, Text, View,Button,ScrollView } from 'react-native'
import React, {useLayoutEffect}from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomPress from '../CustomPress';
import Ionicons from "@expo/vector-icons/Ionicons";
import NoticeBoard from '../components/NoticeBoard';
import Features from '../components/Features';
const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Smart Living',
      headerStyle: {
        backgroundColor: '#0b8793'
      },
      headerRight: () => (
        <CustomPress  onPress={() => {
              // Define action for header button press
              navigation.navigate('profile');
            }}>
                <Ionicons name="person-circle" size={40} color="white" />
        </CustomPress>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView className={styles.scrollView}>
      <NoticeBoard/>
      <Features/>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize:24,
    marginHorizontal:20
    
  },
  scrollView:{
    backgroundColor:"gray"
  }
})
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Module from './Module'
import {Colors} from '../constants/GlobalStyle'
const Features = () => {
  return (
    <View className='mx-4 flex-1 mb-10'>
      <Text className="text-2xl font-bold tracking-widelist mb-4">FEATURES</Text>
      <View className="flex-row items-center justify-center my-8 ">
        <Module title='Maintanance' color={Colors.dark_green} circle_icon={Colors.light_green}icon={require('../assets/icons/maintanance.png')} />
        <Module title='Visitor Access'icon={require('../assets/icons/Group.png')} color={Colors.primary_orange}circle_icon={Colors.light_orange}/>
        
      </View>
      <View className='flex-row justify-center items-center'>
      <Module title='Event Management' color={Colors.primary_blue} circle_icon={Colors.light_blue} icon={require('../assets/icons/Vector.png')}/>
      <Module title='Fire Alarm' color={Colors.primary_red} circle_icon={Colors.primary_peacch} icon={require('../assets/icons/fire.png')}/>
      </View>
    </View>
  )
}

export default Features
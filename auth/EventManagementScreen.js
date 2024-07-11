import { View, Text, ScrollView,Image,TouchableOpacity,KeyboardAvoidingView,TextInput,Button} from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useNavigation,useRoute} from '@react-navigation/native';
import {ChevronLeftIcon } from 'react-native-heroicons/outline';
import { Formik } from 'formik';
import CustomButton from "../components/ui/CustomButton";

const EventManagement = () => {
  const navigation = useNavigation(); 
  const {
    params:{
      title,
    }
  } = useRoute();

  useLayoutEffect(() => {navigation.setOptions({
    headerShown:false
  })},[]);
  return (
    <ScrollView className='flex-1'>
      <View className='relative'>
        <Image
          source={require('../assets/cover/Event.png')}
          className="w-full h-64 bg-gray-100 p-4 mt-4 "
        />
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 rounded-md bg-white'>
          <ChevronLeftIcon size={20} color='#213555'/>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-t-3xl">
        <View className='px-3 mt-3'>
          <Text className='text-[#213555] text-2xl font-extrabold'>Event Coordination</Text>
        </View>
        {/* Formik */}
            <KeyboardAvoidingView>
              {/* Guest Name */}
            <View className='px-3 mt-3 bg-white'>
              <Text className="text-[#213555]  text-2xl font-bold">What's your Event About?</Text>
              <Text className='text-sm mb-2'>Specify your name of your event.</Text>
              <TextInput className='border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] '
              placeholder='What is the Event about?' 
              />
              
              {/* Description */}
              <View>
              <Text className="text-[#213555]  text-2xl font-bold my-2">Description</Text>
              <TextInput className='border border-[#213555] rounded-xl  bg-[#F4EEEE] h-36 '
              placeholder='Please provide us details about your upcoming event' 
              multiline
              style={{textAlignVertical:'top'}}
              />
              </View>
              {/* This space is for event calendar */}
              <View className='w-full h-36 justify-center items-center'>
                <Text className="font-bold">This space is for Calender and time area</Text>
              </View>
              <View className="mx-3 my-8 ">
              <CustomButton onPress={''}>Reserve your Event</CustomButton>
            </View>
            </View>

            </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

export default EventManagement
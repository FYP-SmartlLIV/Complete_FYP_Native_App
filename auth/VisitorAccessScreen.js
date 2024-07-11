import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import CustomButton from "../components/ui/CustomButton"
import {visitorDatabse} from "../api";
const MaintananceScreen = () => {
  const navigation = useNavigation();
  const {
    params: { title },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [inputValue, setInputValue] = useState({
    Address: "",
    Phone: "",
    ComplainType: "",
    Complain:""
  });
  function inputChangedHandler(inputIdentifier, enteredAmount) {
    setInputValue((currInputVal) => {
      return {
        ...currInputVal,
        [inputIdentifier]: enteredAmount,
      };
    });
  }
  const submitHandle = () => {
    const VisitorData = {
      Car_Plate:inputValue. Car_Plate,
      Guest_Number: +inputValue.Guest_Number,
      Guest_Cnic: +inputValue. Guest_Cnic,
      Guest_Name: inputValue. Guest_Name,
    
    };
    console.log(VisitorData);
    visitorDatabse(VisitorData);
    navigation.navigate('QrCode-Screen')
    
  };
  return (
    <ScrollView>
      <View className='relative'>
        <Image
          source={require('../assets/cover/vistors.png')}
          className="w-full h-60 bg-gray-100 p-4 mt-4 "
        />
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 rounded-md bg-white'>
          <ChevronLeftIcon size={20} color='#213555'/>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-t-3xl">
        <View className='px-3 mt-3'>
          <Text className='text-[#213555] text-2xl font-extrabold'>Visitor's Assistance</Text>
        </View>
        {/* Form */}
        <KeyboardAvoidingView>
              {/* Guest Name */}
            <View className='px-3 mt-3 bg-white'>
              <Text className="text-[#213555]  text-2xl font-bold">What's your guest name</Text>
              <Text className='text-sm mb-2'>Enter the name of anyone member</Text>
              <TextInput className='border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] '
              placeholder='Enter your guest Name'
              onChangeText={inputChangedHandler.bind(this,"Guest_Name")}
              value={inputChangedHandler.Guest_Name}
              />
              {/* CNIC Guest */}
              <Text className="text-[#213555]  text-2xl font-bold">Guest CNIC number</Text>
              <Text>Enter Guest CNIC Number</Text>
              <TextInput className='border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] '
              placeholder='xxxxx-xxxxxxx-x'
              onChangeText={inputChangedHandler.bind(this,"Guest_Cnic")}
              value={inputChangedHandler.Guest_Cnic}
              keyboardType='numeric'
              />
              {/* Guest Coming*/}
              <Text className="text-[#213555]  text-2xl font-bold">How Many Guest are Coming</Text>
              <Text>Enter Number of Guests</Text>
              <TextInput className='border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] '
              placeholder='Enter Number of Guest'
              onChangeText={inputChangedHandler.bind(this,"Guest_Number")}
              value={inputChangedHandler.Guest_Number}
              keyboardType='numeric'
              />

              {/* Description */}
              <View>
              <Text className="text-[#213555]  text-2xl font-bold">Guest Vehicle Number</Text>
              <Text>Enter guest vehicle number</Text>
              <TextInput className='border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] '
              placeholder='eg: KHI-548'
              onChangeText={inputChangedHandler.bind(this,"Car_Plate")}
              value={inputChangedHandler.Car_Plate}
              />
              </View>
              <View className="mx-3 my-8 ">
              <CustomButton onPress={submitHandle}>Generate Qr Code</CustomButton>
            </View>
            </View>

            </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default MaintananceScreen;

const pickerStyle = {
  inputIOS: {
    color: "black",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  placeholder: {
    color: "black",
  },
  inputAndroid: {
    color: "black",
    paddingHorizontal: 10,
    backgroundColor: "#F4EEEE",
    borderRadius: 10,
    padding: 5,
    borderColor: "#213555",
  },
};

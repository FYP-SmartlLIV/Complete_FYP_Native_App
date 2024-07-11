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
  import RNPickerSelect from "react-native-picker-select";
  import {postToDatabase} from "../api";
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
      const ComplainData = {
        Address: inputValue.Address,
        Phone: +inputValue.Phone,
        ComplainType: inputValue.ComplainType,
        Complain:inputValue.Complain
      };
      console.log(ComplainData);
      postToDatabase(ComplainData);
    };
    return (
      <ScrollView>
        <View className="relative flex-1">
          <Image
            source={require("../assets/cover/maintanance.png")}
            className="w-full h-60 bg-gray-100 p-4 mt-4 "
            transition={false}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 rounded-md bg-white"
          >
            <ChevronLeftIcon size={20} color="#213555" />
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-t-3xl">
          <View className="px-3 mt-3">
            <Text className="text-[#213555] text-2xl font-extrabold">
              Post Complain
            </Text>
            <Text className="text-[#777777] text-center my-4 mx-4 text-base">
              We Apologies that you have a complain for us But we will make sure
              to resolve it as soon as possible{" "}
            </Text>
          </View>
          {/* Form */}
          <KeyboardAvoidingView>
            <View className="px-3 mt-3 bg-white">
              <Text className="text-[#213555]  text-2xl font-bold">
                What is your Address?
              </Text>
              <TextInput
                className="border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] "
                placeholder="Enter your current Address"
                onChangeText={inputChangedHandler.bind(this,"Address")}
                value={inputChangedHandler.Address}
              />
              <Text className="text-[#213555]  text-2xl font-bold">
                What's your Phone Number?
              </Text>
              <TextInput
                className="border border-[#213555] rounded-xl p-1.5 my-2 bg-[#F4EEEE] "
                placeholder="03xx-xxxxxxx"
                onChangeText={inputChangedHandler.bind(this,"Phone")}
                value={inputChangedHandler.Phone}
                keyboardType="numeric"
              />
              {/* Type Box */}
              <View className="my-3">
                <Text className="text-[#213555]  text-2xl font-bold">
                  Complain Type
                </Text>
                <View className="border border-[#213555] rounded-xl">
                  <RNPickerSelect
                      onValueChange={(value) => inputChangedHandler('ComplainType', value)}
                    items={[
                      { label: "Maintanace", value: "Maintanace" },
                      { label: "Electricity", value: "Electricity" },
                      { label: "Savrage", value: "Savrage" },
                      { label: "Water", value: "Water" },
                      { label: "Others", value: "Others" },
                    ]}
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyle}
                    
                  />
                </View>
              </View>
  
              {/* Description */}
              <View>
                <Text className="text-[#213555]  text-2xl font-bold">
                  Description
                </Text>
                <TextInput
                  className="border border-[#213555] rounded-xl  bg-[#F4EEEE] h-36 "
                  placeholder="Please give us some details about your issue..."
                  onChangeText={inputChangedHandler.bind(this, "Complain")}
                  multiline
                  style={{ textAlignVertical: "top" }}
                  autoCorrect={false}
                />
              </View>
              <View className="mx-3 my-4 ">
                <CustomButton onPress={submitHandle}>Post Complain</CustomButton>
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
  
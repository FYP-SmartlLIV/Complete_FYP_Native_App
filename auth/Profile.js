import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Image, TextInput,Alert} from "react-native";
import React,{useState,useEffect} from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {defaultStyles} from '../constants/Styles'
import Colors from "../constants/Colors";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';



const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const {user} = useUser();
  const [firstName,setFirstName] = useState(user?.firstName);
  const [lastName,setlastName] = useState(user?.lastName);
  const [email,setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit,setEdit] = useState(false);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  useEffect(()=>{
    if(!user) return;
    setFirstName(user.firstName);
    setlastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  },[user]);
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };
  
  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  const onCaptureImage = async()=>{
  const hasPermission = await verifyPermissions();

  if (!hasPermission) {
    return;
  }

  const image = await launchCameraAsync({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.5,
    base64: true,
  });

  if (!image.canceled) {
    const base64 = `data:image/png;base64,${image.assets[0].base64}`;
    user?.setProfileImage({
      file: base64,
    });
  }
};
  return (
    <SafeAreaView style={{marginTop:40}}>
    <View>
      <View style={styles.headerContainer}>
      <Text style={styles.header}>Profile</Text>
      </View>
      {user && (
        <View style={styles.card}> 
        <View>
          <Image source={{uri:user?.imageUrl}} style={styles.avatar}/>
          <TouchableOpacity onPress={onCaptureImage} style={styles.editAvatar}>
            <Ionicons name="add-circle" size={18}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',gap:6}}>
        {edit ? (
          <View style={styles.editRow}>
            <TextInput placeholder="First name" value={firstName || ''}
            onChangeText={setFirstName}
            style={[defaultStyles.inputField,{width:100}]}/>
             <TextInput placeholder="Last name" value={lastName || ''}
            onChangeText={setlastName}
            style={[defaultStyles.inputField,{width:100}]}/>
          <TouchableOpacity onPress={onSaveUser}>
            <Ionicons name="checkmark-outline" size={24} color={Colors.dark}/>
          </TouchableOpacity>
          </View>
        ):(
          <View style={styles.editRow}>
            <Text style={{fontSize:22}}> {firstName} {lastName}</Text>
            <TouchableOpacity onPress={()=>setEdit(true)}>
            <Ionicons name="create-outline" size={24} color={Colors.dark}/>
            </TouchableOpacity>
          </View>
        )}
        </View>
        <Text>{email}</Text>
        <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}
      {isSignedIn &&  <TouchableOpacity style={[styles.button,{marginHorizontal:24}]} onPress={()=>signOut()}>
      <Text style={styles.buttonText}>Log out</Text>
    </TouchableOpacity>}
     
    </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
    padding:24,
    alignItems: 'center',
    justifyContent: 'center',

  },
  header:{
    fontSize:24,
    fontWeight:'bold'

  },
  card:{
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
  },
  alignItems: 'center',
  gap: 14,
  marginBottom: 24,
},  
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: Colors.grey,
},
editRow: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},
button: {
  backgroundColor: '#213555', // Default button background color
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal:120,
  marginVertical:20
},
buttonText: {
  color: '#fff', // Default button text color
  fontSize: 16,
  fontWeight: 'bold',
},
editAvatar:{
  position: 'absolute',
  bottom: 3,
  right:3
}

});

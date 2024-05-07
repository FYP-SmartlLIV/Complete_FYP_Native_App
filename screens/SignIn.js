import { StyleSheet, Text, View,TextInput, KeyboardAvoidingView, TouchableOpacity, Image} from "react-native";
import { useSignIn } from '@clerk/clerk-expo';
import React,{useState} from "react";
import logo from '../assets/favicon.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const logo_image  = Image.resolveAssetSource(logo).uri

const SignIn = ({navigation}) => {
  const { signIn, setActive, isLoaded } = useSignIn();
const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const onSignInPress = async () =>{
  if (!isLoaded) {
    return;
  }
  setLoading(true);
  try {
    const completeSignIn = await signIn.create({
      identifier: emailAddress,
      password,
    });

    // This indicates the user is signed in
    await setActive({ session: completeSignIn.createdSessionId });
  } catch (err) {
    alert(err.errors[0].message);
  } finally {
    setLoading(false);
  }
    
}
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Image source={{uri:logo_image}} style={{width:100,height:100}}/>
        <Text style={styles.heading}>Smart Living</Text>
        <View style={styles.tvscreenBottom} />
      </View>
      <KeyboardAwareScrollView>
      <View  style={styles.card}>
        <Text style={styles.signIn}>Sign in</Text>
        <TextInput style={styles.inputField} placeholder='zajjaj.dev@coders.com' value={emailAddress} onChangeText={setEmailAddress}/>
        <TextInput style={[styles.inputField]} placeholder='enter password'value={password} onChangeText={setPassword}/>
        <TouchableOpacity style={styles.forgetPressable} onPress={()=> navigation.navigate('Reset')}>
        <Text style={styles.forget}>Forget password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
        <Text style={styles.description}>
       Dont have an account?{'  '}
       <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}>
        <Text style={styles.links} >
            Sign Up
        </Text>
        </TouchableOpacity>
        </Text>
     
      </View>
      </KeyboardAwareScrollView>
      
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#edeaea'
  },
  layout: {
    backgroundColor: "#0d0539",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  tvscreenBottom: {
    width: '60%',
    height: 150,
    backgroundColor: "#0d0539",
    position: "absolute",
    bottom: -90,
    borderRadius: 100,
    transform: [{ scaleX: 2 }, { scaleY: 0.5 }],
  },
  heading:{
    color:'#FFFFFF',
    fontSize:30,
    marginTop:20

  },
  card:{
    flex: 1,
    marginBottom:30,
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
signIn:{
  fontSize:24,
  fontWeight: 'bold',
  padding:20,
},
inputField: {
    marginVertical: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#213555',
    borderRadius: 12,
    padding:8,
    backgroundColor: '#fff',
    width:'100%'
  },
  forget:{
    color:'gray',

  },
  forgetPressable:{
    marginRight:-150
  },
  description: {
    fontSize:14,
    textAlign: "center",
    marginBottom: 80,
    color:'gray',
    
  },
  links: {
    color:'#1063FD',
  },
  button:{
    width:"100%",
    alignItems: "center",

  },
  buttonText:{
    fontSize:22,
    color:'#1063FD'
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

});

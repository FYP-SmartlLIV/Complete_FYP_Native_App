import { StyleSheet, Text, View,TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Button} from "react-native";
import React,{useState} from "react";
import logo from '../assets/favicon.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
const logo_image  = Image.resolveAssetSource(logo).uri
const SignIn = ({navigation}) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
      // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Spinner visible={loading}/>
      {!pendingVerification && (
        <>
         <View style={styles.layout}>
        <Image source={{uri:logo_image}} style={{width:100,height:100}}/>
        <Text style={styles.heading}>Smart Living</Text>
        <View style={styles.tvscreenBottom} />
      </View>
      <KeyboardAwareScrollView>
      <View  style={styles.card}>
        <Text style={styles.signIn}>Sign up</Text>
        <TextInput style={styles.inputField} placeholder='zajjaj.dev@coders.com' value={emailAddress} onChangeText={setEmailAddress}/>
        <TextInput style={[styles.inputField]} placeholder='enter password' value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
    <Text style={styles.description}>
        Read Our{' '}
        <Text style={styles.links}>
            Policy
        </Text>
        .{'Tap "Agree & Continue" to accept the '}
        <Text style={styles.links}>
        Terms of Service
        </Text>
        .
      </Text>
      </View>
      </KeyboardAwareScrollView>
        </>
      )}
     {pendingVerification && (
        <>
          <View style={styles.codeScreen}>
            <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
          
            <TouchableOpacity style={styles.button} onPress={onPressVerify}>
      <Text style={styles.buttonText}>Verify Code</Text>
    </TouchableOpacity>
          </View>
        </>
      )}
      
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#edeaea',
    // marginHorizontal:10
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
  codeScreen:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

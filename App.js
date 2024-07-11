import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,Button,Pressable} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./auth/HomeScreen";
import SignUpScreen from "./screens/SignUp";
import SignInScreen from "./screens/SignIn";
import MaintananceScreen from "./auth/MaintananceScreen";
import EventManagement from "./auth/EventManagementScreen";
import VisitorAccess from "./auth/VisitorAccessScreen";
import FireAlarm from "./auth/FireAlarmScreen";
import profile from "./auth/Profile";
import { useState } from "react";
import PwReset from "./screens/Reset";
import { NavigationContainer } from "@react-navigation/native";
import {ClerkProvider, useAuth} from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" component={HomeScreen}/>
      <Stack.Screen name="Maintanance" component={MaintananceScreen} />
      <Stack.Screen name="Event Management" component={EventManagement} />
      <Stack.Screen name="Visitor Access" component={VisitorAccess} />
       <Stack.Screen name="profile" options={{presentation:'modal'}} component={profile}/>
       <Stack.Screen name="Fire Alarm" component={FireAlarm} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Reset" component={PwReset} />
    </Stack.Navigator>
  );
};

export const Router = () => {
  const {isSignedIn, isLoaded} = useAuth();
  if(!isLoaded) return;
  console.log('isSignedIn',isSignedIn)
  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}tokenCache={tokenCache}>
  <Router />
  </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

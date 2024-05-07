import { StyleSheet, Text, View,Button } from 'react-native'
import React, {useLayoutEffect}from 'react'
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <Button
          onPress={() => {
            // Define action for header button press
            navigation.navigate('profile');
          }}
          title="Profile"
          color="#007AFF"
        />
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
import { View, Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Module = ({title,color,circle_icon,icon}) => {
  const navigation = useNavigation( )
  return (
   
    <TouchableOpacity onPress={()=>{
        navigation.navigate(`${title}`,{title})
       

    }}>
        <View className={`rounded-2xl  w-[150] h-[140] relative space-x-2 mx-4 ml-[-1]`} style={{ backgroundColor: color }}>
        <View className={`absolute rounded-full w-20 h-20 right-1 `}
        style={{ backgroundColor: circle_icon }}
        >
        <Image style={styles.icon}source={icon}/>
        </View>
        <Text className="absolute bottom-1 right-4 text-white font-semibold text-md">{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Module
const styles = StyleSheet.create({
  icon:{
    resizeMode: 'contain',
    width:50,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex:3,
    marginHorizontal:18,
    marginTop:12

  }
  
});

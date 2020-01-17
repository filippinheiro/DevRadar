import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, Region } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'
import { connect, disconnect } from '../services/socket'

function Main({ navigation }): JSX.Element {

   const [currentRegion, setCurrentRegion] = useState<Region | null>(null)
   const [devs, setDevs] = useState([])
   const [techs, setTechs] = useState('')

   useEffect(() => {
      async function loadInitialPosition(): Promise<void> {
         const { granted } = await requestPermissionsAsync()
         if (granted) {
            const { coords: { latitude, longitude } } = await getCurrentPositionAsync({
               enableHighAccuracy: true
            })
            setCurrentRegion({
               latitude,
               longitude,
               latitudeDelta: 0.04,
               longitudeDelta: 0.04
            })
         }
      }

      loadInitialPosition()
   }, [])


   if (!currentRegion) {
      return null
   }


   async function loadDev(): Promise<void> {
      const { latitude, longitude } = currentRegion
      const response = await api.get('/search', {
         params: {
            latitude,
            longitude,
            techs
         }
      })
      console.log('loading devs...')
      setDevs(response.data)
   }

   function handleRegionChange(region: Region) {
      console.log('Changing region...')
      setCurrentRegion(region)
   }

   return (
      <>
         <MapView
            style={styles.map}
            onRegionChangeComplete={handleRegionChange}
            initialRegion={currentRegion}>
            {devs.map(dev => {
               return (
                  <Marker
                     key={dev._id}
                     coordinate={{
                        latitude: dev.location.coordinates[1],
                        longitude: dev.location.coordinates[0]
                     }}>
                     <Image source={{
                        uri: dev.avatar_url
                     }} style={styles.avatar} />
                     <Callout onPress={() => {
                        navigation.navigate('Profile', {
                           github_username: dev.github_username
                        })
                     }}>
                        <View style={styles.callout}>
                           <Text style={styles.devMain}>{dev.name}</Text>
                           <Text style={styles.bio}>{dev.bio}</Text>
                           <Text style={styles.techs}>{dev.techs.join(', ')}</Text>
                        </View>
                     </Callout>
                  </Marker>
               )
            }
            )}
         </MapView>
         <View style={styles.searchForm}>
            <TextInput
               style={styles.searchInput}
               placeholder="Buscar devs por tecnologias"
               placeholderTextColor="#999"
               autoCapitalize="words"
               value={techs}
               onChangeText={setTechs}
               autoCorrect={false} />
            <TouchableOpacity style={styles.loadButton} onPress={() => {
               loadDev()
            }}>
               <MaterialIcons name="my-location" size={20} color={'#fff'} />
            </TouchableOpacity>
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   map: {
      flex: 1
   },
   avatar: {
      width: 54,
      height: 54,
      borderRadius: 4,
      borderWidth: 4,
      borderColor: '#fff'
   },
   callout: {
      width: 260
   },
   devMain: {
      fontWeight: 'bold',
      fontSize: 16
   },
   bio: {
      color: '#666',
      marginTop: 5
   },
   techs: {
      marginTop: 5
   },
   searchForm: {
      position: 'absolute',
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      zIndex: 5,
      flexDirection: 'row'
   },
   searchInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#fff',
      color: '#333',
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
         width: 4,
         height: 4
      },
      elevation: 2
   },
   loadButton: {
      width: 50,
      height: 50,
      backgroundColor: '#8e4dff',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
         width: 4,
         height: 4
      },
      elevation: 2
   }
})

export default Main
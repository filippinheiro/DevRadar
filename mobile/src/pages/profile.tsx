import React from 'react'
import { WebView } from 'react-native-webview'

function Profile({ navigation }): JSX.Element {

   const { github_username } = navigation.state.params

   return (
      <WebView style={{ flex: 1 }} source={{
         uri: `https://github.com/${github_username}`
      }} />
   )
}

export default Profile
import React, {Component} from 'react';
import {Text, View} from 'react-native';
// import LoginScreen from './src/screens/auth/LoginScreen';
// import NewPassword from './src/screens/auth/NewPassword';
// import OneTimePassword from './src/screens/auth/OneTimePassword';

// import ThemeProvider from './src/contexts/ThemeProvider';

import ContainerNavigation from './src/navigation/containers/ContainerNavigation';

class App extends Component {
  render() {
    return (
      <>
        <ContainerNavigation></ContainerNavigation>
      </>
    );
  }
}

export default App;

{
  /*
render(
  const {width , height , BGColor} = this.props
)

<TouchAbleOpacity style={[styles.login , {width : width , height:height , color : "red"}]} />
*/
}

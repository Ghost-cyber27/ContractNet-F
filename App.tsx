import {useEffect} from 'react';
import { RootNavigator } from './src/screens/navigation/RootNavigation';
import { api } from './src/services/clients'

export default function App() {

  useEffect(() => {
    const testing = async() => {
      const res = await api.get('/');

      console.log('Test: ', res.data);
    }

    testing();
  },[])

  return (
    <RootNavigator/>
  );
}
/*
<View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>

    email: Johndep3@gmail.com
    password: 12345678
*/

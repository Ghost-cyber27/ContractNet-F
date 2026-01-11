import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { 
    UserStackParamList, 
    AuthStackParamList, 
    RootStackParamList 
} from "../../types/types";
import UserTabs from "./UserTab";
import { DiscoverJobDetails } from "../user/components/discoverJobDetails";
import { ChatDetails } from "../user/components/chatDetails";
import { OnGoingProjectsDetails } from "../user/components/onProjectDetail";
import Login from "../auth/Login";
import SignUp from "../auth/Signup";
import ForgotPassword from "../auth/ForgotPassword";
import OTP from "../auth/OTP";
import Verification from "../auth/verification";
import { useAuthStore } from "../../services/AuthContext";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const UserStack = createNativeStackNavigator<UserStackParamList>();


export const AuthStackNav: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{
          headerShown: true,
          headerTitle: ''
          }} />
        <AuthStack.Screen name="OTP" component={OTP} options={{
          headerShown: true,
          headerTitle: ''
          }} />
        <AuthStack.Screen name="Verification" component={Verification} options={{
          headerShown: true,
          headerTitle: 'Verification'
          }} />
    </AuthStack.Navigator>
  );
};

export const AppStackNav: React.FC = () => {
  return (
      <UserStack.Navigator screenOptions={{ headerShown: false }}>
        <UserStack.Screen name="UserTabs" component={UserTabs} />
        <UserStack.Screen name="ChatDetails" component={ChatDetails} options={{headerShown: true}}/>
        <UserStack.Screen name="DiscoverJobDetails" component={DiscoverJobDetails} options={{
          headerShown: true,
          }}/>
        <UserStack.Screen name="OnGoingProjectsDetails" component={OnGoingProjectsDetails} options={{
          headerShown: true,
          headerTitle: 'OnGoing Project'
          }}/>
      </UserStack.Navigator>
  );
};

export  const RootNavigator: React.FC = () => {
  const { token, refresh, logout } = useAuthStore();

  useEffect(() => {
    const res = async() => {
      if (token && await refresh(token)) {
        logout(); // removes token
      }
    };

    res();
  },[token]);

    return(
        <NavigationContainer >
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {token 
            ? <RootStack.Screen name="User" component={AppStackNav} />
            : <RootStack.Screen name="Auth" component={AuthStackNav} />
            }
          </RootStack.Navigator>
        </NavigationContainer>
    );
}
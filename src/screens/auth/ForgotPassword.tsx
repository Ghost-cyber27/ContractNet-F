import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuthStore } from "../../services/AuthContext";
import { AuthStackParamList } from "../../types/types";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { api } from "../../services/clients";
import axios from "axios";

type AuthScreenNavigationProp = NavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const navigation = useNavigation<AuthScreenNavigationProp>()

    const fPassword = async() => {
        try {
            const res = await api.post('/auth/forgot-password',
                {
                    email: email
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res) {
                navigation.navigate('OTP',{email: email});
            }

            console.log("OTP sent");
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('API Error:', error.response.data); // <-- This is the key
                console.error('Status Code:', error.response.status);
            } else {
                console.error('An unknown error occurred:', error);
            }
            throw error;
        }
    };

    return(
        <SafeAreaView
            style={styles.container}
        >
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Forgot Password</Text>
            </View>
            <View style={styles.inputView}>
                <View style={styles.textInput}>
                    <AntDesign name="mail" size={24} color="black" style={styles.icon}/>
                    <TextInput
                        style={styles.texting}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => fPassword()}>
                <Text style={styles.btnText}>ENTER</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bgImg: {
        width: wp('150%'),
        height: hp('25%'),
    },
    backbtn: {
        bottom: hp('20%'),
        left: wp('5%'),
        backgroundColor: '#184d85',
        width: wp('20%'),
        height: hp('7%'),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerView: {
        margin: 5
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    inputView: {
        padding: 10
    },
    textInput: {
        borderWidth: 2,
        width: wp('95%'),
        height: hp('10%'),
        borderRadius: 10,
        borderColor: '#184d85',
        flexDirection: 'row',
        padding: 5,
        gap: wp('5%')
    },
    texting: {
        fontSize: 16
    },
    btn: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        left: wp('17%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    icon: {
        paddingTop: hp('2%')
    },
    iconPass: {
        position: "absolute",
        left: wp('80%'),
        paddingTop: hp('3%'),  
    },
});
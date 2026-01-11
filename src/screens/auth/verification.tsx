import {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../services/clients';
import { useAuthStore } from "../../services/AuthContext";

export default function Verification(){
    const [otp, setOtp] = useState(false);
    const [seconds, setSeconds] = useState(10);
    const [timeout, setTimeout] = useState(true);
    const email = ''; // gotten from signup screen
    const password = '';

    //implement a countdown
    const verify = async(text: string) => {
        if(text.length == 5){
            setOtp(true);
            console.log("ready set");
            const res = await api.post('verify-email', 
                {
                    email: '',
                    otp: text
                }
            );
            if(!res) return;

            console.log(res.data);

            await useAuthStore().login(email, password);
            
            setOtp(false);
        } 
        
    };

    useEffect(() => {
        if (seconds === 0) {
            setTimeout(false);
            return;
        };

        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.inputView}>
                <Text style={styles.inputText}>Enter OTP from Email</Text>
                <View style={styles.textInput}>
                    <AntDesign name="api" size={24} color="black" style={styles.icon}/>
                    <TextInput
                        style={styles.texting}
                        placeholder="example@email.com"
                        keyboardType="number-pad"
                        onChangeText={(text) => verify(text)}
                    />
                </View>
                {seconds == 0 
                ? <Text style={styles.time}>Done</Text> 
                : <Text style={styles.time}>Resend in: {seconds}</Text>
                }
            </View>
            <TouchableOpacity style={styles.btn} disabled={timeout}>
                {otp
                ? <ActivityIndicator size={'large'} color={'white'} /> 
                :<Text style={styles.btnText}>Resend OTP</Text>
                }
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    inputView: {
        gap: hp('5%'),
        padding: 10
    },
    inputText: {
        fontSize: 20,
        fontWeight: '700'
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
    btn: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        top: hp('2%'),
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
    texting: {
        fontSize: 16,
        width: wp('60%')
    },
    time: {
        fontStyle: 'italic'
    }
});
import { useState, useEffect, useCallback } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
 } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
//import { AllChats } from "../../services/message";
import { AntDesign } from "@expo/vector-icons";
import { UserStackParamList } from "../../types/types";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useAuthStore } from "../../services/AuthContext";
import { api } from "../../services/clients";

type UserScreenNavigationProp = NavigationProp<UserStackParamList, 'UserTabs'>;


interface Chat {
  other_user_id: number
  content: string
  is_read: boolean
  sent_at: string
}

export default function Chat(){
    const [message, setMessage] = useState<Chat[]>([]);
    const navigation = useNavigation<UserScreenNavigationProp>();
    const token = useAuthStore((s) => s.token);
    const myId = useAuthStore((s) => s.user.id);

    const loadMessages = async() => {
            try {
                const res = await api.get('/messages/chats',
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );

                if(!res)return;

                console.log('Chats: ', res.data);
                setMessage(res.data);

            } catch (error) {
                console.error(error);
            }
        };
    
    // useEffect(() => {
    //     const loadMessages = async() => {
    //         try {
    //             const res = await api.get('/messages/chats',
    //                 {
    //                     headers: {
    //                         "Authorization": `Bearer ${token}`,
    //                     }
    //                 }
    //             );

    //             if(!res)return;

    //             console.log('Chats: ', res.data);
    //             setMessage(res.data);

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     loadMessages();
    // }, []);

    useFocusEffect(
        useCallback(() => {
            loadMessages();  // refresh every time screen is focused
            //fetchNotifications();
        }, [])
    );

    return(
        <View style={styles.container}>
            {message.length > 0
            ? (
                <FlatList
                    data={message}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatView} 
                        onPress={() => navigation.navigate('ChatDetails',
                            {
                                receiver_id: item.other_user_id
                            }
                        )}
                        >
                            <View style={styles.img}>
                                <AntDesign name="message" size={30} color='black' />
                            </View>
                            <View>
                                <Text style={item.is_read ? styles.name : styles.unreadname}>User: {item.other_user_id}</Text>
                                <Text style={item.is_read ? styles.msg : styles.unreadmsg} numberOfLines={1}>{item.content}</Text>
                            </View>
                            <Text style={item.is_read ? styles.time : styles.unreadtime}>{item.sent_at.split("T")[1].slice(0, 5)}</Text>
                        </TouchableOpacity>
                    )}
                />
                )
                : (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '400'}}>No Chat ......</Text>
                    </View>
                ) 
            }
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    chatView: {
        margin: 5,
        padding: 5,
        top: hp('2%'),
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 2,
        borderRadius: 5
    },
    img: {
        width: wp('15%'),
        height: hp('7%'),
        borderRadius: 50,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: '300'
    },
    msg: {
        fontSize: 14,
        fontWeight: '300'
    },
    time: {
        fontSize: 14,
        fontWeight: '200',
        position: 'absolute',
        left: wp('85%')
    },
    unreadname: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    unreadmsg: {
        fontSize: 14,
        fontWeight: '700'
    },
    unreadtime: {
        fontSize: 14,
        fontWeight: '400',
        position: 'absolute',
        left: wp('85%'),
        top: hp('5%')
    },
});
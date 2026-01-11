import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    TextInput
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, RouteProp, useRoute, NavigationProp } from '@react-navigation/native';
import { UserStackParamList } from "../../../types/types";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from "../../../services/clients";
import { useAuthStore } from "../../../services/AuthContext";

type DetailsScreenNavigationProp = RouteProp<UserStackParamList, 'DiscoverJobDetails'>;

export function DiscoverJobDetails(){
    const route = useRoute<DetailsScreenNavigationProp>();
    const {id, client_name, budget, category, date, des, title} = route.params;
    const [modalView, setModalView] = useState(false);
    const token = useAuthStore((s) => s.token);
    const [bid, setBid] = useState('');
    const [proposal, setProposal] = useState('');

    const bidding = async() => {
        try {
            const res = await api.post('/bids',
                {
                    job_id: id,
                    bid_amount: bid,
                    proposal: proposal
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                },
            );

            if(!res) console.log("Failed to add");

            console.log("Good :", res);
        } catch (error) {
            console.error("Error: ", error);
        }
    };


    return(
        <SafeAreaView style={styles.container}>
            <View style={{
                padding: 5,
                gap: hp('1%')
            }}>
                <Text style={styles.h1}>{title}</Text>
                <Text style={styles.h2}>Category</Text>
                <Text style={styles.text}>{category}</Text>
            </View>
            <View style={styles.rollView}>
                <View>
                    <Text style={styles.h2}>Budget</Text>
                    <Text style={styles.text}><Text style={{color: 'green'}}>₦{budget}</Text></Text>
                </View>
                <View style={{
                    position: 'absolute',
                    left: wp('65%'),
                    top: hp('1%')
                }}>
                    <Text style={styles.h2}>Deadline</Text>
                    <Text style={styles.text}>{date}</Text>
                </View>
            </View>
            <View>
                {/*<Image
                    source={require(pic)}
                    style={styles.proImg}
                />*/}
                <View style={{
                    padding: 5,
                    gap: hp('1%')
                }}>
                    <Text style={styles.h2}>From</Text>
                    <Text style={styles.text}>{client_name}</Text>
                </View>
            </View>
            <View style={{
                padding: 5,
                gap: hp('1%')
            }}>
                <Text style={styles.h2}>Description</Text>
                <Text style={styles.text}>{des}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => setModalView(true)}>
                <Text style={styles.btnText}>Place Bid</Text>
            </TouchableOpacity>
            {/*For placing bid*/}
            <Modal
                visible={modalView}
                animationType="slide"
            >
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalText}>Place Your Bid</Text>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.textInput}>
                            <AntDesign name="dollar" size={24} color="black" style={styles.icon}/>
                            <TextInput
                                style={styles.texting}
                                placeholder="Bid-Amount"
                                keyboardType="number-pad"
                                onChangeText={(text) => setBid(text)}
                            />
                        </View>
                        <View style={styles.textInput}>
                            <AntDesign name="account-book" size={24} color="black" style={styles.icon}/>
                            <TextInput
                                style={styles.texting}
                                placeholder="Proposal"
                                keyboardType="default" //convert this to text area
                                onChangeText={(text) => setProposal(text)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => bidding()}>
                        <Text style={styles.btnText}>Submit Bid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalBtn, {marginTop: hp('1%')}]} onPress={() => setModalView(false)}>
                        <Text style={styles.btnText}>Cancel Bid</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5
    },
    headerImg: {
        width: wp('100%'),
        height: hp('20%'),
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 20,
        fontWeight: '500',
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
    },
    proImg: {
        width: wp('10%'),
        height: hp('5%'),
        resizeMode: 'cover',
        borderRadius: 50
    },
    rollView: {
        flexDirection: 'row',
        gap: wp('10%'),
        padding: 5,
    },
    btn: {
        position: 'absolute',
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        top: hp('80%'),
        left: wp('14%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    inputView: {
        gap: hp('5%'),
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
    icon: {
        paddingTop: hp('2%')
    },
    iconPass: {
        left: wp('5%'),
        paddingTop: hp('2%'),
        position: "absolute"
    },
    texting: {
        fontSize: 16,
        width: wp('60%')
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%')
    },
    modalText: {
        fontSize: 24,
        fontWeight: '700'
    },
    modalBtn: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        top: hp('1%'),
        left: wp('14%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBtnText: {}
});
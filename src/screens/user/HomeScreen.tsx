import { useState, useEffect, useCallback } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Modal, 
    ActivityIndicator,
    TextInput
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { UserStackParamList } from "../../types/types";

type UserScreenNavigationProp = NavigationProp<UserStackParamList, 'UserTabs'>;

export default function Dashboard(){
    const unread = 3;
    const [load, setLoad] = useState(false);
    const navigation = useNavigation<UserScreenNavigationProp>();
    
    const data = [
        {id: '1', title: 'Web Design', des: 'Design a website', budget: '200,000', deadline: '22/05/2025', status: 'Accepted'},
        {id: '2', title: 'Auditing Finance Books', des: 'Cross check for any error', budget: '150,000', deadline: '02/12/2025', status: 'Pending'},
        {id: '3', title: 'Mobile App Development', des: 'create an e-commerce', budget: '700,000', deadline: '19/08/2025', status: 'Rejected'}
    ];

    const statusChecker = (
        id: string,
        title: string,
        description: string,
        budget: string,
        deadline: string,
        status: string
    ) => {
        if (status == 'Accepted') {
            navigation.navigate('OnGoingProjectsDetails',
                {
                    id,
                    title,
                    des: description,
                    budget,
                    deadline,
                    status
                }
            );
        } else {
            console.log('Not accepted');
        }
    };

    if(load){
        return(
            <View
                style={{
                    backgroundColor: '#184d85',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1

                }}
            >
                <View
                style={{
                    width: wp('80%'),
                    height: hp('50%'),
                    backgroundColor: 'white',
                    elevation: 5,
                    padding: 5,
                    gap: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }}
                >
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="min ₦1,000 - max ₦10,000"
                            keyboardType="number-pad"
                            style={styles.texting}
                        />
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Withdraw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => setLoad(false)}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return(
        <ScrollView style={styles.container}>
            {/*Header*/}
            <View style={styles.topView}>
                <View style={styles.headerView}>
                    <View>
                        <Text style={styles.headerText}>Hello, Full_name</Text>
                        <Text>Occupation</Text>
                    </View>
                    <TouchableOpacity style={styles.notiBtn} onPress={() => console.log("true")}>
                        <AntDesign name="bell" size={25} color='black'/>
                        {unread > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{unread}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            {/*Dash*/}
            <View style={styles.dash}>
                <View style={styles.dashTop}>
                    <Text style={styles.dashText1}>Art & Design</Text>
                    <Text style={styles.dashText2}>{Date().slice(0,16)}</Text>
                </View>
                <View style={styles.dashView}>
                    {/*income $*/}
                    <View style={styles.dashCard1}>
                        <Text style={styles.dashCardText1}>Earning</Text>
                        <Text style={styles.dashCardText11}>₦254,23.2</Text>
                        <Text style={styles.dashCardText111}>Interest of 2% deduction</Text>
                        <Text style={styles.dashCardText111}>add something here</Text>
                        <TouchableOpacity style={styles.withbtn} onPress={() => setLoad(true)}>
                            <Text style={styles.withText}>Withdraw</Text>
                            <AntDesign name="arrow-right" size={24} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.dashCard2}>
                            <Text style={styles.dashCardText21}>Completed Jobs</Text>
                            <Text style={styles.dashCardText2}>2</Text>
                        </View>
                        {/*rating*/}
                        <View style={styles.dashCard3}>
                            <View style={{flexDirection: 'row'}}>
                                <AntDesign name="star" size={25} color='#184d85' />
                                <Text style={styles.dashCardText2}>4.5/5.0</Text>
                            </View>
                            <Text style={styles.dashCardText21}>Positive Rating</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/*Ongoing Projects*/}
            <View style={styles.pView}>
                <Text style={styles.pText}>Ongoing Project</Text>
                {/*use either bid or job*/}
                {data.map((item) => (
                    <TouchableOpacity 
                    key={item.id} 
                    style={styles.jobCard}
                    onPress={() => statusChecker(
                        item.id,
                        item.title,
                        item.des,
                        item.budget,
                        item.deadline,
                        item.status
                    )}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('../../../assets/job.png')}
                                style={styles.jobImg}
                            />
                            <View>
                                <Text style={styles.jobTitle}>{item.title}</Text>
                                <Text style={styles.jobDes}>{item.des}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', left: wp('3%')}}>
                            <Image
                                source={require('../../../assets/profile.jpg')}
                                style={styles.jobUserPic}
                            />
                            <Text style={styles.jobUserName}>Client Name</Text>
                            <Text style={styles.jobBudget}>₦ {item.budget}</Text>
                        </View>
                        <View style={{borderBottomWidth: 0.5, top: hp('1%')}}></View>
                        <View style={{flexDirection: 'row', marginTop: hp('3%')}}>
                            <View style={{
                                padding: 5,
                                backgroundColor: item.status === 'Accepted'
                                ? '#67ed49ff'
                                : item.status === 'Rejected' 
                                ? '#ed5949ff' 
                                : '#ddf31eff',
                                borderRadius: 7
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>
                                    {item.status}
                                </Text>
                            </View>
                            <Text style={styles.jobDead}>{item.deadline}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        width: wp('200%'),
        height: hp('15%'),
        //backgroundColor: '#184d85',
        padding: 5,
        gap: hp('5%')
    },
    headerView: {
        flexDirection: 'row',
        gap: wp('10%'),
        top: hp('5%')
    },
    headerText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'black'
    },
    notiBtn: {
        borderWidth: 1,
        borderRadius: 50,
        width: wp('11%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#184d85',
        left: wp('22%')
    },
    badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    justifyContent: "center",
    alignItems: "center"
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    dash: {
        padding: 5
    },
    dashTop: {
        flexDirection: 'row',
    },
    dashText1: {
        fontSize: 20,
        fontWeight: '400'
    },
    dashText2: {
        position: 'absolute',
        fontSize: 19,
        fontWeight: '400',
        fontStyle: 'italic',
        left: wp('57%'),
    },
    dashView: {
        width: wp('96%'),
        height: hp('45%'),
        backgroundColor: 'white',
        top: hp('1%'),
        elevation: 10,
        flexDirection: 'row',
        gap: wp('5%'),
        borderRadius: 5,
    },
    dashCard1: {
        width: wp('55%'),
        height: hp('45%'),
        backgroundColor: '#184d85',
        padding: 5,
    },
    dashCardText1: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    dashCardText11: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        top: hp('5%'),
    },
    dashCardText111: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: '400',
        top: hp('5%'),
    },
    dashCard2: {
        width: wp('33%'),
        height: hp('20%'),
        backgroundColor: 'white',
        marginTop: hp('2%'),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp('1%'),
        borderWidth: 1,
        borderColor: '#184d85'
    },
    dashCardText2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    dashCardText21: {
        fontSize: 15,
        fontWeight: '500'
    },
    dashCard3: {
        width: wp('33%'),
        height: hp('19%'),
        backgroundColor: 'white',
        marginTop: hp('2%'),
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#184d85'
    },
    pView: {
        top: hp('2%'),
        margin: 5,
        padding: 5
    },
    pText: {
        fontSize: 20,
        fontWeight: '500',
    },
    jobCard: {
        width: wp('90%'),
        height: hp('22%'),
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 5,
        borderWidth: 2,
        padding: 5
    },
    jobImg: {
        width: wp('20%'),
        height: hp('7%'),
        resizeMode: 'center'
    },
    jobBudget: {
        position: 'absolute',
        fontSize: 16,
        fontWeight: '500',
        left: wp('60%'),
        top: hp('1%'),
        color: 'green'
    },
    jobDead: {
        fontSize: 16,
        fontWeight: '500',
        left: wp('37%'),
        top: hp('1%'),
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '500'
    },
    jobDes: {
        fontSize: 16,
        fontWeight: '400'
    },
    jobUserPic: {
        width: wp('10%'),
        height: hp('5%'),
        resizeMode: 'center',
        borderRadius: 50
    },
    jobUserName: {
        fontSize: 16,
        fontWeight: '300',
        top: hp('1%'),
    },
    withbtn: {
        width: wp('50%'),
        height: hp('7%'),
        borderRadius: 10,
        backgroundColor: '#3f79b8ff',
        flexDirection: 'row',
        gap: wp('5%'),
        top: hp('10%'),
        left: hp('0.5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    withText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
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
        width: wp('70%'),
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
    texting: {
        fontSize: 16,
        width: wp('60%')
    },
});
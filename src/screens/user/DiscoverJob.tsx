import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { truncate } from '../../utils/functions';
import { useAuthStore } from '../../services/AuthContext';
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { UserStackParamList } from "../../types/types";
import { api } from '../../services/clients';

type UserScreenNavigationProp = NavigationProp<UserStackParamList, 'UserTabs'>;

type Jobs = {
    id: number;
    client_id: number;
    client_name: string;
    title: string;
    description: string;
    category: string;
    budget: string;
    deadline: string;
    status: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
};

export default function DiscoverJobs(){
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation<UserScreenNavigationProp>();
    const [jobs, setJobs] = useState<Jobs[]>([]);
    const [bestMatch, setBestMatch] = useState<Jobs[]>([]);
    const cat = useAuthStore((s) => s.user.category);

    useEffect(() => {
        const data = async() => {
            const res = await api.get('/jobs');
            console.log(cat);

            if(!res) console.log('failed');

            if (res.data.category == cat) {
                setBestMatch(res.data);
                console.log('best match saved');
            }

            setJobs(res.data);
            console.log('Jobs: ', res.data);
        }

        data();
    }, []);

    const MostRecent = [
        {id: '1', user: 'Bennick Josh', pic: require('../../../assets/profile.jpg'), title: 'Create a Logo for a company', budget: '150,000', date: '02/05/2025', category: 'Design & Creative', des: 'Create a Logo for a company named The Guild'},
        {id: '2', user: 'Adeboye David', pic: require('../../../assets/profile.jpg'), title: 'Develop a website portfolio', budget: '450,000', date: '21/04/2025', category: 'Development & IT', des: 'Develop a website portfolio for a Sales Company'},
        {id: '3', user: 'Chritian Paul', pic: require('../../../assets/profile.jpg'), title: 'Writing a 500 word article', budget: '70,000', date: '11/04/2025', category: 'Writing & Translation', des: 'Writing a 500 word article for a news outlet'},
    ];
    const BestMatch = [
        {id: 1, user: 'Isaac Lekwot', pic: require('../../../assets/profile.jpg'), title: 'Vulnerability Assessment', budget: '150,000', date: '12/12/2025', category: 'Development & IT', des: 'Perform a Vulnerability Assessment on our website'},
        {id: 2, user: 'Keturah Jason', pic: require('../../../assets/profile.jpg'), title: 'Create a Mobile App for a product', budget: '700,000', date: '13/11/2025', category: 'Development & IT', des: 'Create a Mobile App for a product which is a fitness trend'},
        {id: 3, user: 'Keziah Kira', pic: require('../../../assets/profile.jpg'), title: 'Design our backend using FastApi', budget: '200,000', date: '07/10/2025', category: 'Development & IT', des: 'Design our backend using FastApi for our E-Commerce site'},
    ];

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/*Header*/}
                <View style={{marginTop: hp('2%')}}>
                    <Text style={{ fontSize: 24 }}>Discover Jobs</Text>
                </View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{
                            width: wp('50%'),
                            height: hp('8%'),
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: 2,
                            borderColor: isFocused ? 'white' : '#184d85'
                        }}
                        onPress={() => setIsFocused(false)}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '300',
                                color: isFocused ? 'black' : '#184d85'
                            }}
                        >Best Match</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: wp('50%'),
                            height: hp('8%'),
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: 2,
                            borderColor: isFocused ? '#184d85' : 'white'
                        }}
                        onPress={() => setIsFocused(true)}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '300',
                                color: isFocused ? '#184d85' : 'black'
                            }}
                        >Most Recent</Text>
                    </TouchableOpacity>
                </View>
                {isFocused 
                ? <View style={styles.content}>
                    <Text>Data for most recent</Text>
                    {jobs.map((item) => (
                        <TouchableOpacity 
                        style={styles.contentCard} 
                        key={item.id}
                        onPress={() => navigation.navigate('DiscoverJobDetails', 
                            {
                                id: item.id,
                                client_name: item.client_name,
                                budget: item.budget,
                                category: item.category,
                                date: item.deadline,
                                des: item.description,
                                title: item.title
                            }
                        )}
                        >
                            <View style={{flexDirection: 'row', gap: wp('1%')}}>
                                <Image
                                    source={require('../../../assets/profile.jpg')}
                                    style={styles.img}
                                />
                                <View style={{ 
                                    top: hp('1%') 
                                    }}>
                                    <Text style={styles.normText}>{item.client_name}</Text>
                                </View>
                                <View style={{ 
                                    position: 'absolute' ,
                                    left: wp('65%'), 
                                    top: wp('2%') 
                                    }}>
                                    <Text style={styles.lightText}>{item.deadline}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: hp('1%'), padding: 5}}>
                                <Text style={
                                    [
                                        styles.normText, 
                                        {
                                            fontSize: 26
                                        }
                                    ]
                                } numberOfLines={1}>{item.title}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', 
                                gap: wp('30%'), 
                                marginTop: hp('5%'),
                                alignItems: 'center',
                                justifyContent: 'center'
                                }}>
                                <View>
                                    <Text style={styles.lightText}>Budget</Text>
                                    <Text style={styles.normText}>₦{item.budget}</Text>
                                </View>
                                <View>
                                    <Text style={styles.lightText}>Category</Text>
                                    <Text style={styles.normText}>{truncate(item.category, 20)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                : <View style={styles.content}>
                    <Text>Data for best match</Text>
                    {jobs.map((item) => (
                        <View>
                            {item.category === cat
                            ? <TouchableOpacity 
                        style={styles.contentCard} 
                        key={item.id}
                        onPress={() => navigation.navigate('DiscoverJobDetails', 
                            {
                                id: item.id,
                                client_name: item.client_name,
                                budget: item.budget,
                                category: item.category,
                                date: item.deadline,
                                des: item.description,
                                title: item.title
                            }
                        )}
                        >
                            <View style={{flexDirection: 'row', gap: wp('1%')}}>
                                <Image
                                    source={require('../../../assets/profile.jpg')}
                                    style={styles.img}
                                />
                                <View style={{ 
                                    top: hp('1%') 
                                    }}>
                                    <Text style={styles.normText}>{item.client_name}</Text>
                                </View>
                                <View style={{ 
                                    position: 'absolute' ,
                                    left: wp('65%'), 
                                    top: wp('2%') 
                                    }}>
                                    <Text style={styles.lightText}>{item.deadline}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: hp('1%'), padding: 5}}>
                                <Text style={
                                    [
                                        styles.normText, 
                                        {
                                            fontSize: 25
                                        }
                                    ]
                                } numberOfLines={1}>{item.title}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', 
                                gap: wp('30%'), 
                                marginTop: hp('5%'),
                                alignItems: 'center',
                                justifyContent: 'center'
                                }}>
                                <View>
                                    <Text style={styles.lightText}>Budget</Text>
                                    <Text style={styles.normText}>₦{item.budget}</Text>
                                </View>
                                <View>
                                    <Text style={styles.lightText}>Category</Text>
                                   
                                    <Text style={styles.normText}>{item.category}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                            : <View></View>
                            }
                        </View>
                    ))}
                </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        marginTop: hp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
        gap: wp('1%')
    },
    content: {
        margin: 5,
        marginTop: hp('2%'),
        padding: 5,
        gap: hp('2%') 
    },
    contentCard: {
        width: wp('92%'),
        height: hp('27%'),
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 5,
        elevation: 5
    },
    normText: {
        fontSize: 16,
        fontWeight: '700'
    },
    lightText: {
        fontSize: 14,
        fontWeight: '300'
    },
    img: {
        width: wp('10%'),
        height: hp('5%'),
        resizeMode: 'cover',
        borderRadius: 50
    },
});
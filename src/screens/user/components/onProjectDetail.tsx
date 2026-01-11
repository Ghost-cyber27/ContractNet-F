import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export function OnGoingProjectsDetails(){
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{gap: hp('2%')}}>
                    <TouchableOpacity onPress={() => setFirst(true)}>
                        <Text style={styles.h1}>----------{'<'}Job details{'>'}----------</Text>
                    </TouchableOpacity>
                    {first && (
                        <View style={{gap: hp('1%'), padding: 5}}>
                            <Text style={styles.h2}>Title</Text>
                            <Text style={styles.text}>mmmmm</Text>
                            <Text style={styles.h2}>Category</Text>
                            <Text style={styles.text}>skjdv</Text>
                            <View style={{
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: wp('30%')
                                }}>
                                <View>
                                    <Text style={styles.h2}>Budget</Text>
                                    <Text style={styles.text}>₦ 200,000</Text>
                                </View>
                                <View>
                                    <Text style={styles.h2}>Deadline</Text>
                                    <Text style={styles.text}>20/05/2025</Text>
                                </View>
                            </View>
                            <Text style={styles.h2}>From</Text>
                            <Text style={styles.text}>Isaac Lekwot</Text>
                            <Text style={styles.h2}>Description</Text>
                            <Text style={styles.text}>ljsbdbsldvs sdlj vsldj vsldv lsdvljds lsf </Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={() => setSecond(true)}>
                        <Text style={styles.h1}>----------{'<'}Bid details{'>'}----------</Text>
                    </TouchableOpacity>
                    {second && (
                        <View style={{gap: hp('2%'), padding: 5}}>
                            <Text style={styles.h2}>Bid Amount</Text>
                            <Text style={styles.text}>₦ 150,000</Text>
                            <Text style={styles.h2}>Proposal</Text>
                            <Text style={styles.text}>jllvfblfs</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 16,
        fontWeight: '700'
    },
    text: {
        fontSize: 16,
        fontWeight: '400'
    }
});
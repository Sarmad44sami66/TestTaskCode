import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StatusBar,
    Pressable,
    TextInput,
    LogBox,
    Switch,
    Animated,
    Easing,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNSpeedometer from 'react-native-speedometer'
import FlashMessage, { showMessage } from 'react-native-flash-message';

import colors from '../../utils/colors'
import fonts from '../../fonts'
import styles from './styles'

LogBox.ignoreAllLogs(true)
StatusBar.setTranslucent(true)

const meterLabels = [
    {
        name: '1',
        labelColor: '#ff290000',
        activeBarColor: '#ff2900',
    },
    {
        name: '2',
        labelColor: '#f4ab4400',
        activeBarColor: '#f4ab44',
    },
    {
        name: '3',
        labelColor: '#00ff6b00',
        activeBarColor: '#00ff6b',
    },
]

const App = () => {

    const [regularPrice, setRegularPrice] = useState('')
    const [peekPrice, setPeekPrice] = useState('')
    const [meterValue, setMeterValue] = useState(0)
    const [isEnabledPublicHoliday, setIsEnabledPublicHoliday] = useState(false)
    const [isEnabledLongTermRental, setIsEnabledLongTermRental] = useState(false)
    const [longTermRentalPrice, setLongTermRentalPrice] = useState('')

    let animatedValue = new Animated.Value(0)

    useEffect(() => {
        if (meterValue != 0) {
            Animated.timing(animatedValue, {
                toValue: 1,
                easing: Easing.elastic(),
                duration: 600,
                useNativeDriver: true,
            }).start();
        }
    }, [meterValue])

    const showErrorMessage = (msg) => {
        showMessage({
            message: msg,
            type: 'danger',
        });
    }

    const verifyFields = () => {
        if (regularPrice.length == 0) {
            showErrorMessage('Regular price (daily) is required');
            return false
        }
        else if (peekPrice.length == 0) {
            showErrorMessage('Peek price (daily) is required');
            return false
        }
        else if (isEnabledLongTermRental && longTermRentalPrice.length == 0) {
            showErrorMessage('Long term rental price (monthly) is required');
            return false
        }

        return true
    }

    const onNextPress = () => {
        if (verifyFields()) {
            let value = 0
            let regularPriceTemp = parseInt(regularPrice)
            let peekPriceTemp = parseInt(peekPrice)
            if (regularPriceTemp >= 55 && regularPriceTemp <= 70) value += (25 - (Math.abs(62.5 - regularPriceTemp)))
            if (peekPriceTemp >= 75 && peekPriceTemp <= 90) value += (25 - (Math.abs(82.5 - peekPriceTemp)))
            if (isEnabledPublicHoliday) value += 25
            if (isEnabledLongTermRental) value += 25
            setMeterValue(value)
        }
    }

    const renderMeter = () => {

        const marginBottomTemp = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -90],
        })

        return (
            <Animated.View
                style={{
                    ...styles.meterContainer,
                    transform: [{ translateY: marginBottomTemp }],
                }}>
                <RNSpeedometer
                    value={meterValue}
                    size={100}
                    labels={meterLabels}
                    labelStyle={{ color: '#00000000' }}
                />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={styles.meterText}>
                        <Text style={{ fontFamily: fonts.Museo700 }}>
                            {'Good Demand: '}
                        </Text>
                        {'Based on your settings you are on your way to attract good level of demand.'}
                    </Text>
                </View>
            </Animated.View>
        )
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
                <View style={styles.headerStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.pricing}>{'Pricing'}</Text>
                            <Feather name={'chevron-down'} size={25} color={'white'} style={{ marginLeft: 7 }} />
                        </View>
                        <Pressable>
                            <Text style={styles.saveAndExit}>{'Save & Exit'}</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.headerDetailsText}>{'Enter the price that you want to charge for renting out your car.'}</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar} />
                    </View>
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.scrollView}>
                    <Text style={styles.inputTitle}>{'Regular Price (Daily) *'}</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputDollar}>{'$'}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={regularPrice}
                            onChangeText={(text) => {
                                setRegularPrice(text)
                            }}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={styles.inputInfoContainer}>
                        <FontAwesome5 name={'info-circle'} size={22} color={colors.secondary} />
                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                            <Text style={styles.inputInfoText}>
                                {'Our pricing algorithm recommends price between $55 - 70 to maximise demand basis your car type and location'}
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.inputTitle, { marginTop: 20 }]}>{'Peak Price (Daily) *'}</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputDollar}>{'$'}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={peekPrice}
                            onChangeText={(text) => {
                                setPeekPrice(text)
                            }}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={styles.inputInfoContainer}>
                        <FontAwesome5 name={'info-circle'} size={22} color={colors.secondary} />
                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                            <Text style={styles.inputInfoText}>
                                {'Peak price allow you to charge extra for weekends or holidays. Recommended peak price for your car is between $75-90.'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.horizontalDivider} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchTitle}>
                            {'Set peak price on public holidays'}
                        </Text>
                        <Switch
                            trackColor={{ false: "#E6E6E6", true: colors.primary }}
                            thumbColor={"#FFFFFF"}
                            ios_backgroundColor="#E6E6E6"
                            onValueChange={() => {
                                setIsEnabledPublicHoliday(!isEnabledPublicHoliday)
                            }}
                            value={isEnabledPublicHoliday}
                        />
                    </View>
                    <Text style={styles.switchInfo}>
                        {'Automatically apply peak prices on public holidays.'}
                    </Text>
                    <View style={styles.horizontalDivider} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchTitle}>
                            {'Long Term Rental'}
                        </Text>
                        <Switch
                            trackColor={{ false: "#E6E6E6", true: colors.primary }}
                            thumbColor={"#FFFFFF"}
                            ios_backgroundColor="#E6E6E6"
                            onValueChange={() => {
                                setIsEnabledLongTermRental(!isEnabledLongTermRental)
                            }}
                            value={isEnabledLongTermRental}
                        />
                    </View>
                    <Text style={styles.switchInfo}>
                        {'Allow guests to book your car for long term, ie greater than 2 months.'}
                    </Text>
                    {isEnabledLongTermRental &&
                        <Text style={[styles.inputTitle, { marginTop: 20 }]}>{'Long Term Rental Price (Monthly) *'}</Text>
                    }
                    {isEnabledLongTermRental &&
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputDollar}>{'$'}</Text>
                            <TextInput
                                style={styles.inputStyle}
                                value={longTermRentalPrice}
                                onChangeText={(text) => {
                                    setLongTermRentalPrice(text)
                                }}
                                keyboardType={'number-pad'}
                            />
                        </View>
                    }
                </ScrollView>
                {renderMeter()}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    paddingBottom: 30,
                    backgroundColor: colors.background
                }}>
                    <Pressable style={[styles.buttonStyle, { width: 44, marginRight: 10 }]}>
                        <FontAwesome5 name={'arrow-left'} size={22} color={colors.primary} />
                    </Pressable>
                    <Pressable
                        style={[styles.buttonStyle, { flex: 1, backgroundColor: colors.primary }]}
                        onPress={() => {
                            onNextPress()
                        }}>
                        <Text style={styles.buttonText}>
                            {'Next'}
                        </Text>
                    </Pressable>
                </View>
                <FlashMessage position="bottom" floating={true} />
            </View>
        </>
    );
};

export default App;

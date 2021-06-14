import { StyleSheet, Dimensions, } from 'react-native';

import colors from '../../utils/colors'
import fonts from '../../fonts'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    headerStyle: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerDetailsText: {
        marginTop: 15,
        fontSize: 13,
        lineHeight: 16,
        color: colors.white,
        fontFamily: fonts.Museo300
    },
    scrollView: {
        backgroundColor: colors.background,
        width: '100%',
        padding: 20,
        flexGrow: 1,
        paddingBottom: 120
    },
    progressBarContainer: {
        marginTop: 20,
        borderRadius: 7,
        height: 14,
        backgroundColor: '#ffffff54'
    },
    pricing: {
        fontSize: 18,
        lineHeight: 22,
        color: 'white',
        fontFamily: fonts.Museo500
    },
    saveAndExit: {
        fontSize: 14,
        lineHeight: 17,
        color: '#FFCD05',
        fontFamily: fonts.Museo700
    },
    progressBar: {
        borderRadius: 7,
        height: 14,
        backgroundColor: '#FFCD05',
        width: '43%'
    },
    meterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        paddingVertical: 10,
        backgroundColor: '#EFF7F8'
    },
    meterText: {
        fontSize: 13,
        lineHeight: 16,
        color: '#026786',
        fontFamily: fonts.Museo300
    },
    inputTitle: {
        color: colors.secondary,
        fontSize: 13,
        lineHeight: 22,
        fontFamily: fonts.Museo300
    },
    inputDollar: {
        color: colors.secondary,
        fontSize: 16,
        lineHeight: 22,
        fontFamily: fonts.Museo500
    },
    inputContainer: {
        backgroundColor: colors.white,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 4,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        color: colors.secondary,
        fontSize: 16,
        fontFamily: fonts.Museo500
    },
    inputInfoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    inputInfoText: {
        color: colors.secondary,
        fontSize: 13,
        lineHeight: 16,
        fontFamily: fonts.Museo300
    },
    buttonStyle: {
        height: 44,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 19,
        color: colors.white,
        fontFamily: fonts.Museo700
    },
    horizontalDivider: {
        marginVertical: 20,
        width: width,
        height: 1,
        backgroundColor: '#EFEFEF',
        alignSelf: 'center'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    switchTitle: {
        fontSize: 16,
        lineHeight: 19,
        color: colors.secondary,
        fontFamily: fonts.Museo500
    },
    switchInfo: {
        fontSize: 13,
        lineHeight: 16,
        color: colors.secondary,
        fontFamily: fonts.Museo300
    }
});

export default styles;
require ("./../lib/swisscalc.lib.format.js");
require ("./../lib/swisscalc.lib.operator.js");
require ("./../lib/swisscalc.lib.operatorCache.js");
require ("./../lib/swisscalc.lib.shuntingYard.js");
require ("./../lib/swisscalc.display.numericDisplay.js");
require ("./../lib/swisscalc.display.memoryDisplay.js");
require ("./../lib/swisscalc.calc.calculator.js");

import React from 'react'
import {StyleSheet, Dimensions, PanResponder, View,StatusBar, TouchableOpacity,Text } from 'react-native';
import {CalcButton, CalcDisplay} from './../components';

const {width ,height} = Dimensions.get('window');
export default class CalculatorScreen extends React.Component {
    constructor(props){
        super(props);

        this.state={
            display: "0",
        };

        this.oc = swisscalc.lib.operatorCache;
        this.calc = new swisscalc.calc.calculator();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
              onPanResponderRelease: (evt, gestureState) => {
                if(Math.abs(gestureState.dx) >= 50){
                    this.onBackspacePress();
                }
              },
        });
	
    }
    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({ display: this.calc.getMainDisplay()});
    }
    onClearPress = () => {
        this.calc.clear();
        this.setState({ display: this.calc.getMainDisplay()});
    }
    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({ display: this.calc.getMainDisplay()});
    }
    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay()});
    }
    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({ display: this.calc.getMainDisplay()});
    }
    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() });
    }
    onBackspacePress = () => {
        this.calc.backspace();
        this.setState({ display: this.calc.getMainDisplay() });
    }
    render() {
        return (
        <View style={styles.container}>
           <StatusBar barStyle='light-content' />
            <View style={styles.displayContainer}{...this.panResponder.panHandlers}>
                <CalcDisplay display={this.state.display} />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => { this.onClearPress()}}title="C" color="black" backgroundColor="lightgray"/>
                    <CalcButton onPress={() => { this.onPlusMinusPress()}} title="+/-" color="black" backgroundColor="lightgray"/>
                    <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="%" color="black" backgroundColor="lightgray"/>
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator)}} title="÷" color="white" backgroundColor="orange"/>
                </View>

                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => { this.onDigitPress("7")}} title="7" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onDigitPress("8")}} title="8" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onDigitPress("9")}} title="9" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.MultiplicationOperator)}} title="x" color="white" backgroundColor="orange"/>
                </View>

                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => { this.onDigitPress("4")}} title="4" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onDigitPress("5")}} title="5" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onDigitPress("6")}} title="6" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.SubtractionOperator)}}title="-" color="white" backgroundColor="orange"/>
                </View>
                
                <View style={styles.buttonRow}>
                    <CalcButton onPress={() => { this.onDigitPress("1")}} title="1" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onDigitPress("2")}} title="2" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onDigitPress("3")}} title="3" color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.AdditionOperator)}} title="+" color="white" backgroundColor="orange"/>
                </View>
                
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => { this.onDigitPress("0")}} >
                    <View style={{
                        margin:5,
                        justifyContent: 'center', 
                        width: (width / 2) - 20, 
                        height: (width / 4) - 20, 
                        backgroundColor: '#464646',
                        borderRadius: ((width / 4) - 20) / 2,}}>
                            <Text style={{
                            marginLeft: 30,
                            alignItems:'center',
                            color:'#fff',
                            fontSize: 32,}}>0</Text>
                    </View>
                    </TouchableOpacity>
                   
                    <CalcButton onPress={() => { this.onDigitPress(".")}} title="." color="white" backgroundColor="#464646"/>
                    <CalcButton onPress={() => { this.onEqualsPress()}} title="=" color="white" backgroundColor="orange"/>
                </View>
            </View>
            

        </View>
        );
        }
      }
      
      const styles = StyleSheet.create({
        container: { flex: 1 ,backgroundColor: 'black' },
        buttonRow: { flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 17, },
        displayContainer: {flex: 1, justifyContent:'flex-end' },
        buttonContainer: { paddingBottom: 10}
      });
      

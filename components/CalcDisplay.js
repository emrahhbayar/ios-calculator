import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class CalcDisplay extends Component {

    static defaultProps = {
        display: "",
    }
    render() {
        return (
            <View style= {styles.container}>
                <Text style= {styles.display}>{this.props.display}</Text>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container: { paddingRight: 30},
    display: { fontSize: 70, color: "white", textAlign: 'right'}
})

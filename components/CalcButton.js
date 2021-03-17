import React from 'react'
import { Text, Dimensions , TouchableOpacity, StyleSheet} from 'react-native'

const {width ,height} = Dimensions.get('window');

export default class CalcButton extends React.Component {
    
    static defaultProps = {
        onPress: function(){ },
        title: "",
        color: "white",
        backgroundColor: "black",
        style:{ }
    }


    render() {
         
        var bc = this.props.backgroundColor;
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.container , {backgroundColor: bc}, {...this.props.style}]}>
                <Text style={[styles.text , {color: this.props.color}]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems:'center', justifyContent: 'center', 
    width: width/4 -20 , height: ((width/ 4)-20), borderRadius: ((width/ 4)-20)/2, margin: 5},
    text: { fontSize:30 , fontWeight: '200'}
})

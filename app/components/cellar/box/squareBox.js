import React from 'react';
import {Text,StyleSheet,ScrollView,TouchableOpacity,View,Dimensions} from 'react-native';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const secondDegreResolution = (a,b,c) => {
    const delta = Math.pow(b,2) - 4*a*c
    const a1 = 1/(2*a) * (-b - Math.pow(delta,0.5))
    const a2 = 1/(2*a) * (-b + Math.pow(delta,0.5))
    return Math.max(a1,a2)
}

const Square = ({yShift,xShift,totalWidth,boxHeight,totalHeight}) => (
    <>
        <View style={{...styles.sides,
            height:(boxHeight),
            transform: [{translateX:(totalWidth/2 + 2*(xShift+1))},{translateY:-1-yShift}]
        }} />
        <View style={{...styles.sides,
            height:(boxHeight),
            transform: [{translateX:-(totalWidth/2 + 2*xShift + 2)},{translateY:-1-yShift}]
        }} /> 
        
        <View style={{...styles.sides,
            width:(boxHeight),
            height:2,
            transform: [{translateY:(totalWidth/2 + 2*xShift + 2)},{translateY:-1-yShift}]
        }} />
        <View style={{...styles.sides,
            width:(boxHeight),
            height:2,
            transform: [{translateY:-(totalWidth/2 + 2*xShift + 0)},{translateY:-1-yShift}]
        }} /> 
    </>
)
const Triangle = ({rotate,translateX,translateY,widthBottle,xShift,yShift,totalHeight,totalWidth,nbLines}) => {
    const lines = [...Array(nbLines).keys()]
  
    const arrayOfBottle = lines.reduce((arr,_) => {
        const lineArray = [...Array(arr.length+1).keys()];
        return [...arr,lineArray]
    },[])
    return (
        <View style={[styles.box, {
            height: totalHeight,
             width: totalWidth,
            transform: [{ rotate: rotate }, {translateX} , {translateY}]
          }]}>
        {arrayOfBottle.map((lineBottle,i) => (
            <View key={i} style={{flexDirection:"row",justifyContent:"center",alignItems:'center'}}>
            {lineBottle.map((_,j) => (
                <View key={j} style={{...styles.bottle,
                    width:widthBottle,
                    height:widthBottle,
                    borderRadius:widthBottle,
                    marginHorizontal:xShift,
                    marginVertical:-yShift
                }}></View>
            ))}
            </View>
           
        ))}
    </View>
)
}
const SquareBox = ({nbBottles=100}) => {
    const nbLines = parseInt(secondDegreResolution(2,2,-nbBottles));
    const widthBottle = 20;

    // find size of the square that lives between stack : which correspond to 2*xShift (horiz margin betw bottles)
    const xShift = Math.round(secondDegreResolution(1,widthBottle,-1*Math.pow(widthBottle/2,2)));
    // yShift is calculated to meet minus vertical margin between stacks
    const yShift = 1/4*(widthBottle-2*xShift)


    const totalHeight = nbLines % 2 === 0 ? 
    ((parseInt(nbLines/2))*widthBottle) + (2*xShift*(parseInt(nbLines/2)-1))  + (widthBottle-2*yShift)
    :
    ((parseInt(nbLines/2)+1)*widthBottle) + (2*xShift*(parseInt(nbLines/2)))

    const totalWidth = nbLines*(widthBottle + (2*xShift));
    const boxHeight = 2*(totalHeight + xShift) -2
    const shift = 0.5*(totalWidth - totalHeight) + 2*xShift + yShift -2
    
    return (

    <View style={{...styles.container,
        height: 2*totalHeight + 50}}>
        <Square 
            yShift={xShift/Math.pow(2,0.5)}
            xShift={xShift}
            totalWidth={totalWidth}
            boxHeight={boxHeight}
        />
        <View style={{alignItems:"center"}}>
        <Triangle  
                rotate={'0deg'} 
                translateX={0} 
                translateY={0} 
                yShift={yShift}
                xShift={xShift}
                totalWidth={totalWidth}
                totalHeight={totalHeight}
                boxHeight={boxHeight}
                nbLines={nbLines}
                widthBottle={widthBottle}
            />
            <Triangle  
                rotate={'90deg'} 
                translateX={-shift} 
                translateY={shift} 
                yShift={yShift}
                xShift={xShift}
                totalWidth={totalWidth}
                totalHeight={totalHeight}
                boxHeight={boxHeight}
                nbLines={nbLines}
                widthBottle={widthBottle}
            />
            <Triangle  
                rotate={'180deg'} 
                translateX={0} 
                translateY={2*shift} 
                yShift={yShift}
                xShift={xShift}
                totalWidth={totalWidth}
                totalHeight={totalHeight}
                boxHeight={boxHeight}
                nbLines={nbLines}
                widthBottle={widthBottle}
            />
            <Triangle  
                rotate={'-90deg'} 
                translateX={shift} 
                translateY={shift} 
                yShift={yShift}
                xShift={xShift}
                totalWidth={totalWidth}
                totalHeight={totalHeight}
                boxHeight={boxHeight}
                nbLines={nbLines}
                widthBottle={widthBottle}
            />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
    },
    sides: {
        width:2,
        position:'absolute',
        backgroundColor:'red',
        zIndex:3
    },
    square : {
        position:'absolute',
        borderColor:'red',
        borderWidth:1,
        zIndex:3
    },
    box: {
        borderColor:'black',
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
        // borderColor:'black',
        // borderWidth:1
      },
    bottle:{
        backgroundColor:'green',
        borderColor:'black',
        borderWidth:1,
    },
    triangle : {
        
    }
});

export default SquareBox;
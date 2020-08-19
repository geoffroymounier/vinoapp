import React from 'react';
import {Text,StyleSheet,ScrollView,TouchableOpacity,View,Dimensions} from 'react-native';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const secondDegreResolution = (a,b,c) => {
    const delta = Math.pow(b,2) - 4*a*c
    const a1 = 1/(2*a) * (-b - Math.pow(delta,0.5))
    const a2 = 1/(2*a) * (-b + Math.pow(delta,0.5))
    return Math.max(a1,a2)
}




const Cross = ({yShift,xShift,totalWidth,boxHeight,vSplit,hSplit}) => (
    <>
        <View style={{...styles.sides,
            height:(boxHeight+yShift)*Math.pow(2,0.5),
            transform: [{ rotate: '45deg' },{translateY:yShift}],
        }} />
        <View style={{...styles.sides,
            height:(boxHeight+yShift)*Math.pow(2,0.5),
            transform: [{ rotate: '-45deg' },{translateY:-yShift}]
        }} />
        {vSplit[2] && 
        <View style={{...styles.sides,
            height:(boxHeight),
            transform: [{translateX:(totalWidth/2 + 2*(xShift+1))}]
        }} />}
        {vSplit[0] && 
        <View style={{...styles.sides,
            height:(boxHeight),
            transform: [{translateX:-(totalWidth/2 + 2*xShift + 2)}]
        }} /> 
         }
        {hSplit[2] && 
        <View style={{...styles.sides,
            width:(boxHeight),
            height:2,
            transform: [{translateY:(totalWidth/2 + 2*xShift + 2)}]
        }} />}
        {hSplit[0] && 
        <View style={{...styles.sides,
            width:(boxHeight),
            height:2,
            transform: [{translateY:-(totalWidth/2 + 2*xShift + 2)}]
        }} />}
         {hSplit[1] && <View style={{...styles.sides,
            width:(boxHeight),
            height:2
        }} />}
        {vSplit[1] && <View style={{...styles.sides,
            height:(boxHeight),
        }} />}
 
    </>
)
const Triangle = ({rotate,translateX,translateY,widthBottle,xShift,yShift,totalHeight,totalWidth,nbLines,isHalf}) => {
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
                    opacity : (!!isHalf && j*isHalf === isHalf*(lineBottle.length - 1)/2) ? 0 : 1,
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
const CrossBox = ({nbBottles=69,hSplit=[true,true,true],vSplit=[true,true,true],hWrap=[0,0],vWrap=[false,false]}) => {
    const nbLines = parseInt(secondDegreResolution(2,2,-nbBottles)+1);
    const widthBottle = 30;
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
        height:hWrap[0] ? 0.5*boxHeight : boxHeight,width:vWrap[0] || vWrap[1] ? 0.5*boxHeight : boxHeight,alignItems:vWrap[1] ? "flex-end" : "flex-start",justifyContent:"flex-end",overflow:'hidden'
        }}>
         
        <View style={{...styles.container,
        height: boxHeight,width:boxHeight
        }}>
        
        <Cross 
            yShift={yShift}
            xShift={xShift}
            vSplit={vSplit}
            hSplit={hSplit}
            totalWidth={totalWidth}
            boxHeight={boxHeight}
        />
        <View style={{alignItems:"center"}}>
            <Triangle  
                rotate={'0deg'} 
                translateX={0} 
                translateY={yShift} 
                yShift={yShift}
                isHalf={vSplit[1] || vWrap[1] || vWrap[0]}
                xShift={xShift}
                totalWidth={totalWidth}
                totalHeight={totalHeight}
                boxHeight={boxHeight}
                nbLines={nbLines}
                widthBottle={widthBottle}
            />
            <Triangle  
                rotate={'90deg'}
                isHalf={hSplit[1] && -1}
                translateX={-shift+yShift} 
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
                isHalf={vSplit[1] || vWrap[1] || vWrap[0]}
                translateX={0} 
                translateY={2*shift-yShift} 
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
                translateX={shift-yShift} 
                translateY={shift} 
                isHalf={hSplit[1] && 1}
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
    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'yellow',
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
    },
    sides: {
        width:2,
        position:'absolute',
        backgroundColor:'red',
        zIndex:3
    },
    box: {
        borderColor:'black',
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
      },
    bottle:{
        backgroundColor:'green',
        borderColor:'black',
        borderWidth:1,
    },
    triangle : {
        
    }
});

export default CrossBox;
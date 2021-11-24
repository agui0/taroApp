// import { Component, useState, } from "react";
import { FC } from '@tarojs/taro';
import { View, Text } from "@tarojs/components";

type infoProp = {
  name: string;
  age: number;
}
const Index: FC<infoProp> = (props) => {
  const {name, age} = props;
  return (
    <View>
      <Text>{name}</Text>
      <Text>{age}</Text>
    </View>
  )
}
export default Index;

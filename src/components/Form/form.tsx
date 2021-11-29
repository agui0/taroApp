import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ReactNode } from 'react';


export type FormProps = {
  value?: Record<string, any>
  children?: ReactNode
  labelWidth?: number // 有labelwidth则放一行显示，没传的分两行上下显示
}
export type FormRef = {
  validate(): boolean
}

const Form: FC<FormProps> = (props) => {
  const { children } = props;
  console.log('children', children);
  
  return (
    <View>
      {children}
    </View>
  )
}

export default Form;
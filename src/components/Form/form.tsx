import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ReactNode, useState } from 'react';
import FormContent from './content';

export type FormProps = {
  value?: Record<string, any>
  children?: ReactNode
  labelWidth?: number // 有labelwidth则放一行显示，没传的分两行上下显示
}
export type FormRef = {
  validate(): boolean
}

const Form: FC<FormProps> = (props) => {
  const { children, labelWidth } = props;
  console.log('children', props);
  const [invalidNames, setInvalidNames] = useState<string[]>([])
  
  return (
    <FormContent.Provider value={{labelWidth, invalidNames}}>
      <View>
        {children}
      </View>
    </FormContent.Provider>
  )
}

export default Form;
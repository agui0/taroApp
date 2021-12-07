import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ReactNode, useState, forwardRef, useImperativeHandle, isValidElement, ReactElement } from 'react';
import { nodeToArray } from '@/utils/helper';
import FormContent from './content';
import { FormItemProp } from './item';

export type FormProps = {
  value?: Record<string, any>
  children?: ReactNode
  labelWidth?: number // 有labelwidth则放一行显示，没传的分两行上下显示
}
export type FormRef = {
  validate(): boolean
}

const Form = (props: FormProps, ref) => {
  const { value, children, labelWidth } = props;
  // console.log('children', props);
  const [invalidNames, setInvalidNames] = useState<string[]>([]);
  const childrenNode = nodeToArray(children).filter(isValidElement);
  const validateItems = childrenNode.filter((item: ReactElement<FormItemProp>) => {
    const itemProps = item.props
    return itemProps.required && itemProps.name
  }) as Array<React.ReactElement<FormItemProp>>
  // console.log('value', value);
  
  useImperativeHandle(ref, (): FormRef => ({
    validate: () => {
      const names = validateItems.filter((item) => {
        const { name } = item.props;
        const itemValue = value?.[name!];
        return itemValue !== 0 && !itemValue;
      }).map(item => item.props.name) as string[];
      setInvalidNames(names);
      return names.length <= 0;
    },
  }));
  
  return (
    <FormContent.Provider value={{labelWidth, invalidNames}}>
      <View>
        {children}
      </View>
    </FormContent.Provider>
  )
}

export default forwardRef(Form);
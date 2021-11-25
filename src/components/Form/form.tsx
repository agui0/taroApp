import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

export type FormProp = {
  label: string;
}

const Form: FC<FormProp> = (props) => {
  const { children} = props;
  return (
    <View>
      {children}
    </View>
  )
}

export default Form;
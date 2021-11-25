import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';

export type FormItemProp = {
  label: string;
}

const FormItem: FC<FormItemProp> = (props) => {
  const { label, children } = props;
  return (
    <View>
      <View>{label}</View>
      <View>
        {children}
      </View>
    </View>
  )
}

export default FormItem

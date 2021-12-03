import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import formContent from './content';
import styles from './item.module.less'

export type FormItemProp = {
  label: string;
}

const FormItem: FC<FormItemProp> = (props) => {
  const { label, children } = props;
  console.log('FormItem props',  props);
  
  return (
    <formContent.Consumer>
      {(ctx) => {
        console.log('ctx', ctx);
        return (
          <View className={styles.formItem}>
            <View className={styles.labelName}>{label}</View>
            <View className={styles.itemContent}>
              {children}
            </View>
          </View>
        )
      }}
    </formContent.Consumer>
  )
}

export default FormItem

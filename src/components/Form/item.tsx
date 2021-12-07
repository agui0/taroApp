import { FC, pxTransform } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { isNum } from '@/utils/is';
import { CSSProperties } from 'react';
import classNames from 'classnames';
import formContent from './content';
import styles from './item.module.less'

export type FormItemProp = {
  label: string;
  name?: string; // 字段名
  message?: string; // 校验失败信息展示
  required?: boolean; // 是否必传是项
  asterisk?: boolean; // label前是否显示*
  labelWidth?: number;
  labelStyle?: CSSProperties;
  labelClass?: string;
  childrenBorder?: boolean;
  className?: string;
}

const FormItem: FC<FormItemProp> = (props) => {
  const { name, label, children, required, asterisk, message, labelClass, className, childrenBorder=true } = props;
  // console.log('FormItem props',  props);
  
  return (
    <formContent.Consumer>
      {(ctx) => {
        // console.log('ctx', ctx);
        const labelWidth = props.labelWidth || ctx?.labelWidth;
        const labelStyle = (isNum(labelWidth))
            ? { width: `${pxTransform(labelWidth)}`, ...props.labelStyle }
            : props.labelStyle;

        const cc = classNames(styles.itemContent, {
          [styles.childrenBorder]: childrenBorder
        });

        const ic = classNames(styles.formItem, className, {
          [styles.row]: isNum(labelWidth)
        })
        return (
          <View className={ic}>
            <View className={classNames(styles.labelName, labelClass)} style={labelStyle}>
              {required && asterisk && <Text className={styles.required}>*</Text>}
              {label}
            </View>
            <View className={cc}>
              <View>
                {children}
              </View>
              {
                (name && ctx?.invalidNames?.includes(name) && required) ? (
                  <View className={styles.alert}>
                    {message ?? `请输入${label}`}
                  </View>
                ) : null
              }
            </View>
          </View>
        )
      }}
    </formContent.Consumer>
  )
}

export default FormItem

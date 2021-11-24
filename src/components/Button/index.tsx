import { Button as TaroButton, ButtonProps as taroButtonProps } from '@tarojs/components';
import { FC } from '@tarojs/taro';
import classNames from 'classnames'
import styles from './index.module.less'

export type ButtonProps = {
  mode?: 'primary' | 'text',
}
const Button: FC<ButtonProps & taroButtonProps> = ({
  children,
  mode = 'primary',
  disabled,
  className,
  ...restProps
}) => {
  
  const bc = classNames(
    styles.button,
    {
      [styles.primaryButton]: !disabled && mode === 'primary',
      [styles.textButton]: !disabled && mode === 'text',
      [styles.disabledButton]: disabled
    },
    className,
  )
  
  return <TaroButton {...restProps} className={bc} hoverClass='none' disabled={disabled} >{children}</TaroButton>
}

export default Button

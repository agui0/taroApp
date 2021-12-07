import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { FC } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { SwipeEventData, useSwipeable } from "react-swipeable"
import { useWinSize, useXState, useSwipeX } from "@/utils/hooks";
import Button from "@/components/Button";
import Form from "@/components/Form";
import ItemInfo from "./components/itemInfo";
import "./index.less";


const Index: FC = () => {
  
  const [count, setCount] = useXState(0);
  let start = 0
  let distance = 0
  const [rightWidth, setRightWidth] = useState(0)
  const [right, setRight] = useState(0)
  const [formData, setFormData] = useState({
    name: '陈先生',
    age: null,
  });
  // const { x, handlers } = useSwipeX({ padding: 12, dir: "rtl" });
  const rightRef = useRef<HTMLDivElement>();
  const formRef = useRef(null);
  
  useEffect(() => {
    const node = rightRef.current
    if (node) {
      setRightWidth(node.clientWidth)
    }
    // console.log('formRef', formRef);
  }, [rightRef])
  const handlers = useSwipeable({
    onSwiping: (evt: SwipeEventData) => {
      // 最大只能移动整个rightWidth的宽度
      console.log('evt', evt);
      
      setRight(Math.max(-rightWidth, right + evt.deltaX))
    },
    onSwipeStart: (evt) => (start = evt.deltaX),
    onSwiped: (evt) => {
      distance = evt.deltaX - start
      // 移动x > rightWidth一半以上时 直接左移到底或右移到底
      if (Math.abs(distance) >= (rightWidth / 2)) {
        setRight(distance < 0 ? -rightWidth : rightWidth)
      }
    }
  })
  
  // const win = useWinSize();
  const list = [
    {
      name: "小明",
      age: 11,
    },
    {
      name: "小红",
      age: 12,
    },
    {
      name: "小李",
      age: 13,
    },
  ];
  const ChildItemInfo = useMemo(
    () =>
      list.map((item, index) => {
        return <ItemInfo key={index} {...item}></ItemInfo>;
      }),
    []
  );
  // console.log('right', right);
  const saveHandle = () => {
    const isValid = formRef?.current?.validate();
    // console.log(isValid);
    
  }
  return (
    <View>
      <Button a={1} className='btn' size='mini' >按钮</Button>
      <View>{count}</View>
      <View className='swiperWrap' {...handlers}>
        <View
          className='swiper'
          style={{ transform: `translateX(${right}px)` }}
          // style={{ transform: `translateX(${Math.min(0, right)}px)` }}
        ></View>
      </View>
      <View
        onClick={() =>
          setCount(
            (p) => {
              return p + 1;
            },
            (newState) => {
              console.log(newState);
            }
          )
        }
      >
        add
      </View>
      {ChildItemInfo}
      <Form labelWidth={140} ref={formRef} value={formData}>
        <Form.Item label='姓名' name='name'>{formData.name}</Form.Item>
        <Form.Item label='年龄' name='age' required asterisk>{formData.age}</Form.Item>
      </Form>
      <Button onClick={() => saveHandle()}>保存</Button>
      {/* <ItemInfo name="小陈" age={11}></ItemInfo> */}
      {/* {list.map((item, index) => {
        return <ItemInfo key={index} {...item}></ItemInfo>;
      })} */}
    </View>
  );
};
export default Index;

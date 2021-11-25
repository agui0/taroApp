import { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';


export type SwipeXOptions = {
  padding?: number; // 左右的间距
  dir?: 'ltr' | 'rtl'; // 方向 左to右 右to左
};

export function useSwipeX(options: SwipeXOptions = {}) {
  const { padding = 20, dir = 'ltr' } = options;
  const valueByDir = (value: number): number => {
    // 根据方向计算值，ltr为正数，rtl为负数
    return dir === 'ltr' ? value : -value;
  };
  const [x, setX] = useState(valueByDir(padding));
  const [pos, setPos] = useState(valueByDir(padding)); // 记录起始点
  const [width, setWidth] = useState(0); // 元素宽度

  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, [ref.current?.clientWidth]);

  const left = padding; // 左边最小值
  const right = window.innerWidth - width - padding; // 右边最小值
  const mid = window.innerWidth / 2; // 屏幕的一半

  const handlers = useSwipeable({
    trackMouse: true,
    onSwiping: (evt) => {
      console.log('evt', evt);
      
      if (['Left', 'Right'].includes(evt.dir)) {
        let offset = pos + evt.deltaX;
        offset = Math.min(valueByDir(left), offset); // 不能小于最左边
        offset = Math.max(valueByDir(right), offset); // 不能大于最右边
        console.log('offset', offset);
        setX(offset);
      }
    },
    onSwiped: () => {
      // 当前x超过一半屏幕时，左移动或右移动至边
      const position = Math.abs(x) > mid ? valueByDir(right) : valueByDir(left);

      setX(position);
      setPos(position);
    },
  });

  const handlersRef = handlers.ref; // handlers已经用了ref, 存一下它的ref

  handlers.ref = (element: HTMLElement) => {
    // 重写它的ref
    ref.current = element; // set 给我们的ref
    handlersRef(element);
  };

  return {
    x,
    handlers,
  };
}

export function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  useEffect(() => {
    window.addEventListener('resize', onresize);
    return () => {
      window.removeEventListener('resize', onresize);
    }
  });

  const onresize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);

  return {
    size,
  }
}

export function useXState(initSatae) {
  // console.log('init useXState');
  const [state, setState] = useState(initSatae);
  const isUpdate = useRef();
  const setXState = (status, cb) => {
    // console.log('setXState', status);
    setState((pre) => {
      isUpdate.current = cb;
      return typeof status === 'function' ? status(pre) : status;
    });
  };
  useEffect(() => {
    // console.log('init useEffect');
    if (isUpdate.current) {
      // console.log('update', state);
      isUpdate?.current(state);
    }
  });
  return [state, setXState]
}


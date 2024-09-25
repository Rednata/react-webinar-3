import useStore from "./use-store";
import { useEffect, useMemo, useState } from "react";
import shallowequal from "shallowequal";

export default function useSelector(selector, desc = '') {
  const store = useStore();

  const [state, setState] = useState(() => {
    return selector(store.getState())
  })

  const unsubscribe = useMemo(() => {
    return store.subscribe(() => {
      const newState = selector(store.getState());
      setState(prevState => {
        const eq = shallowequal(prevState, newState);
        // console.log(eq ?  `No changes - ${desc}` : `Changes - ${desc}`);
        return shallowequal(prevState, newState) ? prevState : newState
      })
    })
  }, [])

  useEffect(() => unsubscribe, [unsubscribe])
   return state;
}

import { useState } from "react";

const useWipe = ({duration, amount}) => {
    const [state, setState] = useState({isWiped: false, duration: duration,  amount: amount})

    const style = {
        backfaceVisiblity: 'hidden',
        willCHange: 'clip-path',
        transition: `${state.duration}ms ease-out`,
        clipPath: `inset(0 ${state.isWiped?state.amount:0}% -1% 0)`,
        backgroundPositionX: `${state.isWiped?-state.amount:0}px`,
    }

    const trigger = (newState) => {setState({...state, ...newState})}

    return [style, trigger]
}

export default useWipe
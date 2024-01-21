import { RootState } from '@core/store';
import { increaseCounter } from '@core/store/reducers/counter.reducer';
import { useDispatch, useSelector } from 'react-redux';

function Counter() {
    const dispatch = useDispatch();
    const counter = useSelector((state: RootState) => state.counter.counter);

    return (
        <div>
            <button onClick={() => dispatch(increaseCounter(counter + 1))}>Increse</button>
            <button onClick={() => dispatch(increaseCounter(counter - 1))}>Decrese</button>
        </div>
    );
}

export default Counter;

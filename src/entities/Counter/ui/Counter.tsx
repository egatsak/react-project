import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { useCounterActions } from "../model/slice/counterSlice";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

export const Counter: FC = () => {
    const counterValue = useCounterValue();

    const { add, decrement, increment } = useCounterActions();
    const handleIncrement = () => {
        increment();
    };

    const handleDecrement = () => {
        decrement();
    };

    const handleAddFive = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleAddFive} data-testid="add5-btn">
                +5
            </Button>
            <Button onClick={handleIncrement} data-testid="increment-btn">
                +
            </Button>
            <Button onClick={handleDecrement} data-testid="decrement-btn">
                -
            </Button>
        </div>
    );
};

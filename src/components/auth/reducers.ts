export interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

export const initialValue = {
  value: "",
  isValid: false,
  isTouched: false,
};

const output = (value: string, isValid: boolean, isTouched: boolean) => {
  return {
    value,
    isValid,
    isTouched,
  };
};

export type ActionType =
  | { type: "USER_INPUT"; state: { value: string; isValid: boolean } }
  | { type: "INPUT_BLUR" }
  | { type: "RESET" };

export const inputReducer = (
  prevState: InputState,
  action: ActionType
): InputState => {
  if (action.type === "USER_INPUT") {
    return output(action.state.value, action.state.isValid, true);
  } else if (action.type === "INPUT_BLUR") {
    return output(prevState.value, prevState.isValid, true);
  } else {
    return initialValue;
  }
};
export const dobInitialValue = {
  date: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear() - 18,
};
export type DOBInputType = {
  date: number;
  month: number;
  year: number;
};
export type actionType =
  | { type: "date"; value: number }
  | { type: "month"; value: number }
  | { type: "year"; value: number };
export const dobReducer = (
  prevState: DOBInputType,
  action: actionType
): DOBInputType => {
  if (action.type === "date") return { ...prevState, date: action.value };
  if (action.type === "month") return { ...prevState, month: action.value };
  if (action.type === "year") return { ...prevState, year: action.value };
  else return dobInitialValue;
};

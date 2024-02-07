import { type FormEvent, useReducer, useState } from "react";
import Input from "../../ui/inputs/input";
import { initialValue, inputReducer } from "../reducers";
import { useAppDispatch } from "~/store";
import { login } from "~/store/auth";
import axios from "axios";
export default function SignUpInputs() {
  const [email, dispatchEmail] = useReducer(inputReducer, initialValue);
  const [password, dispatchPassword] = useReducer(inputReducer, initialValue);
  const [name, dispatchName] = useReducer(inputReducer, initialValue);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const signupHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "https://chatgptpromptmiddleware.onrender.com/api/authenticate/register",
        { fullName: name.value, email: email.value, password: password.value },
      );
      if (res.status === 201) {
        const resp = res.data as {
          result: { email: string; userId: string; name: string };
        };
        dispatch(
          login({
            email: resp.result.email,
            user_id: resp.result.userId,
            name: resp.result.name,
          }),
        );
      }
    } catch (error) {
      const errorMessage: string = (
        error as { response: { data: { message: string } } }
      ).response.data.message;
      setErrorMessage(errorMessage);
    }
  }
  return (
    <>
      <Input
        placeholder="Full Name"
        type="text"
        value={name.value}
        className="bg-transparent"
        dispatchInput={dispatchName}
        id="name"
      />
      <div className="relative">
        <Input
          placeholder="Email"
          type="email"
          value={email.value}
          className="bg-transparent pr-10"
          dispatchInput={dispatchEmail}
          id="email"
        />
      </div>
      <Input
        placeholder="Password"
        type="password"
        value={password.value}
        className="bg-transparent"
        dispatchInput={dispatchPassword}
        id="password"
      />
      {errorMessage !== "" && (
        <div className="text-center w-full text-black bg-red-300 rounded-lg py-2">{errorMessage}</div>
      )}
      <button
        onClick={signupHandler}
        className={`mt-3 w-full rounded-full bg-primary px-4 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Sign Up
      </button>
    </>
  );
}

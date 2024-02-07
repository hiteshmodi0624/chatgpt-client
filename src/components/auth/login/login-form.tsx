import { type FormEvent, useReducer, useState } from "react";
import Input from "../../ui/inputs/input";

import SubmitButton from "../../shared/buttons/submit-button";
import Link from "next/link";
import { inputReducer } from "../reducers";
import Heading from "~/components/ui/heading";
import { useAppDispatch } from "~/store";
import { login } from "~/store/auth";
import axios from "axios";
export default function SignInForm() {
  const initialValue = {
    value: "",
    isValid: false,
    isTouched: false,
  };
  const dispatch=useAppDispatch();
  const [email, dispatchEmail] = useReducer(inputReducer, initialValue);
  const [password, dispatchPassword] = useReducer(inputReducer, initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const signInHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "https://chatgptpromptmiddleware.onrender.com/api/authenticate/login",
        { email: email.value, password: password.value },
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
    <div className="mx-auto my-auto w-full max-w-lg border-[1px] border-seperator px-8 py-8 text-white ">
      <Heading text={`Sign In`} className="text-center font-normal" />
      <form className="mt-5 text-black">
        <Input
          placeholder="Email"
          type="email"
          value={email.value}
          className="bg-transparent"
          dispatchInput={dispatchEmail}
        />
        <Input
          placeholder="Password"
          type="password"
          isValid={password.isValid || !password.isTouched}
          value={password.value}
          className="bg-transparent"
          dispatchInput={dispatchPassword}
        />
        {errorMessage !== "" && (
          <div className="w-full rounded-lg bg-red-300 py-2 text-center text-black">
            {errorMessage}
          </div>
        )}
        <SubmitButton
          name="Sign in"
          disabled={false}
          onClickHandler={signInHandler}
        />
      </form>
      <p className="mt-3  text-center text-black">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-900">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

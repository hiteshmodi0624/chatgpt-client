import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState, useReducer, useRef } from "react";
import { inputReducer } from "~/components/auth/reducers";
import Input from "~/components/ui/inputs/input";
import { useAppDispatch, useAppSelector } from "~/store";
import { isAuthenticated, logout } from "~/store/auth";
import { IoSendSharp } from "react-icons/io5";
import ContentLoader from "react-content-loader"
import axios from "axios";


export default function AuthPage() {
  const dispatch=useAppDispatch();
  const auth=useAppSelector((state)=>state.auth);
  const router=useRouter();
  const [user, setUser] = useState<{
    email: string;
    name: string;
    user_id: string;
  } | null>(null);
  useEffect(() => {
    if (auth.isAuthenticated === undefined) {
      dispatch(isAuthenticated());
    } else if (auth.isAuthenticated === false) {
      router.push("/login");
    } else {
      setUser({ name: auth.name!, email: auth.email!, user_id: auth.user_id! });
    }
  }, [auth, dispatch, router]);
  const [loading, setLoading] = useState(false);
  const logoutHandler = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(logout());
  };
  const initialValue = {
    value: "",
    isValid: false,
    isTouched: false,
  };
  const [messages, addMessages] = useState<{ user: string; message: string }[]>(
    [],
  );
  const [input, dispatchInput] = useReducer(inputReducer, initialValue);
  const ref = useRef<HTMLDivElement>(null);
  const onSendHandler=async()=>{
    if (input.value !== ""){
      addMessages((prev) => [...prev, { user: "You", message: input.value }]);
      setLoading(true);
      const res=await axios.post("https://chatgptpromptmiddleware.onrender.com/api/chatgpt/request",{
        promptMessage:input.value,
        userId:user?.user_id
      })
      addMessages((prev) => [
        ...prev,
        { user: "ChatGPT", message: (res.data as { result: string }).result },
      ]);
      dispatchInput({ type: "RESET" });
      setLoading(false);
    }
    if (ref.current !== null)
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
  useEffect(()=>{
    setTimeout(() => {
      if (ref.current !== null)
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 10);
},[messages])
  return (
    <div className="flex h-dvh flex-col justify-between px-20 py-5">
      <div className="flex justify-between font-serif text-base font-bold text-black">
        {user?.name && <div>Hello {user?.name}</div>}
        <div className="flex space-x-4">
          <Link href="/requests">View Requests</Link>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className="relative mt-10 flex w-full flex-1 grow justify-center overflow-auto">
        <div className="w-full max-w-3xl space-y-4">
          {messages.map((msg, i) => {
            return (
              <div key={i} className="border-seperator">
                <h2 className="text-lg font-extrabold text-grey">{msg.user}</h2>
                <h2 className="pl-2 text-base">{msg.message}</h2>
              </div>
            );
          })}
          {loading && (
            <div className="border-seperator">
              <h2 className="text-lg font-extrabold text-grey">ChatGPT</h2>
              <ContentLoader
                speed={2}
                width={1000}
                height={160}
                backgroundColor="#f3f3f3"
                foregroundColor="#dfdcdc"
                className="mt-2 w-full pl-2"
              >
                <rect x="0" y="0" rx="3" ry="3" width="768" height="6" />
                <rect x="0" y="16" rx="3" ry="3" width="768" height="6" />
                <rect x="0" y="32" rx="3" ry="3" width="768" height="6" />
              </ContentLoader>
            </div>
          )}
          {messages.length === 0 && (
            <div className="relative -top-10 flex h-full w-full items-center justify-center text-3xl font-bold ">
              How can I help you today?
            </div>
          )}
          <div ref={ref} />
        </div>
      </div>
      <div className="relative flex w-full justify-center">
        <Input
          placeholder="Message ChatGPT"
          type="text"
          isValid={true}
          value={input.value}
          className="bg-transparent"
          outerClass="max-w-3xl w-full pr-8"
          dispatchInput={dispatchInput}
          onEnterPress={onSendHandler}
        />
        <button
          className="relative -left-8 -top-1.5 text-2xl"
          onClick={onSendHandler}
        >
          <IoSendSharp />
        </button>
      </div>
    </div>
  );
}

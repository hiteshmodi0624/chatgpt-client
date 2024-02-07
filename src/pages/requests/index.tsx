import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store";
import { isAuthenticated, logout } from "~/store/auth";
import DateFilter from "~/components/requests/datefilter";
import Data from "~/components/requests/data";
import Link from "next/link";

export default function AuthPage() {
  const dispatch=useAppDispatch();
  const auth=useAppSelector((state)=>state.auth);
  const router=useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (auth.isAuthenticated === undefined) {
      dispatch(isAuthenticated());
    } else if (auth.isAuthenticated === false) {
      router.replace("/login");
    } else {
      setUser({ name: auth.name!, email: auth.email!, user_id: auth.user_id! });
    }
  }, [auth, dispatch, router]);
  const logoutHandler = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(logout());
  };
  const [curr, setCurr] = useState("ALL");
  return (
    <div className="flex h-dvh flex-col px-20 py-5">
      <div className="flex justify-between font-serif text-base font-bold text-black">
        {user?.name && <div>Requests</div>}
        <div className="flex space-x-4">
          <Link href="/prompt">View Prompt</Link>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <DateFilter setCurr={setCurr} curr={curr} />
      {user && <Data curr={curr} userId={user.user_id} />}
    </div>
  );
}

export interface User {
  email: string;
  name: string;
  user_id: string;
}
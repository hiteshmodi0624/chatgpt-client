import SignInForm from "~/components/auth/login/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store";
import { isAuthenticated } from "~/store/auth";

export default function AuthPage() {
  const dispatch=useAppDispatch();
  const auth=useAppSelector((state)=>state.auth);
  const router=useRouter();
  useEffect(() => {
    if (auth.isAuthenticated === undefined) {
      dispatch(isAuthenticated());
    }else if (auth.isAuthenticated === true) {
      router.push("/prompt");
    }  
  }, [auth, dispatch, router]);
  return (
    <div className="w-dvh h-dvh justify-center items-center flex">
      <SignInForm />
    </div>
  );
}

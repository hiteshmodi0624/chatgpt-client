import Link from "next/link";
import SignUpInputs from "./signup-inputs";
import Heading from "~/components/ui/heading";
export default function SignUpForm() {
  return (
    <div className="border-seperator mx-auto my-auto w-full max-w-lg border-[1px] px-8 py-8 text-white">
      <Heading text={`Sign Up`} className="text-center font-normal" />
      <form className="mt-5 text-white">
        <SignUpInputs />
      </form>
      <p className="mb-5 mt-3 text-center text-black">
        Have an account already?{" "}
        <Link href="/login" className="text-blue-900">
          Log In
        </Link>
      </p>
    </div>
  );
}

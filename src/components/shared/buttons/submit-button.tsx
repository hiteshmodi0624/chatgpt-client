import { type FormEventHandler } from "react";

const SubmitButton = ({
  className,
  name,
  disabled,
  onClickHandler,
}: {
  className?: string;
  name: string;
  disabled: boolean;
  onClickHandler?: FormEventHandler;
}) => {
  return (
    <button
      type="submit"
      className={`my-3 w-full rounded-full bg-primary px-4 py-2 font-bold text-white disabled:cursor-not-allowed 
        disabled:opacity-40 ${className}`}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {name}
    </button>
  );
};
export default SubmitButton;

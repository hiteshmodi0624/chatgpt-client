import { type ForwardedRef, type FC, type MouseEventHandler } from "react";
import Label from "./label/label";
import Link from "next/link";

const Button: FC<{
  name: string;
  icon?: JSX.Element;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  iconClasses?: string;
  nameClasses?: string;
  labelClasses?: string;
  buttonClasses?: string;
  link?: string;
  curr?: string;
  buttonRef?: ForwardedRef<HTMLButtonElement>;
}> = ({
  name,
  icon,
  onClickHandler,
  className,
  nameClasses,
  iconClasses,
  labelClasses,
  link,
  buttonClasses,
  curr,
  buttonRef,
}) => {
  const children = (
    <>
      <div
        className={` font-bold duration-200 group-hover:scale-105 ${iconClasses}`}
      >
        {icon}
      </div>
      <h3 className={`${nameClasses}`}>{name}</h3>
    </>
  );
  const classes = `p-1 px-4 hover:bg-blue-300 bg-white text-black flex border-[1px] border-gray items-center group ${buttonClasses} ${curr === name ? "!bg-blue-400" : ""}`;
  return (
    <div className={className}>
      <Label label={name} className={`${labelClasses}`}>
        {onClickHandler ? (
          <button
            className={`${classes}`}
            onClick={onClickHandler}
            ref={buttonRef ?? undefined}
          >
            {children}
          </button>
        ) : (
          <Link
            href={`/${link ?? name.toLowerCase()}`}
            className={`${classes}`}
          >
            {children}
          </Link>
        )}
      </Label>
    </div>
  );
};
export default Button;

import { FC } from "react";
import Button from "../../ui/button";

const AuthButton: FC<{
    className?: string;
    name: string;
    link?: string;
    icon?: JSX.Element;
    buttonClasses?: string;
    onClickHandler?: () => void;
}> = ({ className, name, link, icon, buttonClasses, onClickHandler }) => {
    return (
        <Button
            link={link}
            name={name}
            className={`${className} w-full text-center`}
            buttonClasses={`bg-white text-black text-base 
                font-bold hover:opacity-90 w-11/12 hover:bg-white mx-auto text-center 
                my-3 flex justify-center relative ${buttonClasses}`}
            iconClasses="text-3xl absolute left-6 pr-2"
            icon={icon}
            labelClasses="hidden"
            onClickHandler={onClickHandler}
        />
    );
};
export default AuthButton;

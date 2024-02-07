import { type FC } from "react";

const Heading: FC<{ text: string, className?:string }> = ({ text,className }) => {
    return <h1 className={`text-xl font-extrabold p-3 text-black ${className}`}>{text}</h1>;
};
export default Heading;

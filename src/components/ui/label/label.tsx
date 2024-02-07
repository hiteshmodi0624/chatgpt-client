import { FC, PropsWithChildren, useState } from "react";
import LabelText from "./label-text";

const Label: FC<PropsWithChildren<{ className?: string; label: string }>> = ({
    className,
    children,
    label,
}) => {
    const [hover, setHoverState] = useState(false);
    const handleMouseIn = () => {
        setHoverState(true);
    };
    const handleMouseOut = () => {
        setHoverState(false);
    };
    return (
        <div
            onMouseEnter={handleMouseIn}
            onMouseLeave={handleMouseOut}
            className={`relative`}
        >
            {children}
            {hover && <LabelText label={label} className={className}/>}
        </div>
    );
};
export default Label;

import { type FC, useRef } from "react";

const LabelText: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`absolute z-20 my-1 whitespace-pre-line rounded bg-gray2 p-2 
            py-1 text-xs text-white hidden sm:block ${className}`}
      ref={triggerRef}
    >
      {label}
    </div>
  );
};
export default LabelText;

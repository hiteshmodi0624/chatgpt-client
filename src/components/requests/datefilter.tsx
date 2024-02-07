import { forwardRef, useState, type Dispatch, type SetStateAction } from "react";
import Button from "../ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomButtonProps {
  onClick: () => void;
}

const DateFilter = ({
  curr,
  setCurr,
}: {
  curr: string;
  setCurr: Dispatch<SetStateAction<string>>;
}) => {
    const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
      ({ onClick }, ref) => (
        <Button
          name="Custom"
          buttonClasses="rounded-l-md"
          curr={
            curr !== "24H" &&
            curr !== "7D" &&
            curr !== "1M" &&
            curr !== "3M" &&
            curr !== "ALL"
              ? "Custom"
              : curr
          }
          onClickHandler={() => {
            onClick();
          }}
          buttonRef={ref}
        />
      ),
    );
    CustomButton.displayName = "Custom Button";
    const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="m-1 flex">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => {
          if (date !== null) {
            setStartDate(date);
            setCurr(
              Math.floor(
                (new Date().getTime() - date.getTime()) / 86400000,
              ).toString(),
            );
          }
        }}
        customInput={<CustomButton onClick={() => 0} />}
        maxDate={new Date()}
      />
      <Button
        name="24H"
        onClickHandler={() => {
          setCurr("24H");
        }}
        curr={curr}
      />
      <Button
        name="7D"
        onClickHandler={() => {
          setCurr("7D");
        }}
        curr={curr}
      />
      <Button
        name="1M"
        onClickHandler={() => {
          setCurr("1M");
        }}
        curr={curr}
      />
      <Button
        name="3M"
        onClickHandler={() => {
          setCurr("3M");
        }}
        curr={curr}
      />
      <Button
        name="ALL"
        buttonClasses="rounded-r-md"
        onClickHandler={() => {
          setCurr("ALL");
        }}
        curr={curr}
      />
    </div>
  );
};
export default DateFilter;

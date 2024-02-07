import { useState } from "react";
import Button from "../ui/button";
import Select from "../ui/inputs/select";

const Filters = () => {
  const [curr, setCurr] = useState("ALL");
  return (
    <div className="m-1 my-4 flex flex-col bg-white p-2 text-black rounded-md">
      <div className="flex w-full items-center justify-between">
        <h2>Filters</h2>
        <button>Clear All</button>
      </div>
      <div>
        <div className="flex items-center space-x-6 ml-4">
          <h1 className="border-[1px] border-grey p-2 rounded-lg px-6">Status</h1>
          <Select
            placeholder="Equals"
            value={13243}
            className="max-w-md !py-0.5 !text-black placeholder:text-black text-center"
          >
            <option value="equals">equals</option>
            <option value="not equals">not equals</option>
          </Select>
          <Select
            placeholder="Model"
            value={13243}
            className="w-32 !py-0.5 text-black placeholder:text-black text-center"
          >
            <option value="all">ALL</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            
          </Select>
        </div>
      </div>
    </div>
  );
};
export default Filters
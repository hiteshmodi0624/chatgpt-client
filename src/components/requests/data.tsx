import { useEffect, useState } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
interface Data {
  created_at: string;
  input_tokens: number;
  output_tokens: number;
  request_id: string;
  request_status_id:number;
  request_value: string;
  response_value: string;
  user_reference_id: string;
  response_time: number;
}
const Data = ({ curr, userId }: { curr: string; userId: string }) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.post(
        "https://chatgptpromptmiddleware.onrender.com/api/requests/history",
        {
          timePeriod:
            curr === "ALL"
              ? 1000
              : curr === "3M"
                ? 90
                : curr === "1M"
                  ? 30
                  : curr === "24H"
                    ? 1
                    : +curr,
          userId: userId,
        },
      );
      setData([...(res.data as { result: Data[] }).result]);
      setLoading(false);
    }
    void fetchData();
  }, [curr, userId]);
  return (
    <div className="m-1 my-4 border-[1px] border-b-0 border-black">
      <div className="flex flex-col rounded-md bg-white text-black">
        <div className="flex text-center font-bold *:flex-1 *:border-b-[1px] *:border-seperator *:p-2">
          <h4>Created At</h4>
          <h4>Status</h4>
          <h4>Request</h4>
          <h4>Response</h4>
          <h4>Total Tokens</h4>
          <h4>Prompt Tokens</h4>
          <h4>Completions Time</h4>
        </div>
        {loading && (
          <ContentLoader
            speed={2}
            width={1000}
            height={160}
            backgroundColor="#f3f3f3"
            foregroundColor="#dfdcdc"
            className="w-full"
          >
            <rect x="0" y="0" rx="3" ry="3" width="10000" height="80" />
          </ContentLoader>
        )}
        {data.map((val, i) => {
          return (
            <div
              className="flex border-b-[1px] border-seperator p-2 text-center *:flex *:flex-1 *:justify-center"
              key={i}
            >
              <h4>{val.created_at}</h4>
              <div>
                <div
                  className={`h-min max-w-fit rounded-lg border-[1px] border-[#cfcfd0] px-2 py-1 font-mono text-xs font-bold 
                ${
                  val.request_status_id === 200
                    ? "bg-[#EAFFF2] text-[#367758]"
                    : "bg-red-500 text-red-100"
                }`}
                >
                  {val.request_status_id === 200 ? "Success" : "Failed"}
                </div>
              </div>
              <h4>{val.request_value}</h4>
              <h4 className="text-justify">{val.response_value}</h4>
              <h4>{val.input_tokens + val.output_tokens}</h4>
              <h4>{val.input_tokens}</h4>
              <h4>{val.response_time}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Data
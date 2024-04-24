import * as React from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { Input, Button } from "@nextui-org/react";
import { config } from "./config";
import { writeContract, readContract } from "@wagmi/core";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const addr = "0xb296bab2ed122a85977423b602ddf3527582a3da";

export function Contract() {
  const { writeContractAsync } = useWriteContract();
  const [msg, setMsg] = React.useState("999");
  const [result, setResult] = React.useState("");

  const store = async (msg: String) => {
    const result = await writeContractAsync({
      abi,
      address: addr,
      functionName: "store",
      args: [msg],
    });
    console.log("writeContract ==>", result, msg);
  };

  const store2 = async (msg: String) => {
    const result = await writeContract(config, {
      abi,
      address: addr,
      functionName: "store",
      args: [msg],
    });
    console.log("writeContract ==>", result, msg);
  };

  const read = async () => {
    const result = await readContract(config, {
      abi,
      address: addr,
      functionName: "retrieve",
    });
    setResult(result);
    console.log("useReadContract ==>", result);
  };

  React.useEffect(() => {
    read();
  }, []);

  return (
    <div>
      <Input name="store" required value={msg} onValueChange={setMsg} />
      <Button onClick={() => store2(msg)}>store</Button>
      <p>{String(result)}</p>
    </div>
  );
}
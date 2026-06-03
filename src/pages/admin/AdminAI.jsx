import { useState } from "react";
import API from "../../services/api";

export default function AdminAI() {
  const [command, setCommand] =
    useState("");

  const [response, setResponse] =
    useState("");

  const handleSubmit =
    async () => {
      const { data } =
        await API.post(
          "/ai/inventory",
          {
            command,
          }
        );

      setResponse(
        data.message
      );
    };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Product Assistant
      </h1>

      <textarea
        className="border p-4 w-full"
        rows="5"
        value={command}
        onChange={(e) =>
          setCommand(
            e.target.value
          )
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 mt-4"
      >
        Send
      </button>

      <div className="mt-6">
        {response}
      </div>
    </div>
  );
}
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [hasSentVerification, setHasSentVerification] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState();

  const [serverResponse, setServerResponse] = useState("");

  const startOver = () => {
    setPhoneNumber("");
    setVerificationCode("");
    setHasSentVerification(false);
    setVerificationStatus(undefined);
    setServerResponse("");
  };

  const startVerification = async () => {
    const response = await fetch("/api/start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    }).then((r) => r.json());
    setServerResponse(JSON.stringify(response, null, 2));

    setHasSentVerification(true);
  };

  const checkVerification = async () => {
    const response = await fetch("api/check", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phoneNumber, verificationCode }),
    }).then((r) => r.json());
    setServerResponse(JSON.stringify(response, null, 2));

    setVerificationStatus(response.status);
  };

  return (
    <div>
      <Head>
        <title>Everify Demo</title>
      </Head>

      <main className="flex flex-col max-w-screen-lg px-3 py-8 mx-auto lg:my-32">
        <h1 className="mb-8 text-4xl font-bold">Everify Demo</h1>
        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <div
            className="grid grid-cols-1 gap-8 p-4 overflow-hidden bg-gray-100 md:p-8 md:grid-cols-2"
            style={{
              filter: verificationStatus === "SUCCESS" ? "blur(6px)" : "",
            }}
          >
            <form
              className={`flex transition-opacity duration-200 flex-col px-6 py-4 bg-white shadow rounded-lg ${
                hasSentVerification ? "pointer-events-none opacity-40" : ""
              }`}
              onSubmit={(event) => {
                event.preventDefault();
                startVerification();
              }}
            >
              <div className="flex items-center mb-2">
                <span className="flex items-center justify-center mr-3 font-semibold text-white bg-blue-900 rounded-full w-7 h-7">
                  1
                </span>
                <h2 className="text-2xl font-semibold">Start a verification</h2>
              </div>
              <p className="mb-8 text-gray-7000">
                When you enter your number, we will call{" "}
                <span className="font-mono italic font-semibold">
                  /api/start
                </span>
                which will start the Everify verification flow.
              </p>
              <div className="flex flex-col mt-auto space-y-6">
                <label htmlFor="phoneNumber" className="flex flex-col">
                  Your Phone Number
                  <input
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="flex p-2 mt-1 text-gray-800 rounded-md shadow"
                  />
                </label>
                <button className="px-4 py-2 ml-auto text-lg font-medium text-white transition-colors duration-200 bg-blue-700 rounded-lg shadow-md hover:bg-blue-500">
                  Start verification
                </button>
              </div>
            </form>
            <form
              className={`flex transition-opacity duration-200 flex-col px-6 py-4 bg-white shadow rounded-lg ${
                !hasSentVerification ? "pointer-events-none opacity-40" : ""
              }`}
              onSubmit={(event) => {
                event.preventDefault();
                checkVerification();
              }}
            >
              <div className="flex items-center mb-2">
                <span className="flex items-center justify-center mr-3 font-semibold text-white bg-blue-900 rounded-full w-7 h-7">
                  2
                </span>
                <h2 className="text-2xl font-semibold">Verify the code</h2>
              </div>
              <p className="mb-8 text-gray-7000">
                Now, head to the{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-800"
                  href="https://everify.dev/sandbox"
                >
                  Everify Sandbox
                </a>{" "}
                to find your verification code!
              </p>
              <div className="flex flex-col mt-auto space-y-6">
                <label htmlFor="verificationCode" className="flex flex-col">
                  Six-Digit verification code
                  <input
                    name="verificationCode"
                    value={verificationCode}
                    onChange={(event) =>
                      setVerificationCode(event.target.value)
                    }
                    className="flex p-2 mt-1 text-gray-800 rounded-md shadow"
                  />
                </label>
                <button className="px-4 py-2 ml-auto text-lg font-medium text-white transition-colors duration-200 bg-blue-700 rounded-lg shadow-md hover:bg-blue-500">
                  Verify
                </button>
              </div>
            </form>
          </div>
          {verificationStatus === "SUCCESS" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center w-full max-w-md p-6 m-auto space-y-4 text-white bg-blue-800 rounded-2xl">
                <h2 className="text-3xl font-bold">Success!</h2>
                <p className="text-lg leading-relaxed">
                  Yay! You just successfully used the Everify API. Check out the{" "}
                  <span className="font-mono italic font-bold">
                    pages/api/start.js
                  </span>{" "}
                  and{" "}
                  <span className="font-mono italic font-bold">
                    pages/api/check.js
                  </span>{" "}
                  files and see how easy that was!
                </p>
                <button
                  onClick={() => startOver()}
                  className="w-full px-4 py-2 text-lg font-medium text-blue-700 transition-colors duration-200 bg-white rounded-lg shadow-md"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
          {serverResponse && (
            <div className="p-3">
              <h2 className="text-xl font-semibold">Server Response</h2>
              <pre>{serverResponse}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

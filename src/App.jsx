import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length); // imp for future reference
    window.navigator.clipboard.writeText(password)
  }, [password, length])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "~!@#$%^&*_+-?";

    for (let i = 0; i < length; i++) {
      let randomPasswordChar = str[Math.floor(Math.random() * str.length)];
      pass += randomPasswordChar;
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, numberAllowed, characterAllowed]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-auto max-w-md p-4 bg-slate-500 text-white font-mono rounded-md shadow-lg flex flex-col gap-4">
        <h1 className="font-semibold tracking-tighter text-center sm:text-xl text-lg ">
          Password Generator
        </h1>
        <div className="bg-slate-300 rounded-md">
          <input
            className="rounded-md outline-none px-4 py-2 text-indigo-500 bg-slate-300"
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="px-4 py-2 border-l-2 border-slate-400 text-slate-500 active:bg-slate-500 active:text-white rounded-r-md"
          onClick={copyPassword}>
            Copy
          </button>
        </div>
        <hr className="border-t-2 mt-4 sm:text-lg text-md" />
        {/* input fields */}
        <h2 className="text-center font-bold tracking-tighter">
          Customization
        </h2>
        <div className="space-y-2 text-slate-600 bg-slate-300 p-4 rounded-md">
          <label
            htmlFor="Option1"
            className="flex cursor-pointer items-start gap-4"
          >
            <div className="flex items-center">
              <input
                type="range"
                min={8}
                max={64}
                defaultValue={0}
                className="rounded border-gray-300"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                id="Option1"
              />
            </div>

            <div>
              <strong className="font-medium"> Length : {length}  </strong>
            </div>
          </label>

          <label
            htmlFor="Option2"
            className="flex cursor-pointer items-start gap-4"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                className="size-5 rounded border-gray-300"
                id="Option2"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
            </div>

            <div>
              <strong className="font-medium"> Number </strong>
            </div>
          </label>

          <label
            htmlFor="Option3"
            className="flex cursor-pointer items-start gap-4"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                className="size-5 rounded border-gray-300"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
                id="Option3"
              />
            </div>

            <div>
              <strong className="font-medium ">Special Characters</strong>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;

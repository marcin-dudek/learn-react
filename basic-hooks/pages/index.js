import React, { useState } from "react";

const InputElement = () => {
  const [value, setValue] = useState("");
  const [historyValue, setHistoryValue] = useState([]);

  return (
    <div>
      <input
        onChange={e => {
          setValue(e.target.value);
          setHistoryValue([...historyValue, e.target.value]);
        }}
        placeholder="Enter some text"
      />
      <p>Current: {value}</p>
      <ul>
          {historyValue.map(v=> <li>{v}</li>)}
      </ul>

    </div>
  );
};

export default InputElement;

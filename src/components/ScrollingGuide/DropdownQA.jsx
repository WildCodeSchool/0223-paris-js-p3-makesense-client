import { useState } from "react";

export default function DropdownQA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(!open)}>
        <h3 className="c-blue">F.A.Q</h3>
      </button>
      <li style={{ display: open ? "block" : "none" }}>
        <h4 className="c-blue">Lorem ipsum dolor </h4>
        <p>
          sit amet, consectetur adipiscing elit. Mauris convallis facilisis diam
          nec pellentesque. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.{" "}
        </p>
      </li>
    </>
  );
}

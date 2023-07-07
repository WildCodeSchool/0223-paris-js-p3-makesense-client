import { useState } from "react";

export default function DropdownRules() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(!open)}>
        <h3 className="c-blue">Nos règles</h3>
      </button>
      <li style={{ display: open ? "block" : "none" }}>
        <h3 className="c-blue">Lorem ipsum dolor </h3>
        <p>
          sit amet, consectetur adipiscing elit. Mauris convallis facilisis diam
          nec pellentesque. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.{" "}
        </p>
      </li>
    </>
  );
}

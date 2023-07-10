import { useState } from "react";

export default function DropdownQA() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button type="button" onClick={() => setOpen(!open)} className="dropdownButtonGuide">
        <button
          type="button"
          className={open ? "arrow-icon open" : "arrow-icon"}
        >
          <span className="left-bar" />
          <span className="right-bar" />
        </button>
        <h3 className={open ? "open" : "c-blue "}>F.A.Q</h3>
      </button>
      <li style={{ display: open ? "block" : "none" }}>
        <h4 className="c-blue">Lorem ipsum dolor </h4>
        <p>
          sit amet, consectetur adipiscing elit. Mauris convallis facilisis diam
          nec pellentesque. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.{" "}
        </p>
      </li>
    </section>
  );
}

import DropdownCreator from "./DropdownCreator";
import DropdownQA from "./DropdownQA";
import DropdownRules from "./DropdownRules";

export default function ScrollingGuide() {
  return (
    <section id="guide">
      <DropdownCreator />
      <DropdownRules />
      <DropdownQA />
    </section>
  );
}

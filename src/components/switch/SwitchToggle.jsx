/**
 * @name SwitchToggle
 * @description SwitchToggle component
 * @param {Boolean} checked - Switch state
 * @param {Function} onCheckedChange - Function to be called when switch is toggled
 * @param {String} checkedText - Text to display when switch is checked
 * @param {String} uncheckedText - Text to display when switch is unchecked
 * @returns {JSX.Element} - Rendered SwitchToggle component
 */

import { Switch } from "@/components/ui/switch";

const SwitchToggle = ({ checked, onCheckedChange, checkedText, uncheckedText }) => {
  return (
    <section className="mb-4 flex justify-end items-center space-x-4">
      <span className={"font-semibold"}>
        {checked ? checkedText : uncheckedText}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </section>
  );
};

export default SwitchToggle;

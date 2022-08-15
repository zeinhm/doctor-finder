import { css } from "@emotion/css";
import classNames from "classnames";
import Select from "react-select";
import { components } from "react-select";

export type OptionType = {
  name: string | number | React.ReactNode;
  value: string | number;
  disabled?: boolean;
};

interface SelectProps {
  items: OptionType[];
  error?: string;
  value?: OptionType[];
  onChange?: (data: any) => any;
  placeholder?: string;
  className?: string;
}

const Option = (props) => {
  return (
    <div className="test">
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultipleSelect = ({
  items = [],
  onChange = () => {},
  value = [],
  placeholder = "Select",
  className = "",
}: SelectProps) => {
  return (
    <div
      className={classNames(
        className,
        css`
          min-width: 200px;
        `
      )}
      data-toggle="popover"
      data-trigger="focus"
      data-content="Please selecet account(s)"
    >
      <Select
        placeholder={placeholder}
        options={items}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default MultipleSelect;

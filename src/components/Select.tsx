import { useMemo } from "react";
import { css } from "@emotion/css";
import classNames from "classnames";
import { useSelect } from "downshift";
import SvgArrowDown from "@/components/Svg/arrow-down.svg";

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
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const Select = ({
  items = [],
  onChange = () => {},
  error,
  value,
  disabled = false,
  placeholder = "Select",
  className,
}: SelectProps) => {
  const itemToString = (item) => (item ? item.value : "");
  const selectedItemInArray = useMemo(() => {
    return items.find((item) => String(item.value) === String(value));
  }, [value]);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items,
    selectedItem: value,
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem.value);
    },
  });

  return (
    <div className={className}>
      <div
        className={classNames(
          "rounded-lg flex items-center border focus-within:border focus-within:border-blue-400 focus-within:border-opacity-75 w-full text-black-100 text-sm focus:outline-none relative leading-5",
          error ? "border-red-500 shake-x" : "border-gray-300",
          disabled && "bg-gray-200",
          css`
            width: 200px;
          `
        )}
      >
        <button
          type="button"
          {...getToggleButtonProps()}
          className="w-full h-10 flex items-center justify-between focus:outline-none px-4"
          disabled={disabled}
        >
          {selectedItem ? (
            <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedItemInArray?.name}
            </span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <span
            className={classNames(
              "ml-2",
              css`
                transition: transform 200ms ease-in-out;
              `,
              isOpen &&
                css`
                  transform: rotate(180deg);
                `
            )}
          >
            <SvgArrowDown />
          </span>
        </button>
        {isOpen && (
          <ul
            {...getMenuProps(
              {},
              {
                suppressRefError: true,
              }
            )}
            className={classNames(
              "bg-white rounded-lg mt-2 overflow-y-auto absolute w-full focus:outline-none z-50",
              css`
                box-shadow: 0px 4px 16px rgba(229, 229, 229, 0.44);
                max-height: 300px;
                top: 2.8rem;

                [aria-selected="true"] {
                  background-color: rgba(0, 0, 0, 0.05) !important;
                }
              `
            )}
          >
            {items.map((item, index) => (
              <>
                {item?.disabled === true ? (
                  <li
                    key={`${item.value}${index}`}
                    className={classNames(
                      "text-sm text-black-60 font-normal cursor-not-allowed",
                      css`
                        padding: 0.75rem 1.5rem;
                        background-color: rgba(0, 0, 0, 0.02) !important;
                      `
                    )}
                  >
                    {item.name} {`(disabled)`}
                  </li>
                ) : (
                  <li
                    key={`${item.value}${index}`}
                    {...getItemProps({ item, index })}
                    className={classNames(
                      "cursor-pointer text-sm text-black-100 font-normal",
                      css`
                        padding: 0.75rem 1.5rem;

                        &:hover {
                          background-color: rgba(0, 0, 0, 0.05) !important;
                        }
                      `
                    )}
                  >
                    {item.name}
                  </li>
                )}
              </>
            ))}
          </ul>
        )}
      </div>
      {error ? <p className="text-xs text-red-500 ml-1 mt-1">{error}</p> : null}
    </div>
  );
};
export default Select;

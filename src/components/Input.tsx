import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";

export interface InputProps {
  round?: boolean;
  withIcon?: boolean;
  icon?: React.ReactNode;
  error?: string;
  postFixLabel?: string;
  preFixLabel?: string;
  iconOnClick?: () => void;
}

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = React.forwardRef(
  (
    {
      round = false,
      withIcon = false,
      icon,
      iconOnClick,
      error = null,
      postFixLabel,
      preFixLabel,
      disabled,
      className,
      ...props
    }: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => (
    <>
      <div
        className={classNames(
          "input relative flex flex-row overflow-auto",
          className,
          round && "rounded-full",
          error && "input-error mb-1 shake-x",
          disabled && "bg-gray-200 cursor-not-allowed"
        )}
      >
        {preFixLabel && (
          <div className="px-4 bg-black-5 text-sm flex items-center justify-center font-medium text-black-80">
            {preFixLabel}
          </div>
        )}

        {withIcon && (
          <span
            className={classNames(
              "absolute right-2 p-2 cursor-pointer flex items-center",
              css`
                top: 50%;
                transform: translate(0, -50%);
                &:hover {
                  svg,
                  path {
                    fill: var(--blue-100);
                  }
                }
              `
            )}
            onClick={iconOnClick}
          >
            {icon}
          </span>
        )}
        <input ref={ref} {...props} className="text-sm" disabled={disabled} />
        {postFixLabel && (
          <div
            className={classNames(
              "px-4 bg-black-5 text-sm flex items-center justify-center font-medium text-black-80",
              css`
                min-width: 8rem;
                height: inherit;
              `
            )}
          >
            {postFixLabel}
          </div>
        )}
      </div>
      {error ? <p className="text-xs text-red-500 ml-1">{error}</p> : null}
    </>
  )
);

export default Input;

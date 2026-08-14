import VisiblityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, type ReactNode } from "react";
import Icon from "./Icon";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

interface LabelProp {
    htmlFor?: string;
    label?: ReactNode;
    isRequired?: boolean;
    error?: string; 
}

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    error?: string;
}

interface TextAreaProp extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    hidden?: boolean;
    error?: string;
}

interface SelectProp extends React.SelectHTMLAttributes<HTMLSelectElement> {
    optionList: Array<{ content: string; value: string }>;
    hidden?: boolean;
    error?: string;
}

interface GeneralInputProp extends LabelProp, InputProp {
    type: "text" | "email" | "number" | "time" | "date";
    hidden?: boolean;
}

function Label({ htmlFor, label, isRequired }: LabelProp) {
    if (!label) return null;

    return (
        <label htmlFor={htmlFor} className="text-description font-medium block w-full mb-1">
            {label}
            {isRequired && (
                <span className="text-red-500 ml-1" aria-hidden="true">
                    *
                </span>
            )}
        </label>
    );
}

function ErrorMessage({ error }: { error?: string }) {
    if (!error) return null;
    return <span className="text-red-500 text-xs mt-1 block">{error}</span>;
}

function BaseInput({ className, error, type, ...props }: InputProp) {
    const requiresNonWhitespace = type === "text" || type === "search" || !type;

    return (
        <input
            type={type}
            pattern={requiresNonWhitespace ? ".*\\S+.*" : undefined}
            title={requiresNonWhitespace ? "This field cannot be empty or just spaces." : undefined}
            aria-invalid={!!error}
            {...props}
            className={`block text-description font-normal border ${
                error ? "border-red-500" : "border-off-white-border"
            } bg-off-white w-full placeholder-grayish-blue ${className}`}
        />
    );
}

export function GeneralInput({
    type,
    placeholder,
    label,
    className = "",
    hidden = false,
    isRequired,
    error,
    ...props
}: GeneralInputProp) {
    return (
        <div className={`text-dark-blue w-full ${hidden ? "hidden" : ""}`}>
            <Label htmlFor={props.id} label={label} isRequired={isRequired} />
            <BaseInput
                type={type}
                placeholder={placeholder}
                className={`px-4 py-3 rounded-2xl ${className}`}
                error={error}
                required={isRequired}
                aria-required={isRequired}
                {...props}
            />
            <ErrorMessage error={error} />
        </div>
    );
}

export function PasswordInput({
    placeholder,
    label,
    className = "",
    hidden = false,
    isRequired,
    error,
    ...props
}: LabelProp & InputProp) {
    const [visible, setVisible] = useState<boolean>(false);

    const handleVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVisible(e.target.checked);
    };

    return (
        <div className={`text-dark-blue w-full relative ${hidden ? "hidden" : ""}`}>
            <Label htmlFor={props.id} label={label} isRequired={isRequired} />
            <BaseInput
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                className={`pr-12 text-sm px-4 py-3 rounded-2xl ${className}`}
                error={error}
                required={isRequired}
                aria-required={isRequired}
                {...props}
            />

            <div className="absolute bottom-2 right-3">
                <label className="cursor-pointer hover:bg-gray-200 transition-colors p-1 rounded-lg box-content flex items-center">
                    <input type="checkbox" onChange={handleVisible} checked={visible} className="sr-only" />
                    <Icon icon={visible ? VisiblityIcon : VisibilityOffIcon} variant="grayish-blue" size="bigMedium" />
                </label>
            </div>
            <ErrorMessage error={error} />
        </div>
    );
}

export function TextAreaInput({
    placeholder,
    label,
    className = "",
    hidden = false,
    isRequired,
    error,
    onChange, 
    ...props
}: LabelProp & TextAreaProp) {
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textValue = e.target.value;

        if (isRequired && textValue.length > 0 && textValue.trim() === "") {
            e.target.setCustomValidity("This field cannot be empty or just spaces.");
        } else {
            e.target.setCustomValidity(""); 
        }
        if (onChange) onChange(e);
    };

    return (
        <div className={`text-dark-blue w-full ${hidden ? "hidden" : ""}`}>
            <Label htmlFor={props.id} label={label} isRequired={isRequired} />

            <textarea
                placeholder={placeholder}
                required={isRequired}
                aria-required={isRequired}
                aria-invalid={!!error}
                onChange={handleTextAreaChange} 
                className={`block rounded-2xl text-description font-normal px-4 py-3 scroll-px-4 scroll-py-3 border ${
                    error ? "border-red-500" : "border-off-white-border"
                } bg-off-white w-full min-h-20 resize-none placeholder-grayish-blue ${className}`}
                {...props}
            ></textarea>
            <ErrorMessage error={error} />
        </div>
    );
}

export function SearchInput({ placeholder, className = "", hidden = false, error, ...props }: LabelProp & InputProp) {
    return (
        <div className={`text-dark-blue w-full relative ${hidden ? "hidden" : ""}`}>
            <BaseInput
                type="search"
                placeholder={placeholder}
                className={`pl-10 text-sm py-2 px-4 rounded-3xl ${className}`}
                error={error}
                {...props}
            />
            <SearchOutlinedIcon className="text-grayish-blue stroke-0 absolute bottom-2 left-3.5 text-big-medium!" />
            <ErrorMessage error={error} />
        </div>
    );
}

export function SelectInput({
    label,
    className = "",
    iconClassName = "",
    optionList,
    hidden = false,
    isRequired,
    error,
    ...props
}: LabelProp & SelectProp & { iconClassName?: string }) {
    return (
        <div className={`text-dark-blue w-full relative ${hidden ? "hidden" : ""}`}>
            <Label label={label} isRequired={isRequired} />
            <select
                required={isRequired}
                aria-required={isRequired}
                aria-invalid={!!error}
                className={`appearance-none block rounded-2xl text-description font-normal px-4 py-3 pr-10 border ${
                    error ? "border-red-500" : "border-off-white-border"
                } bg-off-white w-full placeholder-grayish-blue hover:bg-off-white-border transition-colors ${className}`}
                {...props}
            >
                {isRequired && (
                    <option value="" disabled hidden>
                        Select an option...
                    </option>
                )}

                {optionList.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.content}
                    </option>
                ))}
            </select>
            <span
                className={`hover:bg-off-white-border font-consolas absolute right-3.5 ${error ? "bottom-8" : "bottom-2"} pointer-events-none ${iconClassName}`}
            >
                <Icon icon={ArrowDropDownOutlinedIcon} size="bigger" variant="grayish-blue"></Icon>
            </span>
            <ErrorMessage error={error} />
        </div>
    );
}

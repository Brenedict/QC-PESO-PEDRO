import VisiblityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, type ReactNode } from "react";
import Icon from "./Icon";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

interface LabelProp {
    htmlFor?: string;
    label?: ReactNode;
}

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

interface TextAreaProp extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
}

interface SelectProp extends React.SelectHTMLAttributes<HTMLSelectElement> {
    optionList: Array<{ content: string; value: string }>;
}

interface GeneralInputProp extends LabelProp, InputProp {
    type: "text" | "email" | "number" | "time" | "date";
}

function Label({ htmlFor, label }: LabelProp) {
    return (
        <label htmlFor={htmlFor} className="text-description font-medium block w-full mb-1">
            {label}
        </label>
    );
}

function BaseInput({ className, ...props }: InputProp) {
    return (
        <input
            {...props}
            className={`block  text-description font-normal border border-off-white-border bg-off-white w-full placeholder-grayish-blue ${className}`}
        />
    );
}

export function GeneralInput({ type, placeholder, label, className = "", ...props }: GeneralInputProp) {
    return (
        <div className="text-dark-blue w-full">
            <Label htmlFor={props.id} label={label} />
            <BaseInput
                type={type}
                placeholder={placeholder}
                className={`px-4 py-3 rounded-2xl ${className}`}
                {...props}
            />
        </div>
    );
}

export function PasswordInput({ placeholder, label, className = "", ...props }: LabelProp & InputProp) {
    const [visible, setVisible] = useState<boolean>(false);

    const handleVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVisible(e.target.checked);
    };

    return (
        <div className="text-dark-blue w-full relative">
            <Label htmlFor={props.id} label={label} />
            <BaseInput
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                className={`pr-12 text-sm px-4 py-3 rounded-2xl ${className}`}
                {...props}
            />

            <div className="absolute bottom-2 right-3">
                <label className=" cursor-pointer hover:bg-gray-200 transition-colors p-1 rounded-lg box-content flex items-center">
                    <input type="checkbox" onChange={handleVisible} checked={visible} className="sr-only" />
                    <Icon icon={visible ? VisiblityIcon : VisibilityOffIcon} variant="grayish-blue" size="bigMedium" />
                </label>
            </div>
        </div>
    );
}

export function TextAreaInput({ placeholder, label, className = "", ...props }: LabelProp & TextAreaProp) {
    return (
        <div className="text-dark-blue w-full">
            <Label htmlFor={props.id} label={label} />

            <textarea
                placeholder={placeholder}
                className={`block rounded-2xl text-description font-normal px-4 py-3 scroll-px-4 scroll-py-3 border border-off-white-border  bg-off-white w-full min-h-20 resize-none placeholder-grayish-blue ${className}`}
                {...props}
            ></textarea>
        </div>
    );
}

export function SearchInput({ placeholder, className = "", ...props }: LabelProp & InputProp) {
    return (
        <div className="text-dark-blue w-full  relative">
            <BaseInput
                type="search"
                placeholder={placeholder}
                className={`pl-10 text-sm py-2 px-4 rounded-3xl ${className}`}
                {...props}
            />
            <SearchOutlinedIcon className="text-grayish-blue stroke-0 absolute bottom-2 left-3.5 text-big-medium!" />
        </div>
    );
}

export function SelectInput({ label, className = "", optionList, ...props }: LabelProp & SelectProp) {
    return (
        <div className="text-dark-blue w-full relative">
            <Label label={label} />
            <select
                className={`appearance-none  block rounded-2xl text-description font-normal px-4 py-3 pr-10 border border-off-white-border  bg-off-white w-full placeholder-grayish-blue hover:bg-off-white-border transition-colors  ${className} `}
                {...props}
            >
                {optionList.map((option) => (
                    <option value={option.value}>{option.content}</option>
                ))}
            </select>
            <span className="hover:bg-off-white-border font-consolas absolute right-3.5 bottom-2  pointer-events-none ">
                <Icon icon={ArrowDropDownOutlinedIcon} size="bigger" variant="grayish-blue"></Icon>
            </span>
        </div>
    );
}

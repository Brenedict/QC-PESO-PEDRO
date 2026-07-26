import VisiblityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, type ReactNode } from "react";

interface LabelProp {
    htmlFor?: string;
    children?: ReactNode;
}

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

interface TextAreaProp extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
}

interface GeneralInputProp extends LabelProp, InputProp {
    type: "text" | "email" | "number";
}

function Label({ htmlFor, children }: LabelProp) {
    return (
        <label htmlFor={htmlFor} className="text-description font-medium  block w-full mb-1">
            {children}
        </label>
    );
}

function BaseInput({ className, ...props }: InputProp) {
    return (
        <input
            {...props}
            className={`block  text-description font-normal border border-off-white-border outline-0 bg-off-white w-full placeholder-grayish-blue ${className}`}
        />
    );
}

export function GeneralInput({ type, placeholder, children, ...props }: GeneralInputProp) {
    return (
        <div className="text-dark-blue w-full mb-4">
            <Label htmlFor={props.id}>{children}</Label>
            <BaseInput
                type={type}
                id={props.id}
                placeholder={placeholder}
                name={props.name}
                className="px-4 py-3 rounded-2xl"
            />
        </div>
    );
}

export function PasswordInput({ placeholder, children, ...props }: LabelProp & InputProp) {
    const [visible, setVisible] = useState<boolean>(false);

    const handleVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVisible(e.target.checked);
    };

    return (
        <div className="text-dark-blue w-full mb-4 relative">
            <Label htmlFor={props.id}>{children}</Label>
            <BaseInput
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                className="pr-12 text-sm px-4 py-3 rounded-2xl"
                {...props}
            />

            <label className="absolute bottom-2 right-3 cursor-pointer hover:bg-gray-200 p-1 rounded-lg box-content">
                <input type="checkbox" onChange={handleVisible} checked={visible} className="sr-only" />
                {visible ? (
                    <VisiblityIcon className="text-grayish-blue stroke-0 text-big-medium!" />
                ) : (
                    <VisibilityOffIcon className="text-grayish-blue stroke-0 text-big-medium!" />
                )}
            </label>
        </div>
    );
}

export function TextAreaInput({ placeholder, children, className, ...props }: LabelProp & TextAreaProp) {
    return (
        <div className="text-dark-blue w-full mb-4">
            <Label htmlFor={props.id}>{children}</Label>

            <textarea
                placeholder={placeholder}
                className={`block rounded-2xl text-description font-normal px-4 py-3 scroll-px-4 scroll-py-3 border border-off-white-border outline-0 bg-off-white w-full min-h-20 resize-none placeholder-grayish-blue ${className}`}
                {...props}
            ></textarea>
        </div>
    );
}

export function SearchInput({ placeholder, ...props }: LabelProp & InputProp) {
    return (
        <div className="text-dark-blue w-full mb-4 relative">
            <BaseInput
                type="search"
                id={props.id}
                placeholder={placeholder}
                name={props.name}
                className="pl-10 text-sm py-2 px-4 rounded-3xl"
            />
            <SearchOutlinedIcon className="text-grayish-blue stroke-0 absolute bottom-2 left-3.5 text-big-medium!" />
        </div>
    );
}

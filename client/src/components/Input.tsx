import VisiblityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, type ReactNode } from "react";

interface LabelProp {
    id: string;
    children?: ReactNode;
}

function Label({ id, children }: LabelProp) {
    return (
        <label htmlFor={id} className="text-description font-medium  block w-full mb-1">
            {children}
        </label>
    );
}

interface InputProp {
    type?: string;
    id: string;
    name: string;
    placeholder: string;
    extraClass?: string;
}

function Input({ type, id, name, placeholder, extraClass }: InputProp) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className={`block  text-description font-normal border border-off-white-border outline-0 bg-off-white w-full placeholder-grayish-blue  ${extraClass}`}
        />
    );
}

interface GeneralInputProp extends LabelProp, InputProp {
    type: "text" | "email" | "number";
}

export function GeneralInput({ type, id, name, placeholder, children }: GeneralInputProp) {
    return (
        <div className="text-dark-blue w-full mb-4">
            <Label id={id}>{children}</Label>
            <Input type={type} id={id} placeholder={placeholder} name={name} extraClass="px-4 py-3 rounded-2xl" />
        </div>
    );
}

export function PasswordInput({ id, name, placeholder, children }: LabelProp & InputProp) {
    const [visible, setVisible] = useState<boolean>(false);

    const handleVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVisible(e.target.checked);
    };

    return (
        <div className="text-dark-blue w-full mb-4 relative">
            <Label id={id}>{children}</Label>
            <Input
                type={visible ? "text" : "password"}
                id={id}
                placeholder={placeholder}
                name={name}
                extraClass="pr-12 text-sm px-4 py-3 rounded-2xl"
            />

            <label className="absolute bottom-2 right-3 cursor-pointer hover:bg-gray-200 p-1 rounded-lg box-content">
                <input type="checkbox" onChange={handleVisible} checked={visible} className="sr-only" />
                {visible ? (
                    <VisiblityIcon className="text-grayish-blue stroke-0 text-small-big!" />
                ) : (
                    <VisibilityOffIcon className="text-grayish-blue stroke-0 text-small-big!" />
                )}
            </label>
        </div>
    );
}

export function TextAreaInput({ id, name, placeholder, children }: LabelProp & InputProp) {
    return (
        <div className="text-dark-blue w-full mb-4">
            <Label id={id}>{children}</Label>

            <textarea
                name={name}
                id={id}
                placeholder={placeholder}
                className="block rounded-2xl text-description font-normal px-4 py-3 scroll-px-4 scroll-py-3 border border-off-white-border outline-0 bg-off-white w-full min-h-20 resize-none placeholder-grayish-blue "
            ></textarea>
        </div>
    );
}

export function SearchInput({ id, name, placeholder }: LabelProp & InputProp) {
    return (
        <div className="text-dark-blue w-full mb-4 relative">
            <Input
                type="search"
                id={id}
                placeholder={placeholder}
                name={name}
                extraClass="pl-10 text-sm py-2 px-4 rounded-3xl"
            />
            <SearchOutlinedIcon className="text-grayish-blue stroke-0 absolute bottom-2 left-3.5 text-small-big!" />
        </div>
    );
}

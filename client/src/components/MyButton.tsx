import "../index.css";

interface MyButtonProp {
    label: string;
    onPress: () => void;
    variant: "wide" | "tight";
}

function MyButton({ label, onPress, variant = "tight" }: MyButtonProp) {
    return (
        <h1
            className={`border-1 bg-green text-black hover:cursor-pointer hover:opacity-50 ${variant == "wide" ? "px-10 py-5" : "px-5 py-3"}`}
            onClick={onPress}
        >
            {label}
        </h1>
    );
}

export default MyButton;

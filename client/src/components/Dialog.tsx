// General Imports
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

// Components
import { Card, type CardProps } from "./Card";

function Header({
    children,
    variant,
    bordered,
    className,
    toggleRightIcon = true,
    onRightAction,
    ...props
}: CardProps & { toggleRightIcon?: boolean; onRightAction?: () => void }) {
    return (
        <div className="flex">
            <Card.Header
                variant={variant}
                bordered={bordered}
                className={className}
                toggleRightIcon={toggleRightIcon}
                onRightAction={onRightAction}
                {...props}
            >
                {children}
            </Card.Header>
        </div>
    );
}

function Body({ children, variant, bordered, className, ...props }: CardProps) {
    return (
        <Card.Body variant={variant} bordered={bordered} className={className} {...props}>
            {children}
        </Card.Body>
    );
}

function Footer({ children, variant, bordered, className, ...props }: CardProps) {
    return (
        <Card.Footer variant={variant} bordered={bordered} className={className} {...props}>
            {children}
        </Card.Footer>
    );
}

function DialogContainer({
    children,
    className,
    dropShadow = true,
    onClose,
    ...props
}: {
    children?: ReactNode;
    className?: string;
    dropShadow?: boolean;
    onClose: () => void;
}) {
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

    return createPortal(
        <div
            className="flex h-screen w-screen justify-center items-center bg-black-opaque fixed top-0 right-0 z-99999 "
            onClick={onClose}
        >
            <section className="min-w-md min-h-fit" onClick={(e) => e.stopPropagation()}>
                <Card {...props} className={className} dropShadow={dropShadow}>
                    {children}
                </Card>
            </section>
        </div>,
        document.body
    );
}

export const Dialog = Object.assign(DialogContainer, {
    Header,
    Body,
    Footer,
});

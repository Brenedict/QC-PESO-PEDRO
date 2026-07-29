import { type ReactNode } from "react";
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
    ...props
}: {
    children?: ReactNode;
    className?: string;
    dropShadow?: boolean;
}) {
    return (
        <div className="flex h-screen w-screen justify-center items-center bg-black-opaque fixed top-0 right-0 z-99999 ">
            <section className="min-w-md min-h-fit">
                <Card {...props} className={className} dropShadow={dropShadow}>
                    {children}
                </Card>
            </section>
        </div>
    );
}

export const Dialog = Object.assign(DialogContainer, {
    Header,
    Body,
    Footer,
});

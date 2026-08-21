// General Imports
import type { ReactNode } from "react";

// Components
import { Text } from "./Text";

// Material UI Icons
import CancelIcon from "@mui/icons-material/Cancel";

function EmptyData({ children }: { children: ReactNode }) {
    return (
        <div className="w-fit bg-red-opaque py-2 px-5 rounded-2xl">
            <Text
                size="description"
                variant="red"
                align="center"
                weight="bold"
                svg={{
                    gap: "big",
                    icon: CancelIcon,
                    position: "left",
                    size: "bigMedium",
                }}
            >
                {children}
            </Text>
        </div>
    );
}

export default EmptyData;

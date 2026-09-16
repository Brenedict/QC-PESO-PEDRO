import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import { MemoryRouter } from "react-router";
import Topbar from "../components/Topbar";
import { UserGlobalContext } from "../context/UserGlobalContext";
import { AuthContext } from "../context/AuthContext";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";
import "../index.css";

const mockUserGlobal = (role: "SUPERADMIN" | "ADMIN" | "FRONTLINE", status: string) => ({
    id: 1,
    email: "juan.cruz@example.com",
    shift: "NONE" as const,
    status: (status.toUpperCase() === "ONLINE" ? "ONLINE" : "LOGGED_OUT") as "ONLINE" | "LOGGED_OUT",
    firstName: "Juan",
    lastName: "Cruz",
    role,
    onSearchChange: fn(),
});

const mockUser: UserContextType = {
    id: 1,
    username: "juan.cruz",
    email: "juan.cruz@example.com",
    role: "ADMIN",
    status: "ONLINE",
    shift: "NONE",
    firstName: "Juan",
    lastName: "Cruz",
    hasEndedShift: false,
    isRevising: false,
};

const wrapper = (role: "SUPERADMIN" | "ADMIN" | "FRONTLINE", status: string) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
            <div className="w-400">
                <AuthContext
                    value={{
                        isAuthenticated: true,
                        loading: false,
                        user: mockUser,
                        logout: async () => {},
                        setUser: () => {},
                    }}
                >
                    <UserGlobalContext value={mockUserGlobal(role, status)}>{children}</UserGlobalContext>
                </AuthContext>
            </div>
        </MemoryRouter>
    );
    return Wrapper;
};

const meta = {
    title: "Topbar",
    component: Topbar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopBarAdmin: Story = {
    decorators: [(Story) => wrapper("ADMIN", "online")({ children: <Story /> })],
};

export const TopBarFronline: Story = {
    decorators: [(Story) => wrapper("FRONTLINE", "online")({ children: <Story /> })],
};

export const TopBarOffline: Story = {
    decorators: [(Story) => wrapper("FRONTLINE", "offline")({ children: <Story /> })],
};

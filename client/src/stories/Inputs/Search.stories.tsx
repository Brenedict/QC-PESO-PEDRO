import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "../../components/Input";
import "../../index.css";

// Meta for SearchInput
const searchMeta = {
    component: SearchInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        id: "password",
        name: "password",
        placeholder: "Enter password",
        children: "Password",
    },
} satisfies Meta<typeof SearchInput>;

export default searchMeta;
type Story = StoryObj<typeof searchMeta>;

export const SearchInputStory: Story = {
    args: {
        id: "search",
        name: "search",
        placeholder: "Search anything here",
    },
};

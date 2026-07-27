import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "../../components/Input";
import "../../index.css";
import { fn } from "storybook/test";

// Meta for SearchInput
const searchMeta = {
    title: "Input/Search",
    component: SearchInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        id: "search",
        name: "search",
        placeholder: "Search anything here",
        onChange: fn(),
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

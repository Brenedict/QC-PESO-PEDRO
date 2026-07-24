# Storybook Component Documentation Guide

This guide covers how to create and view Storybook stories for your UI components.

**For a template example checkout:**
| Part | Source |
|---|---|
| Component | [MyButton.tsx](../client/src/components/MyButton.tsx) |
| Component Story | [MyButton.stories.ts](../client/src/stories/MyButton.stories.ts) |

### 1. Project Directory Structure

Before creating a story, ensure your files are placed in the correct directories:

- Components Location: Place all your React components in `client/src/components/`.
- Stories Location: Place all Storybook story files in `client/src/stories/`.
- Your file structure should look like this:Plaintextsrc/

```text
client/
├── components/
│   └── MyComponent.tsx       <-- Your component
└── stories/
    └── MyComponent.stories.ts <-- Your story file
```

- **Note:** The story file name must match your component filename and end with `.stories.ts` or `.stories.tsx`).

---

### 2. Creating a Story File

- Create a new story file named `<Filename>.stories.ts` inside `client/src/stories/` for your component.
- Copy and paste this template into your new story file

```Typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import YourComponent from "../components/YourComponent";

const meta = {
    title: "YourComponent",
    component: YourComponent,
    parameters: {
        layout: "centered", // Changeable (search for more details)
    },
    tags: ["autodocs"], // This auto creates a documentation for your component.
    args: {
        // Insert here your component arguments
    },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Change the the title 'StoryTitle' to an appropriate one
export const StoryTitle: Story = {
    args: {
        // Insert here your component arguments
    },
};

export const StoryTitle: Story = {
    args: {
        // Insert here your component arguments
    },
};

```

### 3. Story Breakdown Explained

| Section                    | What it does                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `title`                    | Sets the category and name shown in the left-hand Storybook sidebar.                                        |
| `component`                | Links the story to your React component so Storybook can inspect props and build controls.                  |
| `tags: ['autodocs']`       | Automatically generates a full documentation page with an interactive props table.                          |
| `args`                     | Passes props directly into your component. Changes made in the Storybook UI will automatically update args. |
| `export const VariantName` | Creates an isolated visual state of your component.                                                         |

---

### 4. Running Storybook Locally

To launch Storybook and preview your components, run the following command in your terminal:

```Bash
npm run storybook
```

or

```bash
npm run sb
```

Once loaded, open http://localhost:6006 in your browser. You will see your new component listed under the Components/ folder in the sidebar!

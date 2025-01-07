import type {Meta, StoryObj} from "@storybook/react";

import IconButton from "./";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "IconButton",
    component: IconButton,
    parameters: {
        layout: "centered"
    },

    tags: ["autodocs"],

    argTypes: {}
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        onFC: () => {
            alert("do something");
        },
        className: " ",
        label: "Button"
    }
};

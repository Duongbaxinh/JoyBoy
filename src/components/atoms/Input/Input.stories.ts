import type {Meta, StoryObj} from "@storybook/react";

import Input, {Variant} from "./";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Input",
    component: Input,
    parameters: {
        layout: "centered"
    },

    tags: ["autodocs"],

    argTypes: {
        leadingIcon: {
            description: "Icon xuất hiện bên trái input",
            control: false
        },
        placeholder: {
            description: "Placeholder hiển thị trong ô input",
            control: "text"
        }
    }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        placeholder: "Tìm kiếm nhóm hàng",
        variant: Variant.UNDERLINE,
        borderRadius: "4px",
        className: "w-full",
        onChange: () => console.log("Changed"),
        onClick: () => alert("click me!")
    }
};

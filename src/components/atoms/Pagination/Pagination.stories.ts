import type {Meta, StoryObj} from "@storybook/react";

import Pagination from ".";
import {useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Pagination",
    component: Pagination,
    parameters: {
        layout: "centered"
    },

    tags: ["autodocs"],

    argTypes: {}
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const [active, setActive] = useState(1);
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        active,
        setActive,
        totalPage: 10
    }
};

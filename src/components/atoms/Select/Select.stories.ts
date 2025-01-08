import type {Meta, StoryObj} from "@storybook/react";

import Select from "./";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Select",
    component: Select,
    parameters: {
        layout: "centered"
    },

    tags: ["autodocs"],

    argTypes: {}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        placeholder: "Chon mặt hàng muốn tạo",
        options: [
            {id: 1, value: "Sửa rửa mặt"},
            {id: 2, value: "kem chống nắng1"},
            {id: 3, value: "kem chống nắng2"},
            {id: 4, value: "kem chống nắng3"},
            {id: 5, value: "kem chống nắng4"},
            {id: 6, value: "kem chống nắng5"},
            {id: 7, value: "kem chống nắng6"},
            {id: 8, value: "kem chống nắng7"}
        ]
    }
};

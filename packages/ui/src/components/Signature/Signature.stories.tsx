import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Signature } from "./Signature";

const meta = {
  title: "Patterns/Signature",
  component: Signature,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Signature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Signature size="sm" placeholder="sm" />
      <Signature size="md" placeholder="md" />
      <Signature size="lg" placeholder="lg" />
    </div>
  ),
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    errorMessage: "서명은 필수입니다.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ReadOnlyWithValue: Story = {
  render: function Render() {
    const [value] = useState(
      "data:image/svg+xml;base64," +
        btoa(
          '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="120"><path d="M20 80 C 60 20, 100 20, 140 80 S 220 140, 260 60" stroke="black" stroke-width="2" fill="none"/></svg>',
        ),
    );
    return <Signature readOnly defaultValue={value} />;
  },
};

export const WithOnChange: Story = {
  render: function Render() {
    const [dataUrl, setDataUrl] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Signature onChange={setDataUrl} onClear={() => setDataUrl(null)} />
        {dataUrl && <img src={dataUrl} alt="서명 미리보기" style={{ height: 60 }} />}
      </div>
    );
  },
};

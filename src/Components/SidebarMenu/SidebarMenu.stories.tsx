import type { Meta, StoryObj } from "@storybook/react";
import SidebarMenu, { type MenuItem } from "./SidebarMenu";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const items: MenuItem[] = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "products",
    label: "Products",
    children: [
      { id: "all-products", label: "All Products" },
      { id: "new-product", label: "New Product" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      { id: "profile", label: "Profile" },
      { id: "billing", label: "Billing" },
      {
        id: "advanced",
        label: "Advanced",
        children: [
          { id: "keys", label: "API Keys" },
          { id: "logs", label: "Logs" },
        ],
      },
    ],
  },
];

export const Basic: Story = {
  args: { items },
  render: (args) => (
    <div style={{ width: 280, padding: 12 }}>
      <SidebarMenu {...args} />
    </div>
  ),
};

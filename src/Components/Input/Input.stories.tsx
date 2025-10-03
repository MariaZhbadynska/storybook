import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const TextBasic: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <div style={{ maxWidth: 380 }}>
        <Input
          label="Ім'я"
          placeholder="Введіть ім'я"
          defaultValue=""
          onChange={setVal}
          clearable
          helperText="Простий текстовий інпут"
        />
        <p style={{ fontSize: 12, marginTop: 8, color: "#9aa4b2" }}>Value: {val}</p>
      </div>
    );
  },
};

export const PasswordToggle: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <div style={{ maxWidth: 380 }}>
        <Input
          label="Пароль"
          type="password"
          placeholder="Введіть пароль"
          defaultValue=""
          onChange={setVal}
          clearable
          helperText="Є кнопка показати/сховати"
        />
        <p style={{ fontSize: 12, marginTop: 8, color: "#9aa4b2" }}>Value: {val}</p>
      </div>
    );
  },
};

export const EmailAndSearch: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [q, setQ] = useState("");
    return (
      <div style={{ display: "grid", gap: 16, maxWidth: 440 }}>
        <Input
          label="Email"
          type="email"
          placeholder="you@mail.com"
          defaultValue=""
          onChange={setEmail}
          clearable
        />
        <Input
          label="Пошук"
          type="search"
          placeholder="Знайти..."
          defaultValue=""
          onChange={setQ}
          clearable
        />
        <p style={{ fontSize: 12, color: "#9aa4b2" }}>
          Email: {email} | Query: {q}
        </p>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <Input
        label="Username"
        placeholder="example123"
        errorText="Це поле обов'язкове"
        clearable
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <Input
        label="Disabled"
        placeholder="Недоступно"
        disabled
        helperText="Компонент вимкнений"
      />
    </div>
  ),
};

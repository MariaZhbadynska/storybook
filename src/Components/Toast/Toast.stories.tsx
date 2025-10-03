import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";
import { ToastProvider, useToast } from "./ToastProvider";
import styles from "./Toast.module.css";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  render: () => <Toast type="success" message="Saved!" />,
};

export const ErrorClosable: Story = {
  render: () => <Toast type="error" message="Something went wrong" closable />,
};

export const InfoLong: Story = {
  render: () => (
    <Toast
      type="info"
      message="This is a longer informational message to show wrapping and layout."
    />
  ),
};

export const WithProvider: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <div className={styles.storyRow}>
          <button
            className={styles.storyBtn}
            onClick={() => showToast("Saved!", "success")}
          >
            Success
          </button>
          <button
            className={styles.storyBtn}
            onClick={() => showToast("Oops!", "error")}
          >
            Error
          </button>
          <button
            className={styles.storyBtn}
            onClick={() => showToast("Heads up", "warning")}
          >
            Warning
          </button>
          <button
            className={styles.storyBtn}
            onClick={() =>
              showToast("Info message", "info", { duration: 5000 })
            }
          >
            Info (5s)
          </button>
        </div>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

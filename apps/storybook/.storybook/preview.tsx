import "../../../packages/tokens/src/theme.css";
import "@qhkg/react/styles.css";
import "./preview.css";

import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className="qh-story-canvas">
        <Story />
      </main>
    ),
  ],
  parameters: {
    a11y: {
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          "Foundation",
          "Actions",
          "Forms",
          "Navigation",
          "Feedback",
          "Overlays",
          "Data",
          "Patterns",
        ],
      },
    },
    viewport: {
      options: {
        mobile320: {
          name: "Mobile 320",
          styles: { width: "320px", height: "720px" },
          type: "mobile",
        },
        mobile375: {
          name: "Mobile 375",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
        tablet768: {
          name: "Tablet 768",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop1280: {
          name: "Desktop 1280",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
      },
    },
  },
};

export default preview;

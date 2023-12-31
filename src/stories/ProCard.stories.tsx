import type { Meta, StoryObj } from '@storybook/react'

import { ProCard } from '@/pro/card'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'ProComponents/ProCard',
  component: ProCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof ProCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    title: 'Example Card',
    boxShadow: true,
  },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
  render: (args) => (
    <ProCard {...args}>
      Hello World
    </ProCard>
  ),
}

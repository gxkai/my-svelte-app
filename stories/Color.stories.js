import Color from './Color.svelte';

export default {
  title: 'Example/Color',
  component: Color
};

const Template = ({ onClick, ...args }) => ({
  Component: Color,
  props: args,
});

export const BasicUsage = Template.bind({});

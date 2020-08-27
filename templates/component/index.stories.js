import {{properCase fileName}} from './{{properCase fileName}}.svelte';

export default {
    title: 'Example/{{properCase fileName}}',
    component: {{properCase fileName}}
};

const Template = ({ onClick, ...args }) => ({
    Component: {{properCase fileName}},
    props: args,
});

export const BasicUsage = Template.bind({});

const enquirer = require('enquirer');

module.exports = {
    /**
     * @param {{ prompter: enquirer, args: Object }} props
     */
    prompt: ({ prompter, args }) => {
        return prompter.prompt([{
            type: 'input',
            name: 'name',
            message: 'enter component name (dashed)',
            skip: !!args.name
        }, {
            type: 'input',
            name: 'module',
            message: 'enter module name',
            initial: 'root',
            skip: (!!args.module || !!args.name)
        }, {
            type: 'toggle',
            name: 'observer',
            message: 'observer?',
            enabled: 'yes',
            disabled: 'no'
        }]);
    }
}
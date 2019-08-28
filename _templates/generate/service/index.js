const enquirer = require('enquirer');

module.exports = {
    /**
     * @param {{ prompter: enquirer, args: Object }} props
     */
    prompt: ({ prompter, args }) => {
        return prompter.prompt({
            type: 'input',
            name: 'name',
            message: 'enter service name (dashed)',
            skip: !!args.name
        });
    }
}
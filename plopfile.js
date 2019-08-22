// const NodePlop = require('node-plop').default();

const createHOFActions = [{
    type: 'add',
    path: 'src/components/{{comp-name}}/{{comp-name}}.hoc.tsx',
    templateFile: 'templates/component/additionals/hoc.hbs',
}];

const createContextActions = [{
    type: 'add',
    path: 'src/components/{{comp-name}}/{{comp-name}}.context.tsx',
    templateFile: 'templates/component/additionals/context.hbs',
}];

/**
 * Plop config function 
 * @param {NodePlop} plop 
 */
function plopConfig(plop) {
    plop.setHelper('capitalize', txt => txt.charAt(0).toUpperCase() + txt.slice(1));

    plop.setGenerator('component', {
        description: 'Create functional component',
        prompts: [{
            type: 'input',
            name: 'comp-name',
            message: 'please type your component name'
        }, {
            type: 'checkbox',
            name: 'additionals',
            message: 'select additional services for your component',
            choices: [
                { name: 'Higher Order Function', value: 'hoc' },
                { name: 'Context', value: 'context' }
            ]
        }],
        actions: function(data) {
                const actions = [
                    {
                        type: 'addMany',
                        destination: 'src/components/{{comp-name}}',
                        templateFiles: 'templates/component/*.*',
                        base: 'templates/component/',
                        globOptions: {
                            onlyFiles: true
                        }
                    }
                ];

                if (data.additionals.includes('hoc')) {
                    actions.push(...createHOFActions);
                }

                if (data.additionals.includes('context')) {
                    actions.push(...createContextActions);
                }

                return actions;
        }
    });
    plop.setGenerator('hoc', {
        description: 'Add HOC to existing component',
        prompts: [{
            type: 'input',
            name: 'comp-name',
            message: 'component name'
        }],
        actions: createHOFActions
    });
    plop.setGenerator('context', {
        description: 'Add a context object to existing component',
        prompts: [{
            type: 'input',
            name: 'comp-name',
            message: 'component name'
        }],
        actions: createContextActions
    });

}

module.exports = plopConfig;
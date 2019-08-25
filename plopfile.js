// const NodePlop = require('node-plop').default();

const createHOFAction = (path) => ({
    type: 'add',
    path,
    templateFile: 'templates/component/additionals/hoc.hbs',
});

const createContextAction = (path) => ({
    type: 'add',
    path,
    templateFile: 'templates/component/additionals/context.hbs',
});

const validateNames = input => {
    if (input.split(' ').length > 1) {
        return 'Words should be dash connected';
    }

    return true;
}

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
            message: 'please type your component name',
            validate: validateNames
        }, {
            type: 'input',
            name: 'module',
            default: 'root',
            message: 'type module name (could also be a component used as "parent component")',
            validate: validateNames
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
                const filesPath = data.module !== 'root'
                    ? 'src/components/{{module}}/{{comp-name}}'
                    : 'src/components/{{comp-name}}';
                const actions = [
                    {
                        type: 'addMany',
                        destination: filesPath,
                        templateFiles: 'templates/component/*.*',
                        base: 'templates/component/',
                        globOptions: {
                            onlyFiles: true
                        }
                    }
                ];

                if (data.additionals.includes('hoc')) {
                    actions.push(createHOFAction(filesPath + '/{{comp-name}}.hoc.tsx'));
                }

                if (data.additionals.includes('context')) {
                    actions.push(createContextAction(filesPath + '/{{comp-name}}.context.tsx'));
                }

                return actions;
        }
    });
    plop.setGenerator('hoc', {
        description: 'Add HOC to existing component',
        prompts: [{
            type: 'input',
            name: 'comp-name',
            message: 'component name',
            validate: validateNames
        }, {
            type: 'input',
            name: 'module',
            default: 'root',
            message: 'type module name (could also be a component used as "parent component")',
            validate: validateNames
        }],
        actions: function(data) {
            const filePath = data.module !== 'root'
                ? 'src/components/{{module}}/{{comp-name}}/{{comp-name}}.hoc.tsx'
                : 'src/components/{{comp-name}}/{{comp-name}}.hoc.tsx';

            return [createHOFAction(filePath)];
        }
    });
    plop.setGenerator('context', {
        description: 'Add a context object to existing component',
        prompts: [{
            type: 'input',
            name: 'comp-name',
            message: 'component name',
            validate: validateNames
        }, {
            type: 'input',
            name: 'module',
            default: 'root',
            message: 'type module name (could also be a component used as "parent component")',
            validate: validateNames
        }],
        actions: function(data) {
            const filePath = data.module !== 'root'
                ? 'src/components/{{module}}/{{comp-name}}/{{comp-name}}.context.tsx'
                : 'src/components/{{comp-name}}/{{comp-name}}.context.tsx';

            return [createContextAction(filePath)];
        }
    });

}

module.exports = plopConfig;
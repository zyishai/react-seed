// const NodePlop = require('node-plop').default();
// const path = require('path');

/**
 * Plop config function 
 * @param {NodePlop} plop 
 */
function plopConfig(plop) {
    plop.setHelper('upperCase', txt => txt.charAt(0).toUpperCase() + txt.slice(1));

    plop.setGenerator('component', {
        description: 'Create functional component',
        prompts: [{
            type: 'input',
            name: 'comp-name',
            message: 'please type your component name'
        }],
        actions: [{
            type: 'addMany',
            destination: 'src/components/{{comp-name}}',
            templateFiles: 'templates/component/*.*',
            base: 'templates/component/'
        }]
    });
}

module.exports = plopConfig;
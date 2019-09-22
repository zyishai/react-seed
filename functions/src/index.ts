// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

class Test {
    bla;

    render() {
        console.log(this.bla);
    }
}

Test.prototype.render_old = Test.prototype.render;

Test.prototype.render = function() {
    console.log(this.constructor.name + ' call interrupted');
    return Test.prototype.render_old.call(this, arguments);
}

var t = new Test();
t.bla = 9;
t.render();
t.render();
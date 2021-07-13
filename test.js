const { v4: uuidv4 } = require('uuid');
const stuff = new Set()
process.on("exit", () => {
    console.log(stuff)
})
process.on("beforeExit", () => {
    console.log(stuff)
})
for (; ;) {
    const makeId = function () {
        const uuid = uuidv4().split('').slice(0, 5).join('');
        if (stuff.has(uuid)) {

            return makeId();
        }
        console.log(uuid)
        stuff.add(uuid)
        return uuid;
    };
    makeId()
}


const fs = require("fs");
const path = require("path");
const {promisify} = require("util");

const mkdir = promisify(fs.mkdir);

const {fixClass, toElmName, toScreen} = require("./code-gen.js");
const {formats, cleanOpts} = require("./options.js");

let classes = new Map();

module.exports = (opts = {}) => {
    opts = cleanOpts(opts);
    return {
        postcssPlugin: 'postcss-elm-tailwind',
        Once(root) {
            root.walkRules(rule => {
                rule.selector
                    .split(" ")
                    .map((sel) => sel.split(","))
                    .reduce((arr, v) => (arr.push(...v), arr), [])
                    .forEach((selector) => processSelector(selector, opts));
            })
            const formats_ = formats(opts)
                .map(data => splitByScreens(opts, classes, data))
                .flat()
                .map(data => {
                        const fileContent = data.elmBodyFn(data.elmModuleName, data.classesSet);
                        return writeFile(data.elmFile, fileContent);
                    }
                );
            return tap(Promise.all(formats_), (p) =>
                p.then((files) => console.log("Saved", files))
            );
        },
    }
};

module.exports.postcss = true

function splitByScreens(opts, classesSet, {elmFile, elmModuleName, elmBodyFn}) {
    if (!opts.splitByScreens) {
        return [{elmFile, elmModuleName, elmBodyFn, classesSet}]
    }
    const screens = [...opts.screens];
    screens.push(null)

    return screens.map(
        screen => extractScreen(screen, elmFile, elmModuleName, elmBodyFn, classesSet)
    )
}

let fixClassStartingWithNumber = (className) =>
    className.match(/(\d+)/)
        ? function () {
            let number = className.match(/(\d+)/)[0]
            let nName = className.replace(number, '')
            let firstChar = nName.charAt(0)
            let multiChars = firstChar.repeat(number)
            return nName.replace(firstChar, multiChars)
        }()
        : className

function extractScreen(screen, elmFile, elmModuleName, elmBodyFn, classesSet) {
    let newFile = elmFile;
    let newModule = elmModuleName;
    if (screen !== null) {
        let newName = fixClassStartingWithNumber(screen.toUpperCase())

        newFile = newFile.replace(".elm", `/${newName}.elm`);
        newModule = `${newModule}.${newName}`;
    }
    const newClasses = new Map();
    for (let [cls, val] of classesSet) {
        if (screen === val.screen) {
            newClasses.set(cls, val);
        }
    }
    return {elmFile: newFile, elmModuleName: newModule, elmBodyFn: elmBodyFn, classesSet: newClasses}
}

async function writeFile(fname, content) {
    let folder = path.dirname(fname);
    await mkdir(folder, {recursive: true});

    return new Promise((resolve, reject) =>
        fs.writeFile(fname, content, (err) => {
            if (err) return reject(err);
            resolve(fname);
        })
    );
}

function processSelector(selector, opts) {
    if (!selector.startsWith(".")) {
        // Keep only classes
        return;
    }

    let cls, elm, screen;

    cls = fixClass(selector);
    elm = toElmName(cls, opts);
    screen = toScreen(cls, opts);

    classes.set(cls, {elm, screen});
}

const tap = (v, fn) => {
    fn(v);
    return v;
};

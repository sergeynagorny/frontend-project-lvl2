import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath1 = path.resolve(`${__dirname}/${firstFile}`)
// const filePath2 = path.resolve(`${__dirname}/${secondFile}`)

const TAB = '  '

const Type = {
    EQUAL: 'EQUAL',
    REMOVED: 'REMOVED',
    ADDED: 'ADDED'
}

const PrefixByType = {
    [Type.EQUAL]: ' ',
    [Type.REMOVED]: '-',
    [Type.ADDED]: '+',
}

const readFile = (filePath) => JSON.parse(readFileSync(resolve(filePath)))
const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const getItem = (obj, key, type) => [TAB + PrefixByType[type] + ' ' + key + ': ' + obj[key]]
const convertToJsonString = (array) => '{\n' + array.join('\n') + '\n}'
const commonKeys = (...objects) => [...new Set([...objects.flatMap((obj) => Object.keys(obj))])].sort()

const genDiff = (firstFile, secondFile) => {
    const oldObj = readFile(firstFile)
    const newObj = readFile(secondFile)
    const keys = commonKeys(oldObj, newObj)

    const diffs = keys.reduce((acc, key) => {
        if (hasKey(oldObj, key) && hasKey(newObj, key)) {
            if (oldObj[key] === newObj[key]) {
                acc.push(getItem(newObj, key, Type.EQUAL))
            } else {
                acc.push(getItem(oldObj, key, Type.REMOVED))
                acc.push(getItem(newObj, key, Type.ADDED))
            }
        }

        if (hasKey(oldObj, key) && !hasKey(newObj, key)) {
            acc.push(getItem(oldObj, key, Type.REMOVED))
        }

        if (hasKey(newObj, key) && !hasKey(oldObj, key)) {
            acc.push(getItem(newObj, key, Type.ADDED))
        }

        return acc
    }, [])

    return convertToJsonString(diffs)
}

export default genDiff

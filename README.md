### Hexlet tests and linter status:
[![Actions Status](https://github.com/sergeynagorny/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/sergeynagorny/frontend-project-lvl2/actions)
[![ESlint & Tests](https://github.com/sergeynagorny/frontend-project-lvl2/actions/workflows/eslint-tests.yml/badge.svg)](https://github.com/sergeynagorny/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e06d39188eb8d66ecb6c/maintainability)](https://codeclimate.com/github/sergeynagorny/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e06d39188eb8d66ecb6c/test_coverage)](https://codeclimate.com/github/sergeynagorny/frontend-project-lvl2/test_coverage)

# GenDiff
✨ GenDiff – the small library to help you compare two objects for changes 


#### Support formats:
`.json` `.yaml` `.yml`

----
## Install
```
npm install gendiff -g
```
### Example
```
# before.json
{
  "common": {
    "follow": false,
    "setting6": {
      "key": "value",
    }
  }
}

# after.json
{
  "common": {
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
    }
  }
}
```
----

## Formatter Stylish
[![asciicast](https://asciinema.org/a/ovasQuNJhq2g7wcqAt15Hn06L.svg)](https://asciinema.org/a/ovasQuNJhq2g7wcqAt15Hn06L)
#### Code
```
export genDiff, { FormatType } from 'genDiff'

genDiff(beforeFilePath, afterFilePath, FormatType.STYLISH)
```
#### Result
```
{
    common: {
      - follow: false,
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          + ops: vops
        }
    }
}
```
----
## Formatter Plain
[![asciicast](https://asciinema.org/a/Z2JbW8BUhcy7e7cw7JAg4Xz36.svg)](https://asciinema.org/a/Z2JbW8BUhcy7e7cw7JAg4Xz36)
#### Code
```
export genDiff, { FormatType } from 'genDiff'

genDiff(beforeFilePath, afterFilePath, FormatType.PLAIN)
```
#### Result
```
Property 'common.follow' was removed
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
```
----
## Formatter Json
[![asciicast](https://asciinema.org/a/EYXRFpSQFJIiQAZ5CCO6V6qZ0.svg)](https://asciinema.org/a/EYXRFpSQFJIiQAZ5CCO6V6qZ0)
#### Code
```
export genDiff, { FormatType } from 'genDiff'

genDiff(beforeFilePath, afterFilePath, FormatType.JSON)
```
##### Result
```
[
   {
      "key":"common",
      "type":"NESTED",
      "children":[
         {
            "key":"follow",
            "type":"REMOVED",
            "value":false
         },
         {
            "key":"setting5",
            "type":"ADDED",
            "value":{
               "key5":"value5"
            }
         },
         {
            "key":"setting6",
            "type":"NESTED",
            "children":[
               {
                  "key":"key",
                  "type":"UNCHANGED",
                  "value":"value"
               },
               {
                  "key":"ops",
                  "type":"ADDED",
                  "value":"vops"
               }
            ]
         }
      ]
   }
]
```

install:
	npm ci

publish:
	npm publish --dry-run

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

run:
	gendiff src/__mocks__/file1.json src/__mocks__/file2.json

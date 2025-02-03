setup: install
	npx simple-git-hooks

install:
	npm ci

test:
	npm test

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-step:
	node --test --test-name-pattern step$(STEP)

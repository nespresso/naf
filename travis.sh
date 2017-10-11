#!/bin/bash

set -euo pipefail

npm run test
npm run test-with-coverage
npm run doc
npm run e2e-test-docker

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  sonar-scanner -Dsonar.host.url=https://sonarcloud.io \
                -Dsonar.analysis.mode=preview \
                -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                -Dsonar.github.oauth=$GITHUB_TOKEN \
                -Dsonar.login=$SONARQUBE_TOKEN

elif [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  sonar-scanner -Dsonar.host.url=https://sonarcloud.io \
                -Dsonar.login=$SONARQUBE_TOKEN \
                -Dsonar.javascript.lcov.reportPaths=output/coverage/lcov.info
fi

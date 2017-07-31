# Standalone IGCP Pattern Library

This is the standalone version of the IGCP Pattern Library, the primary difference being that the .THIS class has been commented out. The .THIS was originally required for getting the CSS to render in the Lightning App container in the dev instance of Salesforce.

## Compiling the library

1) Install Sass CLI: http://sass-lang.com/install
2) Terminal into cp-patternlib
3) Run: sass --watch main.scss:../resource-bundles/cppatternlib.resource/cp-patternlib/styles/igcp.css
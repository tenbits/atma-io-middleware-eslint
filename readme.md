[ESLint](https://eslint.org/) (Atma Plugin)
-----


The Plugin extends:
- [`atma-io`](https://github.com/atmajs/atma-io) with a custom middleware to lint JavaScript to files on read

##### How to use

###### Embed into the Project

+ `atma plugin install atma-io-middleware-eslint --save-dev`

	This adds `atma-loader-babel` npm dependency and the `package.json` would look like:
    ```json
        {
            "devDependencies": {
                "atma-io-middleware-eslint"
            },
            "atma": {
                "plugins": [
                    "atma-io-middleware-eslint"
                ],
                "settings": {
					"atma-io-middleware-eslint": {
						"eslint": {} // override eslint options
					}
                }
            }
        }
    ```


----
The MIT License
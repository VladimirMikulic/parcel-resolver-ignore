# parcel-resolver-ignore

![Version](https://img.shields.io/npm/v/parcel-resolver-ignore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: VladoDev](https://img.shields.io/twitter/follow/VladoDev.svg?style=social)](https://twitter.com/VladoDev)

> 🌀 Parcel plugin that allows you to ignore assets/import syntax from bundling.

## :package: Installation

```sh
# Installs the plugin and saves it as a development dependency
npm i parcel-resolver-ignore -D
```

## 🔌 Configuration

We need to create `.parcelrc` configuration file and add the plugin to resolvers like this:

> Syntax "..." instructs Parcel to apply the plugin on top of existing resolvers

```js
{
  "extends": "@parcel/config-default",
  "resolvers": ["parcel-resolver-ignore", "..."]
}
```

## :cloud: Usage

Sometimes, some of our files are not available at build time or we simply don't
want Parcel to process them. Or maybe we use special templating syntax for
importing files that Parcel doesn't recognize and throws an error.

This is where `parcel-resolver-ignore` comes into play.
You can find example use-cases below.

> ℹ️ NOTE: Examples below are HTML files, but the plugin works with EVERY file (i.e. CSS).

1. Excluding files from processing

**package.json**

```jsonc
{
  // An array of Regex patterns
  "parcelIgnore": [
    "jquery.min.js"
    "privacy-policy.html",
    "images\/*.*",
  ]
}

```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <h1>My Title</h1>
    <!-- This won't throw build error -->
    <a href="./privacy-policy.html">File not available at build time.</a>

    <!-- These won't be processed by Parcel -->
    <img src="./images/my-image.png" alt="my PNG image">
    <img src="./images/my-image.jpg" alt="my JPG image">
    <script src="jquery.min.js"></script>
  </body>
</html>
```

2. Ignoring special syntax (i.e. from templating engines)

**package.json**

```jsonc
{
  // An array of Regex patterns
  "parcelIgnore": [
    "{{*.*}}"
  ]
}

```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <h1>My Title</h1>
    <!-- This won't throw build error -->
    <script src="{{scriptSrc}}"></script>
  </body>
</html>
```

### 🚀 Build

```sh
parcel build src/index.html # Success!
```
## :wrench: Troubleshooting

If you ran Parcel just before adding this plugin, it's possible that stale Parcel caches are causing build failures. First, try to delete the caches folder `.parcel-cache` in your project's root directory.

## :man: Author

**Vladimir Mikulic**

- Twitter: [@VladoDev](https://twitter.com/VladoDev)
- Github: [@VladimirMikulic](https://github.com/VladimirMikulic)
- LinkedIn: [@vladimirmikulic](https://www.linkedin.com/in/vladimir-mikulic/)

## :handshake: Contributing

Contributions, issues and feature requests are welcome!

## :pencil: License

This project is licensed under [MIT](https://opensource.org/licenses/MIT) license.

## :man_astronaut: Show your support

Give a ⭐️ if this project helped you!

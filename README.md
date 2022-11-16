<div id="top"></div>

<div style="text-align:center" align="center">

  <h1>Pointerize</h1>

  <p>Zero-dependency shapes library</p>

</div>

## Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
  - [Highlights](#highlights)
    - [Straightforward Shape Creation](#straightforward-shape-creation)
    - [No Complex Calculations](#no-complex-calculations)
    - [Flexibility](#flexibility)
- [Quickstart](#quickstart)
- [Let Your Imagination Loose](#let-your-imagination-loose)
- [Handy Tips](#handy-tips)
  - [Potential Conflicts](#potential-conflicts)
  - [Simplify Options Creation](#simplify-options-creation)
- [Naming and Coding Style](#naming-and-coding-style)
- [Development](#development)
  - [Start a Dev Server](#start-a-dev-server)
  - [Run Unit Tests](#run-unit-tests)
- [License](#license)
- [Versioning](#versioning)
- [Contact](#contact)

## Introduction

Pointerize is suited to almost any task that involves shapes (SVG).

### Highlights

#### Straightforward Shape Creation

- **Ratios**:
  - **size**:  
    Size ratio can be used to specify shapes' size and patterns' row and column gap.
  - **radius**:  
    Radius ratio can be used to specify polygons' radii ratio.
- **Guides**:
  - **position**:  
    Shapes can be configured to be positioned on a polygon's (chosen as a position guide) vertexes.
  - **Pattern**:  
    Shapes can be configured to be the tiles of a pattern which is on another shape's (chosen as the pattern guide) fill or stroke.

#### No Complex Calculations

- **Automatic positioning**:  
  SVG shapes are automatically centered inside the SVG.
- **Automatic adjustments when the shape has `stroke`**:  
  When there is a non-zero `stroke-width`:
  - The size ratio includes the stroke as well.
  - If the shape has a pattern fill, the pattern is scaled down.

#### Flexibility

The mixture of the above-mentioned points and various API options means you can create
a wide variety of shapes and patterns to be used as:

- **Backgrounds/Foregrounds**
- **Custom pointer(cursor)**
- **Icons**
- ...

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Quickstart

Add Pointerize to your project either as an Npm package or from a CDN:

- Npm:

  - install

  ```bash
  npm install @ize-er/pointerize
  ```

  - import

  ```js
  import '@ize-er/pointerize/style.css'
  import Pointerize from '@ize-er/pointerize'
  ```

- CDN

  - HTML

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ize-er/pointerize@2/dist/style.css" />
  ```

  - import

  ```js
  import Pointerize from 'https://cdn.jsdelivr.net/npm/@ize-er/pointerize@2/dist/pointerize.min.js'
  ```

And then

```js
const options = { ... }
const pointerize = new Pointerize(options)

pointerize.start() // starts


// more methods that you can use
pointerize.hide() /* makes it invisible (if it's used as a custom pointer,
                     show the default pointer if it's not already visible) */
pointerize.show() /* makes it visible (if it's used as a custom pointer,
                     removes the default pointer if necessary) */
pointerize.stop() /* removes elements and event listeners (if there are any )
                     (if it's used as a custom pointer, show the default pointer
                     if it's not already visible) */

// properties you have access to on the instance
console.log('ID of current instance (on container)', pointerize.id)
console.log('The element chosen as root', pointerize.element__root)
console.log('The SVG element', pointerize.element__svg)
console.log('The SVG container element (div)', pointerize.element__svg_container)
console.log('The final merged and updated options used for creating this instance', pointerize.options__merged)

// Also note that you can create as many instances as you'd like
```

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Let Your Imagination Loose

What can be created by Pointerize? The possibilities are _limitless_. Visit the [website](https://ize-er.github.io/pointerize/) and
tinker around with the presets in `presets/full.ts`.

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Handy Tips

- A shape's size (specified in `ratios`) is calculated taking the `stroke-width` attribute into account
  so that the stroke doesn't increase the actual size (kind of like CSS `box-sizing: border-box`).
- When using a large number of shapes, animations, effects, etc. keep a wary eye on performance.
  There will be improvements in this regard.
- Only use string values for properties of `svg_attributes` and `css_properties`.
- For custom images use shape `type` of `image` and set `href` attribute.

### Potential Conflicts

- Pattern:
  - If svg attributes `stroke`/`fill` are specified on a shape that is a pattern guide, the pattern
    would overwrite those values based on whether it's assigned to the `fill` or `stroke` (by `.area`).
- Size:
  - It is not a good idea to set both size related attributes in `svg_attributes` and size ratio. (this may change)
- Animations:
  - If you choose to use a preset and make customizations using `css_properties`/`keyframes`, they will be
    merged and your options take precedence over preset's. for example if the preset has two keyframes defined
    and your options has three, the two from preset will be merged with the first two of yours.
- Only use pixel values (e.g. `"2"`) for `stroke-width` in `svg_attributes`. (this may change)
- CSS styles overwrite SVG attribute styling.

### Simplify Options Creation

When there is a large number of shapes you want to specify or for any other option that would be
cumbersome to type out you can simplify the process by using Javascript. See the advanced presets for examples.

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Naming and Coding Style

I am using the principles of a naming/coding methodology/convention that I am working on and that I may publish in the future.
You may see it in:

- The way things are named (CSS class names, id attributes, API options and Javascript code).
- The way comments are written.

It is helpful to know:

- Zero-based numbering is used (numbers start from `0`).
- `<number>th` represents a variation of something: `0th` is the first variation.
- Using numbers at the beginning of comments is a way of sectioning and grouping the related comments and code together.
  for example, `//0 comment here` is the first depth. same-number comments are in the same depth and they are the children of the
  smaller number that came before (just like a tree structure). It helps us identify the relation between code snippets
  that are in the same scope.

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Development

Clone the repository. You can find:

- The source code in the `lib` folder
- The tests (_Jest_) in the `test` folder

### Start a Dev Server

```bash
npm run dev
```

> Note: Use `main.ts`.

### Run Unit Tests

```bash
npm run test
```

<p style="text-align:right;"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Versioning

This library adheres to [Semantic Versioning 2.0.0](https://semver.org/)

<p style="text-align:right;"><a href="#top">back to top</a></p>

## Contact

Mail: [afaturechi@gmail.com](mailto:afaturechi@gmail.com)

_Due to recent events in my country I may be unable to answer promptly_

<p style="text-align:right;"><a href="#top">back to top</a></p>

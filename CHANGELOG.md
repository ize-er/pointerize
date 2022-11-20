## [Unlreleased]

### Fixed

- For a custom pointer, whether the default pointer should exist or not after a stop() + start()

### Deprecated

Since the purpose of the core library is to create SVG shapes and also to reduce size, other parts will be seperated; it means:
- A plugin system will be created and used for animations, effects, interactions.
- All presets will be separated from the core library. `preset` option will no longer accept a string, instead: 

```js
import { rotate } from '@ize-er/pointerize/presets/animations.js'
import { glow } from '@ize-er/pointerize/presets/effects.js'

const options = {
  shapes: [
    {
      .
      .
      .
      animations: [
        {
          preset: rotate()
        }
      ],
      effects: [
        {
          preset: glow()
        }
      ]
    }
  ]
}
```

### Added

- `make_multiple` property to create multiple shapes with less boilerplate: 
```js
{
  shapes: [
    {
      make_multiple: [
        {
          type: 'shapes',
          options: {
            number: 10,// the number of shapes to be made
            /* 
              This is the same shape object but with all property values wrapped in an array. If array has one
              member, it is applied to all shapes, otherwise they are applied in order.
            */
            value: { 
              type: ['polygon'],
              sides: [8],
              svg_attributes: [
                {}, {}, // and the rest ...
              ],
              ratios: [
                [], [], // and the rest ...
              ]
            }
          }
        }
      ]
    }
  ]
}
```

### Changed

- The experimental `builder_shapes` function is dropped in favor of `make_multiple`

## [2.0.0] - 2022-11-06

### Added

- `shapes` option for position guide.
- There are new configuration options on the website.

### Changed

- Presets are adapted for the new position guide.
- The last advanced preset is changed completely.

### Fixed

- ID of guide shapes' shapes is unique.
- Behavior for transform-related issues is fixed. The correct `transform-origin` is set on shapes.
- Positioning for large shapes.

### Removed

- A shape chosen as position guide does not position the rest of the shapes automatically and they have to be specified with the new `shapes` option.

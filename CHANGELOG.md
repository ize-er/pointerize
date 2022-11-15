## [Unlreleased]

### Fixed

- For a custom pointer, whether the default pointer should exist or not after a stop() + start()

### Deprecated

- All presets will be separated from the core library to reduce size. `preset` option will no longer accept a string, instead: 

```js
import { animationRotate } from '@ize-er/pointerize/presets/animations.js'
import { effectGlow } from '@ize-er/pointerize/presets/effects.js'

const options = {
  shapes: [
    {
      .
      .
      .
      animations: [
        {
          preset: animationRotate()
        }
      ],
      effects: [
        {
          preset: effectGlow()
        }
      ]
    }
  ]
}
```

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

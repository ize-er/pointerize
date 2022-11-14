## [Unlreleased]

### Fixed

- For a custom pointer, whether the default pointer should exist or not after a stop() + start()

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

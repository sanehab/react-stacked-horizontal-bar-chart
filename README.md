# StackedHorizontalBarChart

A responsive stacked horizontal bar chart with multiple bars, where markers can be added to mark results or points.

## Installation

The package can be installed via NPM:

```
npm install react-stacked-horizontal-bar-chart
```

React and prop-types are peer dependencies that you have to install yourself, you need to install react version that supports hooks.

## Demo

Some examples can be be found here, https://codesandbox.io/s/gracious-khayyam-i7xbt?file=/src/App.js

## Usage

```js
import { StackedHorizontalBarChart } from 'react-stacked-horizontal-bar-chart';

const Component = () => {
  return (
    <StackedHorizontalBarChart
      rangesPoints={[0, 10, 20, 30]}
      backgroundColors={['#4F81BD', '#C0504D', '#9BBB59']}
    />
  );
};
```

| Prop                       | Type    | Default Value | Description                                                                                                                                |
| -------------------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| height                     | Integer | 10            | Height of the bars                                                                                                                         |
| rangesPoints               | Array   | []            | Array of unique numbers to mark bars, numbers can be negative, positive, or zero, but the array should be sorted                           |
| ranges                     | Array   | []            | Array of bars widths, rangesPoints and ranges should not be used together, only one of them should be used                                 |
| edges                      | Array   | []            | Array of two elements, either string or number, will be used to mark the edges of the graph, regardless of the actual values               |
| backgroundColors           | Array   | required      | Array of colors to use for corresponding bars, if backgroundColors length is less than bars, then colors will be reused based on mod index |
| points                     | Array   | []            | Array of marker objects that should be added to the graph                                                                                  |
| shouldLimitPointsPositions | Boolean | true          | Markers should be kept within the bounds of the graph regardless of their values                                                           |
| classes                    | Object  | {}            | Object used to override default classes                                                                                                    |

## License

Licensed under MIT license, see [LICENSE](LICENSE) for the full license.

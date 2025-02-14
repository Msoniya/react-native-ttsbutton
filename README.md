# react-native-ttsbutton

A highly flexible and reusable button component for React Native applications, designed to handle a wide range of use cases with ease. This component supports:

* Custom Styling: Apply custom styles, colors, and sizes to fit your app's design system.
* Dynamic Colors: Use solid colors, or ghost (transparent) styles for buttons.
* Multiple Types: Choose from predefined button types like primary, default, danger, dashed, text, and link.
* Shapes: Supports default, oval, and circular button shapes.
* Icons: Add start and end icons for better visual appeal.
* Loading State: Integrated loading indicator with customizable position and color.
* Press Animation: Smooth scaling animation on button press for enhanced user feedback.
* Accessibility: Built with accessibility in mind, ensuring a seamless user experience.

Ideal for use in mobile applications where a consistent and customizable button component is required. Perfect for forms, dialogs, navigation, and more.

## Installation

```sh
npm install react-native-ttsbutton
```

## Usage


```js
import { TTSButton } from 'react-native-ttsbutton';

<TTSButton
  text="Submit"
  onPress={() => console.log('Button pressed!')}
  type="primary"
  size="default"
  startIcon={<Icon name="check" size={16} color="#FFF" />} // Start icon
  loaderPosition="end"
  shape="oval"
/>

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

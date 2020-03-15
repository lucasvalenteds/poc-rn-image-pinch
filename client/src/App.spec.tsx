import React from 'react';
import { Animated } from 'react-native';
import App from './App';

import ReactRenderer, {
  ReactTestRenderer,
  ReactTestInstance,
} from 'react-test-renderer';

test('It renders the text', () => {
  const renderer: ReactTestRenderer = ReactRenderer.create(<App />);

  const node: ReactTestInstance = renderer.root.findByType(Animated.Image);

  expect(node).toBeDefined();
});

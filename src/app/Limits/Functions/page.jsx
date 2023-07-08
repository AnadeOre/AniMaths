'use client';
import * as React from 'react';
import Latex from 'react-latex-next';
import PostLayout from '../../components/PostLayout.jsx';
import stylesPosts from '../../components/Posts.module.css';

import {
  roundTwoDecimals,
  distanceBetweenPoints,
} from '../../scripts/scripts.js';
import {
  Mafs,
  Ellipse,
  Coordinates,
  useMovablePoint,
  Theme,
  Line,
  Text,
  Transform,
  Point,
} from 'mafs';
import {clamp} from 'lodash';

export default function Page() {
  return (
    <PostLayout titleName={'Limits of functions'} whereTo='/Limits'>
      <br />
      Nothing to see here yet
    </PostLayout>
  );
}

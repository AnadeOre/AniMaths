'use client';
import * as React from 'react';
import {useState} from 'react';
import Latex from 'react-latex-next';
import PostLayout from '../../components/PostLayout';
import stylesPosts from '../../components/Posts.module.css';

import {
  roundTwoDecimals,
  distanceBetweenPoints,
} from '../../scripts/scripts.js';

import {
  Mafs,
  Coordinates,
  useMovablePoint,
  Theme,
  Line,
  Text,
  Transform,
  Plot,
  Point,
} from 'mafs';

export default function Parabola() {
  // FIRST ANIMATION
  const dirextrix1 = (x) => -2;
  const parabola1 = (x) => (x * x) / 8;
  const pointOnParabola = useMovablePoint([0, 0], {
    constrain: ([x, y]) => [(y * y) / 8, y],
    color: Theme.green,
  });
  const dToFocus = distanceBetweenPoints(
    pointOnParabola.x,
    pointOnParabola.y,
    2,
    0
  );
  const dToDirectrix = distanceBetweenPoints(
    pointOnParabola.x,
    pointOnParabola.y,
    -2,
    pointOnParabola.y
  );

  // SECOND ANIMATION
  const [isVertical, setIsVertical] = useState(false);
  const focusPointY = useMovablePoint([0, 2], {
    constrain: 'vertical',
    color: Theme.blue,
  });
  const parabola2 = (x) => (x * x) / (4 * focusPointY.y);
  const dirextrix2 = (x) => -focusPointY.y;
  const focusPointX = useMovablePoint([2, 0], {
    constrain: 'horizontal',
    color: Theme.blue,
  });
  const parabola2Hori = (y) => (y * y) / (4 * focusPointX.x);
  const dirextrix2Hori = (y) => -focusPointX.x;

  // THIRD ANIMATION
  const [isVertical12, setIsVertical12] = useState(false);
  const translate1 = useMovablePoint([0, 0], {
    color: Theme.orange,
  });
  const parabola2Y = (x) =>
    ((x - translate1.x) * (x - translate1.x)) / (4 * 1) + translate1.y;
  const parabola2X = (y) =>
    ((y - translate1.y) * (y - translate1.y)) / (4 * 1) + translate1.x;

  // FOURTH ANIMATION
  const [isVertical2, setIsVertical2] = useState(false);
  const px = useMovablePoint([2, 0], {
    constrain: 'horizontal',
    color: Theme.blue,
  });
  const py = useMovablePoint([0, 2], {
    constrain: 'vertical',
    color: Theme.blue,
  });
  const translate = useMovablePoint([0, 0], {
    color: Theme.orange,
  });
  const parabola3Y = (x) =>
    ((x - translate.x) * (x - translate.x)) / (4 * py.y) + translate.y;
  const parabola3X = (y) =>
    ((y - translate.y) * (y - translate.y)) / (4 * px.x) + translate.x;
  const directrixX = (x) => translate.x - px.x;
  const directrixY = (y) => translate.y - py.y;

  return (
    <PostLayout titleName={'Parabolas'} whereTo='/Conics'>
      <p>
        A Parabola is the set of all points that are equidistant from a fixed
        point called the focus and a fixed line called the directrix. The focus
        and the directrix are key elements of the parabola and determine its
        shape and position
      </p>
      <br />
      <p>
        Test the definition yourself, by moving{' '}
        <strong className={stylesPosts.green}>the point</strong> on the
        parabola, notice how the distances to the{' '}
        <strong className={stylesPosts.blue}>focus point</strong> and to the{' '}
        <strong className={stylesPosts.pink}>directrix</strong> are always the
        same.
      </p>
      <br />
      <Mafs viewBox={{x: [-4, 4], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        <Point x={2} y={0} color={Theme.blue} />
        <Text x={2} y={0.2} attach='n' color={Theme.blue}>
          F
        </Text>
        <Line.Segment point1={[2, 0]} point2={pointOnParabola.point} />
        <Text x={-1} y={pointOnParabola.y + 0.4} attach='n' attachDistance={15}>
          d = {dToDirectrix}
        </Text>
        <Text x={1.3} y={pointOnParabola.y + 0.2} attach='n'>
          d = {dToFocus}
        </Text>
        <Line.Segment
          point1={[-2, pointOnParabola.y]}
          point2={pointOnParabola.point}
        />
        <Plot.OfY x={dirextrix1} color={Theme.pink} weight={3} />
        <Point x={-2} y={pointOnParabola.y} color={Theme.pink} />
        <Text x={-3} y={0.2} attach='n' color={Theme.pink}>
          Directrix
        </Text>
        <Plot.OfY x={parabola1} />
        {pointOnParabola.element}
      </Mafs>
      <br />
      <br />
      <p>There are two types of parabolas, horizontals or verticals.</p>
      <br />
      <div
        onClick={() => setIsVertical(!isVertical)}
        className={stylesPosts.linkCard}>
        <h4 className={stylesPosts.textCard}>
          Switch to {isVertical ? 'horizontal' : 'vertical'}
        </h4>
      </div>
      <p>
        The formula of a{' '}
        <strong>{isVertical ? 'vertical' : 'horizontal'}</strong> parabola
        centered at the origin <Latex>$(0,0)$</Latex> is
      </p>
      <Latex>{isVertical ? '$$x^2 = 4py$$' : '$$y^2 = 4px$$'}</Latex>
      <p>
        where <Latex>{'$p>0$'}</Latex> will determine the shape of the parabola:
      </p>
      <ul>
        <li>
          Directrix at{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{isVertical ? '$y = -p$' : '$x = -p$'}</Latex>
          </strong>
          .
        </li>
        <li>
          Focus at{' '}
          <strong className={stylesPosts.blue}>
            <Latex>{isVertical ? '$(0,p)$' : '$(p,0)$'}</Latex>
          </strong>
          .
        </li>
      </ul>
      <br />
      <p>For example, the following parabola has formula:</p>
      <Latex>
        {isVertical
          ? `$$x^2 = 4\\cdot(${roundTwoDecimals(focusPointY.y)})\\cdot y$$`
          : `$$y^2 = 4\\cdot(${roundTwoDecimals(focusPointX.x)})\\cdot x$$`}
      </Latex>
      <Mafs viewBox={{x: [-4, 4], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        {isVertical ? (
          <>
            <Plot.OfX y={parabola2} />
            <Plot.OfX y={dirextrix2} color={Theme.pink} weight={3} />
            <Text x={0.5} y={focusPointY.y + 0.5} color={Theme.blue}>
              F=(0,{roundTwoDecimals(focusPointY.y)})
            </Text>
            <Text x={3} y={-focusPointY.y + 0.2} color={Theme.pink}>
              Directrix
            </Text>
            {focusPointY.element}
          </>
        ) : (
          <>
            <Plot.OfY x={parabola2Hori} />
            <Plot.OfY x={dirextrix2Hori} color={Theme.pink} weight={3} />
            <Text x={focusPointX.x} y={0.5} color={Theme.blue}>
              {' '}
              F= ({roundTwoDecimals(focusPointX.x)},0)
            </Text>
            <Text x={-focusPointX.x - 1} y={2} color={Theme.pink}>
              Directrix
            </Text>
            {focusPointX.element}
          </>
        )}
      </Mafs>
      <br />
      <h3>And what happens if we change the center?</h3>
      <p>
        If we move the parabola horizontally or vertically, we need to aplly the
        corresponding transformations to the variables{' '}
        <Latex>$x$ and $y$.</Latex>
      </p>
      <ul>
        <li>
          <p>
            Horizontal shift of{' '}
            <Latex>$h$ units: Change the value of $x$ for $x-h$</Latex>.
          </p>
        </li>
        <li>
          <p>
            Vertical shift of{' '}
            <Latex>$k$ units: Change the value of $y$ for $y-k$</Latex>.
          </p>
        </li>
      </ul>
      Together with the variables <Latex>$x$ and $y$</Latex>, the other elements
      affected by the translation are the{' '}
      <strong className={stylesPosts.blue}>focus point</strong> and the{' '}
      <strong className={stylesPosts.pink}>directrix</strong>, these are now{' '}
      <strong className={stylesPosts.blue}>
        <Latex>$(h+p,k)$</Latex>
      </strong>
      ,{' '}
      <strong className={stylesPosts.pink}>
        <Latex>$x=h-p$</Latex>
      </strong>{' '}
      for horizontal parabolas and{' '}
      <strong className={stylesPosts.blue}>
        <Latex>$(h,k+p)$</Latex>
      </strong>
      ,{' '}
      <strong className={stylesPosts.pink}>
        <Latex>$y=k-p$</Latex>
      </strong>{' '}
      for vertical parabolas.
      <br />
      <br />
      <p>
        Perfect! Now let's perform this transformations on the formula of the
        parabola.
      </p>
      <br />
      <div
        onClick={() => setIsVertical12(!isVertical12)}
        className={stylesPosts.linkCard}>
        <h4 className={stylesPosts.textCard}>
          Switch to {isVertical12 ? 'horizontal' : 'vertical'}
        </h4>
      </div>
      <p>
        The formula of a{' '}
        <strong>{isVertical12 ? 'vertical' : 'horizontal'}</strong> parabola
        centered in{' '}
        <strong className={stylesPosts.orange}>
          <Latex>$(h,k)$</Latex>
        </strong>{' '}
        is:
      </p>
      <Latex>
        {isVertical12 ? '$$(x-h)^2 = 4p(y-k),$$' : '$$(y-k)^2 = 4p(x-h),$$'}
      </Latex>
      <p>let's see what this looks like. The fomula:</p>
      <Latex>
        {isVertical12
          ? `$$\\big(x-(${roundTwoDecimals(
              translate1.x
            )})\\big)^2 = 4p\\big(y-(${roundTwoDecimals(
              translate1.y
            )})\\big),$$`
          : `$$\\big(y-(${roundTwoDecimals(
              translate1.y
            )})\\big)^2 = 4p\\big(x-(${roundTwoDecimals(
              translate1.x
            )})\\big),$$`}
      </Latex>
      <p>gives us the following parabola:</p>
      <br />
      <Mafs viewBox={{x: [-3, 3], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        {isVertical12 ? (
          <>
            <Transform translate={translate1.point}>
              <Plot.OfX y={parabola2Y} />
            </Transform>
            <Text x={translate1.x} y={translate1.y - 0.5} color={Theme.orange}>
              ({roundTwoDecimals(translate1.x)},{roundTwoDecimals(translate1.y)}
              )
            </Text>
          </>
        ) : (
          <>
            <Transform translate={translate1.point}>
              <Plot.OfY x={parabola2X} />
            </Transform>
            <Text x={translate1.x - 1.3} y={translate1.y} color={Theme.orange}>
              ({roundTwoDecimals(translate1.x)},{roundTwoDecimals(translate1.y)}
              )
            </Text>
          </>
        )}
        {translate1.element}
      </Mafs>
      <br />
      <br />
      <h3>To sum up:</h3>
      <br />
      <div
        onClick={() => setIsVertical2(!isVertical2)}
        className={stylesPosts.linkCard}>
        <h4 className={stylesPosts.textCard}>
          Switch to {isVertical2 ? 'horizontal' : 'vertical'}
        </h4>
      </div>
      <p>
        {' '}
        we've learnt how to plot a general{' '}
        <strong>{isVertical2 ? 'vertical' : 'horizontal'}</strong> parabola
        centered at{' '}
        <strong className={stylesPosts.orange}>
          <Latex>$(h,k)$</Latex>
        </strong>
        , directrix{' '}
        <strong className={stylesPosts.pink}>
          <Latex>{isVertical2 ? '$y = k-p$' : '$x = h-p$'}</Latex>
        </strong>{' '}
        and focus point{' '}
        <strong className={stylesPosts.blue}>
          <Latex>{isVertical2 ? '$(h,k+p)$' : '$(h+p,k)$'}</Latex>
        </strong>
        .
      </p>
      <Latex>
        {isVertical2
          ? `$$\\big(x-(${roundTwoDecimals(
              translate.x
            )})\\big)^2 = 4\\cdot(${roundTwoDecimals(
              py.y
            )})\\big(y-(${roundTwoDecimals(translate.y)})\\big),$$`
          : `$$\\big(y-(${roundTwoDecimals(
              translate.y
            )})\\big)^2 = 4\\cdot(${roundTwoDecimals(
              px.x
            )})\\big(x-(${roundTwoDecimals(translate.x)})\\big),$$`}
      </Latex>
      <br />
      <Mafs viewBox={{x: [-3, 3], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        {isVertical2 ? (
          <>
            <Transform translate={translate.point}>
              <Plot.OfX y={parabola3Y} />
              <Plot.OfX y={directrixY} color={Theme.pink} weight={3} />
              {py.element}
            </Transform>
            <Text
              x={translate.x + 0.4}
              y={translate.y + py.y}
              color={Theme.blue}>
              F
            </Text>
            <Text x={-4} y={translate.y - py.y - 0.4} color={Theme.pink}>
              Directrix
            </Text>
            <Text x={translate.x} y={translate.y + 0.5} color={Theme.orange}>
              ({roundTwoDecimals(translate.x)},{roundTwoDecimals(translate.y)})
            </Text>
          </>
        ) : (
          <>
            <Transform translate={translate.point}>
              <Plot.OfY x={parabola3X} />
              <Plot.OfY x={directrixX} color={Theme.pink} weight={3} />

              {px.element}
            </Transform>
            <Text
              x={translate.x + px.x}
              y={translate.y + 0.3}
              color={Theme.blue}>
              F
            </Text>
            <Text x={translate.x} y={translate.y + 0.5} color={Theme.orange}>
              ({roundTwoDecimals(translate.x)},{roundTwoDecimals(translate.y)})
            </Text>
            <Text x={translate.x - px.x - 1} y={2} color={Theme.pink}>
              Directrix
            </Text>
          </>
        )}
        {translate.element}
      </Mafs>
      <br />
    </PostLayout>
  );
}

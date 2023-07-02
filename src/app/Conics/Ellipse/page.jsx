'use client';
import * as React from 'react';
import {useState} from 'react';
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
  // FIRST ANIMATION
  const pointOnEllipse = useMovablePoint([0, 2.23606], {
    constrain: ([x]) => [
      clamp(x, -2.9, 2.9),
      clamp(Math.sqrt(5 - (5 / 9) * x * x), 0.1, 2.236),
    ],
    color: Theme.green,
  });
  const pointInLine1 = [pointOnEllipse.x / pointOnEllipse.y - 1.8, 1];
  const pointInLine2 = [pointOnEllipse.x / pointOnEllipse.y + 2.2, 1];

  const d1 = distanceBetweenPoints(pointOnEllipse.x, pointOnEllipse.y, -2, 0);
  const d2 = distanceBetweenPoints(pointOnEllipse.x, pointOnEllipse.y, 2, 0);
  const sumDistances = d1 + d2;

  // SECOND ANIMATION
  const width = useMovablePoint([2, 0], {
    constrain: 'horizontal',
  });
  const height = useMovablePoint([0, 1], {
    constrain: 'vertical',
  });

  // THIRD ANIMATION
  const [seeVert, setSeeVert] = useState(true);
  const horRadi = useMovablePoint([3, 0], {
    constrain: 'horizontal',
  });
  const focus = useMovablePoint([-2, 0], {
    color: Theme.blue,
    constrain: ([x, y]) => [clamp(x, -horRadi.x, 0), 0],
  });

  const vertiRadi = useMovablePoint([0, 3], {
    constrain: 'vertical',
  });
  const focus2 = useMovablePoint([0, -2], {
    color: Theme.blue,
    constrain: ([x, y]) => [0, clamp(y, -vertiRadi.y, 0)],
  });

  const verRadi = Math.sqrt(horRadi.x * horRadi.x - focus.x * focus.x);
  const verRadi2 = Math.sqrt(vertiRadi.y * vertiRadi.y - focus2.y * focus2.y);

  // FOURTH ANIMATION
  const translate = useMovablePoint([0, 0], {
    color: Theme.orange,
  });

  // FIFTH ANIMATION
  const translate2 = useMovablePoint([0, 0], {
    color: Theme.orange,
  });
  const width2 = useMovablePoint([1, 0], {
    // constrain: "horizontal",
    constrain: ([x, y]) => [clamp(x, 0, height2.y), 0],
  });
  const height2 = useMovablePoint([0, 2], {
    // constrain: "vertical",
    constrain: ([x, y]) => [0, clamp(y, width2.x, 5)],
  });

  const focusFromab = Math.sqrt(
    Math.abs(width2.x * width2.x - height2.y * height2.y)
  );

  return (
    <PostLayout titleName={'Ellipses'} whereTo='/Conics'>
      <p>
        An ellipse is a plane curve surrounding two{' '}
        <strong className={stylesPosts.blue}>focal points</strong>, such that,
        for all points on the curve, the sum of the distances to the{' '}
        <strong className={stylesPosts.blue}>focal points</strong> is constant.
      </p>
      <br />
      <p>
        Test the definition yourself, by moving{' '}
        <strong className={stylesPosts.green}>the point</strong> on the ellipse,
        notice how the sum of the distances is always <Latex>$6$</Latex>.
      </p>
      <br />
      <Mafs viewBox={{x: [-4, 4], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        <Ellipse center={[0, 0]} radius={[3, 2.23606]} />
        <Line.Segment point1={[-2, 0]} point2={pointOnEllipse.point} />
        <Line.Segment point1={[2, 0]} point2={pointOnEllipse.point} />
        <Text x={-2.3} y={0.2} attach='nw' color={Theme.blue}>
          F
        </Text>
        <Text x={2.3} y={0.2} attach='ne' color={Theme.blue}>
          F
        </Text>

        <Text
          x={pointInLine1[0]}
          y={pointInLine1[1]}
          attach='w'
          attachDistance={15}>
          d = {d1}
        </Text>
        <Text
          x={pointInLine2[0]}
          y={pointInLine2[1]}
          attach='w'
          attachDistance={15}>
          d = {d2}
        </Text>
        <Text x={3} y={3}>
          Distances sum = {sumDistances}
        </Text>
        {pointOnEllipse.element}
        <Point x={-2} y={0} color={Theme.blue} />
        <Point x={2} y={0} color={Theme.blue} />
      </Mafs>
      <br />
      <p>
        The formula of an ellipse centered at the origin <Latex>$(0,0)$</Latex>{' '}
        is
      </p>
      <Latex>{'$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1,$$'}</Latex>
      <p>
        where <Latex>$a$ and $b$</Latex> are the{' '}
        <strong className={stylesPosts.pink}>
          horizontal and vertical diameter lengths
        </strong>{' '}
        respectively.
      </p>
      <p>For example, the following ellipse has formula:</p>
      <Latex>{`$$\\frac{x^2}{(${roundTwoDecimals(
        Math.abs(width.x)
      )})^2} + \\frac{y^2}{(${roundTwoDecimals(
        Math.abs(height.y)
      )})^2} = 1,$$`}</Latex>
      <Mafs viewBox={{x: [-4, 4], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        <Ellipse
          center={[0, 0]}
          radius={[Math.abs(width.x), Math.abs(height.y)]}
        />
        <Text
          x={height.x - 0.2}
          y={height.y + 0.2}
          attach='nw'
          color={Theme.pink}>
          b
        </Text>
        <Text
          x={width.x + 0.2}
          y={width.y + 0.2}
          attach='ne'
          color={Theme.pink}>
          a
        </Text>
        {width.element}
        {height.element}
      </Mafs>
      <br />
      <p>
        The <strong className={stylesPosts.blue}>focal points</strong> of an
        ellipse centered at <Latex>$(0,0)$</Latex> are{' '}
        <Latex>$(\pm c,0)$</Latex> if <Latex>{'$a>b$'}</Latex> (horizontal
        ellipse) and <Latex>$(0,\pm c)$</Latex> if <Latex>{'$a>b$'}</Latex>{' '}
        (vertical ellipse), where{' '}
        <Latex>{'$c$ is  calculated as $c = \\sqrt{|a^2-b^2|}.$'}</Latex>
      </p>
      <p>
        Let's see how the{' '}
        <strong className={stylesPosts.blue}>focal points</strong> affect the
        shape of the ellipse for a fixed{' '}
        <strong className={stylesPosts.pink}>
          {seeVert ? 'horizontal' : 'vertical'} diameter
        </strong>
        . What shape do we get when <Latex>$c=0$</Latex>?
      </p>
      <br />
      <br />
      <div
        onClick={() => setSeeVert(!seeVert)}
        className={stylesPosts.linkCard}>
        <h4 className={stylesPosts.textCard}>
          Switch to {seeVert ? 'vertical' : 'horizontal'}
        </h4>
      </div>
      <br />
      <Mafs viewBox={{x: [-4, 4], y: [-4, 4]}}>
        <Coordinates.Cartesian />
        {seeVert ? (
          <>
            <Ellipse
              center={[0, 0]}
              radius={[Math.abs(horRadi.x), Math.abs(verRadi)]}
            />
            <Point x={-focus.x} y={0} color={Theme.blue} />
            <Text x={focus.x} y={0.2} attach='n' color={Theme.blue}>
              F
            </Text>
            <Text x={-focus.x} y={0.3} attach='n' color={Theme.blue}>
              F
            </Text>
            <Text x={horRadi.x + 0.2} y={0.2} attach='ne' color={Theme.pink}>
              a
            </Text>
            // {focus.element}
            // {horRadi.element}
          </>
        ) : (
          <>
            <Ellipse
              center={[0, 0]}
              radius={[verRadi2, Math.abs(vertiRadi.y)]}
            />
            <Point x={0} y={-focus2.y} color={Theme.blue} />
            <Text x={-0.3} y={focus2.y} attach='w' color={Theme.blue}>
              F
            </Text>
            <Text x={-0.3} y={-focus2.y} attach='w' color={Theme.blue}>
              F
            </Text>
            <Text x={-0.3} y={vertiRadi.y + 0.2} attach='nw' color={Theme.pink}>
              b
            </Text>
            {focus2.element}
            {vertiRadi.element}
          </>
        )}
      </Mafs>
      <h3>And what happens if we change the center?</h3>
      <p>
        If we move the ellipse horizontally or vertically, we need to aplly the
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
      <strong className={stylesPosts.blue}>focus points</strong>, these are now{' '}
      <strong className={stylesPosts.blue}>
        <Latex>$(\pm c + h, k)$</Latex>
      </strong>{' '}
      for horizontal ellipses and{' '}
      <strong className={stylesPosts.blue}>
        <Latex>$(h, \pm c +k)$</Latex>
      </strong>{' '}
      for vertical ellipses.
      <br />
      <p>
        Perfect! Now let's perform this transformations on the formula of the
        ellipse.
      </p>
      <br />
      <p>
        The formula of an ellipse centered in{' '}
        <strong className={stylesPosts.orange}>
          <Latex>$(h,k)$</Latex>
        </strong>{' '}
        is:
      </p>
      <Latex>{'$$\\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1,$$'}</Latex>
      <p>let's see what this looks like. The fomula:</p>
      <Latex>{`$$\\frac{\\big(x-(${roundTwoDecimals(
        translate.x
      )})\\big)^2}{a^2} + \\frac{\\big(y-(${roundTwoDecimals(
        translate.y
      )})\\big)^2}{b^2} = 1,$$`}</Latex>
      <p>gives us the following ellipse:</p>
      <br />
      <Mafs viewBox={{x: [-3, 3], y: [-3, 3]}}>
        <Coordinates.Cartesian />

        <Transform translate={translate.point}>
          <Ellipse center={[0, 0]} radius={[2, 3]} />
        </Transform>
        <Text
          x={translate.x + 0.2}
          y={translate.y - 0.2}
          attach='se'
          color={Theme.orange}>
          ({roundTwoDecimals(translate2.x)},{roundTwoDecimals(translate2.y)})
        </Text>
        {translate.element}
      </Mafs>
      <br />
      <p>
        To sum up, we've learnt how to plot a general ellipse centered at{' '}
        <strong className={stylesPosts.orange}>
          <Latex>$(h,k)$</Latex>
        </strong>
        , with horizontal and vertical diameters{' '}
        <strong className={stylesPosts.pink}>
          <Latex>$a$</Latex>
        </strong>{' '}
        and{' '}
        <strong className={stylesPosts.pink}>
          <Latex>$b$</Latex>
        </strong>{' '}
        and focus points{' '}
        <strong className={stylesPosts.blue}>
          <Latex>$(h+c, k)$</Latex>
        </strong>{' '}
        and{' '}
        <strong className={stylesPosts.blue}>
          <Latex>$(h, k+c)$</Latex>
        </strong>
        .
      </p>
      <Latex>{`$$\\frac{\\big(x-(${roundTwoDecimals(
        translate2.x
      )})\\big)^2}{(${Math.abs(
        roundTwoDecimals(width2.x)
      )})^2} + \\frac{\\big(y-(${roundTwoDecimals(
        translate2.y
      )})\\big)^2}{(${Math.abs(
        roundTwoDecimals(height2.y)
      )})^2} = 1,$$`}</Latex>
      <br />
      <Mafs viewBox={{x: [-3, 3], y: [-3, 3]}}>
        <Coordinates.Cartesian />

        <Transform translate={translate2.point}>
          <Ellipse
            center={[0, 0]}
            radius={[Math.abs(width2.x), Math.abs(height2.y)]}
          />
          {width2.element}
          {height2.element}

          <Point x={0} y={focusFromab} color={Theme.blue} />
          <Point x={0} y={-focusFromab} color={Theme.blue} />
          <Text x={0 - 0.2} y={focusFromab} attach='w' color={Theme.blue}>
            F
          </Text>
          <Text x={0 - 0.2} y={-focusFromab} attach='w' color={Theme.blue}>
            F
          </Text>

          <Text
            x={width2.x - 0.2}
            y={width2.y + 0.2}
            attach='w'
            color={Theme.pink}>
            a
          </Text>
          <Text
            x={height2.x - 0.2}
            y={height2.y + 0.2}
            attach='w'
            color={Theme.pink}>
            b
          </Text>
        </Transform>
        <Text
          x={translate2.x + 0.2}
          y={translate2.y - 0.2}
          attach='se'
          color={Theme.orange}>
          ({roundTwoDecimals(translate2.x)},{roundTwoDecimals(translate2.y)})
        </Text>
        {translate2.element}
      </Mafs>
      <br />
    </PostLayout>
  );
}

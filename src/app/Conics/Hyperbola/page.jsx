'use client';
import * as React from 'react';
import {useState} from 'react';
import PostLayout from '../../components/PostLayout.jsx';
import Latex from 'react-latex-next';
import stylesPosts from '../../components/Posts.module.css';
import {useSelector} from 'react-redux';

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
import {clamp, round} from 'lodash';

export default function Parabola() {
  // FIRST ANIMATION
  const pointOnHyperbola1 = useMovablePoint([1, 0], {
    constrain: ([y]) => [clamp(Math.sqrt(1 + y * y), 1, 10), clamp(y, -10, 10)],
    color: Theme.green,
  });
  const hyperbolaPlot1 = (y) => Math.sqrt(1 + y * y);
  const hyperbolaPlot2 = (y) => -Math.sqrt(1 + y * y);
  const pointInLine1 = [
    (pointOnHyperbola1.y + Math.sqrt(2)) /
      ((pointOnHyperbola1.x + Math.sqrt(2)) / pointOnHyperbola1.y),
    pointOnHyperbola1.y,
  ];
  const pointInLine2 = [
    (pointOnHyperbola1.y - Math.sqrt(2)) /
      ((pointOnHyperbola1.x + Math.sqrt(2)) / pointOnHyperbola1.y) +
      3.5,
    pointOnHyperbola1.y,
  ];
  const d1 = distanceBetweenPoints(
    pointOnHyperbola1.x,
    pointOnHyperbola1.y,
    -Math.sqrt(2),
    0
  );
  const d2 = distanceBetweenPoints(
    pointOnHyperbola1.x,
    pointOnHyperbola1.y,
    Math.sqrt(2),
    0
  );
  const diffDistances = d1 - d2;

  // SECOND ANIMATION
  const [isVertical, setIsVertical] = useState(false);

  const width = useMovablePoint([2, 0], {
    constrain: 'horizontal',
  });
  const height = useMovablePoint([0, 1], {
    constrain: 'vertical',
  });
  const hyperbolaPlot21 = (y) =>
    Math.sqrt((1 + (y * y) / (height.y * height.y)) * (width.x * width.x));

  const hyperbolaPlot22 = (y) =>
    -Math.sqrt((1 + (y * y) / (height.y * height.y)) * (width.x * width.x));

  const asymptote1 = (x) => (height.y / width.x) * x;
  const asymptote12 = (x) => (-height.y / width.x) * x;

  // THIRD ANIMATINO
  const [isVertical1, setIsVertical1] = useState(false);

  const focusX = useMovablePoint([-2, 0], {
    color: Theme.blue,
    constrain: 'horizontal',
  });

  const horRadi = useMovablePoint([1, 0], {
    constrain: ([x, y]) => [clamp(x, focusX.x, -focusX.x), 0],
  });
  const b = Math.sqrt(focusX.x * focusX.x - horRadi.x * horRadi.x);
  const hyperbolaPlotHori1 = (y) =>
    Math.sqrt((1 + (y * y) / (b * b)) * (horRadi.x * horRadi.x));
  const hyperbolaPlotHori2 = (y) =>
    -Math.sqrt((1 + (y * y) / (b * b)) * (horRadi.x * horRadi.x));

  const focusY = useMovablePoint([0, -2], {
    color: Theme.blue,
    constrain: 'vertical',
  });
  const verRadi = useMovablePoint([0, 1], {
    constrain: ([x, y]) => [0, clamp(y, focusY.y, -focusY.y)],
  });
  const a = Math.sqrt(focusY.y * focusY.y - verRadi.y * verRadi.y);
  const hyperbolaPlotVer1 = (x) =>
    Math.sqrt((1 + (x * x) / (a * a)) * (verRadi.y * verRadi.y));
  const hyperbolaPlotVer2 = (x) =>
    -Math.sqrt((1 + (x * x) / (a * a)) * (verRadi.y * verRadi.y));

  const asymptoteHor21 = (x) => (b / horRadi.x) * x;
  const asymptoteHor22 = (x) => (-b / horRadi.x) * x;
  const asymptoteVer21 = (y) => (verRadi.y / a) * y;
  const asymptoteVer22 = (y) => (-verRadi.y / a) * y;
  // FOURTH ANIMATION
  const [isVertical3, setIsVertical3] = useState(false);
  const translate = useMovablePoint([0, 0], {
    color: Theme.orange,
  });
  const hyperbolaPlotHor4 = (y) =>
    Math.sqrt(1 + (y - translate.y) * (y - translate.y)) + translate.x;
  const hyperbolaPlotHor41 = (y) =>
    -Math.sqrt(1 + (y - translate.y) * (y - translate.y)) + translate.x;

  const hyperbolaPlotVer4 = (x) =>
    Math.sqrt(1 + (x - translate.x) * (x - translate.x)) + translate.y;
  const hyperbolaPlotVer41 = (x) =>
    -Math.sqrt(1 + (x - translate.x) * (x - translate.x)) + translate.y;

  // FIFTH ANIMATION
  const [isVertical5, setIsVertical5] = useState(false);
  const translate2 = useMovablePoint([0, 0], {
    color: Theme.orange,
  });
  const width2 = useMovablePoint([1, 0], {
    constrain: 'horizontal',
  });
  const height2 = useMovablePoint([0, 1], {
    constrain: 'vertical',
  });

  const hyperbolaPlotVer5 = (x) =>
    Math.sqrt(
      (1 + ((x - translate2.x) * (x - translate2.x)) / (width2.x * width2.x)) *
        (height2.y * height2.y)
    ) + translate2.y;
  const hyperbolaPlotVer52 = (x) =>
    -Math.sqrt(
      (1 + ((x - translate2.x) * (x - translate2.x)) / (width2.x * width2.x)) *
        (height2.y * height2.y)
    ) + translate2.y;

  const hyperbolaPlotHor5 = (y) =>
    Math.sqrt(
      (1 +
        ((y - translate2.y) * (y - translate2.y)) / (height2.y * height2.y)) *
        (width2.x * width2.x)
    ) + translate2.x;
  const hyperbolaPlotHor52 = (y) =>
    -Math.sqrt(
      (1 +
        ((y - translate2.y) * (y - translate2.y)) / (height2.y * height2.y)) *
        (width2.x * width2.x)
    ) + translate2.x;

  const asymptoteHor51 = (x) =>
    (height2.y / width2.x) * (x - translate2.x) + translate2.y;
  const asymptoteHor52 = (x) =>
    -(height2.y / width2.x) * (x - translate2.x) + translate2.y;
  const asymptoteVer51 = (y) =>
    (width2.x / height2.y) * (y - translate2.y) + translate2.x;
  const asymptoteVer52 = (y) =>
    -(width2.x / height2.y) * (y - translate2.y) + translate2.x;

  const c = Math.sqrt(width2.x * width2.x + height2.y * height2.y);

  const lang = useSelector((state) => state.langToggle.value);

  return (
    <PostLayout
      titleName={lang === 'en' ? 'Hyperbola' : 'Hipérbola'}
      whereTo='/Conics'>
      {lang === 'en' ? (
        <p>
          A hyperbola is the set of all the points in the plane such that the
          diference of the distances of each point to the two{' '}
          <strong className={stylesPosts.blue}>focal points</strong> is
          constant.
        </p>
      ) : (
        <p>
          Una hipérbola es el conjunto de todos los puntos en el plano tales que
          la diferencia de las distancias del punto a cada uno de los dos{' '}
          <strong className={stylesPosts.blue}>puntos focales</strong> es
          constante.
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Test the definition yourself, by moving{' '}
          <strong className={stylesPosts.green}>the point</strong> on the
          hyperbola, notice how the sum of the distances is always{' '}
          <Latex>$6$</Latex>.
        </p>
      ) : (
        <p>
          Probá la definición vos mismo moviendo{' '}
          <strong className={stylesPosts.green}>el punto</strong> en la
          hipérobla, notá como la diferencia de las distancias es siempre{' '}
          <Latex>$2.$</Latex>
        </p>
      )}
      <br />
      <Mafs viewBox={{x: [-2, 2], y: [-3, 3]}}>
        <Coordinates.Cartesian />

        <Plot.OfY x={hyperbolaPlot1} />
        <Plot.OfY x={hyperbolaPlot2} />
        <Point x={Math.sqrt(2)} y={0} color={Theme.blue} />
        <Point x={-Math.sqrt(2)} y={0} color={Theme.blue} />
        <Line.Segment
          point1={[-Math.sqrt(2), 0]}
          point2={pointOnHyperbola1.point}
        />
        <Line.Segment
          point1={[Math.sqrt(2), 0]}
          point2={pointOnHyperbola1.point}
        />
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
        {lang === 'en' ? (
          <Text x={-1} y={-2.5}>
            Distances difference = {roundTwoDecimals(diffDistances)}
          </Text>
        ) : (
          <Text x={-1} y={-2.5}>
            Diferencia de distancias = {roundTwoDecimals(diffDistances)}
          </Text>
        )}
        {pointOnHyperbola1.element}
      </Mafs>
      <br />
      <br />
      {lang === 'en' ? (
        <p>There are two types of hyperbolas, horizontals and verticals.</p>
      ) : (
        <p>Hay dos tipos de hipérbolas, horizontales y verticales.</p>
      )}
      <br />
      <div
        onClick={() => setIsVertical(!isVertical)}
        className={stylesPosts.linkCard}>
        {lang === 'en' ? (
          <h4 className={stylesPosts.textCard}>
            Switch to {isVertical ? 'horizontal' : 'vertical'}
          </h4>
        ) : (
          <h4 className={stylesPosts.textCard}>
            Cambiar a {isVertical ? 'horizontal' : 'vertical'}
          </h4>
        )}
      </div>
      {lang === 'en' ? (
        <p>
          The formula of a{' '}
          <strong>{isVertical ? 'vertical' : 'horizontal'}</strong> hyperbola
          with vertex at the origin <Latex>$(0,0)$</Latex> is
        </p>
      ) : (
        <p>
          La fórmula para una hipérbola{' '}
          <strong>{isVertical ? 'vertical' : 'horizontal'}</strong> con vértice
          en el origen <Latex>$(0,0)$</Latex> es
        </p>
      )}
      <Latex>
        {isVertical
          ? '$$\\frac{y^2}{b^2} - \\frac{x^2}{a^2} = 1$$'
          : '$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$'}
      </Latex>
      {lang === 'en' ? (
        <p>
          where <Latex>$a$ and $b$</Latex> will determine the{' '}
          <strong className={stylesPosts.pink}>shape of the hyperbola</strong>{' '}
          and of its <strong className={stylesPosts.yellow}>asymptotes</strong>.
        </p>
      ) : (
        <p>
          donde <Latex>$a$ y $b$</Latex> determinarán la{' '}
          <strong className={stylesPosts.pink}>forma de la hipérbola</strong> y
          de sus <strong className={stylesPosts.yellow}>asíntotas</strong>.
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>For example, the following hyperbola has formula:</p>
      ) : (
        <p>Por ejemplo, la siguiente hipérbola tiene fórmula:</p>
      )}
      <Latex>{`$$\\frac{x^2}{(${roundTwoDecimals(
        Math.abs(width.x)
      )})^2} + \\frac{y^2}{(${roundTwoDecimals(
        Math.abs(height.y)
      )})^2} = 1,$$`}</Latex>
      {lang === 'en' ? (
        <p>
          and <strong className={stylesPosts.yellow}>asymptotes</strong>{' '}
          <Latex>{`$y=\\pm\\frac{${roundTwoDecimals(
            Math.abs(height.y)
          )}}{${roundTwoDecimals(Math.abs(width.x))}}x$`}</Latex>
        </p>
      ) : (
        <p>
          y <strong className={stylesPosts.yellow}>asíntotas</strong>{' '}
          <Latex>{`$y=\\pm\\frac{${roundTwoDecimals(
            Math.abs(height.y)
          )}}{${roundTwoDecimals(Math.abs(width.x))}}x$`}</Latex>
        </p>
      )}
      <br />
      <br />
      <Mafs viewBox={{x: [-4, 4], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        <Plot.OfY x={hyperbolaPlot21} />
        <Plot.OfY x={hyperbolaPlot22} />
        <Plot.OfX y={asymptote1} color={Theme.yellow} style='dashed' />
        <Plot.OfX y={asymptote12} color={Theme.yellow} style='dashed' />
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
      <br />
      <div
        onClick={() => setIsVertical1(!isVertical1)}
        className={stylesPosts.linkCard}>
        {lang === 'en' ? (
          <h4 className={stylesPosts.textCard}>
            Switch to {isVertical1 ? 'horizontal' : 'vertical'}
          </h4>
        ) : (
          <h4 className={stylesPosts.textCard}>
            Cambiar a {isVertical1 ? 'horizontal' : 'vertical'}
          </h4>
        )}
      </div>
      <br />
      {isVertical1 ? (
        <>
          {lang === 'en' ? (
            <p>
              <strong>Vertical</strong> hyperbola with vertex at{' '}
              <Latex>$(0,0)$</Latex>
            </p>
          ) : (
            <p>
              Hipérbola <strong>vertical</strong> con vértice en{' '}
              <Latex>$(0,0)$</Latex>
            </p>
          )}
          <ul>
            <li>
              {lang === 'en' ? (
                <strong className={stylesPosts.blue}>Focal points</strong>
              ) : (
                <strong className={stylesPosts.blue}>Puntos focales</strong>
              )}
              : <Latex>$(0,\pm c)$</Latex>.
            </li>
            <li>
              {lang === 'en' ? (
                <strong className={stylesPosts.yellow}>Asymptotes</strong>
              ) : (
                <strong className={stylesPosts.yellow}>Asíntotas</strong>
              )}
              : <Latex>{`$y=\\pm\\frac{b}{a}x$`}</Latex>.
            </li>
          </ul>
        </>
      ) : (
        <>
          {lang === 'en' ? (
            <p>
              <strong>Horizontal</strong> hyperbola with vertex at{' '}
              <Latex>$(0,0)$</Latex>
            </p>
          ) : (
            <p>
              Hipérbola <strong>horizontal</strong> con vértice en{' '}
              <Latex>$(0,0)$</Latex>
            </p>
          )}
          <ul>
            <li>
              {lang === 'en' ? (
                <strong className={stylesPosts.blue}>Focal points</strong>
              ) : (
                <strong className={stylesPosts.blue}>Puntos focales</strong>
              )}
              : <Latex>$(\pm c,0)$</Latex>.
            </li>
            <li>
              {lang === 'en' ? (
                <strong className={stylesPosts.yellow}>Asymptotes</strong>
              ) : (
                <strong className={stylesPosts.yellow}>Asíntotas</strong>
              )}
              : <Latex>{`$y=\\pm\\frac{b}{a}x$`}</Latex>.
            </li>
          </ul>
        </>
      )}
      {lang === 'en' ? (
        <p>
          Where <Latex>{'$c$ is  calculated as $c = \\sqrt{a^2+b^2}.$'}</Latex>
        </p>
      ) : (
        <p>
          Donde <Latex>{'$c$ es calculado como $c = \\sqrt{a^2+b^2}.$'}</Latex>
        </p>
      )}
      {lang === 'en' ? (
        <p>
          Let's see how the{' '}
          <strong className={stylesPosts.blue}>focal points</strong> affect the
          shape of the hyperbola for a fixed{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{isVertical1 ? '$b$' : '$a$'}</Latex>
          </strong>
          .
        </p>
      ) : (
        <p>
          Veamos como los{' '}
          <strong className={stylesPosts.blue}>puntos focales</strong> afectan a
          la forma de la hipérbola para{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{isVertical1 ? '$b$' : '$a$'}</Latex>
          </strong>{' '}
          fijo.
        </p>
      )}
      <br />
      <Mafs viewBox={{x: [-4, 4], y: [-4, 4]}}>
        <Coordinates.Cartesian />
        {isVertical1 ? (
          <>
            <Plot.OfX y={hyperbolaPlotVer1} />
            <Plot.OfX y={hyperbolaPlotVer2} />
            <Plot.OfX y={asymptoteVer22} color={Theme.yellow} style='dashed' />
            <Plot.OfX y={asymptoteVer21} color={Theme.yellow} style='dashed' />
            <Point x={0} y={-focusY.y} color={Theme.blue} />
            <Text x={-0.3} y={focusY.y} attach='w' color={Theme.blue}>
              F
            </Text>
            <Text x={-0.3} y={-focusY.y} attach='w' color={Theme.blue}>
              F
            </Text>
            <Text x={-0.3} y={verRadi.y + 0.2} attach='nw' color={Theme.pink}>
              b
            </Text>
            {focusY.element}
            {verRadi.element}
          </>
        ) : (
          <>
            <Plot.OfY x={hyperbolaPlotHori1} />
            <Plot.OfY x={hyperbolaPlotHori2} />
            <Plot.OfX y={asymptoteHor22} color={Theme.yellow} style='dashed' />
            <Plot.OfX y={asymptoteHor21} color={Theme.yellow} style='dashed' />
            <Point x={-focusX.x} y={0} color={Theme.blue} />
            <Text x={focusX.x} y={0.2} attach='n' color={Theme.blue}>
              F
            </Text>
            <Text x={-focusX.x} y={0.3} attach='n' color={Theme.blue}>
              F
            </Text>
            <Text x={horRadi.x + 0.2} y={0.2} attach='ne' color={Theme.pink}>
              a
            </Text>
            {focusX.element}
            {horRadi.element}
          </>
        )}
      </Mafs>
      {lang === 'en' ? (
        <h3>And what happens if we change the center?</h3>
      ) : (
        <h3>¿Y qué pasa si cambiamos el centro?</h3>
      )}
      {lang === 'en' ? (
        <p>
          If we move the hyperbola horizontally or vertically, we need to aply
          the corresponding transformations to the variables{' '}
          <Latex>$x$ and $y$.</Latex>
        </p>
      ) : (
        <p>
          Si movemos la hipérbola horizontal o verticalmente, tenemos que
          aplicar las transformaciones correspondientes a las variables{' '}
          <Latex>$x$ e $y$.</Latex>
        </p>
      )}
      <ul>
        <li>
          {lang === 'en' ? (
            <p>
              Horizontal shift of{' '}
              <Latex>$h$ units: Change the value of $x$ for $x-h$</Latex>.
            </p>
          ) : (
            <p>
              Desplazamiento horizontal de{' '}
              <Latex>$h$ unidades: Cambiar el valor de $x$ por $x-h$</Latex>.
            </p>
          )}
        </li>
        <li>
          {lang === 'en' ? (
            <p>
              Vertical shift of{' '}
              <Latex>$k$ units: Change the value of $y$ for $y-k$</Latex>.
            </p>
          ) : (
            <p>
              Desplazamiento vertical de{' '}
              <Latex>$k$ unidades: Cambiar el valor de $y$ por $y-k$</Latex>.
            </p>
          )}
        </li>
      </ul>
      {lang === 'en' ? (
        <p>
          Together with the variables <Latex>$x$ and $y$</Latex>, the other
          elements affected by the translation are the{' '}
          <strong className={stylesPosts.blue}>focus points</strong>, these are
          now{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$(\pm c + h, k)$</Latex>
          </strong>{' '}
          for horizontal hyperbolas and{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$(h, \pm c +k)$</Latex>
          </strong>{' '}
          for vertical hyperbolas.
        </p>
      ) : (
        <p>
          Junto con las variables <Latex>$x$ e $y$</Latex>, los otros elementos
          afectados por la traslación son los{' '}
          <strong className={stylesPosts.blue}>puntos focales</strong>, éstos
          ahora son{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$(\pm c + h, k)$</Latex>
          </strong>{' '}
          para hipérbolas horizontales y{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$(h, \pm c +k)$</Latex>
          </strong>{' '}
          para hipérbolas verticales.
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Perfect! Now let's perform this transformations on the formula of the
          hyperbola.
        </p>
      ) : (
        <p>
          Perfecto! Ahora hagamos estas transformaciones en la fórmula de la
          hipérbola.
        </p>
      )}
      <br />
      <div
        onClick={() => setIsVertical3(!isVertical3)}
        className={stylesPosts.linkCard}>
        {lang === 'en' ? (
          <h4 className={stylesPosts.textCard}>
            Switch to {isVertical3 ? 'horizontal' : 'vertical'}
          </h4>
        ) : (
          <h4 className={stylesPosts.textCard}>
            Cambiar a {isVertical3 ? 'horizontal' : 'vertical'}
          </h4>
        )}
      </div>
      {lang === 'en' ? (
        <p>
          The formula of a{' '}
          <strong>{isVertical3 ? 'vertical' : 'horizontal'}</strong> hyperbola
          with vertex in{' '}
          <strong className={stylesPosts.orange}>
            <Latex>$(h,k)$</Latex>
          </strong>{' '}
          is:
        </p>
      ) : (
        <p>
          La fórmula de una hipérbola{' '}
          <strong>{isVertical3 ? 'vertical' : 'horizontal'}</strong> con vértice
          en{' '}
          <strong className={stylesPosts.orange}>
            <Latex>$(h,k)$</Latex>
          </strong>{' '}
          es:
        </p>
      )}
      <Latex>
        {isVertical3
          ? '$$\\frac{(y-k)^2}{b^2} - \\frac{(x-h)^2}{a^2} = 1$$'
          : '$$\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1$$'}
      </Latex>
      {lang === 'en' ? (
        <p>let's see what this looks like. The fomula:</p>
      ) : (
        <p>veamos como se vé esto. La fórmula:</p>
      )}
      <Latex>
        {isVertical3
          ? `$$\\frac{\\big(y-(${roundTwoDecimals(
              translate.y
            )})\\big)^2}{b^2} - \\frac{\\big(x-(${roundTwoDecimals(
              translate.x
            )})\\big)^2}{a^2} = 1,$$`
          : `$$\\frac{\\big(x-(${roundTwoDecimals(
              translate.x
            )})\\big)^2}{a^2} - \\frac{\\big(y-(${roundTwoDecimals(
              translate.y
            )})\\big)^2}{b^2} = 1,$$`}
      </Latex>
      {lang === 'en' ? (
        <p>gives us the following hyperbola:</p>
      ) : (
        <p>nos da la siguiente hipérbola:</p>
      )}
      <br />
      <Mafs viewBox={{x: [-3, 3], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        {isVertical3 ? (
          <>
            <Transform translate={translate.point}>
              <Plot.OfX y={hyperbolaPlotVer4} />
              <Plot.OfX y={hyperbolaPlotVer41} />
            </Transform>
            <Text x={translate.x - 1.2} y={translate.y} color={Theme.orange}>
              ({roundTwoDecimals(translate.x)},{roundTwoDecimals(translate.y)})
            </Text>
          </>
        ) : (
          <>
            <Transform translate={translate.point}>
              <Plot.OfY x={hyperbolaPlotHor4} />
              <Plot.OfY x={hyperbolaPlotHor41} />
            </Transform>
            <Text x={translate.x} y={translate.y + 0.5} color={Theme.orange}>
              ({roundTwoDecimals(translate.x)},{roundTwoDecimals(translate.y)})
            </Text>
          </>
        )}
        {translate.element}
      </Mafs>
      <br />
      <br />
      {lang === 'en' ? <h3>To sum up:</h3> : <h3>En resumen:</h3>}
      <br />
      <div
        onClick={() => setIsVertical5(!isVertical5)}
        className={stylesPosts.linkCard}>
        {lang === 'en' ? (
          <h4 className={stylesPosts.textCard}>
            Switch to {isVertical5 ? 'horizontal' : 'vertical'}
          </h4>
        ) : (
          <h4 className={stylesPosts.textCard}>
            Cambiar a {isVertical5 ? 'horizontal' : 'vertical'}
          </h4>
        )}
      </div>
      <br />
      {lang === 'en' ? (
        <p>
          {' '}
          We've learnt how to plot a general{' '}
          <strong>{isVertical5 ? 'vertical' : 'horizontal'}</strong> hyperbola
          with:
        </p>
      ) : (
        <p>
          {' '}
          Hemos aprendido como graficar una hipérbola{' '}
          <strong>{isVertical5 ? 'vertical' : 'horizontal'}</strong> general,
          con:
        </p>
      )}
      <ul>
        <li>
          {lang === 'en' ? 'vertex at ' : 'vértice en '}
          <strong className={stylesPosts.orange}>
            <Latex>{`$(h,k) = (${roundTwoDecimals(
              translate2.x
            )}, ${roundTwoDecimals(translate2.y)})$`}</Latex>
          </strong>
        </li>
        <li>
          {lang === 'en'
            ? 'horizontal and vertical axis lengths '
            : 'longitud de ejes horizontales y verticales '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$a = ${roundTwoDecimals(width.x)}$`}</Latex>
          </strong>{' '}
          {lang === 'en' ? 'and ' : 'y '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$b = ${roundTwoDecimals(height2.y)}$`}</Latex>
          </strong>
        </li>
        <li>
          {lang === 'en' ? 'focus point ' : 'puntos focales '}
          <strong className={stylesPosts.blue}>
            <Latex>
              {isVertical5
                ? `$(h,k+c) =(${roundTwoDecimals(
                    translate2.x
                  )},${roundTwoDecimals(translate2.y)}+${roundTwoDecimals(c)})$`
                : `$(h+c,k) = (${roundTwoDecimals(
                    translate2.x
                  )} + ${roundTwoDecimals(c)},${roundTwoDecimals(
                    translate2.y
                  )})$`}
            </Latex>
          </strong>
        </li>
        <li>
          {lang === 'en' ? 'asymptote ' : 'asíntota '}
          <strong className={stylesPosts.yellow}>
            <Latex>
              {isVertical5
                ? `$y-(${roundTwoDecimals(
                    translate2.y
                  )}) = \\pm\\frac{${roundTwoDecimals(
                    height2.y
                  )}}{${roundTwoDecimals(width2.x)}}(x-(${roundTwoDecimals(
                    translate2.x
                  )}))$`
                : `$y-(${roundTwoDecimals(
                    translate2.y
                  )}) = \\pm\\frac{${roundTwoDecimals(
                    width2.x
                  )}}{${roundTwoDecimals(height2.y)}}(x-(${roundTwoDecimals(
                    translate2.x
                  )}))$`}
            </Latex>
          </strong>
        </li>
      </ul>
      <Latex>
        {isVertical5
          ? `$$\\frac{(y-(${roundTwoDecimals(
              translate2.y
            )}))^2}{(${roundTwoDecimals(
              height2.y
            )})^2} - \\frac{(x-(${roundTwoDecimals(
              translate2.x
            )}))^2}{(${roundTwoDecimals(width2.x)})^2},$$`
          : `$$\\frac{(x-(${roundTwoDecimals(
              translate2.x
            )}))^2}{(${roundTwoDecimals(
              width2.x
            )})^2} - \\frac{(y-(${roundTwoDecimals(
              translate2.y
            )}))^2}{(${roundTwoDecimals(height2.y)})^2},$$`}
      </Latex>
      <br />
      <Mafs viewBox={{x: [-3, 3], y: [-3, 3]}}>
        <Coordinates.Cartesian />
        {isVertical5 ? (
          <>
            <Transform translate={translate2.point}>
              <Plot.OfX y={hyperbolaPlotVer5} />
              <Plot.OfX y={hyperbolaPlotVer52} />
              <Plot.OfY
                x={asymptoteVer51}
                color={Theme.yellow}
                style='dashed'
              />
              <Plot.OfY
                x={asymptoteVer52}
                color={Theme.yellow}
                style='dashed'
              />
              {width2.element}
              {height2.element}
            </Transform>
            <Point x={translate2.x} y={translate2.y + c} color={Theme.blue} />
            <Point x={translate2.x} y={translate2.y - c} color={Theme.blue} />
            <Text
              x={translate2.x + 0.4}
              y={translate2.y + c}
              color={Theme.blue}>
              F
            </Text>
            <Text
              x={translate2.x + 0.4}
              y={translate2.y - c}
              color={Theme.blue}>
              F
            </Text>
            <Text x={translate2.x - 1.2} y={translate2.y} color={Theme.orange}>
              ({roundTwoDecimals(translate2.x)},{roundTwoDecimals(translate2.y)}
              )
            </Text>
            <Text
              x={translate2.x + width2.x}
              y={translate2.y + width.y + 0.4}
              color={Theme.pink}>
              a
            </Text>
            <Text
              x={translate2.x + height2.x - 0.3}
              y={translate2.y + height2.y}
              color={Theme.pink}>
              b
            </Text>
          </>
        ) : (
          <>
            <Transform translate={translate2.point}>
              <Plot.OfY x={hyperbolaPlotHor5} />
              <Plot.OfY x={hyperbolaPlotHor52} />
              <Plot.OfX
                y={asymptoteHor51}
                color={Theme.yellow}
                style='dashed'
              />
              <Plot.OfX
                y={asymptoteHor52}
                color={Theme.yellow}
                style='dashed'
              />
              {width2.element}
              {height2.element}
            </Transform>
            <Point x={translate2.x + c} y={translate2.y} color={Theme.blue} />
            <Point x={translate2.x - c} y={translate2.y} color={Theme.blue} />
            <Text
              x={translate2.x + c}
              y={translate2.y + 0.4}
              color={Theme.blue}>
              F
            </Text>
            <Text
              x={translate2.x - c}
              y={translate2.y + 0.4}
              color={Theme.blue}>
              F
            </Text>
            <Text
              x={translate2.x + width2.x}
              y={translate2.y + width.y + 0.4}
              color={Theme.pink}>
              a
            </Text>
            <Text
              x={translate2.x + height2.x - 0.3}
              y={translate2.y + height2.y}
              color={Theme.pink}>
              b
            </Text>
            <Text x={translate2.x} y={translate2.y - 0.6} color={Theme.orange}>
              ({roundTwoDecimals(translate2.x)},{roundTwoDecimals(translate2.y)}
              )
            </Text>
          </>
        )}
        {translate2.element}
      </Mafs>
      <br />
    </PostLayout>
  );
}

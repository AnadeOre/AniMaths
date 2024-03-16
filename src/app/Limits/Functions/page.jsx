'use client';
import * as React from 'react';
import {useState} from 'react';
import Latex from 'react-latex-next';
import PostLayout from '../../components/PostLayout.jsx';
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
  LaTeX as MafsLatex,
  Text,
  Transform,
  Vector,
  Plot,
  Point,
} from 'mafs';
import {clamp, round} from 'lodash';

export default function limitFunctions() {
  const lang = useSelector((state) => state.langToggle.value);

  // First animation
  const x1 = useMovablePoint([2, 0], {
    constrain: 'horizontal',
    color: Theme.pink,
  });

  //Second animation
  const ep1 = useMovablePoint([0, 2.5], {
    constrain: ([x, y]) => [0, clamp(y, 2, 3)],
    color: Theme.pink,
  });
  // Third animation
  const ep2 = useMovablePoint([0, 4.5], {
    constrain: ([x, y]) => [0, clamp(y, 4, 7)],
    color: Theme.pink,
  });

  return (
    <PostLayout
      whereTo='/Limits'
      titleName={
        lang === 'en' ? 'Limits of functions' : 'Límites de funciones'
      }>
      {lang === 'en' ? (
        <p>
          The limit of a function is the value that the fuction approaches as
          the input approaches some value. Let's consider a function{' '}
          <Latex>$f : \R\to\R$</Latex> and let <Latex>$x_0\in\R$</Latex>, the
          function will have a specific value at <Latex>$x_0$</Latex>,{' '}
          <Latex>$f(x_0)$</Latex>, but we will be interested in the values that{' '}
          <Latex>$f$</Latex> takes{' '}
          <i>
            close to <Latex>$x_0$</Latex>
          </i>
          . In the next animation, which do you think the limit of the function{' '}
          <Latex>$f$</Latex> is as{' '}
          <strong className={stylesPosts.pink}>
            <Latex>$x$</Latex>
          </strong>{' '}
          tends to{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$x_0$</Latex>
          </strong>
          ?.
        </p>
      ) : (
        <p>
          El límite de una función es el valor al que la función se acerca,
          cuando la entrada se acerca a un valor. Consideremos una función{' '}
          <Latex>$f : \R\to\R$</Latex> y sea <Latex>$x_0\in\R$</Latex>, la
          función va a tomar un valor específico en <Latex>$x_0$</Latex>,{' '}
          <Latex>$f(x_0)$</Latex>, pero vamos a interesarnos por los valores que{' '}
          <Latex>$f$</Latex> toma{' '}
          <i>
            cerca de <Latex>$x_0$</Latex>
          </i>
          . En la siguiente animación ¿Cuál creés que es el límite de la función{' '}
          <Latex>$f$</Latex> cuando{' '}
          <strong className={stylesPosts.pink}>
            <Latex>$x$</Latex>
          </strong>{' '}
          tiende a{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$x_0$</Latex>
          </strong>
          ?.
        </p>
      )}
      <br />
      <Mafs viewBox={{x: [-2, 2], y: [0, 4]}}>
        <Coordinates.Cartesian />

        <Plot.OfX y={(x) => x * x} />
        <Point x={1.2} y={0} color={Theme.blue} />
        <MafsLatex
          at={[1.2, -0.2]}
          tex={String.raw`
            x_0
          `}
        />
        {x1.element}
        <MafsLatex
          at={[x1.x, -0.2]}
          tex={String.raw`
            x
          `}
        />
        <MafsLatex
          at={[-2, 2.8]}
          tex={String.raw`
            f
          `}
        />
        <Line.Segment
          point1={[x1.x, 0]}
          point2={[x1.x, x1.x * x1.x]}
          color={Theme.pink}
        />
        <Line.Segment
          point1={[1.2, 0]}
          point2={[1.2, 1.2 * 1.2]}
          color={Theme.blue}
          style='dashed'
        />
        <Point x={x1.x} y={x1.x * x1.x} color={Theme.pink} />
        <Text x={1.3} y={2}>
          {1 + 2}
        </Text>
        <MafsLatex
          at={[x1.x, x1.x * x1.x + 0.3]}
          tex={String.raw`
            ${roundTwoDecimals(x1.x * x1.x)}
          `}
        />
      </Mafs>
      <br />
      {lang === 'en' ? (
        <p>
          That definition of Limit was a bit vague. Let's see the real
          mathematical definition.
        </p>
      ) : (
        <p>
          Esa definición de Límite fue un poco imprecisa. Veamos la definición
          matemática real.
        </p>
      )}
      {lang === 'en' ? <h3>Definition</h3> : <h3>Definición</h3>}
      {lang === 'en' ? (
        <p>
          Let <Latex>$f$</Latex> be a function defined in all points inside some
          open interval <Latex>$(a,b)$</Latex> that contains{' '}
          <Latex>$x_0$</Latex>, except perhaps in <Latex>$x_0$</Latex>. We say
          that the limit of <Latex>$f$</Latex> as <Latex>$x\to x_0$</Latex> (
          <Latex>$x$</Latex> tends to <Latex>$x_0$</Latex>) is{' '}
          <Latex>$L$</Latex> if for every <Latex>{`$\\varepsilon>0$`}</Latex>{' '}
          there exists <Latex>{`$\\delta>0$`}</Latex> (depending on{' '}
          <Latex>$\varepsilon$</Latex>) such that if{' '}
          <Latex>{`$0<|x-x_0|<\\delta$`}</Latex>, then{' '}
          <Latex>{`$|f(x)-L|<\\varepsilon$`}</Latex>. When this happens we write
          <Latex>{`$$\\lim_{x\\to x_0} f(x) = L.$$`}</Latex>
        </p>
      ) : (
        <p>
          Sea <Latex>$f$</Latex> una función definida en todos los puntos de un
          intervalo abierto <Latex>$(a,b)$</Latex> que contiene a{' '}
          <Latex>$x_0$</Latex>, excepto tal vez en <Latex>$x_0$</Latex>. Decimos
          que el límite de <Latex>$f$</Latex> cuando <Latex>$x\to x_0$</Latex> (
          <Latex>$x$</Latex> tiende a <Latex>$x_0$</Latex>) es{' '}
          <Latex>$L$</Latex> si para todo <Latex>{`$\\varepsilon>0$`}</Latex>{' '}
          existe <Latex>{`$\\delta>0$`}</Latex> (que depende de{' '}
          <Latex>$\varepsilon$</Latex>) tal que si{' '}
          <Latex>{`$0<|x-x_0|<\\delta$`}</Latex>, entonces{' '}
          <Latex>{`$|f(x)-L|<\\varepsilon$`}</Latex>. Cuando esto sucede
          escribimos
          <Latex>{`$$\\lim_{x\\to x_0} f(x) = L.$$`}</Latex>
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Test the definition in the next animation! We will calculate the limit
          of <Latex>$f(x) = x-1$</Latex> as <Latex>$x\to$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>$3$</Latex>
          </strong>
          . By moving the value of{' '}
          <strong className={stylesPosts.pink}>
            <Latex>$\varepsilon$</Latex>
          </strong>
          <Latex>{`$>0$`}</Latex>,{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>$\delta$</Latex>
          </strong>{' '}
          will be determined so that the conditions in the definition above are
          satisfied.
        </p>
      ) : (
        <p>
          Probá la definición en la siguiente animación! Vamos a calcular el
          límite de <Latex>$f(x) = x-1$</Latex> cuando <Latex>$x\to$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>$3$</Latex>
          </strong>
          . Al mover el valor de{' '}
          <strong className={stylesPosts.pink}>
            <Latex>$\varepsilon$</Latex>
          </strong>
          <Latex>{`$>0$`}</Latex>,{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>$\delta$</Latex>
          </strong>{' '}
          queda determinado de modo tal que se cumplan las condiciones de la
          definición dada.
        </p>
      )}
      <br />
      <Mafs viewBox={{x: [-2, 8], y: [-1, 3]}}>
        <Coordinates.Cartesian />
        <Plot.OfX y={(x) => x - 1} />
        {/* Epsilon */}
        {ep1.element}
        <Point x={0} y={2 - Math.abs(2 - ep1.y)} color={Theme.pink} />
        <MafsLatex
          at={[-0.6, ep1.y + 0.3]}
          color={Theme.pink}
          tex={String.raw`
            L+\varepsilon
          `}
        />
        <MafsLatex
          at={[-0.6, 2 - Math.abs(2 - ep1.y) - 0.3]}
          color={Theme.pink}
          tex={String.raw`
            L-\varepsilon
          `}
        />
        <Plot.Inequality
          y={{
            '<': (x) => ep1.y,
            '>': (x) => 2 - Math.abs(2 - ep1.y),
          }}
          color={Theme.pink}
        />
        <Vector tail={[7, 0.8]} tip={[6.5, 2]} color={Theme.pink} />
        <MafsLatex
          at={[7.2, 0.6]}
          color={Theme.pink}
          tex={String.raw`
            |f(x)-L|<\varepsilon
          `}
        />
        {/* Delta */}
        <Point x={3 - Math.abs(2 - ep1.y)} y={0} color={Theme.yellow} />
        <Point x={3 + Math.abs(2 - ep1.y)} y={0} color={Theme.yellow} />
        <Plot.Inequality
          x={{
            '>': (y) => 3 - Math.abs(2 - ep1.y),
            '<': (y) => 3 + Math.abs(2 - ep1.y),
          }}
          color={Theme.yellow}
        />
        <MafsLatex
          at={[3 - Math.abs(2 - ep1.y) - 0.2, -0.4]}
          color={Theme.yellow}
          tex={String.raw`
            x_0-\delta
          `}
        />
        <MafsLatex
          at={[3 + Math.abs(2 - ep1.y) + 0.2, -0.4]}
          color={Theme.yellow}
          tex={String.raw`
            x_0+\delta
          `}
        />
        <Vector tail={[4, -1]} tip={[3, -0.6]} color={Theme.yellow} />
        <MafsLatex
          at={[5, -1]}
          color={Theme.yellow}
          tex={String.raw`
            |x-x_0|<\delta
          `}
        />
        {/* L and x0 */}
        <Point x={3} y={0} color={Theme.blue} />
        <Line.Segment
          point1={[3, 0]}
          point2={[3, 3 - 1]}
          color={Theme.blue}
          style='dashed'
          weight={5}
        />
        <Line.Segment
          point1={[0, 2]}
          point2={[3, 2]}
          color={Theme.blue}
          style='dashed'
          weight={5}
        />
        <Text></Text>
        <MafsLatex
          at={[-0.3, 2]}
          color={Theme.blue}
          tex={String.raw`
            L
          `}
        />
      </Mafs>
      <br />

      {lang === 'en' ? (
        <p>
          So what's all the fuss about? This seems trivial! Well, note that if
          the function had another definition at <Latex>$x_0$</Latex>, the limit
          would still be the same!
        </p>
      ) : (
        <p>
          Y por qué tanto alboroto? Esto parece trivial! Bueno, si la función
          hubiera estado definida de otro modo en <Latex>$x_0$</Latex>, el
          límite seguiría siendo el mismo!
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Limits don't "see" the value of the function at the point. It may not
          even be defined at <Latex>$x_0$</Latex>!
        </p>
      ) : (
        <p>
          Los límites no ven el valor de la función en el punto. Podría incluso
          no estar definida en <Latex>$x_0$</Latex>!
        </p>
      )}

      {lang === 'en' ? (
        <h3>Proving a limit by definition</h3>
      ) : (
        <h3>Demostrando un límite por definición</h3>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Now it's time we work on a limit by definition. Let's prove that the
          limit of the following function
          <Latex>{`$$f(x) = x^2+3,$$`}</Latex>
          when <Latex>$x\to1$</Latex>, is <Latex>$4$</Latex>. Looking at the
          plot, this seems true, but we have to prove it!
        </p>
      ) : (
        <p>
          Es hora de que trabajemos en un límite por definición. Demostremos que
          el límite de la siguiente función
          <Latex>{`$$f(x) = x^2+3,$$`}</Latex>
          cuando <Latex>$x\to1$</Latex>, es <Latex>$4$</Latex>. Viendo el
          gráfico esto pareciera cierto, pero hay que demostrarlo!
        </p>
      )}
      <br />
      <Mafs viewBox={{x: [0, 2], y: [0, 5]}}>
        <Coordinates.Cartesian />
        <Plot.OfX y={(x) => x * x + 3} />
      </Mafs>
      <br />
      {lang === 'en' ? (
        <p>
          The definition says that for any <Latex>{`$\\varepsilon>0$`}</Latex>{' '}
          we need to find <Latex>{`$\\delta>0$`}</Latex> such that some
          condition is satisfied. For each <Latex>$\varepsilon$</Latex> we'll
          get a different <Latex>$\delta$</Latex>, so the idea will be to
          consider a generic <Latex>$\varepsilon$</Latex> and see if we can
          define <Latex>$\delta$</Latex> in terms of that{' '}
          <Latex>$\varepsilon$</Latex>. That way, whenever we take a specific{' '}
          <Latex>$\varepsilon$</Latex>, we can find <Latex>$\delta$</Latex>{' '}
          immedaitely. Let's start!
        </p>
      ) : (
        <p>
          La definición dice que para cualquier{' '}
          <Latex>{`$\\varepsilon>0$`}</Latex> debemos encontrar{' '}
          <Latex>{`$\\delta>0$`}</Latex> tal que ße satisface una definición.
          Para cada <Latex>$\varepsilon$</Latex> tendremos un{' '}
          <Latex>$\delta$</Latex> distinto, entonces la idea será considerar un{' '}
          <Latex>$\varepsilon$</Latex> genérico y ver si podemos definir{' '}
          <Latex>$\delta$</Latex> en términos de ese{' '}
          <Latex>$\varepsilon$</Latex>. De ese modo, cuando tomemos un
          <Latex>$\varepsilon$</Latex> específico, podremos encontrar{' '}
          <Latex>$\delta$</Latex> inmediatamente. Empecemos!
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Let{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          <Latex>{`$>0$`}</Latex> (this is the way of defining an arbitrary{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          ). We want to find{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$>0$`}</Latex> such that if <Latex>{`$0<|x-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          , then <Latex>{`$|f(x)-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$L$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          . We will start by trying to make <Latex>{`$0<|x-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|$`}</Latex> appear from the equation{' '}
          <Latex>{`$|f(x)-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$L$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          , so that then we can choose{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>{' '}
          so that everything works. This won't be the proof, this is just the
          informal calculations, once we finish with them, we'll write the
          formal proof.
        </p>
      ) : (
        <p>
          Sea{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          <Latex>{`$>0$`}</Latex> (esta es la forma de definir un{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>{' '}
          arbitrario). Queremos encontrar{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$>0$`}</Latex> tal que si <Latex>{`$0<|x-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          , entonces <Latex>{`$|f(x)-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$L$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          . Vamos a empezar intentando hacer <Latex>{`$0<|x-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|$`}</Latex> aparecer en la ecuación{' '}
          <Latex>{`$|f(x)-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$L$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          , de ese modo podremos elegir{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>{' '}
          suficientemente pequeño para que todo funcione. Esto no será la
          demostración, eso son solo las cuentas informales, una vez que
          terminemos con ellas, escribiremos la demostrción formal.
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          Replacing the values of <Latex>$f$</Latex> and{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$L$</Latex>
          </strong>{' '}
          gives
          <Latex>
            $$|f(x) - L| = |x^2 + 3 - 4| = |x^2 - 1| = |x-1||x+1|.$$
          </Latex>
          We have <Latex>$|x-$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>$|$</Latex>, which is exactly what we wanted. But we cannot yet
          replace it to make it smaller than{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>$\delta$</Latex>
          </strong>
          , because there is still dependence on <Latex>$x$</Latex> in the term{' '}
          <Latex>$|x+1|$</Latex>. So we first need to get rid of it by bounding
          it from above. The idea is to take{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>$\delta$</Latex>
          </strong>{' '}
          small, we can take it smaller than <Latex>$1.$</Latex> Then if{' '}
          <Latex>$|x-$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$<1$`}</Latex>, we have <Latex>{`$-1<x-1<1$`}</Latex>, so{' '}
          <Latex>{`$1<x+1<3$`}</Latex>. Great! Let's use this in the previous
          equation.
          <Latex>{`$$|f(x) - L| = |x-1||x+1| < 3|x-1| < 3\\delta.$$`}</Latex>
          We want to have <Latex>{`$|f(x)-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$L$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>{' '}
          Then it suffices to take <Latex>{`$3$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          , that is{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          <Latex>{`$/3.$`}</Latex> Recall that we also needed{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$< 1,$`}</Latex> so we'll have to take the smaller of these
          two values.
        </p>
      ) : (
        <p>
          Reemplazando los valores de <Latex>$f$</Latex> y{' '}
          <strong className={stylesPosts.blue}>
            <Latex>$L$</Latex>
          </strong>
          <Latex>
            $$|f(x) - L| = |x^2 + 3 - 4| = |x^2 - 1| = |x-1||x+1|.$$
          </Latex>
          Tenemos <Latex>$|x-$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>$|$</Latex>, que es exactamente lo que queríamos. Pero no
          podemos aún reemplazarlo para hacerlo menor que{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>$\delta$</Latex>
          </strong>{' '}
          , porque aún hay dependencia en <Latex>$x$</Latex> en el término{' '}
          <Latex>$|x+1|$</Latex>. Entonces primero debemos deshacernos de ese
          término, acotándolo por arriba. La idea es tomar{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>$\delta$</Latex>
          </strong>{' '}
          pequeño, podemos hacerlo menor que <Latex>$1.$</Latex> Entonces si{' '}
          <Latex>$|x-$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$<1$`}</Latex>, tenemos <Latex>{`$-1<x-1<1$`}</Latex>, y{' '}
          <Latex>{`$1<x+1<3$`}</Latex>. Buenísimo! Usemos esto en la ecuación
          previa.
          <Latex>{`$$|f(x) - L| = |x-1||x+1| < 3|x-1| < 3\\delta.$$`}</Latex>
          Queremos tener <Latex>{`$|f(x)-$`}</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$L$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>{' '}
          Es suficiente tomar <Latex>{`$3$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          , esto es{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$<$`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          <Latex>{`$/3.$`}</Latex> Recordá que también necesitabamos{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$< 1,$`}</Latex> así que debemos tomar el menor de esos dos
          valores.
        </p>
      )}
      <br />
      {lang === 'en' ? (
        <p>
          This doesn't look like a formal proof! The actual proof is much
          shorter, once we know what <Latex>$\delta$</Latex> to take.
        </p>
      ) : (
        <p>
          Esto no parece una demostración formal! La demostración es mucho más
          corta una vez que sabemos que <Latex>$\delta$</Latex> tomar.
        </p>
      )}
      {lang === 'en' ? (
        <h3>Writing the proof</h3>
      ) : (
        <h3>Escribiendo la demostración</h3>
      )}
      {lang === 'en' ? (
        <p>
          Let{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          , choose{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$ < \\min\\{ 1, $`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$~ \\varepsilon$`}</Latex>
          </strong>
          <Latex>{`$/3 \\}.$`}</Latex> Then if <Latex>$|x-$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$$|f(x) - L| = |x-1||x+1| < 3|x-1| < 3\\delta < \\varepsilon.$$`}</Latex>
          As we wanted to prove.
        </p>
      ) : (
        <p>
          Sea{' '}
          <strong className={stylesPosts.pink}>
            <Latex>{`$\\varepsilon$`}</Latex>
          </strong>
          , tomemos{' '}
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$ < \\min\\{ 1, $`}</Latex>
          <strong className={stylesPosts.pink}>
            <Latex>{`$~\\varepsilon$`}</Latex>
          </strong>
          <Latex>{`$/3 \\}.$`}</Latex> Luego si <Latex>$|x-$</Latex>
          <strong className={stylesPosts.blue}>
            <Latex>{`$1$`}</Latex>
          </strong>
          <Latex>{`$|<$`}</Latex>
          <strong className={stylesPosts.yellow}>
            <Latex>{`$\\delta$`}</Latex>
          </strong>
          <Latex>{`$$|f(x) - L| = |x-1||x+1| < 3|x-1| < 3\\delta < \\varepsilon.$$`}</Latex>
          Como queríamos demostrar
        </p>
      )}

      <Mafs viewBox={{x: [0, 2], y: [-1, 5]}}>
        <Coordinates.Cartesian />
        <Plot.OfX y={(x) => x * x + 3} />
        {/* Epsilon */}
        {ep2.element}
        <Point x={0} y={4 - Math.abs(4 - ep2.y)} color={Theme.pink} />
        <MafsLatex
          at={[-0.6, ep2.y + 0.3]}
          color={Theme.pink}
          tex={String.raw`
            L+\varepsilon
          `}
        />
        <MafsLatex
          at={[-0.6, 4 - Math.abs(4 - ep2.y) - 0.3]}
          color={Theme.pink}
          tex={String.raw`
            L-\varepsilon
          `}
        />
        <Plot.Inequality
          y={{
            '<': (x) => ep2.y,
            '>': (x) => 4 - Math.abs(4 - ep2.y),
          }}
          color={Theme.pink}
        />
        {/* Delta */}
        <Point x={1 - Math.abs(4 - ep2.y) / 3} y={0} color={Theme.yellow} />
        <Point x={1 + Math.abs(4 - ep2.y) / 3} y={0} color={Theme.yellow} />
        <Plot.Inequality
          x={{
            '>': (y) => 1 - Math.abs(4 - ep2.y) / 3,
            '<': (y) => 1 + Math.abs(4 - ep2.y) / 3,
          }}
          color={Theme.yellow}
        />
        <MafsLatex
          at={[1 - Math.abs(4 - ep2.y) / 3 - 0.75, 0.4]}
          color={Theme.yellow}
          tex={String.raw`
            x_0-\frac{\varepsilon}{3}
          `}
        />
        <MafsLatex
          at={[1 + Math.abs(4 - ep2.y) / 3 + 0.75, 0.4]}
          color={Theme.yellow}
          tex={String.raw`
            x_0+\frac{\varepsilon}{3}
          `}
        />

        {/* L and x0 */}
        <Point x={1} y={0} color={Theme.blue} />
        <Line.Segment
          point1={[1, 0]}
          point2={[1, 4]}
          color={Theme.blue}
          style='dashed'
          weight={5}
        />
        <Line.Segment
          point1={[0, 4]}
          point2={[1, 4]}
          color={Theme.blue}
          style='dashed'
          weight={5}
        />
        <Text></Text>
        <MafsLatex
          at={[-0.3, 4]}
          color={Theme.blue}
          tex={String.raw`
            L
          `}
        />
      </Mafs>
    </PostLayout>
  );
}

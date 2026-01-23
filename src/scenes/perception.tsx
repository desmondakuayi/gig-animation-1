import {makeScene2D, Circle, Spline, Rect, Txt, Line} from '@motion-canvas/2d';
import {createRef, all, easeOutSine, easeInCubic} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const glassRef = createRef<Rect>();
  const textRef = createRef<Txt>();
  const crack1 = createRef<Line>();
  const crack2 = createRef<Line>();

  view.add(
    <>
      <Rect size={'100%'} fill={'#0a0a1a'} />

      <Circle y={-50} size={300} fill={'#bbbbbb'} />
      <Spline
        lineWidth={12} stroke={'#000000'}
        points={[[-100, -170], [-20, -100], [40, 0], [120, 100]]}
        smoothness={0.4}
      />

      <Rect
        ref={glassRef} y={-50} width={400} height={400}
        fill={'#ffffff'} opacity={0} radius={20}
      >
        <Line ref={crack1} points={[[-100, -150], [0, -50], [-50, 50]]} stroke={'#000000'} lineWidth={3} end={0} />
        <Line ref={crack2} points={[[100, 150], [20, 50], [80, -20]]} stroke={'#000000'} lineWidth={3} end={0} />
      </Rect>

      {/* UPDATED TEXT: Readable Version */}
      <Txt
        ref={textRef}
        text={'PERCEPTION IS DISTORTED'}
        y={320}
        fill={'#ffffff'} // Pure White (Was Grey)
        fontFamily={'Segoe UI, Helvetica, sans-serif'}
        fontSize={45}
        fontWeight={700} // BOLD
        shadowColor={'#000000'} // Black outline/shadow
        shadowBlur={5}
        opacity={0}
        letterSpacing={4}
      />
    </>
  );

  yield* glassRef().opacity(0.3, 1);
  yield* textRef().opacity(1, 1);
  yield* all(
    crack1().end(1, 0.1),
    crack2().end(1, 0.1),
    glassRef().rotation(2, 0.1, easeInCubic),
  );
});
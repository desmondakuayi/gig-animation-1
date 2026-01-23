import {makeScene2D, Circle, Rect, Layout, Txt} from '@motion-canvas/2d';
import {createRef, all, sequence, easeInOutSine, easeOutCubic} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const coreRef = createRef<Circle>();
  const raysRef = createRef<Layout>();
  const textRef = createRef<Txt>();

  view.add(
    <>
      <Rect size={'100%'} fill={'#0a0a1a'} />

      <Layout ref={raysRef} opacity={0} rotation={-30}>
         <Rect width={20} height={600} fill={'#ffffff'} opacity={0.1} y={-100} blur={20} />
         <Rect width={40} height={600} fill={'#ffffff'} opacity={0.2} rotation={45} blur={30} />
         <Rect width={20} height={600} fill={'#ffffff'} opacity={0.1} rotation={-45} blur={20} />
      </Layout>

      <Circle
        ref={coreRef}
        size={300}
        fill={'#ffffff'}
        shadowBlur={60}
        shadowColor={'#ffffff'}
      />

      {/* UPDATED TEXT: Readable Version */}
      <Txt
        ref={textRef}
        text={'Whose painting is that?'}
        y={320} // Moved down further
        fill={'#ffffff'}
        fontFamily={'Segoe UI, Helvetica, sans-serif'}
        fontSize={50} // Slightly bigger
        fontWeight={700} // BOLD (was 300)
        shadowColor={'#000000'} // Black shadow for contrast
        shadowBlur={10}
        opacity={0}
        letterSpacing={2}
      />
    </>
  );

  yield* all(
    coreRef().position.y(-50, 2, easeInOutSine),
    coreRef().shadowBlur(100, 2, easeInOutSine),
    raysRef().opacity(1, 1),
    raysRef().rotation(0, 4, easeOutCubic),
    textRef().opacity(1, 2),
    textRef().letterSpacing(5, 2, easeOutCubic),
  );
  
  yield* coreRef().scale(1.1, 2, easeInOutSine).to(1, 2, easeInOutSine);
});
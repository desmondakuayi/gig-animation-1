import {makeScene2D, Circle, Txt, Layout} from '@motion-canvas/2d';
import {createRef, all, waitFor, easeInOutCubic} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#000000');

  const perfectCircle = createRef<Circle>();
  const mainText = createRef<Txt>();
  const subText = createRef<Txt>();

  view.add(
    <Layout>
      <Circle
        ref={perfectCircle}
        size={400}
        stroke={'#ffffff'}
        lineWidth={8}
        startAngle={-90}
        endAngle={-90}
        opacity={0}
      />
      <Txt
        ref={mainText}
        text={"INVISIBLE ATTRIBUTES"}
        fill={'#ffffff'}
        fontFamily={'JetBrains Mono, monospace'} // specific font
        fontSize={70}
        opacity={0}
      />
       <Txt
        ref={subText}
        text={"clearly seen"}
        fill={'#aaaaaa'}
        fontSize={60}
        y={50}
        opacity={0}
      />
    </Layout>
  );

  // --- ANIMATION ---
  perfectCircle().opacity(1);
  yield* perfectCircle().endAngle(270, 2, easeInOutCubic);
  yield* waitFor(0.5);

  yield* perfectCircle().scale(1.05, 0.3).to(1, 0.3);
  yield* perfectCircle().scale(1.05, 0.3).to(1, 0.3);

  // Transition to "Icon" state (End State for Scene 1)
  yield* all(
    perfectCircle().y(-50, 1),
    perfectCircle().fill('#ffffff', 1),
    perfectCircle().scale(0.5, 1)
  );

  yield* all(
    mainText().opacity(1, 1),
    mainText().y(100, 1),
    subText().opacity(1, 1.2),
    subText().y(150, 1.2),
  );

  yield* waitFor(1.5);
});
import {makeScene2D, Circle, Layout, Rect, Line} from '@motion-canvas/2d';
import {createRef, all, waitFor, range, useRandom, createSignal, Vector2} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#000000');
  const rng = useRandom();

  // --- 1. RE-CREATE SCENE 2 END STATE ---
  const musicContainer = createRef<Layout>();
  const musicSignal = createSignal(0); // We'll keep them static or low for the fade out

  // --- 2. NEW ASSETS FOR SCENE 3 ---
  const perfectCircle = createRef<Circle>();
  const chaosContainer = createRef<Layout>();

  view.add(
    <Layout>
      {/* MUSIC BARS (Visible at start) */}
      <Layout ref={musicContainer} opacity={1} y={50}>
        {range(5).map(i => (
            <Rect
                width={40}
                // Just giving them a fixed random height for the transition look
                height={50 + Math.random() * 50} 
                fill={'#ffffff'}
                x={(i - 2) * 60}
                radius={20}
            />
        ))}
      </Layout>

      {/* THE TARGET (Initially Invisible) */}
      <Circle
        ref={perfectCircle}
        size={400}
        stroke={'#ffffff'}
        lineWidth={8}
        opacity={0} // Hidden at start
      />

      {/* THE VANDALISM LAYER (Empty at start) */}
      <Layout ref={chaosContainer} />
    </Layout>
  );

  // --- ANIMATION START ---

  // 1. Reset: Fade out music, bring back the Perfect Circle
  // "But how come it doesn't feel so good sometimes?"
  yield* all(
    musicContainer().opacity(0, 1),
    perfectCircle().opacity(1, 1),
  );

  yield* waitFor(0.5);

  // 2. The Attack: "Fracture by a bad actor"
  // We spawn 10 random jagged lines aggressively
  for (let i = 0; i < 10; i++) {
    //for (let i = 0; i < 10; i++) {
    // We explicitly create Vector2 objects here
    const randomPoints = [
        new Vector2(rng.nextInt(-100, 100), rng.nextInt(-100, 100)),
        new Vector2(rng.nextInt(-100, 100), rng.nextInt(-100, 100)),
        new Vector2(rng.nextInt(-100, 100), rng.nextInt(-100, 100)),
    ];
    
    const lineRef = createRef<Line>();
    
    chaosContainer().add(
        <Line
            ref={lineRef}
            points={randomPoints}
            stroke={'#ff0000'} // Red for "Sin/Vandalism"
            lineWidth={5}
            end={0} // Start undrawn
        />
    );

    // Animate the scratch quickly (0.1s)
    yield* lineRef().end(1, 0.1); 
    
    // Tiny pause between scratches for rhythm
    yield* waitFor(0.05);
  }

  // Hold the mess for the viewer to see
  yield* waitFor(2);
});
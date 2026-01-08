import {makeScene2D, Circle, Layout, Rect, Line, Txt} from '@motion-canvas/2d';
import {createRef, all, waitFor, Vector2, easeInCubic} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#000000');

  // --- 1. RE-CREATE SCENE 4 END STATE ---
  // We need everything exactly where we left it so there is no "jump"
  const perfectCircle = createRef<Circle>();
  const chaosContainer = createRef<Layout>();
  const observerRef = createRef<Rect>();
  const distortionGlass = createRef<Rect>();
  const crackLines = createRef<Layout>();
  
  // --- 2. NEW ASSETS FOR THE FINALE ---
  const finalFlash = createRef<Rect>(); // The whiteout screen
  const finalText = createRef<Txt>();

  view.add(
    <Layout>
      {/* THE CIRCLE (Dimmed State from Scene 4) */}
      <Circle
        ref={perfectCircle}
        size={400}
        stroke={'#ffffff'}
        lineWidth={8}
        opacity={0.3}       // Started dim
        shadowColor={'#ffffff'}
        shadowBlur={0}      // No glow yet
      />

      {/* STATIC CHAOS (The Red Lines) */}
      <Layout ref={chaosContainer}>
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(-50, -50), new Vector2(50, 50)]} />
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(80, -20), new Vector2(-20, 80)]} />
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(-10, -90), new Vector2(10, 20)]} />
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(-80, 20), new Vector2(-120, -40)]} />
      </Layout>

      {/* THE OBSERVER (Positioned at x=-200) */}
      <Rect
        ref={observerRef}
        width={100}
        height={200}
        fill={'#333333'}
        x={-200} 
        y={100}
      />

      {/* THE CRACKED GLASS (Positioned at x=-200) */}
      <Layout>
        <Rect
            ref={distortionGlass}
            width={300}
            height={400}
            x={-200}
            y={50}
            fill={'#000000'}
            stroke={'#555555'}
            lineWidth={4}
            opacity={0.6}
        />
        <Layout ref={crackLines} opacity={1} x={-200} y={50}>
            <Line stroke={'#ffffff'} lineWidth={2} points={[new Vector2(0, 0), new Vector2(50, -50)]} />
            <Line stroke={'#ffffff'} lineWidth={2} points={[new Vector2(0, 0), new Vector2(-40, 60)]} />
            <Line stroke={'#ffffff'} lineWidth={2} points={[new Vector2(0, 0), new Vector2(20, 80)]} />
        </Layout>
      </Layout>

      {/* FINAL WHITEOUT OVERLAY (Invisible at start) */}
      <Rect
        ref={finalFlash}
        width={1080}
        height={1920}
        fill={'#ffffff'}
        opacity={0}
      />

      {/* FINAL MESSAGE */}
      <Txt
        ref={finalText}
        text={"REDISCOVER THE MASTERPIECE"}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={60}
        fontWeight={800}
        fill={'#000000'} // Black text on white background
        opacity={0}
      />
    </Layout>
  );

  // --- ANIMATION START ---

  // 1. "Looking for the good shining through"
  // The Observer steps closer, and the Circle wakes up
  yield* all(
    perfectCircle().opacity(1, 2),      // Brighten up
    perfectCircle().shadowBlur(50, 2),  // Start glowing
    
    // Move the observer and glass closer to the "truth"
    observerRef().x(-100, 2),
    distortionGlass().x(-100, 2),
    crackLines().x(-100, 2),
  );

  yield* waitFor(0.5);

  // 2. "Burning through the damage"
  // The light becomes intense, dissolving the mess
  yield* all(
    chaosContainer().opacity(0, 1.5),    // Red lines fade
    distortionGlass().opacity(0, 1.5),   // Glass fades
    crackLines().opacity(0, 1.5),        // Cracks fade
    perfectCircle().shadowBlur(150, 1.5),// Intense Holy Glow
    perfectCircle().lineWidth(20, 1.5),  // Thicker lines
  );

  // 3. "Flooded with light"
  // The circle expands to consume the screen
  yield* all(
    perfectCircle().scale(10, 1, easeInCubic), // Massive scale up
    finalFlash().opacity(1, 0.8),              // Whiteout kicks in
  );

  yield* waitFor(0.5);

  // 4. Final Call to Action
  yield* finalText().opacity(1, 1);

  // Hold for the audience to read
  yield* waitFor(3);
});
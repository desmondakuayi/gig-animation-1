import {makeScene2D, Circle, Layout, Rect, Line} from '@motion-canvas/2d';
import {createRef, all, waitFor, Vector2, easeInOutCubic} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#000000'); // Background stays fixed

  // --- 1. ASSETS ---
  const sceneContainer = createRef<Layout>(); // NEW: Wrapper for everything
  
  const perfectCircle = createRef<Circle>();
  const chaosContainer = createRef<Layout>();
  const observerRef = createRef<Layout>(); 
  const distortionGlass = createRef<Rect>();
  const crackLines = createRef<Layout>();

  view.add(
    // WRAP EVERYTHING IN THIS CONTAINER
    <Layout ref={sceneContainer}> 
      
      {/* BACKGROUND CIRCLE */}
      <Circle
        ref={perfectCircle}
        size={400}
        stroke={'#ffffff'}
        lineWidth={8}
        opacity={1}
      />
      
      {/* STATIC CHAOS */}
      <Layout ref={chaosContainer}>
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(-50, -50), new Vector2(50, 50)]} />
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(80, -20), new Vector2(-20, 80)]} />
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(-10, -90), new Vector2(10, 20)]} />
         <Line stroke={'#ff0000'} lineWidth={5} points={[new Vector2(-80, 20), new Vector2(-120, -40)]} />
      </Layout>

      {/* THE OBSERVER CHARACTER */}
      <Layout
        ref={observerRef}
        x={-500}
        y={100}
      >
        <Circle size={60} fill={'#333333'} y={-70} />
        <Rect width={60} height={100} fill={'#333333'} radius={30} />
        <Rect width={20} height={70} fill={'#333333'} x={10} y={-10} radius={10} rotation={-10} />
      </Layout>

      {/* THE DISTORTION GLASS */}
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
            opacity={0}
        />
        <Layout ref={crackLines} opacity={0} x={-200} y={50}>
            <Line stroke={'#ffffff'} lineWidth={2} points={[new Vector2(0, 0), new Vector2(50, -50)]} />
            <Line stroke={'#ffffff'} lineWidth={2} points={[new Vector2(0, 0), new Vector2(-40, 60)]} />
            <Line stroke={'#ffffff'} lineWidth={2} points={[new Vector2(0, 0), new Vector2(20, 80)]} />
        </Layout>
      </Layout>

    </Layout> // END OF CONTAINER
  );

  // --- ANIMATION START ---

  // 1. Enter The Observer
  yield* observerRef().x(-200, 1.5, easeInOutCubic);
  
  yield* waitFor(0.5);

  // 2. The Distortion Lens Appears
  yield* all(
    distortionGlass().opacity(0.6, 1),
    distortionGlass().x(-200, 1) 
  );

  // 3. The Crack (with SAFE Shake)
  yield* crackLines().opacity(1, 0.1);
  
  // FIX: Shake 'sceneContainer' instead of 'view'
  // This shakes the objects, but the black background stays put.
  yield* sceneContainer().position([5, 5], 0.05).to([-5, -5], 0.05).to([0, 0], 0.05);

  // 4. Darken the world
  yield* perfectCircle().opacity(0.3, 2);

  yield* waitFor(2);
});
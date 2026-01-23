import {makeScene2D, Circle, Spline, Rect, Txt, Line} from '@motion-canvas/2d';
import {createRef, all, easeInCubic, easeOutBack, easeInOutSine} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const coreRef = createRef<Circle>();
  const scarRef = createRef<Spline>();
  const glassRef = createRef<Rect>();
  const textRef = createRef<Txt>();
  const bgRef = createRef<Rect>();

  view.add(
    <>
      {/* BACKGROUND */}
      <Rect ref={bgRef} size={'100%'} fill={'#0a0a1a'} />

      {/* 1. THE MESS (Glass & Cracks) */}
      <Rect
        ref={glassRef}
        y={-50} width={400} height={400}
        fill={'#ffffff'} opacity={0.3} radius={20}
      >
        <Line points={[[-100, -150], [0, -50], [-50, 50]]} stroke={'#000000'} lineWidth={3} />
        <Line points={[[100, 150], [20, 50], [80, -20]]} stroke={'#000000'} lineWidth={3} />
      </Rect>

      {/* 2. THE VANDALIZED CIRCLE */}
      <Circle
        ref={coreRef}
        y={-50} size={300}
        fill={'#bbbbbb'} // Still grey
        shadowBlur={0}   // No glow yet
      />

      {/* 3. THE SCAR */}
      <Spline
        ref={scarRef}
        lineWidth={12} stroke={'#000000'}
        points={[[-100, -170], [-20, -100], [40, 0], [120, 100]]}
        smoothness={0.4}
      />

      {/* 4. THE TEXT */}
      <Txt
        ref={textRef}
        text={'REDEMPTION'}
        y={280}
        fill={'#ffffff'}
        fontFamily={'Segoe UI, Helvetica, sans-serif'}
        fontSize={60}
        fontWeight={700}
        opacity={0}
        letterSpacing={10}
        scale={2} // Starts huge (invisible)
      />
    </>
  );

  // ANIMATION SEQUENCE
  
  // 1. The Build Up (The Circle starts to wake up)
  yield* coreRef().scale(1.05, 0.5, easeInOutSine).to(0.95, 0.5, easeInOutSine);
  yield* coreRef().fill('#eeeeee', 1); // Getting whiter
  
  // 2. THE SHOCKWAVE (Everything happens at once)
  yield* all(
    // The Glass flies away/disappears
    glassRef().scale(2, 0.4, easeInCubic),
    glassRef().opacity(0, 0.4),

    // The Scar is erased instantly
    scarRef().end(0, 0.3, easeInCubic), // Animates the line backward

    // The Core Explodes with Light
    coreRef().fill('#ffffff', 0.2),
    coreRef().shadowBlur(150, 0.5, easeOutBack), // Massive Glow
    coreRef().scale(1.2, 0.2).to(1, 0.5, easeOutBack), // Pop effect
    
    // Background flashes White briefly (Holy explosion)
    bgRef().fill('#333344', 0.1).to('#0a0a1a', 1),
  );

  // 3. THE TITLE CARD
  yield* all(
    textRef().opacity(1, 1),
    textRef().scale(1, 1, easeOutBack), // Slams into place
    textRef().letterSpacing(2, 1), // Compresses slightly
  );

  // 4. PEACE (The heartbeat returns)
  yield* coreRef().scale(1.05, 2, easeInOutSine).to(1, 2, easeInOutSine);
});
import {makeScene2D, Circle, Rect} from '@motion-canvas/2d';
import {createRef, all, easeOutSine, easeInOutSine} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const coreRef = createRef<Circle>();
  const ripple1 = createRef<Circle>();
  const ripple2 = createRef<Circle>();

  view.add(
    <>
      {/* 1. BACKGROUND: Solid Dark Blue (Safe & Clean) */}
      <Rect
        size={'100%'}
        fill={'#0a0a1a'} 
      />

      {/* 2. RIPPLES */}
      <Circle
        ref={ripple1}
        size={300}
        stroke={'#ffffff'}
        lineWidth={2}
        opacity={0}
      />
      <Circle
        ref={ripple2}
        size={300}
        stroke={'#ffffff'}
        lineWidth={2}
        opacity={0}
      />

      {/* 3. THE CORE */}
      <Circle
        ref={coreRef}
        size={300}
        fill={'#ffffff'}
        shadowBlur={60}
        shadowColor={'#ffffff'}
      />
    </>
  );

  // ANIMATION LOOP
  // We pulse the ripples 2 times to make sure you see it working
  for (let i = 0; i < 2; i++) {
    yield* all(
      // Breathe Core
      coreRef().scale(1.1, 2, easeInOutSine).to(1, 2, easeInOutSine),
      
      // Ripple 1
      ripple1().opacity(0.5, 0).to(0, 3, easeOutSine),
      ripple1().scale(1, 0).to(1.8, 3, easeOutSine),

      // Ripple 2
      ripple2().opacity(0.5, 0).to(0, 4, easeOutSine),
      ripple2().scale(1, 0).to(2.0, 4, easeOutSine),
    );
  }
});
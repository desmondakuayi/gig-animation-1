import {makeScene2D, Circle, Spline, Rect, Txt} from '@motion-canvas/2d';
import {createRef, all, easeInCubic, easeOutElastic, easeInBounce} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const coreRef = createRef<Circle>();
  const scarRef = createRef<Spline>();
  const textRef = createRef<Txt>();
  const bgRef = createRef<Rect>();

  view.add(
    <>
      {/* BACKGROUND - We give it a ref so we can flash it red later */}
      <Rect ref={bgRef} size={'100%'} fill={'#0a0a1a'} />

      {/* THE CORE (Positioned at y=-50 to match the previous scene) */}
      <Circle
        ref={coreRef}
        y={-50} 
        size={300}
        fill={'#ffffff'}
        shadowBlur={100} // High glow from the Praise scene
        shadowColor={'#ffffff'}
      />

      {/* THE SCAR (Vandalism) */}
      <Spline
        ref={scarRef}
        lineWidth={12} // Thicker line for more aggression
        stroke={'#000000'} // Pure black creates high contrast
        end={0} // Invisible start
        points={[
          [-100, -170], 
          [-20, -100],   
          [40, 0],     
          [120, 100],   
        ]}
        smoothness={0.4}
      />

      {/* THE TEXT */}
      <Txt
        ref={textRef}
        text={'VANDALISM'}
        y={250}
        fill={'#ff4444'} // A desaturated red for "danger/sin"
        fontFamily={'Segoe UI, Helvetica, sans-serif'}
        fontSize={60}
        fontWeight={700} // Bold weight for impact
        opacity={0}
        letterSpacing={8}
      />
    </>
  );

  // 1. SUSPENSE: A brief moment of silence before the strike
  yield* coreRef().shadowBlur(60, 1); // The glory dims slightly before the hit

  // 2. THE STRIKE (Happens very fast)
  yield* all(
    // The scar draws instantly
    scarRef().end(1, 0.1, easeInCubic),
    
    // The text slams in
    textRef().opacity(1, 0),
    textRef().scale(2, 0).to(1, 0.3, easeOutElastic), // Starts big and slams down
    
    // The Core reacts (shrinks/winces)
    coreRef().scale(0.8, 0.1).to(1, 0.5, easeOutElastic),
    coreRef().fill('#bbbbbb', 0.2), // Turns grey/dull
    coreRef().shadowBlur(0, 0.2),   // The holy glow is extinguished instantly
    
    // Optional: Flash the background slightly red for impact
    bgRef().fill('#1a0a0a', 0.1).to('#0a0a1a', 0.5), 
  );
  
  // 3. AFTERMATH: The scar pulsates like a wound
  yield* scarRef().lineWidth(15, 1).to(12, 1);
});
import {makeScene2D, Circle, Txt, Layout, Rect} from '@motion-canvas/2d';
import {createRef, all, waitFor, range, createSignal} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#000000');

  // RE-CREATE SCENE 1 END STATE
  // We need these to exist so the transition is invisible
  const perfectCircle = createRef<Circle>();
  const mainText = createRef<Txt>();
  const subText = createRef<Txt>();
  
  // NEW SCENE 2 ASSETS
  const paintingFrame = createRef<Rect>();
  const musicContainer = createRef<Layout>();
  const musicSignal = createSignal(0);

  view.add(
    <Layout>
      {/* 1. STATE FROM PREVIOUS SCENE */}
      {/* Notice we hard-code the 'y', 'scale' and 'fill' to match Scene 1's end */}
      <Circle
        ref={perfectCircle}
        size={400}
        stroke={'#ffffff'}
        lineWidth={8}
        startAngle={-90}
        endAngle={270}
        y={-50}         
        fill={'#ffffff'} 
        scale={0.5}      
        opacity={1}
      />
      
      <Txt
        ref={mainText}
        text={"INVISIBLE ATTRIBUTES"}
        fill={'#ffffff'}
        fontFamily={'JetBrains Mono, monospace'}
        fontSize={40}
        y={100}      // Match Scene 1 End
        opacity={1}  // Match Scene 1 End
      />
       <Txt
        ref={subText}
        text={"clearly seen"}
        fill={'#aaaaaa'}
        fontSize={24}
        y={150}      // Match Scene 1 End
        opacity={1}  // Match Scene 1 End
      />

      {/* 2. HIDDEN ASSETS FOR THIS SCENE */}
      <Rect
        ref={paintingFrame}
        size={200}       // size(400) * scale(0.5) = 200
        radius={100}     
        stroke={'#ffffff'}
        lineWidth={8}
        opacity={0}
      />

      <Layout ref={musicContainer} opacity={0} y={50}>
        {range(5).map(i => (
            <Rect
                width={40}
                height={() => 50 + musicSignal() * (Math.random() * 200)}
                fill={'#ffffff'}
                x={(i - 2) * 60}
                radius={20}
            />
        ))}
      </Layout>
    </Layout>
  );

  // --- ANIMATION START ---
  
  // 1. Clear text immediately (or fade out)
  yield* all(
    mainText().opacity(0, 0.5),
    subText().opacity(0, 0.5),
  );

  // 2. The Swap
  paintingFrame().position(perfectCircle().position());
  paintingFrame().fill(perfectCircle().fill());
  
  perfectCircle().opacity(0);
  paintingFrame().opacity(1);

  // 3. Morph to Painting
  yield* all(
    paintingFrame().radius(0, 1),
    paintingFrame().size([500, 350], 1),
    paintingFrame().fill(null, 1),
    paintingFrame().y(0, 1)
  );

  yield* waitFor(0.5);

  // 4. Morph to Music
  yield* paintingFrame().size([0, 10], 0.5);
  paintingFrame().opacity(0);

  musicContainer().opacity(1);

  for (let i = 0; i < 4; i++) {
    yield* musicSignal(1, 0.2).to(0, 0.2);
    yield* musicSignal(0.8, 0.1).to(0, 0.2);
  }
  
  yield* waitFor(1);
});
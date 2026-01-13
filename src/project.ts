import {makeProject} from '@motion-canvas/core';

// Import all your scenes
import creation from './scenes/creation?scene';
import praise from './scenes/praise?scene';
import vandalism from './scenes/vandalism?scene';
import perception from './scenes/perception?scene';
import redemption from './scenes/redemption?scene';


export default makeProject({
  // The order here determines the video order
  scenes: [
    creation, 
    praise, 
    vandalism, 
    perception,
    redemption
  ], 
});
import { useRef, MouseEvent, useEffect } from 'react';
import { defaultStrokeColor, defaultStrokeSize } from './Board.const';

import './Board.scss';

interface BoardProps {
  strokeSize?: number;
  strokeColor?: string;
}

const Board: React.FC<BoardProps> = (props) => {
  const { strokeSize = defaultStrokeSize, strokeColor = defaultStrokeColor } = props;

  const canvas = useRef<HTMLCanvasElement>(null);

  /**
   * It takes an event object and returns the x and y coordinates of the mouse cursor
   * @param {MouseEvent} event - The mouse event.
   * @returns an array of two numbers. The first number is the x-coordinate of the mouse and the second number is
   * the y-coordinate of the mouse.
   */
  const getCursorPosition = (event: MouseEvent) => {
    if (!canvas.current) return [undefined, undefined];

    const bounds = canvas.current.getBoundingClientRect();

    const x = ((event.pageX - bounds.left) / bounds.width) * canvas.current.width;
    const y = ((event.pageY - bounds.top) / bounds.height) * canvas.current.height;

    return [x, y];
  };

  /**
   * Draw a point on the canvas
   * @param {MouseEvent} event - The mouse event.
   * @returns Nothing.
   */
  const handleDraw = (event: MouseEvent) => {
    const context = canvas.current?.getContext('2d');

    if (!context) return;

    // Get the current mouse position
    const [x, y] = getCursorPosition(event);

    if (x === undefined || y === undefined) return;

    context.beginPath();
    context.arc(x, y, strokeSize, 0, 2 * Math.PI);
    context.fillStyle = strokeColor;
    context.fill();
  };

  /* Resize the canvas when the window is resized. */
  useEffect(() => {
    const handleResize = () => {
      if (!canvas.current) return;

      // Get the canvas bounds
      const bounds = canvas.current.getBoundingClientRect();

      // Set the canvas width and height to the bounds width and height
      canvas.current.width = bounds.width;
      canvas.current.height = bounds.height;
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas className="board" ref={canvas} onMouseDown={handleDraw} />;
};

export default Board;

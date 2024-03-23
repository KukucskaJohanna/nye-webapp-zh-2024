import { Draw, Game } from './models';


export const minimalCubeSet = (games: Game[]): number => {
  let totalStrength = 0;

  games.forEach(game => {
    let minRed = 0, minGreen = 0, minBlue = 0;

    game.draws.forEach(draw => {
      if (draw.red && draw.red > minRed) minRed = draw.red;
      if (draw.green && draw.green > minGreen) minGreen = draw.green;
      if (draw.blue && draw.blue > minBlue) minBlue = draw.blue;
    });

    const gameStrength = minRed * minGreen * minBlue;
    totalStrength += gameStrength;
  });

  return totalStrength;
};
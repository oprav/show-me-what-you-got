import { Tvmaze } from 'tvmaze-api-ts';
import type { Ishow } from 'tvmaze-api-ts';
import https from 'https';

class TVMaze extends Tvmaze {
  constructor() {
    super();
  }

  listGenres(): Promise<Record<string, Ishow>> {
    const apiEndpoint = 'https://api.tvmaze.com';
    return new Promise((resolve, reject) => {
      https.get(`${apiEndpoint}/shows`, (res) => {
        const data: Uint8Array[] = [];
        res.on('data', (chunk) => data.push(chunk));
        res.on('end', () => {
          const shows = JSON.parse(Buffer.concat(data).toString());
          const genres = shows.reduce(
            (memo: Record<string, Array<Ishow>>, show: Ishow) => {
              show.genres.forEach((genre) => {
                memo[genre] = memo[genre] || [];
                memo[genre].push(show);
              });
              return memo;
            },
            {}
          );
          resolve(genres);
        });
        res.on('error', (err) => reject(err));
      });
    });
  }
}

export { TVMaze };

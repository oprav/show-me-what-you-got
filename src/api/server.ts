import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import { TVMaze } from './TVMazeApiClient';
import path from 'path';

const server: Express = express();
server.use(cors());
const PORT = 8080;

const tvMazeApiClient = new TVMaze();

server.get('/genres', async (req: Request, res: Response) => {
  res.send(await tvMazeApiClient.listGenres());
});

server.get('/show/:showId', async (req: Request, res: Response) => {
  const showPromise = tvMazeApiClient.shows
    .get(req.params.showId)
    .then((response) => ({
      show: response,
    }));
  const episodesPromise = tvMazeApiClient.shows
    .episodes(req.params.showId)
    .then((response) => ({
      episodes: response,
    }));

  const result = (await Promise.all([showPromise, episodesPromise])).reduce(
    (memo, currentValue) => {
      memo = {
        ...memo,
        ...currentValue,
      };
      return memo;
    },
    {}
  );

  res.send(result);
});

server.get('/suggestions', async (req: Request, res: Response) => {
  const result = await tvMazeApiClient.search.shows(req.query.search as string);
  res.send(result.map((r) => r.show));
});

server.use(express.static(path.join(__dirname, '../', '../', 'dist')));

server.listen(PORT, () => {
  console.log(`Express server running on ${PORT}`);
});

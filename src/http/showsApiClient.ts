import type { ShowDetails } from '@/types/ShowDetails';
import type { Ishow } from 'tvmaze-api-ts';
import { HttpClient } from './httpClient';

class ShowsApiClient extends HttpClient {
  async searchShows(query: string) {
    return await this.get<Ishow[]>(
      `${this.baseUrl}/suggestions?search=${query}`
    );
  }

  async getShowsByGenres() {
    return await this.get<Record<string, Ishow[]>>(`${this.baseUrl}/genres`);
  }

  async getShow(showId: string) {
    return await this.get<ShowDetails>(`${this.baseUrl}/show/${showId}`);
  }
}

const showsApiClient = new ShowsApiClient();

export { showsApiClient };

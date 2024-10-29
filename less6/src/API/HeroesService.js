import axios from "axios";

export default class HeroesService {
    static async getHeroById(id) {
        return axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    }

    static async getAllHeroes() {
        return axios.get('https://rickandmortyapi.com/api/character');
    }
}




export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface PokemonDetail {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}

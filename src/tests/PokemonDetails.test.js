import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<PokemonDetails.js />"', () => {
  const MEW_URL = '/pokemons/151';
  test('Testa se as informações detalhadas do pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push(MEW_URL);

    const pokemonTitle = screen.getByText(/Details/i);
    expect(pokemonTitle).toBeInTheDocument();
    const moreDetailsLink = screen.queryByText('More details');
    expect(moreDetailsLink).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summaryTitle).toBeInTheDocument();
    const pokemonParagraph = screen.getByText(/ it appears only to/i);
    expect(pokemonParagraph).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas das localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push(MEW_URL);

    const gameLocations = screen.getByText(/Game Locations/i);
    expect(gameLocations).toBeInTheDocument();
    const mapDescription = screen.queryByText(/Faraway Island/i);
    expect(mapDescription).toBeInTheDocument();
    const mapImg = screen.getByRole('img', { name: /location/i });
    expect(mapImg).toBeInTheDocument();
    expect(mapImg.src).toBe('https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
  });

  test('Testa se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push(MEW_URL);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveAttribute('checked');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

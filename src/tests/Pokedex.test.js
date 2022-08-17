import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<Pokedex.js />"', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', { level: 2, name: /Encountered/i });
    expect(headingH2).toBeInTheDocument();
  });

  test('Testa se é exibido um botão com o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const proxPokemonButton = screen.getByRole('button', { name: /Próximo/i });
    expect(proxPokemonButton).toBeInTheDocument();
  });

  test('Testa se os próximos pokémons da lista são mostrados ao clicar no botão', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId(/pokemon-name/i);
    expect(pokemon).toHaveTextContent(/pikachu/i);
    const proxPokemonButton = screen.getByRole('button', { name: /Próximo/i });
    userEvent.click(proxPokemonButton);
    expect(pokemon).toHaveTextContent(/Charmander/i);
    userEvent.click(proxPokemonButton);
    expect(pokemon).toHaveTextContent(/Caterpie/i);
  });

  test('Testa se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemon).toHaveLength(1);
  });

  test('Deve existir um botão para cada tipo de pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);
    const filterButtonsQuantity = 7;
    expect(filterButtons).toHaveLength(filterButtonsQuantity);
  });

  test('Verifica se os botões de filtro circulam pelos tipos', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);
    userEvent.click(filterButtons[1]);
    expect(filterButtons[1]).toHaveTextContent(/Fire/i);
    const fireTexts = screen.getAllByText(/Fire/i);
    expect(fireTexts).toHaveLength(2);
    const proxPokemonButton = screen.getByRole('button', { name: /Próximo/i });
    userEvent.click(proxPokemonButton);
    expect(filterButtons[1]).toHaveTextContent(/Fire/i);
    expect(fireTexts).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(filterButtons[4]);
    expect(filterButtons[4]).toHaveTextContent(/Psychic/i);
    const psychicTexts = screen.getAllByText(/Psychic/i);
    expect(psychicTexts).toHaveLength(2);
    userEvent.click(proxPokemonButton);
    expect(filterButtons[4]).toHaveTextContent(/Psychic/i);
    expect(psychicTexts).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(proxPokemonButton);
    expect(filterButtons[4]).toHaveTextContent(/Psychic/i);
    expect(psychicTexts).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent(/All/i);
    const pokemon = screen.getByTestId(/pokemon-name/i);
    expect(pokemon).toHaveTextContent(/pikachu/i);
    const proxPokemonButton = screen.getByRole('button', { name: /Próximo/i });
    userEvent.click(proxPokemonButton);
    expect(pokemon).toHaveTextContent(/Charmander/i);
    userEvent.click(proxPokemonButton);
    expect(pokemon).toHaveTextContent(/Caterpie/i);
    userEvent.click(buttonAll);
    expect(pokemon).toHaveTextContent(/pikachu/i);
  });
});

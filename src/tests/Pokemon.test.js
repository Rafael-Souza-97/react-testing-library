import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<Pokemon.js />"', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
    expect(pokemonWeight).toBeInTheDocument();
    const pokemonImg = screen.getByRole('img', { name: /sprite/i });
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
  });

  test('Testa se o link de navegação para exibir detalhes deste pokémon funciona', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Testa se ao clicar no link, é redirecionado para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    const proxPokemonButton = screen.getByRole('button', { name: /Próximo/i });
    userEvent.click(proxPokemonButton);
    const pokemon = screen.getByTestId(/pokemon-name/i);
    expect(pokemon).toHaveTextContent(/Charmander/i);
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/4');
  });

  test('Testa se a URL exibida no navegador muda ao clicar em More details', () => {
    const { history } = renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);
    userEvent.click(filterButtons[6]);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/148');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/23');

    const checkbox = screen.getByLabelText(/favoritado/i);
    userEvent.click(checkbox);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);
    userEvent.click(filterButtons[3]);
    const starFavoriteImg = screen.getByRole('img', { name: /marked as favorite/i });
    expect(starFavoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starFavoriteImg).toBeInTheDocument();
  });
});

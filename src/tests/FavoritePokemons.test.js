import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<About.js />"', () => {
  test('Teste se é exibido uma mensagem caso não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritesMessage = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritesMessage).toBeInTheDocument();
  });
});

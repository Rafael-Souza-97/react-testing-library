import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<App.js />"', () => {
  test('O primeiro link deve possuir o texto Home;', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto About;', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Favorite Pokémons;', () => {
    renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  test('Teste se ao clicar em "Home" é redirecionado para a URL / ', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se ao clicar em "About" é redirecionado para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se ao clicar em Favorite Pokémons é redirecionado para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se ao entrar em uma URL desconhecida redireciona para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemon');
    const notFound = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFound).toBeInTheDocument();
  });
});

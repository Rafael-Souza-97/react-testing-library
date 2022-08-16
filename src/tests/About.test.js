import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<About.js />"', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPage = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });

  test('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutPage = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboutPage).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

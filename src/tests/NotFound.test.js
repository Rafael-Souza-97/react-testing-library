import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "<NotFound.js />"', () => {
  test('Teste se a página contém um heading "h2" com "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundMessage = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

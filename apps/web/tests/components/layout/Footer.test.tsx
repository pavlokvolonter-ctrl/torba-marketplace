import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Footer } from '@/components/layout/Footer';
import { I18nProvider } from '@/i18n/I18nProvider';

function renderFooter() {
  return render(
    <I18nProvider>
      <Footer />
    </I18nProvider>,
  );
}

describe('Footer', () => {
  it('shows the design columns and the currency line', () => {
    renderFooter();

    expect(screen.getByRole('heading', { name: 'Цікавий для себе' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Корисна інформація' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Допомога потрібна?' })).toBeVisible();
    expect(screen.getByText(/що об'єднує покупців і продавців/)).toBeVisible();
    expect(screen.getByText('Українська · UAH')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Категорії' })).toHaveAttribute('href', '/catalog');
  });

  it('switches the language from the footer control', async () => {
    const user = userEvent.setup();
    renderFooter();

    await user.click(screen.getByRole('button', { name: 'Українська' }));
    await user.click(screen.getByRole('option', { name: 'English' }));

    expect(screen.getByRole('heading', { name: 'For you' })).toBeVisible();
    expect(screen.getByText('Ukraine · UAH')).toBeVisible();
  });
});

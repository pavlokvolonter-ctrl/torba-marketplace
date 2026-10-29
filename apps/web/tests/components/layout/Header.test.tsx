import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Header } from '@/components/layout/Header';
import { I18nProvider } from '@/i18n/I18nProvider';

function renderHeader() {
  return render(
    <I18nProvider>
      <Header />
    </I18nProvider>,
  );
}

describe('Header', () => {
  it('opens the mega menu when All categories is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(screen.queryByRole('link', { name: 'Стільці та сидіння' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Всі категорії' }));

    expect(screen.getByRole('link', { name: 'Стільці та сидіння' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Електросамокати' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Нічники' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Інвертори' })).toBeVisible();
  });

  it('shows the design categories on the nav buttons and in the mega menu', async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(screen.getByRole('navigation', { name: 'Каталог' }).textContent).toBe(
      'МебліЕлектронікаОсвітленняЗарядні пристроїОдягСад і город',
    );

    await user.click(screen.getByRole('button', { name: 'Всі категорії' }));

    for (const name of [
      'Стільці та сидіння',
      'Дивани та крісла',
      'Ліжка та спальні',
      'Зберігання та полиці',
      'Столи',
      'Футболки',
      'Сорочки',
      'Штани',
      'Верхній одяг',
      'Взуття',
      'Електросамокати',
      'Кухонні пристрої',
      'Ноутбуки',
      'Смарт-годинники',
      'Лампи',
      'Світильники',
      'LED',
      'Люстри',
      'Нічники',
      'Зарядні станції',
      'Генератори',
      'Павербанки',
      'Сонячні панелі',
      'Інвертори',
      'Садова техніка',
      'Системи поливу',
      'Рослини',
      'Басейни',
      'Інструменти',
    ]) {
      expect(screen.getByRole('link', { name })).toBeVisible();
    }
  });

  it('opens only that category submenu from a nav button', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'Меблі' }));

    expect(screen.getByRole('link', { name: 'Ліжка та спальні' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Столи' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Електросамокати' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Електроніка' }));

    expect(screen.getByRole('link', { name: 'Електросамокати' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Кухонні пристрої' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Столи' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Освітлення' }));
    expect(screen.getByRole('link', { name: 'Нічники' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Зарядні пристрої' }));
    expect(screen.getByRole('link', { name: 'Інвертори' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Одяг' }));
    expect(screen.getByRole('link', { name: 'Взуття' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Сад і город' }));
    expect(screen.getByRole('link', { name: 'Системи поливу' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Взуття' })).not.toBeInTheDocument();
  });

  it('focuses search with the shortcut shown in the field', async () => {
    const user = userEvent.setup();
    renderHeader();

    const search = screen.getByRole('searchbox', { name: 'Я шукаю...' });
    expect(search).not.toHaveFocus();

    await user.keyboard('{Control>}k{/Control}');

    expect(search).toHaveFocus();
  });

  it('closes the mega menu on a second click', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByRole('button', { name: 'Всі категорії' });
    await user.click(trigger);
    await user.click(trigger);

    expect(screen.queryByRole('link', { name: 'Стільці та сидіння' })).not.toBeInTheDocument();
  });
});

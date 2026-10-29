import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Зберегти
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: 'Зберегти' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('uses the accessible name for an icon-only button', () => {
    render(
      <Button hierarchy="tertiary" iconOnly aria-label="Обране">
        <span>♡</span>
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Обране' })).toBeEnabled();
  });
});

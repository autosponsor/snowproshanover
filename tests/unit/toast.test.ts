import { afterEach, describe, expect, it, vi } from 'vitest';
import { toast, toastManager } from '../../lib/toast';

afterEach(() => {
  toastManager.clear();
});

describe('toast façade', () => {
  it('exposes subscriptions and immediately delivers notifications created before a listener mounts', () => {
    const id = toast.info('A notification created before mount', 0);
    const listener = vi.fn();

    const unsubscribe = toast.subscribe(listener);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenLastCalledWith([
      expect.objectContaining({ id, message: 'A notification created before mount', type: 'info' }),
    ]);

    toast.remove(id);
    expect(listener).toHaveBeenLastCalledWith([]);
    unsubscribe();
  });
});

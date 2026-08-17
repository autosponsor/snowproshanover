/**
 * Toast Notification System
 * Simple, non-blocking notifications for user feedback
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // ms, null for persistent
  action?: {
    label: string;
    onClick: () => void;
  };
}

type ToastListener = (toasts: Toast[]) => void;

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<ToastListener> = new Set();
  private nextId = 0;

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  private generateId(): string {
    return `toast-${++this.nextId}`;
  }

  add(message: string, type: ToastType = 'info', options?: {
    duration?: number;
    action?: Toast['action'];
  }): string {
    const id = this.generateId();
    const duration = options?.duration ?? (type === 'error' ? 5000 : 3000);

    const toast: Toast = {
      id,
      message,
      type,
      duration: duration > 0 ? duration : undefined,
      action: options?.action,
    };

    this.toasts.push(toast);
    this.notify();

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  }

  remove(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  success(message: string, duration?: number): string {
    return this.add(message, 'success', { duration });
  }

  error(message: string, duration?: number): string {
    return this.add(message, 'error', { duration: duration ?? 5000 });
  }

  warning(message: string, duration?: number): string {
    return this.add(message, 'warning', { duration });
  }

  info(message: string, duration?: number): string {
    return this.add(message, 'info', { duration });
  }

  clear(): void {
    this.toasts = [];
    this.notify();
  }

  getAll(): Toast[] {
    return [...this.toasts];
  }
}

// Singleton instance
export const toastManager = new ToastManager();

// Convenience exports
export const toast = {
  success: (msg: string, duration?: number) => toastManager.success(msg, duration),
  error: (msg: string, duration?: number) => toastManager.error(msg, duration),
  warning: (msg: string, duration?: number) => toastManager.warning(msg, duration),
  info: (msg: string, duration?: number) => toastManager.info(msg, duration),
  remove: (id: string) => toastManager.remove(id),
  clear: () => toastManager.clear(),
};

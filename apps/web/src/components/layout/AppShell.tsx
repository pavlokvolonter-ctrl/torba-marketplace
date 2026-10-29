import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-(--color-canvas)">
      <Header />
      <Container as="main" className="flex flex-1 flex-col">
        {children}
      </Container>
      <Footer />
    </div>
  );
}

import { PreviewRouteGate } from '@/components/PreviewRouteGate';
import { BottomNav } from "@/components/BottomNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AccountProvider } from "@/components/AccountProvider";
import { Toaster } from "@/components/ui/sonner";
import { AccessGate } from "@/components/AccessGate";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta página no existe o cambió de lugar. Siga practicando desde el inicio.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("Error de aplicación:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          La página no cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocurrió un inconveniente. Intente de nuevo o vuelva al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({staticData:{sitemap:false},
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Práctica Técnica CR | Plataforma de Estudio, Simulacros y MOPT" },
      { name: "description", content: "Preparación interactiva para colegios técnicos, admisión universitaria y pruebas teóricas de manejo en Costa Rica." },
      { name: "author", content: "GICM Desarrollo de Sistemas Digitales y Constructivos ICM" },
      { name: "theme-color", content: "#0B132B" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "pracTICA" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:site_name", content: "pracTICAtecnica.com" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;800;900&display=swap" },
      { rel: "icon", href: "/favicon.png?v=owl-26x", type: "image/png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=owl-26x" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <AccountProvider><AccessGate><div className="pb-16 md:pb-0"><PreviewRouteGate><Outlet /></PreviewRouteGate></div></AccessGate><BottomNav /><Toaster /></AccountProvider>
    </QueryClientProvider>
  );
}

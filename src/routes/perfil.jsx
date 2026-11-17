import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultProfile, loadProfile, saveProfile } from "@/lib/profile";
import { decks } from "@/lib/questions";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { GameRanking } from '@/components/games/GameRanking';
import { GradeBook } from "@/components/GradeBook";
import { RoadProgress } from '@/components/games/RoadCircuits';
import { IdDocumentUpload } from "@/components/IdDocumentUpload";
import { supabase } from "@/integrations/supabase/client";
import {TopicPoints} from '@/components/TopicPoints';

export const Route = createFileRoute("/perfil")({staticData:{sitemap:false},
  head: () => ({
    meta: [{ title: "Mi perfil · pracTICAtecnica.com" },
      {
        name: "description",
        content: "Personalice su nivel, su meta de examen y su meta diaria de práctica.",
      },
      { property: "og:title", content: "Mi perfil · pracTICAtecnica.com" },
      { property: "og:description", content: "Personalice su ruta de estudio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfil,
});

const avatars = ["🦉", "🚀", "🐆", "🌋", "🦜", "🐢", "⚡", "🎓"];
const levels = [
  "Primaria",
  "Ingreso a 7.º",
  "Secundaria",
  "CTP",
  "Bachillerato",
  "Universidad",
  "Adulto / Licencia",
];

function Perfil() {
  const { user } = useAccount();
  const [error, setError] = useState("");
  const [p, setP] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    let active = true;
    setSaved(false);
    setError("");
    if (!user) {
      setP(loadProfile());
      return;
    }
    setP(defaultProfile);
    void supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setError("No se pudo cargar su perfil.");
        else
          setP({
            name: data.display_name,
            avatar: data.avatar,
            level: data.level,
            goal: data.goal,
            dailyXp: data.daily_xp,
          });
      });
    return () => {
      active = false;
    };
  }, [user?.id]);
  const set = <K extends keyof Profile>(k) => {
    setP({ ...p, [k]: v });
    setSaved(false);
  };

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 pb-16">
        <h1 className="text-4xl font-black">Mi perfil</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {user
            ? "Perfil guardado entre dispositivos."
            : "Perfil local. Ingrese para guardar en la nube."}
        </p>
        <GameRanking />
        <TopicPoints />
        {user && <GradeBook ownerUserId={user.id} />}
        {error && (
          <p role="alert" className="mt-3 text-destructive">
            {error}
          </p>
        )}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 rounded-2xl border bg-card p-4 shadow-card sm:p-6">
          <label className="grid gap-2 font-semibold">
            Nombre o apodo
            <input
              value={p.name}
              maxLength={30}
              onChange={(e) => set("name", e.target.value)}
              className="rounded-xl border bg-background px-3 py-2 font-normal"
            />
          </label>
          <div className="font-semibold">
            Avatar
            <div className="mt-2 flex flex-wrap gap-2">
              {avatars.map((a) => (
                <button
                  key={a}
                  onClick={() => set("avatar", a)}
                  type="button"
                  aria-label={`Elegir avatar ${a}`}
                  aria-pressed={p.avatar === a}
                  className={`rounded-xl border-2 p-2 text-2xl ${p.avatar === a ? "border-primary" : "border-border"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <label className="grid gap-2 font-semibold">
            Nivel
            <select
              value={p.level}
              onChange={(e) => set("level", e.target.value)}
              className="rounded-xl border bg-background px-3 py-2 font-normal"
            >
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 font-semibold">
            Prueba que prepara
            <select
              value={p.goal}
              onChange={(e) => set("goal", e.target.value)}
              className="rounded-xl border bg-background px-3 py-2 font-normal"
            >
              {decks.map((d) => (
                <option key={d.id}>{d.title}</option>
              ))}
            </select>
          </label>
          <div className="font-semibold">
            Meta diaria
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                [30, "Tranquila"],
                [50, "Constante"],
                [100, "Intensa"],
                [200, "Simulacro"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => set("dailyXp", v)}
                  className={`rounded-full border-2 px-4 py-2 ${p.dailyXp === v ? "border-primary bg-primary/15" : "border-border"}`}
                >
                  {l} · {v} XP
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                setError("");
                if (user) {
                  const { error } = await supabase
                    .from("profiles")
                    .update({
                      display_name: p.name,
                      avatar: p.avatar,
                      level: p.level,
                      goal: p.goal,
                      daily_xp: p.dailyXp,
                    })
                    .eq("id", user.id);
                  if (error) {
                    setError("No se pudo guardar el perfil.");
                    return;
                  }
                } else saveProfile(p);
                setSaved(true);
              }}
              className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
            >
              Guardar
            </button>
            {saved && (
              <Link to="/" className="font-semibold text-accent">
                ✓ Guardado · Ir a practicar →
              </Link>
            )}
          </div>
        </div>
        <RoadProgress />
        {user && <IdDocumentUpload userId={user.id} />}
      </section>
    </main>
  );
}

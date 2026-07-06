"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db, uid, exportAll, importAll } from "@/lib/db";
import { computeNutritionGoal, GOAL_LABELS } from "@/lib/calc";
import type { Goal } from "@/lib/db";

export default function SettingsPage() {
  const router = useRouter();
  const profile = useLiveQuery(() => db.profiles.get("me"), []);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function changeGoal(goal: Goal) {
    if (!profile) return;
    const updated = { ...profile, goal, updatedAt: Date.now() };
    await db.profiles.put(updated);
    await db.nutritionGoals.put({
      id: uid(),
      effectiveFrom: Date.now(),
      ...computeNutritionGoal(updated),
    });
    setMessage("Goal updated — nutrition targets recalculated.");
  }

  async function doExport() {
    setBusy("export");
    try {
      const json = await exportAll();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `repbase-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage("Backup downloaded. Keep it safe.");
    } finally {
      setBusy(null);
    }
  }

  async function doImport(file: File) {
    setBusy("import");
    try {
      await importAll(await file.text());
      setMessage("Backup restored.");
    } catch (e) {
      setMessage(`Import failed: ${e instanceof Error ? e.message : "invalid file"}`);
    } finally {
      setBusy(null);
    }
  }

  async function resetAll() {
    if (!confirm("Delete ALL data? This cannot be undone. Export a backup first!")) return;
    await db.delete();
    location.href = "/";
  }

  if (!profile) return null;

  return (
    <div className="px-4 pt-8">
      <div className="mb-4 flex items-center gap-3 px-1">
        <button onClick={() => router.back()} className="text-lg text-ink-2">←</button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {message && (
        <div className="card mb-4 border-accent/40 p-3 text-sm text-accent">{message}</div>
      )}

      <div className="card mb-4 p-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Your goal</div>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
            <button
              key={g}
              onClick={() => changeGoal(g)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                profile.goal === g
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-line bg-bg-2 text-ink"
              }`}
            >
              {GOAL_LABELS[g]}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-3">
          Changing goal recalculates calories and macros immediately.
        </p>
      </div>

      <div className="card mb-4 p-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">
          Backup — your data lives only on this device
        </div>
        <div className="flex gap-2">
          <button
            onClick={doExport}
            disabled={busy !== null}
            className="flex-1 rounded-xl bg-accent py-3 font-bold text-black disabled:opacity-40"
          >
            {busy === "export" ? "Exporting…" : "Export backup"}
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy !== null}
            className="flex-1 rounded-xl border border-line py-3 font-bold text-ink-2 disabled:opacity-40"
          >
            {busy === "import" ? "Importing…" : "Import backup"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])}
          />
        </div>
        <p className="mt-2 text-xs text-warn">
          Export weekly — browsers can evict local data from rarely-used web apps.
        </p>
      </div>

      <div className="card mb-4 p-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">
          Re-run onboarding
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="w-full rounded-xl border border-line py-3 font-bold text-ink-2"
        >
          Update body stats & preferences
        </button>
      </div>

      <div className="card mb-6 border-bad/30 p-4">
        <button onClick={resetAll} className="w-full rounded-xl bg-bad/15 py-3 font-bold text-bad">
          Delete all data
        </button>
      </div>

      <p className="px-2 pb-8 text-center text-[10px] leading-relaxed text-ink-3">
        RepBase v0.1 · Your data never leaves this device. General fitness information — not a
        substitute for a doctor or registered dietitian.
      </p>
    </div>
  );
}

"use client";
import { usePreferences } from "./Providers";
export function LoadingState() { const { t } = usePreferences(); return <div className="status-page" role="status"><div className="loading-mark" aria-hidden="true">b.</div><p>{t.loading}</p></div>; }
export function ErrorState({ reset }) { const { t } = usePreferences(); return <div className="status-page"><p className="eyebrow">Brian Bazooband</p><h1>{t.error.title}</h1><p>{t.error.text}</p><button className="button button-primary" onClick={reset}>{t.error.retry}</button></div>; }
export function NotFoundState() { const { t } = usePreferences(); return <div className="status-page"><p className="eyebrow">404 / Brian Bazooband</p><h1>{t.notFound.title}</h1><p>{t.notFound.text}</p><a className="button button-primary" href="/">{t.notFound.back}</a></div>; }

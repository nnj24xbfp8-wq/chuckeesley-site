# Maintenance

Operational notes for this repo: how it gets verified, how dependency updates
land, and the reasoning behind past security-advisory decisions.

The README in this repo is still the upstream Astrofy template's. This file is
the repo-specific one.

## Verification happens in CI, not locally

There is no Node toolchain on the primary Mac, so `npm ci` / `npm run build` /
`npm audit` cannot be run locally. `.github/workflows/verify.yml` exists to
cover that gap. It runs:

- **weekly**, Mondays 15:00 UTC (~08:00 Pacific — UTC does not shift with DST)
- **on demand**, via *Run workflow* in the Actions tab
- **on push to `main`**, when `package.json`, `package-lock.json`, or the
  workflow itself changes
- **on pull requests**, so dependency bumps are tested before merge

Steps: clean install from the committed lockfile, build, then audit.

### Why the audit gate is set to `moderate`

The audit step is a single `npm audit --audit-level=moderate` call.
`--audit-level` affects only the exit code — the full report prints either way —
so one call both reports and gates.

The step deliberately does *not* use `continue-on-error`. An earlier version did,
and the consequence was a green run that concealed a real finding: the exit code
was swallowed, so "green" carried no information. A red run is the notification
mechanism. If that reverts, the whole workflow becomes decorative.

Low and info findings print but do not fail the run.

**Check that failed-run notifications actually reach you**
(GitHub → Settings → Notifications → Actions). A red run nobody sees is the same
as no check at all — see the deploy-hook incident below.

## Dependency updates

Dependabot security updates are enabled. Fixes arrive as PRs; `verify` runs
against each one, so merge on green rather than editing lockfiles by hand
(which isn't possible locally anyway).

## Scheduled rebuild and `VERCEL_DEPLOY_HOOK`

`.github/workflows/scheduled-rebuild.yml` pings a Vercel deploy hook daily at
14:00 UTC so the home page's Substack RSS pull stays fresh even when no commits
land. It reads the `VERCEL_DEPLOY_HOOK` repo secret and exits 1 if unset.

**Incident, 2026-08-24:** the secret was unset, so this job had been failing
every day since at least Aug 19 — roughly 6 seconds per run, exit code 1. Nobody
noticed, because a failing scheduled workflow only emails if Actions
notifications are on. The home page served stale Substack content for the entire
period. Fixed by creating a deploy hook (Vercel → project → Settings → Git →
Deploy Hooks, branch `main`) and adding the URL as the repo secret.

If this job goes red again, check the `trigger` step output first:

- `VERCEL_DEPLOY_HOOK secret is not set.` — the secret is missing or misnamed
  (it is case-sensitive)
- a curl error, exit 22 — the hook URL itself is bad or was revoked in Vercel

The hook URL is a credential. Anyone holding it can trigger deploys. If it leaks,
delete it in Vercel and create a replacement.

## Advisory history

**2026-08-24 — clean.** 0 vulnerabilities across 482 dependencies.

## Toolchain

`package.json` pins `"node": "22.x"`. Workflows use `node-version: 22` to match.
Keep those aligned — a drift between them is how CI ends up testing a runtime
Vercel isn't using.

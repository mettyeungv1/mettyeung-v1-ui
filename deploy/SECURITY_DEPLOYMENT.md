# Trusted client deployment requirements

The recovery image must be built from a reviewed commit on a fresh GitHub-hosted runner. Configure these repository variables with immutable image references:

- `NODE_IMAGE`: official `node:22-alpine@sha256:...`
- `TRIVY_IMAGE`: approved Trivy image pinned by digest
- `COSIGN_IMAGE`: approved Cosign image pinned by digest

Configure `SSH_KNOWN_HOSTS` from an independently verified host key. The deployment scripts must accept `repository/image@sha256:digest`; mutable tags are rejected.

Before deployment, enable the independent maintenance page, preserve the compromised container and rotate `AUTH_SECRET`. Revoke all API sessions and force the agreed password reset. Deploy with `docker-compose.security.yml`, then verify the effective container settings with `docker inspect`.

At the host firewall or egress proxy, deny loopback, RFC1918, link-local, cloud metadata, database, SSH and Docker destinations. Allow only DNS, the selected public API origin, and server-fetched image origins required by the application.

Keep the maintenance page active until health, CSP, authentication, image-proxy rejection, IOC scan, image signature, SBOM and provenance checks pass. Purge CDN and proxy caches before restoring traffic.

## Mandatory incident rotations

Rotate from a known-clean administrative workstation, not from the affected host. Revoke old values before deploying replacements where the service supports overlap.

- Frontends: `AUTH_SECRET`; this invalidates every Auth.js cookie.
- API: `JWT_SECRET`, all rows in the API session store, and all user refresh/access sessions. Require password reset for privileged accounts and accounts active during the incident window.
- Database: `DATABASE_URL` or `DB_USERNAME`/`DB_PASSWORD`, including development/UAT variants if credentials were shared.
- Object storage: `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`; rotate any subordinate access keys and review bucket policies.
- External services: `GEMINI_API_KEY`, `MONITOR_LOG_API_TOKEN`, registry tokens, GitHub deploy credentials, CI OIDC/environment permissions, and any CDN/DNS/API tokens available to the deployment identity.
- Infrastructure: `SSH_KEY` and affected-host `authorized_keys`; independently re-verify `SSH_KNOWN_HOSTS`. Rotate Docker Hub credentials and invalidate prior CI runner or deploy tokens.

Do not rotate public routing values such as `NEXT_PUBLIC_AUTH_BASE_URL`; verify them against the approved production/UAT origins instead. Never place private credentials in `NEXT_PUBLIC_*` variables.

## Required investigation before reopening

- Preserve the stopped container, writable layer, image manifest, image digest, `/proc` captures, recovered deleted script, proxy/CDN/WAF logs, application logs, audit logs, and a timeline in write-protected evidence storage.
- Search proxy and API logs for `POST /adfa`, `65.49.27.166`, the known malware indicators, unusual React Server Component request headers/bodies, and follow-on access from newly created sessions.
- Export and scan the exact compromised image and compare every layer with the registry digest. Treat `mettyeung/mya-client:latest` as untrusted even if the tag now points elsewhere.
- Review database blog/category/contact/banner/feature/partner records and their audit history for ClickFix wording, Windows key instructions, encoded content, scripts, event handlers, inline style overlays, unexpected URLs, and modifications during the incident window.
- Review tag-manager, analytics, DNS, CDN edge rules, object-storage assets, service workers, browser-loaded origins, and administrator accounts. The repository scan alone cannot exclude those sources.
- Review outbound DNS/flow logs for mining pools, cloud metadata, internal service discovery, and any destinations not on the application allowlist.
- Verify no container, host, registry, CI, database, or object-store credential was reused across production and UAT.

## Release gate

The replacement is acceptable only when all three production dependency audits report zero known findings, security tests/type checks/builds pass from fresh script-disabled installs, the image has an SBOM/provenance attestation and valid signature, Trivy reports no high/critical image finding, and deployment references the signed digest. The admin and API repositories include matching `deploy/docker-compose.security.yml` runtime profiles.

Keep production egress default-deny. The client and admin require only the selected public API origin plus explicitly documented media/video/map origins; they do not require direct access to Docker, SSH, databases, loopback, RFC1918, link-local, or cloud metadata addresses. The API requires only its database, object storage, and explicitly configured external AI provider. Apply these restrictions outside Docker Compose with a host firewall or egress proxy.

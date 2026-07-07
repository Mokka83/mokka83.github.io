# Recovery

## Restore a Netlify deploy

Use Netlify deploy history to roll back to the last known-good deploy, then investigate the source commit before redeploying.

## Revert a Git commit

Use a normal revert commit rather than rewriting history. Review binary CV downloads after the revert.

## Disable contact delivery

Remove or unset `RESEND_API_KEY`, `CONTACT_RECIPIENT`, or `TURNSTILE_SECRET_KEY`, then redeploy. Production contact delivery will fail closed.

## Rotate credentials

Rotate Turnstile and Resend credentials in their provider dashboards, update Netlify environment variables, and redeploy.

## Remove a compromised CMS user

Disable the user in Netlify Identity, rotate relevant access, review recent CMS commits, and revert suspicious changes.

## DNS or launch rollback

Use Cloudflare DNS to point traffic back to the previous reviewed target or disable affected records.

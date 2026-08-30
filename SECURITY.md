# Security policy

## Supported versions

The latest published minor of `appshell-react` receives fixes. The library
is pre-1.0, so older minors are not patched — upgrade to the current release.

## Reporting a vulnerability

Report privately through GitHub's
[security advisory form](https://github.com/fyalavuz/appshell-react/security/advisories/new)
rather than a public issue. Please include a reproduction and the versions of
`appshell-react`, React and the framework you are running.

You can expect an acknowledgement within a week, and an assessment of the
report shortly after.

## Scope

This package ships React components and CSS classes — no server, no network
calls, no data storage. The findings that are in scope are the ones a UI
library can actually cause:

- markup or props that let untrusted content reach the DOM unescaped
- focus, scroll-lock or overlay behaviour that can trap or mislead a user
- supply-chain problems in what the package publishes or depends on

Anything about the documentation site's hosting is out of scope; it is a
static GitHub Pages build.

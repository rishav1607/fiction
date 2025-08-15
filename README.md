# Netlify deploy notes

If your Netlify build fails with EISDIR/EPERM on Windows paths, ensure:

- netlify.toml contains only:

```
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- In Netlify UI, set environment variable `NODE_VERSION=20`.
- Do not override the publish directory during site setup; leave it to `.next`.
- Re-run the deploy.



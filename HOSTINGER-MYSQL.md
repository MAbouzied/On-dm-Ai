# Hostinger MySQL – Correct Credentials

## Hostinger uses `localhost`, not an IP

For Hostinger’s built‑in MySQL, the host is always **`localhost`**.

Using an IP (e.g. `91.108.101.195`) will usually fail.

## Where to get the values

1. In **hPanel** → **Databases** → **MySQL Databases**
2. Open your database and copy the values shown there.

## Environment variables to set

| Variable     | Value example | Notes |
|-------------|---------------|-------|
| `DB_HOST`   | **`localhost`** | Use `localhost`, not an IP |
| `DB_PORT`   | `3306`        | Standard MySQL port |
| `DB_USER`   | `u123456789_ondm` | Use the full username with prefix |
| `DB_PASSWORD` | your password | The one you set when creating the DB |
| `DB_NAME`   | `u123456789_ondm` | Use the full database name with prefix |

## Username and database name format

Hostinger adds a prefix to both:

- You create: `ondm`
- Actual value: `u123456789_ondm` (prefix + your name)

Use the **full** value shown in the Hostinger panel, including the prefix.

## Example `.env` / Hostinger env vars

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_ondm
DB_PASSWORD=your_password
DB_NAME=u123456789_ondm
```

## If you use Remote MySQL

If you explicitly use Remote MySQL and connect from another server:

- Use the host/IP provided by Hostinger for Remote MySQL
- Ensure your app server’s IP is allowed in Remote MySQL access
- Use the full username and database name (with prefix) as shown in Hostinger

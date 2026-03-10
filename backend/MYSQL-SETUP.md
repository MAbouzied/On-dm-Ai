# MySQL Setup for ON-DM Backend

The backend uses MySQL. Follow these steps to set up the database.

## Option A: Docker (recommended)

If you have Docker installed:

```bash
docker run -d --name ondm-mysql -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=ondm -p 3306:3306 mysql:8
```

Then update `backend/.env`:
```
DATABASE_URL="mysql://root:yourpassword@localhost:3306/ondm"
```

## Option B: XAMPP / WAMP

1. Start MySQL from XAMPP/WAMP control panel
2. Open phpMyAdmin or MySQL CLI
3. Create database: `CREATE DATABASE ondm;`
4. Update `backend/.env`:
   ```
   DATABASE_URL="mysql://root:@localhost:3306/ondm"
   ```
   (Use your MySQL username/password if different)

## Option C: Standalone MySQL

1. Install MySQL 8 from https://dev.mysql.com/downloads/
2. Create database: `CREATE DATABASE ondm;`
3. Update `backend/.env` with your connection string

## After MySQL is Running

```bash
cd backend
pnpm prisma migrate dev --name init_mysql
pnpm db:seed
pnpm dev
```

## Troubleshooting

- **Can't reach database**: Ensure MySQL is running on port 3306
- **Access denied**: Check username/password in DATABASE_URL
- **Database doesn't exist**: Run `CREATE DATABASE ondm;` in MySQL

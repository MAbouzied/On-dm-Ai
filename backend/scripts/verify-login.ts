/**
 * Verify admin login - run from backend dir: npx tsx scripts/verify-login.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@ondm.com";
  const password = "admin123";

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    console.error("ERROR: No admin found with email:", email);
    process.exit(1);
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    console.error("ERROR: Password does not match. Re-seeding...");
    const hashed = await bcrypt.hash(password, 10);
    await prisma.admin.update({
      where: { email },
      data: { password: hashed },
    });
    console.log("SUCCESS: Password updated. Try logging in again.");
  } else {
    console.log("SUCCESS: Login credentials are valid. admin@ondm.com / admin123");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

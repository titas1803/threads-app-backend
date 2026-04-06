import prisma from "#/lib/db.js";
import type { CreateUserInput, LoginUserPayload } from "#/types/index.js";
import { createHmac, randomBytes } from "node:crypto";
import Jwt from "jsonwebtoken";
import "dotenv/config";

export class UserService {
  private static generateHash(password: string, salt: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static async createUser(payload: CreateUserInput) {
    const {
      firstName,
      lastName,
      email,
      password,
      profileImageUrl = null,
    } = payload;

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = UserService.generateHash(password, salt);

    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileImageUrl,
        salt,
      },
    });
  }

  public static async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  public static async loginUser({ email, password }: LoginUserPayload) {
    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const salt = user.salt;
      const hashedPassword = UserService.generateHash(password, salt);

      if (hashedPassword !== user.password) {
        throw new Error("Invalid email or password");
      }

      const token = Jwt.sign(
        { id: user.id, email: user.email },
        process.env.TOKEN_SECRET!,
        { expiresIn: "1h" },
      );
      return { success: true, message: "Login successful", token };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : String(error),
        token: null,
      };
    }
  }

  public static async getUserFromToken(token: string) {
    try {
      const decoded = Jwt.verify(token, process.env.TOKEN_SECRET!) as {
        id: string;
        email: string;
      };
      const user = await UserService.getUserByEmail(decoded.email);
      return { user };
    } catch (error) {
      console.error("Error verifying token:", error);
      return {};
    }
  }
}

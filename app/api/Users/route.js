import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    // confirming our data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are empty or required" },
        { status: 400 }
      );
    }

    // checking for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

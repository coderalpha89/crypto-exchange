import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Sign in user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return NextResponse.json({
      message: "Signin successful",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Signin failed" },
      { status: 500 }
    );
  }
}

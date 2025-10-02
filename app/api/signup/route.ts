import { NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Set display name
    await updateProfile(user, { displayName: name });

    // Save user details in Firestore
    await setDoc(doc(db, "user", user.uid), {
      uid: user.uid,
      email: user.email,
      name,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Signup successful",
      user: {
        uid: user.uid,
        email: user.email,
        name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Signup failed" },
      { status: 500 }
    );
  }
}

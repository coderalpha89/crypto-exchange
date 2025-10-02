import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp} from "firebase/firestore";

export async function GET() {
  try {
    const usersRef = collection(db, "user");
    const snapshot = await getDocs(usersRef);

    const users: any[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    const usersRef = collection(db, "user");

    const newUser = {
      name,
      email,
      created_at: serverTimestamp(), // Firestore will set current time
    };

    const docRef = await addDoc(usersRef, newUser);

    return NextResponse.json({
      message: "User created successfully",
      id: docRef.id,
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

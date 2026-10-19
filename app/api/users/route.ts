import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for now
  const users = [
    { value: "1", label: "Ali Khan" },
    { value: "2", label: "Sara Ahmed" },
    { value: "3", label: "John Doe" },
  ];

  return NextResponse.json(users);
}
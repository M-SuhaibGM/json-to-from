import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // Hardcoded data since we don't have a DB yet
  if (type === "gender") {
    return NextResponse.json([
      { value: "M", label: "Male" },
      { value: "F", label: "Female" },
      { value: "O", label: "Other" },
    ]);
  }

  if (type === "country") {
    return NextResponse.json([
      { value: "US", label: "United States" },
      { value: "UK", label: "United Kingdom" },
      { value: "PK", label: "Pakistan" },
    ]);
  }

  return NextResponse.json([]);
}
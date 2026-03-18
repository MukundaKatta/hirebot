import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { resume, jobDescription } = await req.json();
    const systemPrompt = `You are HireBot AI, a recruiting assistant. Analyze the candidate's resume against the job description. Return JSON with: score (0-100), strengths (array), weaknesses (array), summary (string), recommendations (array).`;
    const userMessage = `Resume:\n${resume}\n\nJob Description:\n${jobDescription}`;
    const result = await generateAIResponse(systemPrompt, userMessage);
    try { return NextResponse.json(JSON.parse(result)); }
    catch { return NextResponse.json({ score: 80, strengths: ["Relevant experience"], weaknesses: ["Missing some skills"], summary: result, recommendations: ["Schedule technical interview"] }); }
  } catch (error) {
    return NextResponse.json({ error: "Matching failed" }, { status: 500 });
  }
}

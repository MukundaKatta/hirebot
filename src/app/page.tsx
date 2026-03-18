"use client";

import { useState } from "react";
import {
  Users, LayoutDashboard, FileText, Sparkles, Kanban, Calendar, BarChart3,
  ClipboardCheck, Plus, Search, Star, Clock, Mail, Phone, MapPin, Briefcase,
  GraduationCap, Award, ChevronRight, ArrowRight, TrendingUp, Target, Filter
} from "lucide-react";
import toast from "react-hot-toast";

type TabType = "dashboard" | "candidates" | "pipeline" | "scheduler" | "assessments" | "analytics";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  experience: string;
  education: string;
  skills: string[];
  aiScore: number;
  stage: "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";
  appliedDate: string;
  source: string;
  resumeSummary: string;
}

const candidates: Candidate[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@email.com", phone: "+1-555-0101", location: "San Francisco, CA", role: "Senior Frontend Engineer", experience: "8 years", education: "MS Computer Science, Stanford", skills: ["React", "TypeScript", "Next.js", "GraphQL", "System Design"], aiScore: 95, stage: "interview", appliedDate: "2026-03-10", source: "LinkedIn", resumeSummary: "Experienced frontend engineer with 8 years at top tech companies. Led team of 6 at previous company. Strong system design skills." },
  { id: "2", name: "Mike Johnson", email: "mike.j@email.com", phone: "+1-555-0102", location: "New York, NY", role: "Senior Frontend Engineer", experience: "6 years", education: "BS Computer Science, MIT", skills: ["React", "Vue.js", "Node.js", "AWS", "Docker"], aiScore: 88, stage: "screening", appliedDate: "2026-03-12", source: "Referral", resumeSummary: "Full-stack developer with strong frontend expertise. Experience with cloud infrastructure. MIT graduate." },
  { id: "3", name: "Emily Park", email: "emily.p@email.com", phone: "+1-555-0103", location: "Seattle, WA", role: "Product Manager", experience: "5 years", education: "MBA, Harvard Business School", skills: ["Product Strategy", "Data Analysis", "Agile", "User Research", "SQL"], aiScore: 92, stage: "offer", appliedDate: "2026-03-08", source: "Career Page", resumeSummary: "Product manager with track record of launching successful B2B products. Harvard MBA. Strong analytical background." },
  { id: "4", name: "David Kim", email: "d.kim@email.com", phone: "+1-555-0104", location: "Austin, TX", role: "Senior Frontend Engineer", experience: "10 years", education: "BS Software Engineering, UT Austin", skills: ["React", "Angular", "TypeScript", "Performance", "Accessibility"], aiScore: 91, stage: "applied", appliedDate: "2026-03-15", source: "Indeed", resumeSummary: "Veteran frontend engineer specializing in performance optimization and accessibility. 10 years of industry experience." },
  { id: "5", name: "Lisa Wang", email: "lisa.w@email.com", phone: "+1-555-0105", location: "Boston, MA", role: "Data Scientist", experience: "4 years", education: "PhD Statistics, MIT", skills: ["Python", "ML/AI", "TensorFlow", "SQL", "Statistics"], aiScore: 86, stage: "interview", appliedDate: "2026-03-11", source: "LinkedIn", resumeSummary: "PhD statistician with expertise in machine learning and NLP. Published 5 papers. Strong Python skills." },
  { id: "6", name: "Alex Rivera", email: "alex.r@email.com", phone: "+1-555-0106", location: "Denver, CO", role: "DevOps Engineer", experience: "7 years", education: "BS IT, Colorado State", skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Python"], aiScore: 83, stage: "hired", appliedDate: "2026-02-28", source: "Referral", resumeSummary: "DevOps specialist with deep Kubernetes and cloud infrastructure expertise. 7 years experience." },
  { id: "7", name: "Rachel Brown", email: "rachel.b@email.com", phone: "+1-555-0107", location: "Chicago, IL", role: "Senior Frontend Engineer", experience: "3 years", education: "BS CS, Northwestern", skills: ["React", "JavaScript", "CSS", "Testing"], aiScore: 72, stage: "rejected", appliedDate: "2026-03-09", source: "Career Page", resumeSummary: "Junior-mid level frontend developer. Good React fundamentals but lacks senior-level experience." },
];

const stages = ["applied", "screening", "interview", "offer", "hired", "rejected"] as const;
const stageColors: Record<string, string> = { applied: "bg-gray-100 text-gray-700", screening: "bg-blue-100 text-blue-700", interview: "bg-purple-100 text-purple-700", offer: "bg-yellow-100 text-yellow-700", hired: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700" };

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStage, setFilterStage] = useState<string>("all");

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === "all" || c.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "candidates" as const, label: "Candidates", icon: Users },
    { id: "pipeline" as const, label: "Pipeline", icon: Kanban },
    { id: "scheduler" as const, label: "Scheduler", icon: Calendar },
    { id: "assessments" as const, label: "Assessments", icon: ClipboardCheck },
    { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Users className="w-6 h-6 text-primary-600" />
          <span className="text-lg font-bold text-gray-900">HireBot</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Recruiting Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Candidates", value: candidates.length, icon: Users, color: "bg-blue-50 text-blue-600", trend: "+12 this week" },
                { label: "In Pipeline", value: candidates.filter((c) => !["hired", "rejected"].includes(c.stage)).length, icon: Target, color: "bg-purple-50 text-purple-600", trend: "5 active roles" },
                { label: "Interviews Today", value: 3, icon: Calendar, color: "bg-yellow-50 text-yellow-600", trend: "Next at 2:00 PM" },
                { label: "Avg. AI Score", value: Math.round(candidates.reduce((a, b) => a + b.aiScore, 0) / candidates.length), icon: Sparkles, color: "bg-green-50 text-green-600", trend: "Above threshold" },
              ].map((stat) => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Pipeline Overview</h3>
                {stages.filter(s => s !== "rejected").map((stage) => {
                  const count = candidates.filter((c) => c.stage === stage).length;
                  return (
                    <div key={stage} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${stageColors[stage]}`}>{stage}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{ width: `${(count / candidates.length) * 100}%` }} /></div>
                        <span className="text-sm font-medium text-gray-900 w-6 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Top Candidates</h3>
                {candidates.sort((a, b) => b.aiScore - a.aiScore).slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-xs font-bold text-primary-700">{c.name.split(" ").map(n => n[0]).join("")}</span></div>
                      <div><p className="text-sm font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-500">{c.role}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary-500" />
                      <span className="text-sm font-bold text-primary-600">{c.aiScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "candidates" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Candidate</button>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input pl-9" placeholder="Search candidates..." /></div>
              <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="input w-40">
                <option value="all">All Stages</option>
                {stages.map((s) => (<option key={s} value={s} className="capitalize">{s}</option>))}
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                {filteredCandidates.map((c) => (
                  <div key={c.id} onClick={() => setSelectedCandidate(c)}
                    className={`card cursor-pointer transition-colors ${selectedCandidate?.id === c.id ? "border-primary-500 bg-primary-50" : "hover:border-gray-300"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-sm font-bold text-primary-700">{c.name.split(" ").map(n => n[0]).join("")}</span></div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{c.name}</h3>
                          <p className="text-sm text-gray-500">{c.role} - {c.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-center"><span className="text-lg font-bold text-primary-600">{c.aiScore}</span><p className="text-[10px] text-gray-400">AI Score</p></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${stageColors[c.stage]}`}>{c.stage}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.skills.slice(0, 4).map((s) => (<span key={s} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{s}</span>))}
                      {c.skills.length > 4 && <span className="text-[10px] text-gray-400">+{c.skills.length - 4}</span>}
                    </div>
                  </div>
                ))}
              </div>
              {selectedCandidate && (
                <div className="w-96 card sticky top-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-lg font-bold text-primary-700">{selectedCandidate.name.split(" ").map(n => n[0]).join("")}</span></div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedCandidate.name}</h3>
                      <p className="text-sm text-gray-500">{selectedCandidate.role}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600"><Mail className="w-4 h-4" /> {selectedCandidate.email}</div>
                    <div className="flex items-center gap-2 text-gray-600"><Phone className="w-4 h-4" /> {selectedCandidate.phone}</div>
                    <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-4 h-4" /> {selectedCandidate.location}</div>
                    <div className="flex items-center gap-2 text-gray-600"><Briefcase className="w-4 h-4" /> {selectedCandidate.experience}</div>
                    <div className="flex items-center gap-2 text-gray-600"><GraduationCap className="w-4 h-4" /> {selectedCandidate.education}</div>
                  </div>
                  <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                    <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-primary-600" /><span className="text-sm font-semibold text-primary-900">AI Match Score: {selectedCandidate.aiScore}%</span></div>
                    <p className="text-xs text-gray-700">{selectedCandidate.resumeSummary}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">{selectedCandidate.skills.map((s) => (<span key={s} className="text-xs px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full">{s}</span>))}</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="btn-primary flex-1 text-xs">Schedule Interview</button>
                    <button className="btn-secondary flex-1 text-xs">Send Assessment</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "pipeline" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Hiring Pipeline</h1>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {stages.filter(s => s !== "rejected").map((stage) => (
                <div key={stage} className="min-w-[280px] bg-gray-100 rounded-xl p-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between capitalize">
                    {stage} <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{candidates.filter((c) => c.stage === stage).length}</span>
                  </h3>
                  <div className="space-y-2">
                    {candidates.filter((c) => c.stage === stage).map((c) => (
                      <div key={c.id} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-[10px] font-bold text-primary-700">{c.name.split(" ").map(n => n[0]).join("")}</span></div>
                          <div><p className="text-sm font-medium text-gray-900">{c.name}</p><p className="text-[10px] text-gray-500">{c.role}</p></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">{c.skills.slice(0, 2).map((s) => (<span key={s} className="text-[9px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{s}</span>))}</div>
                          <span className="text-xs font-bold text-primary-600">{c.aiScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "scheduler" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Interview Scheduler</h1>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
              {[
                { candidate: "Sarah Chen", role: "Senior Frontend Engineer", date: "Mar 18, 2026", time: "2:00 PM", type: "Technical", interviewers: ["Alice W.", "Bob S."] },
                { candidate: "Lisa Wang", role: "Data Scientist", date: "Mar 19, 2026", time: "10:00 AM", type: "Case Study", interviewers: ["Charlie D."] },
                { candidate: "Mike Johnson", role: "Senior Frontend Engineer", date: "Mar 20, 2026", time: "3:00 PM", type: "Screening", interviewers: ["HR Team"] },
              ].map((interview, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 mb-3 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="text-center bg-primary-50 rounded-lg p-2 min-w-[60px]"><p className="text-xs text-primary-600">{interview.date.split(",")[0]}</p><p className="text-xs font-bold text-primary-800">{interview.time}</p></div>
                    <div>
                      <p className="font-medium text-gray-900">{interview.candidate}</p>
                      <p className="text-sm text-gray-500">{interview.role} - {interview.type}</p>
                      <p className="text-xs text-gray-400">Interviewers: {interview.interviewers.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary text-xs">Reschedule</button>
                    <button className="btn-primary text-xs">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "assessments" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Skill Assessments</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Create Assessment</button>
            </div>
            {[
              { name: "Frontend Technical Assessment", role: "Senior Frontend Engineer", questions: 15, duration: "90 min", candidates: 3, avgScore: 82 },
              { name: "Product Sense Challenge", role: "Product Manager", questions: 8, duration: "60 min", candidates: 2, avgScore: 88 },
              { name: "Data Science Problem Set", role: "Data Scientist", questions: 10, duration: "120 min", candidates: 1, avgScore: 91 },
              { name: "System Design Interview", role: "All Engineering", questions: 3, duration: "45 min", candidates: 4, avgScore: 76 },
            ].map((assessment, i) => (
              <div key={i} className="card flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ClipboardCheck className="w-8 h-8 text-primary-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{assessment.name}</h3>
                    <p className="text-sm text-gray-500">{assessment.role} - {assessment.questions} questions - {assessment.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center"><p className="text-lg font-bold text-gray-900">{assessment.candidates}</p><p className="text-xs text-gray-400">Candidates</p></div>
                  <div className="text-center"><p className="text-lg font-bold text-primary-600">{assessment.avgScore}%</p><p className="text-xs text-gray-400">Avg Score</p></div>
                  <button className="btn-secondary text-xs">View Results</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Recruiting Analytics</h1>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Time to Hire", value: "18 days", trend: "-3 days", color: "text-green-600" },
                { label: "Offer Accept Rate", value: "85%", trend: "+5%", color: "text-green-600" },
                { label: "Cost per Hire", value: "$4,200", trend: "-12%", color: "text-green-600" },
                { label: "Quality of Hire", value: "4.2/5", trend: "+0.3", color: "text-green-600" },
              ].map((metric) => (
                <div key={metric.label} className="card">
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <p className={`text-xs mt-1 ${metric.color}`}>{metric.trend} vs last quarter</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Source Effectiveness</h3>
                {[
                  { source: "LinkedIn", hires: 12, quality: 4.3, cost: "$3,200" },
                  { source: "Referral", hires: 8, quality: 4.5, cost: "$1,500" },
                  { source: "Career Page", hires: 6, quality: 3.8, cost: "$800" },
                  { source: "Indeed", hires: 4, quality: 3.5, cost: "$2,100" },
                ].map((s) => (
                  <div key={s.source} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{s.source}</span>
                    <div className="flex gap-6 text-xs text-gray-500">
                      <span>{s.hires} hires</span><span>Quality: {s.quality}</span><span>{s.cost}/hire</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Pipeline Conversion</h3>
                {[
                  { stage: "Applied -> Screening", rate: "45%" },
                  { stage: "Screening -> Interview", rate: "60%" },
                  { stage: "Interview -> Offer", rate: "35%" },
                  { stage: "Offer -> Hired", rate: "85%" },
                ].map((c) => (
                  <div key={c.stage} className="mb-3">
                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-700">{c.stage}</span><span className="font-medium text-gray-900">{c.rate}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{ width: c.rate }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

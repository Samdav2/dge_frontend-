"use client";

import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    MoreHorizontal,
    Plus,
    Edit,
    Trash2,
    Eye,
    Folder,
    X,
    User,
    MessageSquare
} from "lucide-react";

export default function TeamManagementView() {
    const [teamList, setTeamList] = useState<any[]>([]);

    const [isTeamEmpty, setIsTeamEmpty] = useState(false);
    const [addTeamMemberModalOpen, setAddTeamMemberModalOpen] = useState(false);
    const [editTeamMemberModalOpen, setEditTeamMemberModalOpen] = useState(false);
    const [deleteMemberModalOpen, setDeleteMemberModalOpen] = useState(false);
    const [isViewingMember, setIsViewingMember] = useState(false);

    // Form inputs
    const [teamFullName, setTeamFullName] = useState("");
    const [teamRoleName, setTeamRoleName] = useState("");
    const [teamPhone, setTeamPhone] = useState("");
    const [teamEmail, setTeamEmail] = useState("");
    const [teamPass, setTeamPass] = useState("TempPass123!");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null);
    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
    const [editTargetIndex, setEditTargetIndex] = useState<number | null>(null);

    const [activeRowPopup, setActiveRowPopup] = useState<number | null>(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    // Filter states
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);
    const [roleFilterOpen, setRoleFilterOpen] = useState(false);

    const teamRolesList = [
        "Support",
        "Manager",
        "Developer",
        "Designer",
        "Analyst",
        "Tester",
        "Product Owner",
        "Data Scientist",
        "Marketer",
        "UX Researcher",
        "System Admin",
        "Content Strategist",
        "Business Analyst"
    ];

    const fetchTeams = async () => {
        try {
            const res = await fetch("/api/admin/teams");
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTeamList(data.map((item: any) => ({
                        id: item.id,
                        name: item.full_name || item.name || item.username || "Team Member",
                        email: item.email || "N/A",
                        phone: item.phone || "N/A",
                        role: item.is_superuser ? "Manager" : "Support",
                        created: item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "N/A",
                        status: item.status ? item.status.toUpperCase() : "ACTIVE"
                    })));
                }
            }
        } catch (error) {
            console.error("Failed to load teams:", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const toggleRowPopup = (idx: number, event: React.MouseEvent) => {
        event.stopPropagation();
        if (activeRowPopup === idx) {
            setActiveRowPopup(null);
        } else {
            const rect = event.currentTarget.getBoundingClientRect();
            setPopupPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX - 140
            });
            setActiveRowPopup(idx);
        }
    };

    const handleAddTeamMember = async () => {
        if (!teamFullName || !teamEmail) {
            alert("Please fill in Full Name and Email!");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/admin/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name: teamFullName,
                    email: teamEmail,
                    phone: teamPhone,
                    password: teamPass || "TempPass123!",
                    is_superuser: teamRoleName === "Manager",
                    status: "active"
                })
            });

            if (res.ok) {
                await fetchTeams();
                setTeamFullName("");
                setTeamRoleName("");
                setTeamPhone("");
                setTeamEmail("");
                setTeamPass("TempPass123!");
                setAddTeamMemberModalOpen(false);
                setIsTeamEmpty(false);
            } else {
                const err = await res.json().catch(() => ({}));
                alert("Failed to add team member: " + (err.error || res.statusText));
            }
        } catch (error) {
            console.error(error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditTeamMember = async () => {
        if (!teamFullName) {
            alert("Please enter the member's name");
            return;
        }
        if (editTargetIndex === null) return;
        setIsSubmitting(true);
        const currentMember = teamList[editTargetIndex];
        try {
            const res = await fetch(`/api/admin/teams/${currentMember.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: teamFullName,
                    phone: teamPhone,
                    status: "active"
                })
            });

            if (res.ok) {
                await fetchTeams();
                setEditTeamMemberModalOpen(false);
                setEditTargetIndex(null);
            } else {
                // Local fallback update
                const updatedList = [...teamList];
                updatedList[editTargetIndex] = {
                    ...currentMember,
                    name: teamFullName,
                    phone: teamPhone
                };
                setTeamList(updatedList);
                setEditTeamMemberModalOpen(false);
                setEditTargetIndex(null);
            }
        } catch (error) {
            console.error(error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteMember = async (idx: number) => {
        const member = teamList[idx];
        if (!member || !member.id) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/admin/teams/${member.id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchTeams();
                setDeleteMemberModalOpen(false);
                setDeleteTargetIndex(null);
            } else {
                alert("Failed to delete team member");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredTeam = teamList.filter(member => {
        const matchStatus = statusFilter === "ALL" || member.status === statusFilter;
        const matchRole = roleFilter === "ALL" || member.role === roleFilter;
        return matchStatus && matchRole;
    });

    const handleExportCSV = () => {
        if (filteredTeam.length === 0) return;
        
        const headers = ["Name", "Email", "Phone", "Role", "Date Created", "Status"];
        const rows = filteredTeam.map(m => [
            m.name, m.email, m.phone, m.role, m.created, m.status
        ]);
        
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `team_export_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none relative">
            {isViewingMember && selectedMemberIndex !== null ? (
                /* View Member details page (Image 1) */
                <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in">
                    <button
                        onClick={() => setIsViewingMember(false)}
                        className="self-start px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2"
                    >
                        ← Back to Team Management
                    </button>

                    {/* Detail view header */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row items-center justify-between gap-6 select-none">
                        <div className="flex items-center gap-5 select-none w-full">
                            <div className="w-20 h-20 rounded-full bg-slate-50 overflow-hidden border border-slate-100 flex items-center justify-center font-bold text-3xl text-[#b68512] shrink-0 select-none">
                                {teamList[selectedMemberIndex]?.name?.substring(0, 2).toUpperCase() || "TM"}
                            </div>
                            <div className="flex flex-col select-none leading-none">
                                <span className="text-xs text-blue-500 font-bold tracking-tight select-none leading-none">
                                    User Profile
                                </span>
                                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-normal select-none">
                                    {teamList[selectedMemberIndex]?.name || "Team Member"}
                                </h2>
                                <span className="text-[11px] font-medium text-slate-400 select-none leading-none mt-1">
                                    Team Member Since 14 04 2025 . 12:16AM
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 select-none shrink-0">
                            <button
                                onClick={() => alert("Email composer opening for " + teamList[selectedMemberIndex]?.email)}
                                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-full text-xs text-slate-600 select-none shadow-sm transition-all leading-none flex items-center gap-1.5"
                            >
                                <MessageSquare size={14} /> <span>Send Email</span>
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedMemberIndex === null) return;
                                    setTeamFullName(teamList[selectedMemberIndex]?.name || "");
                                    setTeamRoleName(teamList[selectedMemberIndex]?.role || "");
                                    setTeamPhone(teamList[selectedMemberIndex]?.phone || "");
                                    setTeamEmail(teamList[selectedMemberIndex]?.email || "");
                                    setEditTargetIndex(selectedMemberIndex);
                                    setEditTeamMemberModalOpen(true);
                                }}
                                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-full text-xs text-slate-600 select-none shadow-sm transition-all leading-none flex items-center gap-1.5"
                            >
                                <Edit size={14} /> <span>Edit Team Member</span>
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteTargetIndex(selectedMemberIndex);
                                    setDeleteMemberModalOpen(true);
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 font-bold rounded-full text-white text-xs select-none hover:scale-[1.01] shadow-sm transition-all leading-none"
                            >
                                Suspend Team Member
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none max-w-5xl">
                        {/* Personal Information */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between select-none">
                            <h4 className="text-xs font-extrabold text-slate-800 select-none mb-4 tracking-tight">
                                Personal Information
                            </h4>
                            <div className="space-y-4 select-none leading-none">
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Full Name</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {teamList[selectedMemberIndex]?.name || "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Phone Number</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {teamList[selectedMemberIndex]?.phone || "—"}
                                    </span>
                                </div>
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Email Address</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {teamList[selectedMemberIndex]?.email || "—"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 flex-1 flex flex-col select-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                        <div className="flex items-center gap-2 select-none">
                            <div className="relative">
                                <button 
                                    onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                                    className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm hover:bg-slate-50 transition-all"
                                >
                                    {statusFilter === "ALL" ? "Status" : statusFilter} <ChevronDown size={12} />
                                </button>
                                {statusFilterOpen && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-1 min-w-[120px]">
                                        {["ALL", "ACTIVE", "INACTIVE", "BANNED"].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => { setStatusFilter(opt); setStatusFilterOpen(false); }}
                                                className={`w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-slate-50 ${statusFilter === opt ? "text-[#b68512]" : "text-slate-500"}`}
                                            >
                                                {opt === "ALL" ? "All Statuses" : opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button 
                                    onClick={() => setRoleFilterOpen(!roleFilterOpen)}
                                    className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm hover:bg-slate-50 transition-all"
                                >
                                    {roleFilter === "ALL" ? "Roles" : roleFilter} <ChevronDown size={12} />
                                </button>
                                {roleFilterOpen && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-1 min-w-[120px] max-h-60 overflow-y-auto">
                                        {["ALL", ...teamRolesList].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => { setRoleFilter(opt); setRoleFilterOpen(false); }}
                                                className={`w-full text-left px-4 py-2 text-[10px] font-bold hover:bg-slate-50 ${roleFilter === opt ? "text-[#b68512]" : "text-slate-500"}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setIsTeamEmpty(!isTeamEmpty)}
                                className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-400 select-none shadow-sm ml-4"
                            >
                                Toggle Empty State
                            </button>
                        </div>

                        <div className="flex items-center gap-3 select-none">
                            <button 
                                onClick={handleExportCSV}
                                className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 select-none shadow-sm transition-all flex items-center gap-1"
                            >
                                Export CSV <ChevronDown size={13} className="text-slate-400" />
                            </button>
                            <button
                                onClick={() => {
                                    setTeamFullName("");
                                    setTeamRoleName("");
                                    setTeamPhone("");
                                    setTeamEmail("");
                                    setTeamPass("");
                                    setAddTeamMemberModalOpen(true);
                                }}
                                className="px-4 py-2 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] rounded-xl text-white font-bold text-[11px] select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                            >
                                <Plus size={14} /> <span>Create Team Member</span>
                            </button>
                        </div>
                    </div>

                    {isTeamEmpty || filteredTeam.length === 0 ? (
                        <div className="bg-white p-12 flex flex-col items-center justify-center border border-slate-100 rounded-2xl min-h-[420px] text-center select-none shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center mb-4 select-none">
                                <Folder className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                                {isTeamEmpty ? "No Members Here" : "No Members Match Filters"}
                            </h3>
                            <p className="text-xs text-slate-400 max-w-sm mt-1 select-none font-medium leading-normal mb-5">
                                {isTeamEmpty 
                                    ? "It seems this section is currently empty. As you begin to add team members, they'll appear right here!"
                                    : "Try adjusting your filters to see more results."}
                            </p>
                            <button
                                onClick={() => {
                                    if (isTeamEmpty) {
                                        setAddTeamMemberModalOpen(true);
                                    } else {
                                        setStatusFilter("ALL");
                                        setRoleFilter("ALL");
                                    }
                                }}
                                className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-5 py-2 rounded-xl text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                            >
                                {isTeamEmpty ? (
                                    <>
                                        <Plus size={15} /> <span>Add Team Member</span>
                                    </>
                                ) : (
                                    <span>Reset Filters</span>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                            <table className="w-full text-left border-collapse select-none">
                                <thead>
                                    <tr className="border-b border-slate-50 select-none">
                                        <th className="py-3 px-2 w-10 select-none">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                            />
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Name
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Email Address
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Phone Number
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Role Name
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Date Created
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Status
                                        </th>
                                        <th className="py-3 px-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 select-none leading-none">
                                    {filteredTeam.map((member, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => {
                                                setSelectedMemberIndex(idx);
                                                setIsViewingMember(true);
                                            }}
                                            className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none relative"
                                        >
                                            <td className="py-4 px-2 select-none">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                />
                                            </td>
                                            <td className="py-4 px-2 text-xs font-bold text-slate-800 leading-none select-none">
                                                {member.name}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-blue-500 font-medium select-none leading-none">
                                                {member.email}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-500 font-medium select-none leading-none">
                                                {member.phone}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                                {member.role}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                                {member.created}
                                            </td>
                                            <td className="py-4 px-2 select-none">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                        member.status === "ACTIVE"
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : member.status === "INACTIVE"
                                                            ? "bg-slate-50 text-slate-400 border border-slate-100"
                                                            : "bg-red-50 text-red-600 border border-red-100"
                                                    }`}
                                                >
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 select-none text-slate-400 hover:text-slate-600 relative">
                                                <button
                                                    onClick={(e) => toggleRowPopup(idx, e)}
                                                    className="focus:outline-none select-none relative p-1 rounded-md hover:bg-slate-100"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Fixed Positioned Popups to avoid clipping */}
                            {activeRowPopup !== null && (
                                <div 
                                    className="fixed bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-[100] flex flex-col select-none animate-fade-in w-36"
                                    style={{ 
                                        top: `${popupPosition.top - window.scrollY}px`, 
                                        left: `${popupPosition.left - window.scrollX}px` 
                                    }}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const member = teamList[activeRowPopup];
                                            setTeamFullName(member.name);
                                            setTeamRoleName(member.role);
                                            setTeamPhone(member.phone);
                                            setTeamEmail(member.email);
                                            setEditTargetIndex(activeRowPopup);
                                            setActiveRowPopup(null);
                                            setEditTeamMemberModalOpen(true);
                                        }}
                                        className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                    >
                                        <Edit size={13} className="text-slate-400" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedMemberIndex(activeRowPopup);
                                            setIsViewingMember(true);
                                            setActiveRowPopup(null);
                                        }}
                                        className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                    >
                                        <Eye size={13} className="text-slate-400" />
                                        <span>View Member</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteTargetIndex(activeRowPopup);
                                            setActiveRowPopup(null);
                                            setDeleteMemberModalOpen(true);
                                        }}
                                        className="flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold select-none transition-all text-left border-t border-slate-50 mt-1 pt-2"
                                    >
                                        <Trash2 size={13} />
                                        <span>Delete Member</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Modal for Creating Team Member */}
            {addTeamMemberModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setAddTeamMemberModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-5 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Add Team Member
                                </h3>
                                <button
                                    onClick={() => setAddTeamMemberModalOpen(false)}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="fullName">
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={teamFullName}
                                        onChange={(e) => setTeamFullName(e.target.value)}
                                        placeholder="e.g Nnaji Christian"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="role">
                                        Select Role
                                    </label>
                                    <select
                                        id="role"
                                        value={teamRoleName}
                                        onChange={(e) => setTeamRoleName(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="">Choose</option>
                                        {teamRolesList.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={teamPhone}
                                        onChange={(e) => setTeamPhone(e.target.value)}
                                        placeholder="e.g 09021233422"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={teamEmail}
                                        onChange={(e) => setTeamEmail(e.target.value)}
                                        placeholder="e.g. chrisnnaji443@gmail.com"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setAddTeamMemberModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all leading-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTeamMember}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Add Team Member
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Editing Team Member */}
            {editTeamMemberModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setEditTeamMemberModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-5 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Edit Team Member
                                </h3>
                                <button
                                    onClick={() => setEditTeamMemberModalOpen(false)}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editFullName">
                                        Full Name
                                    </label>
                                    <input
                                        id="editFullName"
                                        type="text"
                                        value={teamFullName}
                                        onChange={(e) => setTeamFullName(e.target.value)}
                                        placeholder="e.g Nnaji Christian"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editRole">
                                        Select Role
                                    </label>
                                    <select
                                        id="editRole"
                                        value={teamRoleName}
                                        onChange={(e) => setTeamRoleName(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="">Choose</option>
                                        {teamRolesList.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editPhone">
                                        Phone Number
                                    </label>
                                    <input
                                        id="editPhone"
                                        type="text"
                                        value={teamPhone}
                                        onChange={(e) => setTeamPhone(e.target.value)}
                                        placeholder="e.g 09021233422"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editEmail">
                                        Email Address
                                    </label>
                                    <input
                                        id="editEmail"
                                        type="email"
                                        value={teamEmail}
                                        onChange={(e) => setTeamEmail(e.target.value)}
                                        placeholder="e.g. chrisnnaji443@gmail.com"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setEditTeamMemberModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all leading-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditTeamMember}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Update Member
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteMemberModalOpen && deleteTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
                    <div
                        onClick={() => setDeleteMemberModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    />
                    <div className="relative bg-white w-full max-w-md p-6 md:p-8 rounded-2xl border border-slate-100 shadow-2xl flex flex-col items-center text-center select-none animate-fade-in">
                        <button
                            onClick={() => setDeleteMemberModalOpen(false)}
                            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                        >
                            <X size={18} />
                        </button>
                        <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg tracking-tight mb-3">Delete Team Member?</h3>
                        <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-xl mb-6 max-w-sm">
                            <p className="text-[11px] text-slate-600 font-medium leading-normal">
                                ⚠️ You are about to permanently delete this team member. This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 w-full">
                            <button
                                onClick={() => setDeleteMemberModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs transition-all"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteMember(deleteTargetIndex)}
                                className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-2.5 rounded-full text-white font-bold text-xs hover:scale-[1.01] transition-all shadow-sm"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import React, { useState } from "react";
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
    const [teamList, setTeamList] = useState([
        { name: "Nnaji Christian", email: "chrisnnaji443@gmail.com", phone: "09021233422", role: "Support", created: "09/03/2025", status: "ACTIVE" },
        { name: "Martha Dokubo", email: "sophia@gmail.com", phone: "09021233423", role: "Manager", created: "09/04/2025", status: "SUSPENDED" },
        { name: "Elizabeth Bashir", email: "liam@gmail.com", phone: "09021233424", role: "Developer", created: "09/05/2025", status: "ACTIVE" },
        { name: "John Bazimo", email: "ava@gmail.com", phone: "09021233425", role: "Designer", created: "09/06/2025", status: "ACTIVE" },
        { name: "Daniel Ibe", email: "noah@gmail.com", phone: "09021233426", role: "Analyst", created: "09/07/2025", status: "SUSPENDED" },
        { name: "John Okafor", email: "mason@gmail.com", phone: "09021233427", role: "Tester", created: "09/08/2025", status: "ACTIVE" },
        { name: "Daniel Ibe", email: "isabella@gmail.com", phone: "09021233428", role: "Product Owner", created: "09/09/2025", status: "ACTIVE" },
        { name: "John Okafor", email: "ethan@gmail.com", phone: "09021233429", role: "Data Scientist", created: "09/10/2025", status: "ACTIVE" },
        { name: "Esther Okafor", email: "mia@gmail.com", phone: "09021233430", role: "Marketer", created: "09/11/2025", status: "ACTIVE" },
        { name: "Joseph Werinipre", email: "oliver@gmail.com", phone: "09021233431", role: "UX Researcher", created: "09/12/2025", status: "SUSPENDED" },
        { name: "Samuel Nasiru", email: "charlotte@gmail.com", phone: "09021233432", role: "System Admin", created: "09/13/2025", status: "ACTIVE" },
        { name: "Hannah Musa", email: "james@gmail.com", phone: "09021233433", role: "Content Strategist", created: "09/14/2025", status: "ACTIVE" },
        { name: "Samuel Nasiru", email: "emily@gmail.com", phone: "09021233433", role: "Business Analyst", created: "09/15/2025", status: "SUSPENDED" }
    ]);

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
    const [teamPass, setTeamPass] = useState("");

    const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null);
    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
    const [editTargetIndex, setEditTargetIndex] = useState<number | null>(null);

    const [activeRowPopup, setActiveRowPopup] = useState<number | null>(null);

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

    const toggleRowPopup = (idx: number) => {
        if (activeRowPopup === idx) {
            setActiveRowPopup(null);
        } else {
            setActiveRowPopup(idx);
        }
    };

    const handleAddTeamMember = () => {
        if (!teamFullName || !teamRoleName || !teamEmail) {
            alert("Please fill in all mandatory fields!");
            return;
        }
        setTeamList([
            {
                name: teamFullName,
                email: teamEmail,
                phone: teamPhone || "N/A",
                role: teamRoleName,
                created: "09/03/2025",
                status: "ACTIVE"
            },
            ...teamList
        ]);
        setTeamFullName("");
        setTeamRoleName("");
        setTeamPhone("");
        setTeamEmail("");
        setTeamPass("");
        setAddTeamMemberModalOpen(false);
        setIsTeamEmpty(false);
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
                                {teamList[selectedMemberIndex].name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col select-none leading-none">
                                <span className="text-xs text-blue-500 font-bold tracking-tight select-none leading-none">
                                    User Profile
                                </span>
                                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-normal select-none">
                                    {teamList[selectedMemberIndex].name}
                                </h2>
                                <span className="text-[11px] font-medium text-slate-400 select-none leading-none mt-1">
                                    Team Member Since 14 04 2025 . 12:16AM
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 select-none shrink-0">
                            <button
                                onClick={() => alert("Email composer opening for " + teamList[selectedMemberIndex].email)}
                                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-full text-xs text-slate-600 select-none shadow-sm transition-all leading-none flex items-center gap-1.5"
                            >
                                <MessageSquare size={14} /> <span>Send Email</span>
                            </button>
                            <button
                                onClick={() => {
                                    setTeamFullName(teamList[selectedMemberIndex].name);
                                    setTeamRoleName(teamList[selectedMemberIndex].role);
                                    setTeamPhone(teamList[selectedMemberIndex].phone);
                                    setTeamEmail(teamList[selectedMemberIndex].email);
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

                    {/* Form sections: Personal Information and Account Information */}
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
                                        {teamList[selectedMemberIndex].name}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Phone Number</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {teamList[selectedMemberIndex].phone}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Email Address</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {teamList[selectedMemberIndex].email}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Password</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        ************
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between select-none">
                            <h4 className="text-xs font-extrabold text-slate-800 select-none mb-4 tracking-tight">
                                Account Information
                            </h4>
                            <div className="space-y-4 select-none leading-none">
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Date Created</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        2024-01-15
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Last Login</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        2024-10-07 14:23:45
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Last IP Address</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        192.168.1.1
                                    </span>
                                </div>

                                <div className="flex items-center justify-between select-none leading-tight">
                                    <div className="flex flex-col select-none leading-tight">
                                        <span className="text-[10px] text-slate-400 font-bold select-none">Email Verification</span>
                                        <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                            Verified
                                        </span>
                                    </div>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex select-none mr-2"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Grid Table */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] select-none max-w-5xl">
                        <h4 className="text-xs font-bold text-slate-800 select-none mb-4 tracking-tight">
                            Permissions
                        </h4>
                        <div className="space-y-5 select-none leading-none">
                            {(["Dashboard", "Analytics", "Reports", "Settings", "User Management"] as const).map((permSection) => (
                                <div key={permSection} className="space-y-2 select-none border-b border-slate-50 pb-3">
                                    <span className="text-[10px] font-bold text-slate-400 select-none uppercase tracking-wide">
                                        {permSection}
                                    </span>
                                    <div className="flex items-center gap-6 select-none">
                                        {(["Create", "View", "Update", "Delete"] as const).map((action) => (
                                            <label key={action} className="flex items-center gap-1.5 select-none cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={action === "Update" || action === "Delete"}
                                                    className="w-3.5 h-3.5 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                />
                                                <span className="text-[10px] font-medium text-slate-500 select-none">
                                                    {action}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                /* List & controls sub-page exactly matching screenshot 4 */
                <div className="space-y-6 flex-1 flex flex-col select-none">
                    {/* Action Buttons Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                        <div className="flex items-center gap-2 select-none">
                            <button className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                                Status <ChevronDown size={12} />
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                                Roles <ChevronDown size={12} />
                            </button>

                            <button
                                onClick={() => setIsTeamEmpty(!isTeamEmpty)}
                                className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-400 select-none shadow-sm ml-4"
                            >
                                Toggle Empty State
                            </button>
                        </div>

                        <div className="flex items-center gap-3 select-none">
                            <button className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 select-none shadow-sm transition-all flex items-center gap-1">
                                Export Or Import <ChevronDown size={13} className="text-slate-400" />
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

                    {/* Table View exactly matching Image 4 */}
                    {isTeamEmpty || teamList.length === 0 ? (
                        <div className="bg-white p-12 flex flex-col items-center justify-center border border-slate-100 rounded-2xl min-h-[420px] text-center select-none shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center mb-4 select-none">
                                <Folder className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                                No Team Member Here
                            </h3>
                            <p className="text-xs text-slate-400 max-w-sm mt-1 select-none font-medium leading-normal mb-5">
                                It seems this section is currently empty. As you begin to add team members, they'll appear right here!
                            </p>
                            <button
                                onClick={() => setAddTeamMemberModalOpen(true)}
                                className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-5 py-2 rounded-xl text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                            >
                                <Plus size={15} /> <span>Add Team Member</span>
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
                                <tbody className="divide-y divide-slate-50 select-none">
                                    {teamList.map((member, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none relative">
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
                                                            : "bg-red-50 text-red-600 border border-red-100"
                                                    }`}
                                                >
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 select-none text-slate-400 hover:text-slate-600 relative">
                                                <button
                                                    onClick={() => toggleRowPopup(idx)}
                                                    className="focus:outline-none select-none relative"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>

                                                {activeRowPopup === idx && (
                                                    <div className="absolute right-6 top-10 w-36 bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-50 flex flex-col select-none">
                                                        <button
                                                            onClick={() => {
                                                                setTeamFullName(member.name);
                                                                setTeamRoleName(member.role);
                                                                setTeamPhone(member.phone);
                                                                setTeamEmail(member.email);
                                                                setEditTargetIndex(idx);
                                                                setActiveRowPopup(null);
                                                                setEditTeamMemberModalOpen(true);
                                                            }}
                                                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                                        >
                                                            <Edit size={13} className="text-slate-400" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedMemberIndex(idx);
                                                                setIsViewingMember(true);
                                                                setActiveRowPopup(null);
                                                            }}
                                                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                                        >
                                                            <Eye size={13} className="text-slate-400" />
                                                            <span>View Member</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDeleteTargetIndex(idx);
                                                                setActiveRowPopup(null);
                                                                setDeleteMemberModalOpen(true);
                                                            }}
                                                            className="flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold select-none transition-all text-left border-t border-slate-50 mt-1 pt-2"
                                                        >
                                                            <Trash2 size={13} />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Slide Overs and Modals */}
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

                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center relative select-none">
                                <User className="w-6 h-6 text-slate-400" />
                                <div className="absolute -bottom-0.5 -right-0.5 bg-amber-50 border border-amber-100 text-[#b68512] p-1 rounded-full text-[10px] flex items-center justify-center">
                                    <Plus size={11} />
                                </div>
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

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="pass">
                                        Password
                                    </label>
                                    <input
                                        id="pass"
                                        type="password"
                                        value={teamPass}
                                        onChange={(e) => setTeamPass(e.target.value)}
                                        placeholder="e.g. 123456j6ht4g"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="pt-2 select-none border-t border-slate-50 mt-4">
                                    <h4 className="text-xs font-bold text-slate-800 select-none mb-3">
                                        Access Permission
                                    </h4>

                                    <div className="space-y-3.5 select-none leading-none">
                                        {(["Dashboard", "Analytics", "Reports", "User Management"] as const).map((permSection) => (
                                            <div key={permSection} className="space-y-1.5 select-none leading-none">
                                                <span className="text-[10px] font-bold text-slate-400 select-none uppercase tracking-wide">
                                                    {permSection}
                                                </span>
                                                <div className="flex items-center gap-4 select-none leading-none">
                                                    {(["Create", "View", "Update", "Delete"] as const).map((action) => (
                                                        <label key={action} className="flex items-center gap-1.5 cursor-pointer select-none leading-none">
                                                            <input
                                                                type="checkbox"
                                                                defaultChecked={action === "Update" || action === "Delete"}
                                                                className="w-3.5 h-3.5 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                            />
                                                            <span className="text-[10px] font-medium text-slate-500 select-none">
                                                                {action}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setAddTeamMemberModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
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

            {editTeamMemberModalOpen && editTargetIndex !== null && (
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

                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center relative select-none">
                                <User className="w-6 h-6 text-slate-400" />
                                <div className="absolute -bottom-0.5 -right-0.5 bg-amber-50 border border-amber-100 text-[#b68512] p-1 rounded-full text-[10px] flex items-center justify-center">
                                    <Edit size={11} />
                                </div>
                            </div>

                            {/* Edit inputs */}
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

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editPass">
                                        Password
                                    </label>
                                    <input
                                        id="editPass"
                                        type="password"
                                        value={teamPass}
                                        onChange={(e) => setTeamPass(e.target.value)}
                                        placeholder="e.g. 123456j6ht4g"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="pt-2 select-none border-t border-slate-50 mt-4">
                                    <h4 className="text-xs font-bold text-slate-800 select-none mb-3">
                                        Access Permission
                                    </h4>

                                    <div className="space-y-3.5 select-none leading-none">
                                        {(["Dashboard", "Analytics", "Reports", "User Management"] as const).map((permSection) => (
                                            <div key={permSection} className="space-y-1.5 select-none leading-none">
                                                <span className="text-[10px] font-bold text-slate-400 select-none uppercase tracking-wide">
                                                    {permSection}
                                                </span>
                                                <div className="flex items-center gap-4 select-none leading-none">
                                                    {(["Create", "View", "Update", "Delete"] as const).map((action) => (
                                                        <label key={action} className="flex items-center gap-1.5 cursor-pointer select-none leading-none">
                                                            <input
                                                                type="checkbox"
                                                                defaultChecked={action === "Update" || action === "Delete"}
                                                                className="w-3.5 h-3.5 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                            />
                                                            <span className="text-[10px] font-medium text-slate-500 select-none">
                                                                {action}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setEditTeamMemberModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!teamFullName || !teamRoleName || !teamEmail) {
                                        alert("Please fill in all mandatory fields!");
                                        return;
                                    }
                                    const updated = [...teamList];
                                    updated[editTargetIndex] = {
                                        ...updated[editTargetIndex],
                                        name: teamFullName,
                                        email: teamEmail,
                                        phone: teamPhone || "N/A",
                                        role: teamRoleName
                                    };
                                    setTeamList(updated);
                                    setEditTeamMemberModalOpen(false);
                                }}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteMemberModalOpen && deleteTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
                    <div
                        onClick={() => setDeleteMemberModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-md h-auto p-6 md:p-8 rounded-2xl border border-slate-100 shadow-2xl flex flex-col items-center justify-center text-center select-none transform transition-all duration-300 animate-fade-in">
                        <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center font-semibold text-red-600 mb-4 select-none shadow-sm">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>

                        <h3 className="font-bold text-slate-800 text-lg tracking-tight select-none mb-3">
                            Delete Team Member?
                        </h3>

                        <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-xl text-center mb-6 max-w-sm">
                            <p className="text-[11px] text-slate-600 font-medium leading-normal flex items-start gap-1 select-none">
                                ⚠️ You have selected these team member to delete. If this was the action that you wanted to do, please confirm your choice or cancel and return to the page.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full select-none">
                            <button
                                onClick={() => setDeleteMemberModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setTeamList(teamList.filter((_, i) => i !== deleteTargetIndex));
                                    setDeleteMemberModalOpen(false);
                                    setDeleteTargetIndex(null);
                                    setIsViewingMember(false);
                                }}
                                className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-2.5 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] transition-all shadow-sm leading-none"
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

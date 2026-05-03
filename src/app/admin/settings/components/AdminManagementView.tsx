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
    Shield
} from "lucide-react";

export default function AdminManagementView() {
    const [adminList, setAdminList] = useState([
        { name: "Nnaji Christian", email: "chrisnnaji443@gmail.com", phone: "09021233422", role: "Support", rank: "Support", created: "09/03/2025", status: "ACTIVE" },
        { name: "Martha Dokubo", email: "sophia@gmail.com", phone: "09021233423", role: "Manager", rank: "Manager", created: "09/04/2025", status: "SUSPENDED" },
        { name: "Elizabeth Bashir", email: "liam@gmail.com", phone: "09021233424", role: "Developer", rank: "Developer", created: "09/05/2025", status: "ACTIVE" },
        { name: "John Bazimo", email: "ava@gmail.com", phone: "09021233425", role: "Designer", rank: "Designer", created: "09/06/2025", status: "ACTIVE" },
        { name: "Daniel Ibe", email: "noah@gmail.com", phone: "09021233426", role: "Analyst", rank: "Analyst", created: "09/07/2025", status: "SUSPENDED" },
        { name: "John Okafor", email: "mason@gmail.com", phone: "09021233427", role: "Tester", rank: "Tester", created: "09/08/2025", status: "ACTIVE" },
        { name: "Daniel Ibe", email: "isabella@gmail.com", phone: "09021233428", role: "Product Owner", rank: "Product Owner", created: "09/09/2025", status: "ACTIVE" },
        { name: "John Okafor", email: "ethan@gmail.com", phone: "09021233429", role: "Data Scientist", rank: "Data Scientist", created: "09/10/2025", status: "ACTIVE" },
        { name: "Esther Okafor", email: "mia@gmail.com", phone: "09021233430", role: "Marketer", rank: "Marketer", created: "09/11/2025", status: "ACTIVE" },
        { name: "Joseph Werinipre", email: "oliver@gmail.com", phone: "09021233431", role: "UX Researcher", rank: "UX Researcher", created: "09/12/2025", status: "SUSPENDED" },
        { name: "Samuel Nasiru", email: "charlotte@gmail.com", phone: "09021233432", role: "System Admin", rank: "System Admin", created: "09/13/2025", status: "ACTIVE" },
        { name: "Hannah Musa", email: "james@gmail.com", phone: "09021233433", role: "Content Strategist", rank: "Content Strategist", created: "09/14/2025", status: "ACTIVE" },
        { name: "Samuel Nasiru", email: "emily@gmail.com", phone: "09021233433", role: "Business Analyst", rank: "Business Analyst", created: "09/15/2025", status: "SUSPENDED" }
    ]);

    const [isAdminEmpty, setIsAdminEmpty] = useState(false);
    const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
    const [editAdminModalOpen, setEditAdminModalOpen] = useState(false);
    const [deleteAdminModalOpen, setDeleteAdminModalOpen] = useState(false);
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
    const [isViewingAdmin, setIsViewingAdmin] = useState(false);

    // Selected checkboxes for bulk deletes/actions
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Form inputs
    const [adminFullName, setAdminFullName] = useState("");
    const [adminRoleName, setAdminRoleName] = useState("");
    const [adminRankName, setAdminRankName] = useState("");
    const [adminPhone, setAdminPhone] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPass, setAdminPass] = useState("");

    const [selectedAdminIndex, setSelectedAdminIndex] = useState<number | null>(null);
    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
    const [editTargetIndex, setEditTargetIndex] = useState<number | null>(null);

    const [activeRowPopup, setActiveRowPopup] = useState<number | null>(null);

    const rolesList = [
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

    const handleToggleRow = (idx: number) => {
        if (selectedRows.includes(idx)) {
            setSelectedRows(selectedRows.filter((i) => i !== idx));
        } else {
            setSelectedRows([...selectedRows, idx]);
        }
    };

    const handleToggleAll = () => {
        if (selectedRows.length === adminList.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(adminList.map((_, i) => i));
        }
    };

    const handleAddAdmin = () => {
        if (!adminFullName || !adminRoleName || !adminEmail) {
            alert("Please fill in all mandatory fields!");
            return;
        }
        setAdminList([
            {
                name: adminFullName,
                email: adminEmail,
                phone: adminPhone || "N/A",
                role: adminRoleName,
                rank: adminRankName || adminRoleName,
                created: "09/03/2025",
                status: "ACTIVE"
            },
            ...adminList
        ]);
        setAdminFullName("");
        setAdminRoleName("");
        setAdminRankName("");
        setAdminPhone("");
        setAdminEmail("");
        setAdminPass("");
        setAddAdminModalOpen(false);
        setIsAdminEmpty(false);
    };

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none relative">
            {isViewingAdmin && selectedAdminIndex !== null ? (
                /* Detail View For Admins */
                <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in">
                    <button
                        onClick={() => setIsViewingAdmin(false)}
                        className="self-start px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2"
                    >
                        ← Back to Admin Management
                    </button>

                    {/* Detail view header */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row items-center justify-between gap-6 select-none">
                        <div className="flex items-center gap-5 select-none w-full">
                            <div className="w-20 h-20 rounded-full bg-slate-50 overflow-hidden border border-slate-100 flex items-center justify-center font-bold text-3xl text-[#b68512] shrink-0 select-none">
                                {adminList[selectedAdminIndex].name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col select-none leading-none">
                                <span className="text-xs text-blue-500 font-bold tracking-tight select-none leading-none">
                                    Admin Profile
                                </span>
                                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-normal select-none">
                                    {adminList[selectedAdminIndex].name}
                                </h2>
                                <span className="text-[11px] font-medium text-slate-400 select-none leading-none mt-1">
                                    Admin Member Since 14 04 2025 . 12:16AM
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 select-none shrink-0">
                            <button
                                onClick={() => {
                                    setAdminFullName(adminList[selectedAdminIndex].name);
                                    setAdminRoleName(adminList[selectedAdminIndex].role);
                                    setAdminRankName(adminList[selectedAdminIndex].rank);
                                    setAdminPhone(adminList[selectedAdminIndex].phone);
                                    setAdminEmail(adminList[selectedAdminIndex].email);
                                    setEditTargetIndex(selectedAdminIndex);
                                    setEditAdminModalOpen(true);
                                }}
                                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-full text-xs text-slate-600 select-none shadow-sm transition-all leading-none flex items-center gap-1.5"
                            >
                                <Edit size={14} /> <span>Edit Admin</span>
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteTargetIndex(selectedAdminIndex);
                                    setDeleteAdminModalOpen(true);
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 font-bold rounded-full text-white text-xs select-none hover:scale-[1.01] shadow-sm transition-all leading-none"
                            >
                                Suspend Admin
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
                                        {adminList[selectedAdminIndex].name}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Phone Number</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {adminList[selectedAdminIndex].phone}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Email Address</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {adminList[selectedAdminIndex].email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between select-none">
                            <h4 className="text-xs font-extrabold text-slate-800 select-none mb-4 tracking-tight">
                                Admin Information
                            </h4>
                            <div className="space-y-4 select-none leading-none">
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Role</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {adminList[selectedAdminIndex].role}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Rank</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {adminList[selectedAdminIndex].rank}
                                    </span>
                                </div>

                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold select-none">Date Created</span>
                                    <span className="font-bold text-xs text-slate-800 mt-1 select-none leading-tight">
                                        {adminList[selectedAdminIndex].created}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Primary View Listing Table */
                <div className="space-y-6 flex-1 flex flex-col select-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                        <div className="flex items-center gap-2 select-none">
                            <button className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                                Status <ChevronDown size={12} />
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                                Roles <ChevronDown size={12} />
                            </button>

                            <button
                                onClick={() => setIsAdminEmpty(!isAdminEmpty)}
                                className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-400 select-none shadow-sm ml-4"
                            >
                                Toggle Empty State
                            </button>
                        </div>

                        {/* Actions top right depending on row selection (Image 1) */}
                        <div className="flex items-center gap-3 select-none">
                            {selectedRows.length > 0 ? (
                                <div className="flex items-center gap-2 select-none animate-fade-in">
                                    <button
                                        onClick={() => {
                                            if (selectedRows.length === 1) {
                                                const idx = selectedRows[0];
                                                setAdminFullName(adminList[idx].name);
                                                setAdminRoleName(adminList[idx].role);
                                                setAdminRankName(adminList[idx].rank);
                                                setAdminPhone(adminList[idx].phone);
                                                setAdminEmail(adminList[idx].email);
                                                setEditTargetIndex(idx);
                                                setEditAdminModalOpen(true);
                                            } else {
                                                alert("Please select exactly 1 admin to edit.");
                                            }
                                        }}
                                        className="p-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl text-blue-600 font-bold text-xs select-none hover:scale-[1.01] transition-all flex items-center gap-1 shadow-sm"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => setBulkDeleteModalOpen(true)}
                                        className="p-2 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl text-red-600 font-bold text-xs select-none hover:scale-[1.01] transition-all flex items-center gap-1 shadow-sm"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 select-none shadow-sm transition-all flex items-center gap-1">
                                        Export Or Import <ChevronDown size={13} className="text-slate-400" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAdminFullName("");
                                            setAdminRoleName("");
                                            setAdminRankName("");
                                            setAdminPhone("");
                                            setAdminEmail("");
                                            setAdminPass("");
                                            setAddAdminModalOpen(true);
                                        }}
                                        className="px-4 py-2 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] rounded-xl text-white font-bold text-[11px] select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                                    >
                                        <Plus size={14} /> <span>Add Admin</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Check if is empty or populated */}
                    {isAdminEmpty || adminList.length === 0 ? (
                        /* Empty state exactly matching screenshot 1 */
                        <div className="bg-white p-12 flex flex-col items-center justify-center border border-slate-100 rounded-2xl min-h-[420px] text-center select-none shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center mb-4 select-none">
                                <Folder className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                                No Admin Here
                            </h3>
                            <p className="text-xs text-slate-400 max-w-sm mt-1 select-none font-medium leading-normal mb-5">
                                It seems this section is currently empty. As you begin to add admins, they'll appear right here!
                            </p>
                            <button
                                onClick={() => setAddAdminModalOpen(true)}
                                className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-5 py-2 rounded-xl text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                            >
                                <Plus size={15} /> <span>Add Admin</span>
                            </button>
                        </div>
                    ) : (
                        /* Complete Table view exactly matching Screenshot 3 */
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                            <table className="w-full text-left border-collapse select-none">
                                <thead>
                                    <tr className="border-b border-slate-50 select-none">
                                        <th className="py-3 px-2 w-10 select-none">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.length === adminList.length}
                                                onChange={handleToggleAll}
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
                                            Role
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Rank
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
                                    {adminList.map((member, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => handleToggleRow(idx)}
                                            className={`cursor-pointer transition-colors select-none relative ${
                                                selectedRows.includes(idx) ? "bg-amber-50/20" : "hover:bg-slate-50/50"
                                            }`}
                                        >
                                            <td className="py-4 px-2 select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(idx)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleRow(idx);
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
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
                                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                                {member.rank}
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
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleRowPopup(idx);
                                                    }}
                                                    className="focus:outline-none select-none relative"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>

                                                {/* Popup Menu Context matching Image 4 */}
                                                {activeRowPopup === idx && (
                                                    <div className="absolute right-6 top-10 w-36 bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-50 flex flex-col select-none animate-fade-in">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setAdminFullName(member.name);
                                                                setAdminRoleName(member.role);
                                                                setAdminRankName(member.rank);
                                                                setAdminPhone(member.phone);
                                                                setAdminEmail(member.email);
                                                                setEditTargetIndex(idx);
                                                                setActiveRowPopup(null);
                                                                setEditAdminModalOpen(true);
                                                            }}
                                                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                                        >
                                                            <Edit size={13} className="text-slate-400" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedAdminIndex(idx);
                                                                setIsViewingAdmin(true);
                                                                setActiveRowPopup(null);
                                                            }}
                                                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                                        >
                                                            <Eye size={13} className="text-slate-400" />
                                                            <span>View Admin</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDeleteTargetIndex(idx);
                                                                setActiveRowPopup(null);
                                                                setDeleteAdminModalOpen(true);
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

            {/* Invite User (Add Admin) sliding modal */}
            {addAdminModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setAddAdminModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-5 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Invite User
                                </h3>
                                <button
                                    onClick={() => setAddAdminModalOpen(false)}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Verification graphic badge */}
                            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center relative select-none">
                                <Shield className="w-6 h-6 text-blue-500" />
                                <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 p-1 rounded-full text-[10px] flex items-center justify-center">
                                    <Plus size={11} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="adminFullName">
                                        Full Name
                                    </label>
                                    <input
                                        id="adminFullName"
                                        type="text"
                                        value={adminFullName}
                                        onChange={(e) => setAdminFullName(e.target.value)}
                                        placeholder="e.g Nnaji Christian"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="adminEmail">
                                        Email Address
                                    </label>
                                    <input
                                        id="adminEmail"
                                        type="email"
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                        placeholder="e.g dominic@mail.com"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="adminPhone">
                                        Phone Number
                                    </label>
                                    <input
                                        id="adminPhone"
                                        type="text"
                                        value={adminPhone}
                                        onChange={(e) => setAdminPhone(e.target.value)}
                                        placeholder="e.g 09021233422"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="adminPass">
                                        Password
                                    </label>
                                    <input
                                        id="adminPass"
                                        type="password"
                                        value={adminPass}
                                        onChange={(e) => setAdminPass(e.target.value)}
                                        placeholder="e.g. 123456j6ht4g"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="adminRole">
                                        Select Role
                                    </label>
                                    <select
                                        id="adminRole"
                                        value={adminRoleName}
                                        onChange={(e) => setAdminRoleName(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="">Choose Role</option>
                                        {rolesList.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="adminRank">
                                        Rank
                                    </label>
                                    <select
                                        id="adminRank"
                                        value={adminRankName}
                                        onChange={(e) => setAdminRankName(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="">Choose Rank</option>
                                        {rolesList.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setAddAdminModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all leading-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddAdmin}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Add Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Admin modal */}
            {editAdminModalOpen && editTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setEditAdminModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-5 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Edit Admin
                                </h3>
                                <button
                                    onClick={() => setEditAdminModalOpen(false)}
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

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editAdminFullName">
                                        Full Name
                                    </label>
                                    <input
                                        id="editAdminFullName"
                                        type="text"
                                        value={adminFullName}
                                        onChange={(e) => setAdminFullName(e.target.value)}
                                        placeholder="e.g Nnaji Christian"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editAdminEmail">
                                        Email Address
                                    </label>
                                    <input
                                        id="editAdminEmail"
                                        type="email"
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                        placeholder="e.g dominic@mail.com"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editAdminPhone">
                                        Phone Number
                                    </label>
                                    <input
                                        id="editAdminPhone"
                                        type="text"
                                        value={adminPhone}
                                        onChange={(e) => setAdminPhone(e.target.value)}
                                        placeholder="e.g 09021233422"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editAdminRole">
                                        Select Role
                                    </label>
                                    <select
                                        id="editAdminRole"
                                        value={adminRoleName}
                                        onChange={(e) => setAdminRoleName(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="">Choose Role</option>
                                        {rolesList.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editAdminRank">
                                        Rank
                                    </label>
                                    <select
                                        id="editAdminRank"
                                        value={adminRankName}
                                        onChange={(e) => setAdminRankName(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="">Choose Rank</option>
                                        {rolesList.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setEditAdminModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!adminFullName || !adminRoleName || !adminEmail) {
                                        alert("Please fill in all mandatory fields!");
                                        return;
                                    }
                                    const updated = [...adminList];
                                    updated[editTargetIndex] = {
                                        ...updated[editTargetIndex],
                                        name: adminFullName,
                                        email: adminEmail,
                                        phone: adminPhone || "N/A",
                                        role: adminRoleName,
                                        rank: adminRankName || adminRoleName
                                    };
                                    setAdminList(updated);
                                    setEditAdminModalOpen(false);
                                }}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Normal single delete modal warning prompt */}
            {deleteAdminModalOpen && deleteTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
                    <div
                        onClick={() => setDeleteAdminModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-md h-auto p-6 md:p-8 rounded-2xl border border-slate-100 shadow-2xl flex flex-col items-center justify-center text-center select-none transform transition-all duration-300 animate-fade-in">
                        <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center font-semibold text-red-600 mb-4 select-none shadow-sm">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>

                        <h3 className="font-bold text-slate-800 text-lg tracking-tight select-none mb-3">
                            Delete Admin Member?
                        </h3>

                        <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-xl text-center mb-6 max-w-sm">
                            <p className="text-[11px] text-slate-600 font-medium leading-normal flex items-start gap-1 select-none">
                                ⚠️ You have selected these admin to delete. If this was the action that you wanted to do, please confirm your choice or cancel and return to the page.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full select-none">
                            <button
                                onClick={() => setDeleteAdminModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setAdminList(adminList.filter((_, i) => i !== deleteTargetIndex));
                                    setDeleteAdminModalOpen(false);
                                    setDeleteTargetIndex(null);
                                    setIsViewingAdmin(false);
                                }}
                                className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-2.5 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] transition-all shadow-sm leading-none"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk delete Confirmation Modal (Image 2) */}
            {bulkDeleteModalOpen && selectedRows.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
                    <div
                        onClick={() => setBulkDeleteModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-md h-auto p-6 md:p-8 rounded-2xl border border-slate-100 shadow-2xl flex flex-col items-center justify-center text-center select-none transform transition-all duration-300 animate-fade-in">
                        {/* Close button at top-right */}
                        <button
                            onClick={() => setBulkDeleteModalOpen(false)}
                            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                        >
                            <X size={18} />
                        </button>

                        <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center font-semibold text-red-600 mb-4 select-none shadow-sm">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>

                        <h3 className="font-bold text-slate-800 text-lg tracking-tight select-none mb-3">
                            Delete Users?
                        </h3>

                        <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-xl text-center mb-6 max-w-sm">
                            <p className="text-[11px] text-slate-600 font-medium leading-normal flex items-start gap-1 select-none">
                                ⚠️ You have selected these users to delete. If this was the action that you wanted to do, please confirm your choice or cancel and return to the page.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full select-none">
                            <button
                                onClick={() => setBulkDeleteModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setAdminList(adminList.filter((_, i) => !selectedRows.includes(i)));
                                    setSelectedRows([]);
                                    setBulkDeleteModalOpen(false);
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

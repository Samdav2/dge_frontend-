"use client";

import React, { useState } from "react";
import {
    ChevronDown,
    MoreHorizontal,
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    Folder,
    X,
    Shield,
    Check
} from "lucide-react";

export default function RoleManagementView() {
    const [rolesList, setRolesList] = useState([
        { role: "Support", desc: "Role for support service...", permissions: 30, assigned: 30, created: "09/03/2025", status: "ACTIVE" },
        { role: "Manager", desc: "Role for admin manage...", permissions: 43, assigned: 43, created: "09/04/2025", status: "DEACTIVATED" },
        { role: "Developer", desc: "Role for customer suppo...", permissions: 21, assigned: 21, created: "09/05/2025", status: "ACTIVE" },
        { role: "Designer", desc: "Role for technical suppo...", permissions: 67, assigned: 67, created: "09/06/2025", status: "ACTIVE" },
        { role: "Analyst", desc: "Role for project coordina...", permissions: 54, assigned: 54, created: "09/07/2025", status: "DEACTIVATED" },
        { role: "Tester", desc: "Role for sales representa...", permissions: 88, assigned: 88, created: "09/08/2025", status: "ACTIVE" },
        { role: "Product Owner", desc: "Role for marketing assoc...", permissions: 15, assigned: 15, created: "09/09/2025", status: "ACTIVE" },
        { role: "Data Scientist", desc: "Role for human resource...", permissions: 73, assigned: 73, created: "09/10/2025", status: "ACTIVE" },
        { role: "Marketer", desc: "Role for quality assuranc...", permissions: 29, assigned: 29, created: "09/11/2025", status: "ACTIVE" },
        { role: "UX Researcher", desc: "Role for data analysts", permissions: 92, assigned: 92, created: "09/12/2025", status: "DEACTIVATED" },
        { role: "System Admin", desc: "Role for product manag...", permissions: 36, assigned: 36, created: "09/13/2025", status: "ACTIVE" },
        { role: "Content Strategist", desc: "Role for training facilitat...", permissions: 48, assigned: 48, created: "09/14/2025", status: "ACTIVE" },
        { role: "Business Analyst", desc: "Role for IT support techn...", permissions: 85, assigned: 85, created: "09/15/2025", status: "DEACTIVATED" }
    ]);

    const [isRolesEmpty, setIsRolesEmpty] = useState(false);
    const [createRoleModalOpen, setCreateRoleModalOpen] = useState(false);
    const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
    const [deleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false);
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

    // Selected checkboxes for bulk actions
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Form inputs
    const [roleName, setRoleName] = useState("");
    const [roleDesc, setRoleDesc] = useState("");

    // Form Permissions exactly matching checkboxes from screenshot 2
    const initialPermissions = {
        Dashboard: { create: false, view: false, update: true, delete: true },
        Analytics: { create: false, view: false, update: true, delete: true },
        Reports: { create: false, view: false, update: true, delete: true },
        Settings: { create: false, view: false, update: true, delete: true },
        "User Management": { create: false, view: false, update: true, delete: true }
    };

    const [rolePermissions, setRolePermissions] = useState(initialPermissions);

    const [editTargetIndex, setEditTargetIndex] = useState<number | null>(null);
    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);

    const [activeRowPopup, setActiveRowPopup] = useState<number | null>(null);

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
        if (selectedRows.length === rolesList.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(rolesList.map((_, i) => i));
        }
    };

    const handlePermissionChange = (
        module: keyof typeof initialPermissions,
        action: "create" | "view" | "update" | "delete"
    ) => {
        setRolePermissions((prev) => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: !prev[module][action]
            }
        }));
    };

    const handleCreateRole = () => {
        if (!roleName || !roleDesc) {
            alert("Please provide a name and description!");
            return;
        }

        // Count permissions checked
        let count = 0;
        Object.values(rolePermissions).forEach((mod) => {
            if (mod.create) count++;
            if (mod.view) count++;
            if (mod.update) count++;
            if (mod.delete) count++;
        });

        setRolesList([
            {
                role: roleName,
                desc: roleDesc,
                permissions: count || 30,
                assigned: 0,
                created: "09/03/2025",
                status: "ACTIVE"
            },
            ...rolesList
        ]);

        setRoleName("");
        setRoleDesc("");
        setRolePermissions(initialPermissions);
        setCreateRoleModalOpen(false);
        setIsRolesEmpty(false);
    };

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none relative animate-fade-in">
            {/* Top Toolbar Navigation Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2 select-none">
                    <button className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Status <ChevronDown size={12} />
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Roles <ChevronDown size={12} />
                    </button>

                    <button
                        onClick={() => setIsRolesEmpty(!isRolesEmpty)}
                        className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-400 select-none shadow-sm ml-4"
                    >
                        Toggle Empty State
                    </button>
                </div>

                <div className="flex items-center gap-3 select-none">
                    {selectedRows.length > 0 ? (
                        /* Selected Context Bar on top right from Screenshot */
                        <div className="flex items-center gap-2 select-none animate-fade-in">
                            <button
                                onClick={() => {
                                    if (selectedRows.length === 1) {
                                        const idx = selectedRows[0];
                                        setRoleName(rolesList[idx].role);
                                        setRoleDesc(rolesList[idx].desc);
                                        setEditTargetIndex(idx);
                                        setEditRoleModalOpen(true);
                                    } else {
                                        alert("Please select exactly 1 role to edit.");
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
                                    setRoleName("");
                                    setRoleDesc("");
                                    setRolePermissions(initialPermissions);
                                    setCreateRoleModalOpen(true);
                                }}
                                className="px-4 py-2 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] rounded-xl text-white font-bold text-[11px] select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                            >
                                <Plus size={14} /> <span>Create Role</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Content Pane */}
            {isRolesEmpty || rolesList.length === 0 ? (
                /* No Roles empty state matching Screenshot 1 */
                <div className="bg-white p-12 flex flex-col items-center justify-center border border-slate-100 rounded-2xl min-h-[420px] text-center select-none shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center mb-4 select-none">
                        <Folder className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                        No Role Here
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 select-none font-medium leading-normal mb-5">
                        It seems this section is currently empty. As you begin to add role, they'll appear right here!
                    </p>
                    <button
                        onClick={() => setCreateRoleModalOpen(true)}
                        className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-5 py-2 rounded-xl text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                    >
                        <Plus size={15} /> <span>Add Role</span>
                    </button>
                </div>
            ) : (
                /* Table View matching Screenshot 3 */
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="border-b border-slate-50 select-none">
                                <th className="py-3 px-2 w-10 select-none">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === rolesList.length}
                                        onChange={handleToggleAll}
                                        className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                    />
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Role Name
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Description
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Permission No.
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Users Assigned
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
                            {rolesList.map((item, idx) => (
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
                                        {item.role}
                                    </td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none max-w-[200px] truncate">
                                        {item.desc}
                                    </td>
                                    <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                        {item.permissions}
                                    </td>
                                    <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                        {item.assigned}
                                    </td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                        {item.created}
                                    </td>
                                    <td className="py-4 px-2 select-none">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                item.status === "ACTIVE"
                                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                    : "bg-red-50 text-red-600 border border-red-100"
                                            }`}
                                        >
                                            {item.status}
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

                                        {/* Action options popup from Image 4 */}
                                        {activeRowPopup === idx && (
                                            <div className="absolute right-6 top-10 w-36 bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-50 flex flex-col select-none animate-fade-in">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setRoleName(item.role);
                                                        setRoleDesc(item.desc);
                                                        setEditTargetIndex(idx);
                                                        setActiveRowPopup(null);
                                                        setEditRoleModalOpen(true);
                                                    }}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                                >
                                                    <Edit size={13} className="text-slate-400" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const copy = [...rolesList];
                                                        copy[idx].status =
                                                            copy[idx].status === "ACTIVE" ? "DEACTIVATED" : "ACTIVE";
                                                        setRolesList(copy);
                                                        setActiveRowPopup(null);
                                                    }}
                                                    className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                                >
                                                    <RefreshCw size={13} className="text-slate-400" />
                                                    <span>Update Status</span>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteTargetIndex(idx);
                                                        setActiveRowPopup(null);
                                                        setDeleteRoleModalOpen(true);
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

                    {/* Pagination exactly matching screenshot 1 bottom footer */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 select-none pt-4 border-t border-slate-50 select-none">
                        <div className="flex items-center gap-2 select-none">
                            <select className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-50">
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="text-xs font-semibold text-slate-400 select-none">
                                Rows Per Page
                            </span>
                        </div>

                        <div className="flex items-center gap-4 select-none">
                            <span className="text-xs font-semibold text-slate-400 select-none">
                                Page 1 of 7
                            </span>
                            <div className="flex items-center gap-2 select-none">
                                <button className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 select-none transition-colors">
                                    <ChevronDown size={14} className="rotate-90" />
                                </button>
                                <button className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 select-none transition-colors">
                                    <ChevronDown size={14} className="-rotate-90" />
                                </button>
                            </div>
                            <span className="text-xs font-bold text-slate-600 select-none">
                                Showing 10 of 70
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Role Modal exactly matching Image 2 */}
            {createRoleModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setCreateRoleModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-6 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Create Role
                                </h3>
                                <button
                                    onClick={() => setCreateRoleModalOpen(false)}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Badge icon/graphic matching the screenshot */}
                            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center relative select-none">
                                <Shield className="w-6 h-6 text-blue-500" />
                                <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 p-1 rounded-full text-[10px] flex items-center justify-center animate-pulse">
                                    <Check size={11} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="roleName">
                                        Role Name
                                    </label>
                                    <input
                                        id="roleName"
                                        type="text"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                        placeholder="e.g Management"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="roleDesc">
                                        Description
                                    </label>
                                    <input
                                        id="roleDesc"
                                        type="text"
                                        value={roleDesc}
                                        onChange={(e) => setRoleDesc(e.target.value)}
                                        placeholder="What does this role do"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                {/* Checklist matrix exactly matching Screenshot 2 */}
                                <div className="space-y-4 pt-2">
                                    {(Object.keys(initialPermissions) as (keyof typeof initialPermissions)[]).map((mod) => (
                                        <div key={mod} className="space-y-2">
                                            <span className="text-xs font-bold text-slate-700 block select-none">{mod}</span>
                                            <div className="grid grid-cols-4 gap-2 select-none">
                                                {(["create", "view", "update", "delete"] as const).map((action) => (
                                                    <label key={action} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-50/50 px-1 py-0.5 rounded transition-all select-none">
                                                        <input
                                                            type="checkbox"
                                                            checked={rolePermissions[mod][action]}
                                                            onChange={() => handlePermissionChange(mod, action)}
                                                            className="w-3.5 h-3.5 rounded border-slate-200 focus:ring-amber-500 text-amber-600"
                                                        />
                                                        <span className="text-[10px] capitalize text-slate-600 font-semibold select-none leading-none">
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

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setCreateRoleModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateRole}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Add Role
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {editRoleModalOpen && editTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setEditRoleModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-6 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Edit Role
                                </h3>
                                <button
                                    onClick={() => setEditRoleModalOpen(false)}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editRoleName">
                                        Role Name
                                    </label>
                                    <input
                                        id="editRoleName"
                                        type="text"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                        placeholder="e.g Management"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editRoleDesc">
                                        Description
                                    </label>
                                    <input
                                        id="editRoleDesc"
                                        type="text"
                                        value={roleDesc}
                                        onChange={(e) => setRoleDesc(e.target.value)}
                                        placeholder="What does this role do"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setEditRoleModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!roleName || !roleDesc) {
                                        alert("Please complete fields!");
                                        return;
                                    }
                                    const copy = [...rolesList];
                                    copy[editTargetIndex].role = roleName;
                                    copy[editTargetIndex].desc = roleDesc;
                                    setRolesList(copy);
                                    setEditRoleModalOpen(false);
                                }}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Update Role
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Single Delete confirmation modal exactly matching Image 5 */}
            {deleteRoleModalOpen && deleteTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
                    <div
                        onClick={() => setDeleteRoleModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-md h-auto p-6 md:p-8 rounded-2xl border border-slate-100 shadow-2xl flex flex-col items-center justify-center text-center select-none transform transition-all duration-300 animate-fade-in">
                        {/* Close button at top-right */}
                        <button
                            onClick={() => setDeleteRoleModalOpen(false)}
                            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                        >
                            <X size={18} />
                        </button>

                        <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center font-semibold text-red-600 mb-4 select-none shadow-sm">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>

                        <h3 className="font-bold text-slate-800 text-lg tracking-tight select-none mb-3">
                            Delete Role?
                        </h3>

                        <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-xl text-center mb-6 max-w-sm">
                            <p className="text-[11px] text-slate-600 font-medium leading-normal flex items-start gap-1 select-none">
                                ⚠️ You have selected this role to delete. If this was the action that you wanted to do, please confirm your choice or cancel and return to the page.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full select-none">
                            <button
                                onClick={() => setDeleteRoleModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setRolesList(rolesList.filter((_, i) => i !== deleteTargetIndex));
                                    setDeleteRoleModalOpen(false);
                                    setDeleteTargetIndex(null);
                                }}
                                className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-2.5 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] transition-all shadow-sm leading-none"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk delete confirmation modal exactly matching Image 5 */}
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
                            Delete Roles?
                        </h3>

                        <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-xl text-center mb-6 max-w-sm">
                            <p className="text-[11px] text-slate-600 font-medium leading-normal flex items-start gap-1 select-none">
                                ⚠️ You have selected these roles to delete. If this was the action that you wanted to do, please confirm your choice or cancel and return to the page.
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
                                    setRolesList(rolesList.filter((_, i) => !selectedRows.includes(i)));
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

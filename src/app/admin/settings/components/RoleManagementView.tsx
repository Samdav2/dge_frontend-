"use client";

import React, { useState, useEffect } from "react";
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
    const [rolesList, setRolesList] = useState<any[]>([
        { id: "1", role: "Support", desc: "Role for support service...", permissions: 30, assigned: 30, created: "09/03/2025", status: "ACTIVE" },
        { id: "2", role: "Manager", desc: "Role for admin manage...", permissions: 43, assigned: 43, created: "09/04/2025", status: "DEACTIVATED" }
    ]);

    const [isRolesEmpty, setIsRolesEmpty] = useState(false);
    const [createRoleModalOpen, setCreateRoleModalOpen] = useState(false);
    const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
    const [deleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false);

    // Selected checkboxes for bulk actions
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Form inputs
    const [roleNameInput, setRoleNameInput] = useState("");
    const [roleDescInput, setRoleDescInput] = useState("");
    const [roleScopeInput, setRoleScopeInput] = useState("global");

    const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);
    const [editTargetIndex, setEditTargetIndex] = useState<number | null>(null);

    const [activeRowPopup, setActiveRowPopup] = useState<number | null>(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [statusFilterOpen, setStatusFilterOpen] = useState(false);

    const fetchRoles = async () => {
        try {
            const res = await fetch("/api/admin/roles");
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setRolesList(data.map((item: any) => ({
                        id: item.id,
                        role: item.name || "Role",
                        desc: item.desc || item.description || "Assigned permissions and controls",
                        permissions: item.permissions || 10,
                        assigned: item.assigned_count || 1,
                        created: item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "N/A",
                        status: item.status || "ACTIVE",
                        scope: item.scope || "global"
                    })));
                }
            }
        } catch (error) {
            console.error("Failed to load roles:", error);
        }
    };

    useEffect(() => {
        fetchRoles();
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

    const handleCreateRole = async () => {
        if (!roleNameInput || !roleDescInput) {
            alert("Please fill in role name and description!");
            return;
        }

        try {
            const res = await fetch("/api/admin/roles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: roleNameInput,
                    scope: roleScopeInput,
                    description: roleDescInput
                })
            });

            if (res.ok) {
                fetchRoles();
                setRoleNameInput("");
                setRoleDescInput("");
                setCreateRoleModalOpen(false);
                setIsRolesEmpty(false);
            } else {
                setRolesList([
                    {
                        id: String(Date.now()),
                        role: roleNameInput,
                        desc: roleDescInput,
                        permissions: 12,
                        assigned: 0,
                        created: "09/03/2025",
                        status: "ACTIVE"
                    },
                    ...rolesList
                ]);
                setCreateRoleModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditRole = async () => {
        if (!roleNameInput || !roleDescInput) {
            alert("Please fill in both name and description!");
            return;
        }

        if (editTargetIndex !== null) {
            const currentRole = rolesList[editTargetIndex];
            try {
                const res = await fetch(`/api/admin/roles/${currentRole.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: roleNameInput,
                        scope: roleScopeInput,
                        description: roleDescInput
                    })
                });

                if (res.ok) {
                    fetchRoles();
                    setEditRoleModalOpen(false);
                    setEditTargetIndex(null);
                } else {
                    const updatedList = [...rolesList];
                    updatedList[editTargetIndex] = {
                        ...currentRole,
                        role: roleNameInput,
                        desc: roleDescInput
                    };
                    setRolesList(updatedList);
                    setEditRoleModalOpen(false);
                    setEditTargetIndex(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const filteredRoles = rolesList.filter(role => {
        const matchStatus = statusFilter === "ALL" || role.status === statusFilter;
        return matchStatus;
    });

    const handleExportCSV = () => {
        if (filteredRoles.length === 0) return;
        
        const headers = ["Role Name", "Description", "Permissions", "Assigned", "Date Created", "Status"];
        const rows = filteredRoles.map(r => [
            r.role, r.desc, r.permissions, r.assigned, r.created, r.status
        ]);
        
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `roles_export_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none relative animate-fade-in" onClick={() => setActiveRowPopup(null)}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2 select-none relative">
                    <button 
                        onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                        className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm hover:border-slate-200 transition-all"
                    >
                        {statusFilter === "ALL" ? "Status" : statusFilter} <ChevronDown size={12} className={`transition-transform ${statusFilterOpen ? "rotate-180" : ""}`} />
                    </button>

                    {statusFilterOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-1 min-w-[120px]">
                            {["ALL", "ACTIVE", "DEACTIVATED"].map(opt => (
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

                    <button
                        onClick={() => setIsRolesEmpty(!isRolesEmpty)}
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
                            setRoleNameInput("");
                            setRoleDescInput("");
                            setRoleScopeInput("global");
                            setCreateRoleModalOpen(true);
                        }}
                        className="px-4 py-2 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] rounded-xl text-white font-bold text-[11px] select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                    >
                        <Plus size={14} /> <span>Create New Role</span>
                    </button>
                </div>
            </div>

            {isRolesEmpty || filteredRoles.length === 0 ? (
                <div className="bg-white p-12 flex flex-col items-center justify-center border border-slate-100 rounded-2xl min-h-[420px] text-center select-none shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center mb-4 select-none">
                        <Folder className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                        {statusFilter === "ALL" ? "No Role Here" : `No ${statusFilter.toLowerCase()} roles`}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 select-none font-medium leading-normal mb-5">
                        {statusFilter === "ALL" 
                            ? "It seems this section is currently empty. As you begin to create new roles, they'll appear right here!"
                            : "No roles match your selected status filter."
                        }
                    </p>
                    {statusFilter === "ALL" ? (
                        <button
                            onClick={() => {
                                setRoleNameInput("");
                                setRoleDescInput("");
                                setRoleScopeInput("global");
                                setCreateRoleModalOpen(true);
                            }}
                            className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-5 py-2 rounded-xl text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm transition-all flex items-center gap-1"
                        >
                            <Plus size={15} /> <span>Create New Role</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setStatusFilter("ALL")}
                            className="bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-xl text-slate-600 font-bold text-xs select-none transition-all"
                        >
                            Reset Filter
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="border-b border-slate-50 select-none">
                                <th className="py-3 px-2 w-10 select-none">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === filteredRoles.length}
                                        onChange={handleToggleAll}
                                        className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                    />
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Role Name
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Role Description
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Assigned Permission
                                </th>
                                <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Assigned Admin
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
                            {filteredRoles.map((r, idx) => (
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
                                        {r.role}
                                    </td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none max-w-[150px] truncate leading-none">
                                        {r.desc}
                                    </td>
                                    <td className="py-4 px-2 text-xs text-blue-500 font-semibold select-none leading-none">
                                        {r.permissions} Permissions
                                    </td>
                                    <td className="py-4 px-2 text-xs text-blue-500 font-semibold select-none leading-none">
                                        {r.assigned} Assigned Admin
                                    </td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                        {r.created}
                                    </td>
                                    <td className="py-4 px-2 select-none">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                r.status === "ACTIVE"
                                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                    : "bg-red-50 text-red-600 border border-red-100"
                                            }`}
                                        >
                                            {r.status}
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
                                    const r = filteredRoles[activeRowPopup];
                                    setRoleNameInput(r.role);
                                    setRoleDescInput(r.desc);
                                    setRoleScopeInput(r.scope || "global");
                                    setEditTargetIndex(activeRowPopup);
                                    setActiveRowPopup(null);
                                    setEditRoleModalOpen(true);
                                }}
                                className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                            >
                                <Edit size={13} className="text-slate-400" />
                                <span>Update Role</span>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteTargetIndex(activeRowPopup);
                                    setActiveRowPopup(null);
                                    setDeleteRoleModalOpen(true);
                                }}
                                className="flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold select-none transition-all text-left border-t border-slate-50 mt-1 pt-2"
                            >
                                <Trash2 size={13} />
                                <span>Delete Role</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Slider Create Role modal */}
            {createRoleModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setCreateRoleModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-5 select-none">
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

                            <div className="space-y-4">
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="roleNameInput">
                                        Role Name
                                    </label>
                                    <input
                                        id="roleNameInput"
                                        type="text"
                                        value={roleNameInput}
                                        onChange={(e) => setRoleNameInput(e.target.value)}
                                        placeholder="e.g Support"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="roleDescInput">
                                        Role Description
                                    </label>
                                    <textarea
                                        id="roleDescInput"
                                        value={roleDescInput}
                                        onChange={(e) => setRoleDescInput(e.target.value)}
                                        placeholder="Enter full roles details..."
                                        rows={3}
                                        className="w-full p-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="roleScopeInput">
                                        Scope
                                    </label>
                                    <select
                                        id="roleScopeInput"
                                        value={roleScopeInput}
                                        onChange={(e) => setRoleScopeInput(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="global">Global</option>
                                        <option value="team">Team</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setCreateRoleModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all leading-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateRole}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Create New Role
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Slider Edit Role modal */}
            {editRoleModalOpen && editTargetIndex !== null && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setEditRoleModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in overflow-y-auto">
                        <div className="space-y-5 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Update Role
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
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editRoleNameInput">
                                        Role Name
                                    </label>
                                    <input
                                        id="editRoleNameInput"
                                        type="text"
                                        value={roleNameInput}
                                        onChange={(e) => setRoleNameInput(e.target.value)}
                                        placeholder="e.g Support"
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editRoleDescInput">
                                        Role Description
                                    </label>
                                    <textarea
                                        id="editRoleDescInput"
                                        value={roleDescInput}
                                        onChange={(e) => setRoleDescInput(e.target.value)}
                                        placeholder="Enter full roles details..."
                                        rows={3}
                                        className="w-full p-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>
                                <div className="space-y-1 select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="editRoleScopeInput">
                                        Scope
                                    </label>
                                    <select
                                        id="editRoleScopeInput"
                                        value={roleScopeInput}
                                        onChange={(e) => setRoleScopeInput(e.target.value)}
                                        className="w-full h-10 px-3 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 transition-all outline-none"
                                    >
                                        <option value="global">Global</option>
                                        <option value="team">Team</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none mt-4 border-t border-slate-50">
                            <button
                                onClick={() => setEditRoleModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-full text-slate-600 font-bold text-xs select-none transition-all leading-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditRole}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-3.5 py-2 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] shadow-sm leading-none"
                            >
                                Update Role
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

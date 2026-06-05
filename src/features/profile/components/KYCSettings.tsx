import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle, AlertTriangle, FileText, UploadCloud } from "lucide-react";
import { getUserKyc, submitUserKyc } from "../actions";

export function KYCSettings() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [kycData, setKycData] = useState<any>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [idType, setIdType] = useState<string>("");
    const [idValue, setIdValue] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchKyc = async () => {
        setIsLoading(true);
        const res = await getUserKyc();
        if (res.success && res.data) {
            setKycData(res.data);
            if (res.data.id_document_type) {
                setIdType(res.data.id_document_type);
            }
            if (res.data.id_document_value) {
                setIdValue(res.data.id_document_value);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchKyc();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!idType || !idValue || !file) {
            setError("Please fill all fields and upload a document.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("id_type", idType);
            formData.append("id_value", idValue);
            formData.append("verification_file", file);

            const result = await submitUserKyc(formData);
            if (result.success) {
                setSuccessMessage("KYC submitted successfully. Status is now Pending.");
                setFile(null);
                await fetchKyc();
            } else {
                setError(result.error || "Failed to submit KYC");
            }
        } catch (err) {
            console.error("Submit KYC error:", err);
            setError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin" />
            </div>
        );
    }

    const status = kycData?.status || "unverified";

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">KYC Verification</h2>
                <p className="text-sm text-gray-500">
                    Verify your identity to unlock all features on the platform.
                </p>
            </div>

            {/* Status Banner */}
            <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                status === "verified" ? "bg-green-50 border-green-200 text-green-800" :
                status === "pending" ? "bg-amber-50 border-amber-200 text-amber-800" :
                status === "rejected" ? "bg-red-50 border-red-200 text-red-800" :
                "bg-gray-50 border-gray-200 text-gray-800"
            }`}>
                {status === "verified" && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                {status === "pending" && <Loader2 className="w-5 h-5 text-amber-500 mt-0.5" />}
                {status === "rejected" && <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />}
                {status === "unverified" && <AlertTriangle className="w-5 h-5 text-gray-500 mt-0.5" />}
                
                <div>
                    <h3 className="font-semibold capitalize">Status: {status}</h3>
                    {status === "verified" && <p className="text-sm opacity-90">Your identity has been verified.</p>}
                    {status === "pending" && <p className="text-sm opacity-90">Your documents are under review.</p>}
                    {status === "rejected" && (
                        <p className="text-sm opacity-90">
                            Your verification was rejected. Reason: {kycData?.rejection_reason || "Invalid documents."}
                        </p>
                    )}
                    {status === "unverified" && <p className="text-sm opacity-90">Please submit your identity documents below.</p>}
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                </div>
            )}
            
            {successMessage && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {successMessage}
                </div>
            )}

            {(status === "unverified" || status === "rejected") ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Document Type</label>
                        <Select value={idType} onValueChange={setIdType}>
                            <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl">
                                <SelectValue placeholder="Select ID Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="national_id">National ID (NIN)</SelectItem>
                                <SelectItem value="drivers_license">Driver's License</SelectItem>
                                <SelectItem value="passport">Passport</SelectItem>
                                <SelectItem value="utility_bill">Utility Bill</SelectItem>
                                <SelectItem value="bank_statement">Bank Statement</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Document Number / ID</label>
                        <Input
                            value={idValue}
                            onChange={(e) => setIdValue(e.target.value)}
                            placeholder="Enter your ID number"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Upload Document Image</label>
                        <div 
                            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange}
                                className="hidden" 
                                accept="image/*,.pdf"
                            />
                            {file ? (
                                <>
                                    <FileText className="w-10 h-10 text-[#C69C2E] mb-3" />
                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                                    <p className="text-sm font-medium text-gray-900">Click to upload document</p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (Max 5MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-[#C69C2E] hover:bg-[#b08b29] text-white font-bold rounded-xl"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit for Verification"
                        )}
                    </Button>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Document Type</p>
                            <p className="font-semibold text-gray-900 capitalize">
                                {kycData?.id_document_type ? kycData.id_document_type.replace('_', ' ') : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Document Number</p>
                            <p className="font-semibold text-gray-900">
                                {kycData?.id_document_value || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Submitted On</p>
                            <p className="font-semibold text-gray-900">
                                {kycData?.created_at ? new Date(kycData.created_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                            <p className="font-semibold text-gray-900">
                                {kycData?.updated_at ? new Date(kycData.updated_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import os
import glob

# Files to update
pattern = "src/features/**/actions.ts"
files = glob.glob(pattern, recursive=True)
files.extend(glob.glob("src/features/**/call-actions.ts", recursive=True))
files.extend(glob.glob("src/features/**/call-api.ts", recursive=True))

# Remove duplicates
files = list(set(files))

import_statement = 'import { redirect } from "next/navigation";\n'

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "async function getAuthHeaders()" in content:
        # Check if already updated
        if "redirect(" in content and "error === \"RefreshAccessTokenError\"" in content:
            continue
            
        # Add import if missing
        if "import { redirect }" not in content:
            content = content.replace('"use server"\n\n', '"use server"\n\n' + import_statement)
            if '"use server"' not in content:
                content = import_statement + content
                
        # Replace the function body
        old_auth_check = """    if (!session || !session.backendToken) {
        return null;
    }"""
    
        new_auth_check = """    if (!session || !session.backendToken || (session as any).error === "RefreshAccessTokenError") {
        redirect("/login");
    }"""
        
        content = content.replace(old_auth_check, new_auth_check)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {filepath}")


import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <Button
                variant="outline"
                type="submit"
                className="border-primary text-primary hover:bg-primary/10 px-8 rounded-lg hidden md:flex"
            >
                Sign in with Google
            </Button>
        </form>
    )
}

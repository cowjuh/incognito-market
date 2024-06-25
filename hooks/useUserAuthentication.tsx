import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useUserAuthentication = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if ((!session || status === "unauthenticated") && router.pathname.startsWith("/vendor")) {
            router.push("/");
        }
    }, [session, status, router]);

    return { session, status };
}
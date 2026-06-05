import type { Metadata } from 'next';
import TermsOfServiceAndPrivacyPolicySection from "@/components/pages-components/terms-of-service-and-privacy-policy/terms-of-service-and-privacy-policy";

export const metadata: Metadata = {
    title: 'Terms of Service & Privacy Policy | Spelltroum',
    description: 'Read the Terms of Service and Privacy Policy for Spelltroum — a free-to-play mobile arena game developed in Canada.',
};

export default function Page() {
    return (
        <div className="min-h-screen bg-[#111]">
            <TermsOfServiceAndPrivacyPolicySection />
        </div>
    );
}

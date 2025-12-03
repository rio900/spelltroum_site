'use client';

export default function TermsOfServiceAndPrivacyPolicySection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center text-white bg-[#111] py-20 px-6">
            <div className="w-full max-w-5xl bg-black/40 backdrop-blur-sm p-10 rounded-3xl text-gray-200 leading-relaxed">

                <h1 className="text-4xl font-bold text-center mb-10 text-[#FFD43A]">
                    Privacy Policy
                </h1>

                {/* INTRODUCTION */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
                <p>
                    The operator of this website, <strong>Spelltroum</strong>, is responsible for your privacy and the security of your information.
                    We are committed to protecting your personal information and informing you about how we use it.
                    This privacy statement applies to the use of our website and our services (collectively “Platform”).
                    We will not share or use your information except as described in this Privacy Policy.
                </p>
                <p className="mt-4">
                    Periodically review this Privacy Policy, as we may update it from time to time.
                    If you do not accept our Privacy Policy in its entirety, you must not use the Platform.
                    Continued use after any changes means you accept the updated policy.
                </p>

                {/* INFORMATION COLLECTED */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Information Collected</h2>
                <p>
                    At <strong>Spelltroum</strong>, we collect both personally identifiable information (“PII”)
                    and non-personally identifiable information (“No PII”). PII may identify you personally,
                    while non-PII may be combined with additional data to potentially identify you.
                </p>
                <p className="mt-4">
                    The information we collect helps us personalize and continually improve your experience.
                    You may choose not to provide certain information, but doing so may limit access to some features.
                </p>

                {/* IDENTIFIED PERSONAL INFO */}
                <h3 className="text-xl font-semibold mt-6 mb-3">Identified Personal Information</h3>
                <p>
                    You are not required to provide personal information just to browse the Platform.
                    However, to use all features, we may collect data such as your name and email address.
                    You may receive product updates, recommendations, announcements, and discounts via email.
                </p>
                <p className="mt-4">
                    You can unsubscribe at any time using the link in our emails or by contacting us at
                    <strong> contact@spelltroum.com</strong>.
                </p>

                {/* NON PII */}
                <h3 className="text-xl font-semibold mt-6 mb-3">Non-Personal Identifiable Information</h3>
                <p>
                    Each time you use our website, we may collect non-PII such as:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>IP address</li>
                    <li>postal code</li>
                    <li>browser and operating system</li>
                    <li>location and usage information</li>
                    <li>data transferred and ISP</li>
                    <li>messages and communication metadata</li>
                </ul>

                {/* USE OF INFO */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Your Information</h2>
                <p>We may use your data for the following purposes:</p>

                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>To provide any service managed by the Spelltroum platform.</li>
                    <li>To improve the user experience.</li>
                    <li>To contact you regarding questions or updates.</li>
                    <li>To inform you about additional services and promotions.</li>
                    <li>To work with third-party partners for services consistent with this policy.</li>
                </ul>

                {/* ANONYMIZED */}
                <h3 className="text-xl font-semibold mt-6 mb-3">Anonymized Data</h3>
                <p>
                    We may aggregate and anonymize personal information for internal analysis.
                    Once anonymized, this data cannot be traced back to you.
                </p>

                {/* ACCESS/EDIT/DELETE */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Accessing, Editing, and Deleting Your Information</h2>
                <p>
                    To access, edit, or delete your information, contact us at
                    <strong> contact@spelltroum.com</strong>.
                    Some data may be retained for legal reasons.
                </p>

                {/* COOKIES */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Cookies and Similar Technologies</h2>
                <p>
                    We use cookies, pixel tags, and similar technologies to track usage, improve the Platform,
                    and personalize your experience.
                </p>
                <p className="mt-4">
                    You may decline cookies in your browser settings, but some features may not function properly.
                </p>

                {/* THIRD PARTY ADS */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Advertising</h2>
                <p>
                    We may work with third-party advertisers using cookies or tracking technologies.
                    These companies do not receive your personal information.
                </p>

                {/* LAW ENFORCEMENT */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Law Enforcement</h2>
                <p>
                    We may disclose your information if required by law, or if we believe your actions violate
                    applicable laws or pose a risk to others.
                </p>

                {/* COMMUNICATIONS */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Communications</h2>
                <p>
                    If you provide your contact information, you consent to receive communications via SMS or email.
                    You may unsubscribe at any time.
                </p>

                {/* INTERNATIONAL */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">International Transfers</h2>
                <p>
                    Your information may be transferred and stored outside your region, including Canada.
                    By using the Platform, you consent to these transfers.
                </p>

                {/* MERGERS */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Mergers and Acquisitions</h2>
                <p>
                    If Spelltroum undergoes a merger, sale, or acquisition, your information may be transferred.
                </p>

                {/* CHANGES */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy periodically. Continued use of the Platform indicates acceptance.
                </p>

                {/* CONTACT */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p>
                    For any questions, contact us at <strong>contact@spelltroum.com</strong>.
                </p>

            </div>
        </section>
    );
}
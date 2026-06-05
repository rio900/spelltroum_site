'use client';

export default function TermsOfServiceAndPrivacyPolicySection() {
    const lastUpdated = 'June 4, 2026';

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center text-white bg-[#111] py-20 px-6">
            <div className="w-full max-w-5xl bg-black/40 backdrop-blur-sm p-10 rounded-3xl text-gray-200 leading-relaxed">

                <h1 className="text-4xl font-bold text-center mb-4 text-[#FFD43A]">
                    Terms of Service &amp; Privacy Policy
                </h1>
                <p className="text-center text-gray-400 text-sm mb-12">Last updated: {lastUpdated}</p>

                {/* ========== TERMS OF SERVICE ========== */}
                <h2 className="text-3xl font-bold mt-4 mb-6 text-[#FFD43A]">Terms of Service</h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h3>
                <p>
                    By downloading, installing, accessing, or using Spelltroum (the &quot;Game&quot;) or any related services, websites, or applications (collectively, the &quot;Platform&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Platform. These Terms constitute a legally binding agreement between you and Spelltroum (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated by Roman Samchuk, based in Canada.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Eligibility</h3>
                <p>
                    You must be at least 13 years of age to use the Platform. If you are under 18, you represent that you have your parent&apos;s or guardian&apos;s permission to use the Platform. We reserve the right to verify your age and eligibility at any time.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. License to Use</h3>
                <p>
                    Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal, non-commercial entertainment purposes. All rights not expressly granted are reserved by Spelltroum.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Ownership of Content</h3>
                <p>
                    All content within the Platform — including but not limited to heroes, items, artwork, animations, music, sound effects, game mechanics, text, logos, user interfaces, and all other materials — is the exclusive property of Spelltroum or its licensors. You acknowledge that you have no ownership rights in the Game or any virtual items, currency, characters, or content therein.
                </p>
                <p className="mt-4">
                    Any virtual currency, items, or content you acquire through gameplay or purchase are licensed to you, not sold. We reserve the right to modify, remove, or discontinue any virtual content at any time without notice or compensation.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. User-Generated Content</h3>
                <p>
                    By submitting, posting, or transmitting any content to the Platform (including usernames, messages, screenshots, gameplay clips, or feedback), you grant Spelltroum a worldwide, perpetual, irrevocable, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, distribute, perform, display, and create derivative works from such content in any media and for any purpose, including commercial purposes, without compensation to you.
                </p>
                <p className="mt-4">
                    You represent that you own or have the necessary rights to grant the above license and that your content does not violate any third-party rights.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Prohibited Conduct</h3>
                <p>You agree not to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Use cheats, exploits, automation software, bots, hacks, or any unauthorized third-party software.</li>
                    <li>Modify or attempt to modify the Game client or server in any way.</li>
                    <li>Engage in harassment, abuse, hate speech, or threatening behavior toward other players.</li>
                    <li>Sell, trade, or transfer your account or virtual items to any other person.</li>
                    <li>Exploit bugs or glitches. Any discovered bugs must be reported to us at spelltroum@gmail.com.</li>
                    <li>Use the Platform for any commercial purpose without our prior written consent.</li>
                    <li>Engage in any conduct that disrupts or interferes with the Game servers or other players&apos; experience.</li>
                    <li>Attempt to gain unauthorized access to any portion of the Platform.</li>
                    <li>Collect or harvest any personal information of other users.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Virtual Currency and Purchases</h3>
                <p>
                    The Platform may include virtual currency and virtual items that can be purchased with real money or earned through gameplay. All purchases are final and non-refundable except where required by applicable law. Virtual currency and items have no real-world monetary value and cannot be exchanged for real money.
                </p>
                <p className="mt-4">
                    We reserve the right to change pricing, availability, and the terms of any in-game purchases at any time. We are not responsible for any loss of virtual currency or items due to account termination, game updates, or other circumstances.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">8. Account Termination and Suspension</h3>
                <p>
                    We reserve the right to suspend, terminate, or restrict access to your account at any time and for any reason, including but not limited to violation of these Terms, fraudulent activity, or conduct we determine to be harmful to the Platform or other users. Upon termination, your license to use the Platform is revoked and you forfeit all virtual currency, items, and progress.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">9. Game Updates and Changes</h3>
                <p>
                    We reserve the right to update, modify, expand, or discontinue any part of the Platform at any time without notice. This includes changes to gameplay mechanics, hero abilities, item stats, balance adjustments, and any other game features. We are not liable for any impact such changes may have on your experience or virtual assets.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">10. Disclaimer of Warranties</h3>
                <p>
                    The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the Platform is at your sole risk.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">11. Limitation of Liability</h3>
                <p>
                    To the maximum extent permitted by applicable law, Spelltroum shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of virtual items, loss of revenue, or loss of goodwill, arising out of or in connection with your use of the Platform, even if we have been advised of the possibility of such damages.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">12. Governing Law</h3>
                <p>
                    These Terms are governed by and construed in accordance with the laws of Canada, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the courts of Canada.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">13. Changes to Terms</h3>
                <p>
                    We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on this page with a new &quot;Last updated&quot; date. Your continued use of the Platform after changes constitutes acceptance of the new Terms.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">14. Contact</h3>
                <p>
                    For questions regarding these Terms, contact us at <strong>spelltroum@gmail.com</strong>.
                </p>

                {/* ========== DIVIDER ========== */}
                <div className="border-t border-white/20 my-14" />

                {/* ========== PRIVACY POLICY ========== */}
                <h2 className="text-3xl font-bold mb-6 text-[#FFD43A]">Privacy Policy</h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h3>
                <p>
                    Spelltroum, operated by Roman Samchuk (Canada), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your information when you use the Platform. By using the Platform, you agree to the practices described in this policy.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Account information</strong> — username, email address, and password when you register.</li>
                    <li><strong>Device information</strong> — device type, operating system, browser type, and IP address.</li>
                    <li><strong>Gameplay data</strong> — match history, hero usage, item builds, performance statistics, and in-game behavior.</li>
                    <li><strong>Purchase information</strong> — transaction history for in-app purchases (payment details are processed by third-party providers).</li>
                    <li><strong>Communications</strong> — messages you send us or in-game chat content.</li>
                    <li><strong>Usage data</strong> — pages visited, features used, session duration, and crash reports.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h3>
                <p>We use your information to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Provide, operate, and improve the Platform.</li>
                    <li>Personalize your gameplay experience.</li>
                    <li>Process transactions and manage virtual currency.</li>
                    <li>Detect and prevent cheating, fraud, and abuse.</li>
                    <li>Enforce our Terms of Service.</li>
                    <li>Send you updates, announcements, and promotional communications.</li>
                    <li>Analyze gameplay data to balance and improve the Game.</li>
                    <li>Comply with legal obligations.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">4. Sharing Your Information</h3>
                <p>We may share your information with:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Service providers</strong> — third parties that help us operate the Platform (hosting, analytics, payment processing).</li>
                    <li><strong>Law enforcement</strong> — when required by law or to protect the rights and safety of users.</li>
                    <li><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets.</li>
                </ul>
                <p className="mt-4">We do not sell your personal information to third parties.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">5. Cookies and Tracking</h3>
                <p>
                    We use cookies and similar tracking technologies to improve your experience, analyze usage, and deliver relevant content. You may control cookie settings through your browser, though some features may not function properly if cookies are disabled.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">6. Data Retention</h3>
                <p>
                    We retain your information for as long as your account is active or as necessary to provide the Platform and comply with legal obligations. You may request deletion of your account and associated data by contacting us at <strong>spelltroum@gmail.com</strong>.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">7. Children&apos;s Privacy</h3>
                <p>
                    The Platform is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">8. International Transfers</h3>
                <p>
                    Your information may be stored and processed in Canada or other countries where our service providers operate. By using the Platform, you consent to the transfer of your information to these locations.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">9. Security</h3>
                <p>
                    We implement reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">10. Your Rights</h3>
                <p>
                    Depending on your location, you may have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <strong>spelltroum@gmail.com</strong>.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">11. Changes to This Policy</h3>
                <p>
                    We may update this Privacy Policy periodically. We will post the updated policy on this page with a new &quot;Last updated&quot; date. Continued use of the Platform after changes constitutes your acceptance of the updated policy.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">12. Contact Us</h3>
                <p>
                    For any privacy-related questions or requests, contact us at <strong>spelltroum@gmail.com</strong>.
                </p>

            </div>
        </section>
    );
}

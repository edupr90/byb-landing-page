import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/*
 * ============================================================
 *  PRIVACY POLICY PAGE
 *  Content preserved EXACTLY from the original Jekyll site.
 *  Only the visual styling has been updated to match the new theme.
 * ============================================================
 */

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-24 sm:pt-32 pb-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* ── Content (text preserved exactly) ───────────────── */}
        <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <strong>Last updated:</strong> August 29, 2025
          </p>

          <h1>Terms of Use &amp; Privacy Policy — <em>Budget Your Budget</em></h1>

          <p>
            Welcome to <strong>Budget Your Budget</strong> (&ldquo;the App&rdquo;). By using this
            App, you agree to the following Terms of Use and Privacy Policy. If you do not agree,
            please discontinue use.
          </p>
          <p>
            We may update these terms occasionally. Continued use of the App after updates means you
            accept the changes.
          </p>

          <br />

          <h2>1.0 Purpose of the App</h2>
          <ul>
            <li>
              Budget Your Budget is a <strong>personal budgeting tool</strong>.
            </li>
            <li>
              The App is <strong>not a bank, financial institution, or financial advisor</strong>.
            </li>
            <li>We do not provide investment, tax, accounting, or legal advice.</li>
            <li>You are solely responsible for your financial decisions.</li>
          </ul>
          <p>
            <strong>Disclaimer:</strong> We are not liable for any financial loss, damages, or
            decisions made using this App.
          </p>

          <br />

          <h2>2.0 Data Collection &amp; Privacy</h2>
          <ul>
            <li>
              All information you enter (income, categories, expenses) is stored{' '}
              <strong>locally on your device</strong>.
            </li>
            <li>
              We{' '}
              <strong>
                do not collect, transmit, or store your personal or financial data on external
                servers
              </strong>
              .
            </li>
            <li>
              You are fully in control of your information. If you delete the App or reset your
              device, we cannot access, recover, or restore your data on your behalf.
            </li>
            <li>
              The App provides a built-in <strong>backup and restore feature</strong>, allowing you
              to export your data and re-import it when needed. We strongly recommend making regular
              backups to avoid data loss.
            </li>
          </ul>

          <h3>2.1 Third-Party Services</h3>
          <p>
            While the App itself does not collect data, third-party services may be used for:
          </p>
          <ul>
            <li>
              <strong>In-app purchases &amp; subscriptions</strong> → handled by Apple App Store or
              Google Play.
            </li>
            <li>
              <strong>Subscription management</strong> → handled by RevenueCat.
            </li>
            <li>
              <strong>Advertisements</strong> (for free users) → handled by Google AdMob.
            </li>
          </ul>
          <p>Each third party operates under its own privacy policy:</p>
          <ul>
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.apple.com/legal/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.revenuecat.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                RevenueCat Privacy Policy
              </a>
            </li>
          </ul>

          <br />

          <h2>3.1 Subscription Options</h2>
          <blockquote>
            <p>
              Pricing shown for the U.S. store; <strong>prices may vary by region and currency</strong>.
              Subscriptions <strong>auto-renew</strong> unless canceled. You can cancel anytime in
              your App Store / Google Play settings.
            </p>
          </blockquote>

          <h3>Premium Plans</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th className="text-right">Price</th>
                  <th>Billing</th>
                  <th>Trial</th>
                  <th>Cancel Anytime</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Premium Monthly</strong>
                  </td>
                  <td className="text-right">
                    <strong>$4.99</strong>
                  </td>
                  <td>Per month</td>
                  <td>—</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>
                    <strong>Premium Annual</strong>
                  </td>
                  <td className="text-right">
                    <strong>$29.99</strong>
                  </td>
                  <td>Per year</td>
                  <td>—</td>
                  <td>
                    ✅ <em>(Best value)</em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>What You Get with Premium</h3>
          <ul>
            <li>
              <strong>Custom Categories</strong> – Create your own categories with names and emojis
              that fit your lifestyle.
            </li>
            <li>
              <strong>Recurring Budgets &amp; Expenses</strong> – Automate repeating items so you
              never miss a payment.
            </li>
            <li>
              <strong>Reports &amp; Insights</strong> – Compare months, view trends, and see exactly
              where your money goes.
            </li>
            <li>
              <strong>Export to PDF or Excel</strong> – Keep records or share your budget anytime.
            </li>
            <li>
              <strong>Ad-Free Experience</strong> – Enjoy a clean, distraction-free interface.
            </li>
          </ul>

          <h3>How Subscriptions Work</h3>
          <ul>
            <li>
              Payment is charged to your <strong>Apple ID</strong> or <strong>Google Play</strong>{' '}
              account at confirmation of purchase.
            </li>
            <li>
              Subscriptions <strong>renew automatically</strong> unless you turn off auto-renew at
              least 24 hours before the end of the current period.
            </li>
            <li>
              Your account will be charged for renewal within 24 hours prior to the end of the
              current period.
            </li>
            <li>
              Manage or cancel your subscription in <strong>App Store</strong> /{' '}
              <strong>Google Play</strong> account settings after purchase.
            </li>
            <li>
              If your subscription lapses, premium features will no longer be available, and{' '}
              <strong>
                new recurring categories or expenses will not be created
              </strong>
              .
            </li>
          </ul>

          <h3>Terms of Use (EULA)</h3>
          <p>
            For iOS users, your use of subscriptions is also governed by the{' '}
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Apple Standard End User License Agreement (EULA)</strong>
            </a>
            .
          </p>

          <br />

          <h2>4.0 Children&apos;s Privacy</h2>
          <ul>
            <li>The App is not directed toward children under 13.</li>
            <li>We do not knowingly collect data from children.</li>
            <li>
              Since all data is local-only, parents remain responsible for supervising device use.
            </li>
          </ul>

          <br />

          <h2>5.0 Limitation of Liability</h2>
          <p>
            The App is provided <strong>&ldquo;as is&rdquo; without any warranties</strong>. To the
            maximum extent permitted by law, we disclaim all liability for damages, losses, or claims
            arising out of your use of the App.
          </p>

          <br />

          <h2>6.0 Contact &amp; Support</h2>
          <p>
            If you have any questions about these Terms or the Privacy Policy, please contact us at:
          </p>
          <p>
            📧{' '}
            <strong>
              <a href="mailto:bybsupport@budgetyourbudget.com">bybsupport@budgetyourbudget.com</a>
            </strong>
          </p>
        </article>
      </div>
    </motion.div>
  );
}

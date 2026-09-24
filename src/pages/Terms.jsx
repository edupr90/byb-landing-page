import LegalLayout from '../components/LegalLayout';

/*
 * ============================================================
 *  TERMS OF USE  —  budgetyourbudget.com/terms
 *
 *  Drafted against the shipping app (v2.0.0), not against design
 *  docs. Every factual statement here — what the Shared Budget
 *  exposes, what the AI features transmit, what a subscription
 *  gates — was verified in source before it was written down.
 *  If the app changes, this document has to change with it: an
 *  inaccurate term is worse than no term at all.
 * ============================================================
 */

const SUPPORT = 'bybsupport@budgetyourbudget.com';

function Mail() {
  return <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>;
}

/* ── ENGLISH ──────────────────────────────────────────────── */

const EN = (
  <>
    <h1>Terms of Use — <em>Budget Your Budget</em></h1>

    <div className="not-prose my-8 rounded-2xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 p-5 sm:p-6">
      <p className="text-sm font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide mb-2">
        Please read this before you use the App
      </p>
      <p className="text-sm text-amber-900/90 dark:text-amber-100/90 leading-relaxed">
        These Terms contain a <strong>binding individual arbitration agreement</strong> and a{' '}
        <strong>class action waiver</strong> in Section 17. By using Budget Your Budget you agree
        that disputes between you and us will be resolved by an individual arbitrator, that you are{' '}
        <strong>giving up your right to a jury trial</strong>, and that you{' '}
        <strong>may not bring or join a class, collective, or representative action</strong>. You
        also agree that any claim must be brought <strong>within one (1) year</strong>. Section 17
        explains the process, including a small-claims court exception.
      </p>
    </div>

    <h2>1. Agreement to these Terms</h2>
    <p>
      These Terms of Use (the &ldquo;<strong>Terms</strong>&rdquo;) are a legally binding contract
      between you and <strong>Eduardo Velez</strong>, an independent software developer operating
      under the name <strong>Budget Your Budget</strong> (&ldquo;<strong>BYB</strong>&rdquo;,
      &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;, or
      &ldquo;<strong>our</strong>&rdquo;). They govern your use of the Budget Your Budget mobile
      application, the website at budgetyourbudget.com, and every feature and service we make
      available through them (together, the &ldquo;<strong>App</strong>&rdquo;).
    </p>
    <p>
      <strong>By downloading, installing, opening, or using the App, you accept these Terms and our{' '}
      <a href="/privacypolicy">Privacy Policy</a>, which is incorporated into these Terms by
      reference.</strong> If you do not agree to any part of them, do not use the App, and uninstall
      it. Your continued use of the App is your ongoing acceptance of the version of these Terms
      then in effect.
    </p>
    <p>
      If you use the Shared Budget feature, you accept these Terms again on behalf of your own use
      of that feature, and you accept the additional commitments in Section 6.
    </p>

    <h2>2. Who may use the App</h2>
    <ul>
      <li>
        <strong>You must be at least 18 years old</strong> to accept these Terms and to create an
        account, purchase a subscription, or use the Shared Budget feature.
      </li>
      <li>
        A person aged <strong>13 to 17</strong> may use the App only on the device and under the
        supervision of a parent or legal guardian who has read and accepted these Terms and who
        accepts full responsibility for that use. In that case the parent or guardian is the
        contracting party, not the minor.
      </li>
      <li>
        <strong>The App is not for children under 13</strong>, and we do not knowingly permit their
        use of it. See Section 9 of our <a href="/privacypolicy">Privacy Policy</a>.
      </li>
      <li>
        You must have the legal capacity to enter into a contract, and you must not be barred from
        using the App under the laws of your country or of the United States, including U.S.
        sanctions and export-control rules.
      </li>
    </ul>

    <h2>3. What the App is — and what it is not</h2>
    <p>
      Budget Your Budget is a <strong>personal budgeting and money-tracking tool</strong>. It helps
      you record what you plan to spend and what you actually spent, and it shows you arithmetic
      based on the numbers you enter.
    </p>
    <p>
      <strong>
        We are not a bank, credit union, lender, broker, money transmitter, tax preparer,
        accountant, credit counsellor, or financial, legal, or investment adviser.
      </strong>{' '}
      We do not hold, move, invest, or have access to your money. We are not connected to your bank
      accounts or cards. Nothing in the App is financial, investment, tax, accounting, or legal
      advice, and nothing in the App creates a fiduciary, advisory, or professional relationship
      between us and you.
    </p>
    <ul>
      <li>
        <strong>Everything depends on what you enter.</strong> The App does not import transactions
        from any financial institution. Its totals, projections, remaining balances, debt payoff
        figures, and reports are calculations performed on data you typed in, and they are only as
        accurate as that data.
      </li>
      <li>
        <strong>Every figure is an estimate.</strong> Budgets, plans, snowball schedules, and
        projections are illustrations, not promises, forecasts, or guarantees of any financial
        result.
      </li>
      <li>
        <strong>You are solely responsible for your financial decisions</strong>, including any
        decision you make, delay, or avoid because of something you saw in the App. Before acting on
        anything financially significant, consult a qualified professional and verify the numbers
        against your actual bank, card, and lender statements.
      </li>
    </ul>

    <h2>4. Your account</h2>
    <p>
      You can use most of the App without any account. Signing in with Google or Apple is optional,
      and is required only for cloud sync, the Shared Budget feature, and editing your display name
      and avatar. Purchases do not require an account.
    </p>
    <ul>
      <li>
        You are responsible for everything that happens under your account and on your device,
        including keeping your sign-in credentials, device passcode, and app PIN secure.
      </li>
      <li>
        You must give accurate information and must not impersonate anyone or use another person&apos;s
        account.
      </li>
      <li>
        Tell us promptly at <Mail /> if you believe your account has been accessed without your
        permission.
      </li>
      <li>
        You may delete your account from within the App at any time (Profile → your account card →
        Delete account). Deleting your account erases your cloud data and your data on that device
        and cannot be undone. If you own a Shared Budget that still has another member in it, you
        must remove that member first.
      </li>
    </ul>

    <h2>5. Your data, backups, and loss</h2>
    <p>
      Your budget data belongs to you. We claim no ownership of the amounts, names, notes, or photos
      you put into the App.
    </p>
    <p>
      <strong>
        You are responsible for keeping your own backups. We do not guarantee that your data will be
        preserved, and we are not liable for its loss, corruption, or unavailability.
      </strong>{' '}
      Data can be lost for reasons we do not control and cannot reverse — including deleting the
      App, losing or resetting your device, an operating-system or store change, a failed sync, a
      lapsed subscription, an account deletion, or an action taken by someone you shared a budget
      with. The App includes a Backup &amp; Import feature and, for subscribers, cloud sync; use
      them, and keep an export of anything you cannot afford to lose.
    </p>
    <p>
      Note that a backup file the App exports is an <strong>unencrypted</strong> file. Once you hand
      it to another app, a cloud drive, or a messaging service, it is outside the App and outside
      our control. Store it somewhere you trust.
    </p>

    <h2>6. Shared Budget</h2>
    <p>
      The Shared Budget feature lets <strong>two people — you and one other person — keep one budget
      together</strong>. It is designed for a couple or a household sharing money. It works by
      storing that budget in our cloud service and giving both of you access to it.
    </p>
    <p>
      <strong>
        Read this section carefully before you invite someone or accept an invitation. Sharing a
        budget means another person will see financial information about you.
      </strong>
    </p>

    <h3>6.1 What the other person will be able to see and change</h3>
    <p>
      Once a budget is shared, both people are <strong>equal editors</strong> of it. Each of you can
      see, add, edit, and delete:
    </p>
    <ul>
      <li>
        <strong>Every expense in the budget</strong> — its name or merchant, amount, date, category,
        and any <strong>free-text note</strong> attached to it;
      </li>
      <li>
        <strong>Receipt photographs</strong> attached to any expense in the budget, including photos
        the other person took;
      </li>
      <li>
        <strong>Categories, planned amounts, and the split</strong> of each category between the two
        of you, plus custom categories and recurring templates;
      </li>
      <li>
        <strong>Both people&apos;s income amounts and the household total.</strong> Each of you may only
        edit your own income entry, but both amounts are visible to both of you;
      </li>
      <li>
        <strong>Each other&apos;s display name and profile photo.</strong> Email addresses are never
        shared.
      </li>
    </ul>
    <p>
      <strong>Every expense shows who logged it.</strong> The name and photo of the person who
      entered an expense appear next to it.
    </p>
    <p>
      <strong>The following are never shared</strong> and stay private to each person: debts, debt
      payments and payoff plans, your app PIN and biometric lock, your settings, theme and language,
      your reports, and your AI Advice history.
    </p>

    <h3>6.2 Invitations</h3>
    <ul>
      <li>
        The budget owner creates an <strong>8-character invite code</strong>. It is valid for{' '}
        <strong>7 days</strong>, can be used <strong>once</strong>, and creating a new code cancels
        the previous one.
      </li>
      <li>
        <strong>The code is a key, not an invitation to a named person.</strong> We do not verify who
        redeems it. Anyone who has the code and signs in to the App can use it to join your budget
        and gain full access to everything in Section 6.1.{' '}
        <strong>Treat the code like a password.</strong> Send it only to the specific person you
        intend to share with, through a channel you trust, and if you send it to the wrong place,
        create a new code immediately to cancel it.
      </li>
      <li>
        You are solely responsible for who you give a code to and for anything that person does with
        the access it grants.
      </li>
    </ul>

    <h3>6.3 Joining someone else&apos;s budget is irreversible</h3>
    <p>When you accept an invitation and join another person&apos;s budget:</p>
    <ul>
      <li>
        <strong>Your categories and expenses are merged into their budget</strong>, where that person
        can see and edit them;
      </li>
      <li>
        <strong>Your own income history on that device is cleared</strong>, because a joined
        budget&apos;s income history belongs to the budget. You will be asked to enter your income
        again, and the other person will see that amount and the household total;
      </li>
      <li>
        <strong>This cannot be undone.</strong> Leaving the budget later does not restore what the
        merge changed.
      </li>
    </ul>
    <p>
      Export a backup before you join if you want a record of your data as it stood beforehand.
    </p>

    <h3>6.4 Leaving, removing, and what remains</h3>
    <ul>
      <li>
        <strong>Only the owner can remove the other person.</strong> A member who joined can leave at
        any time, but cannot remove the owner.
      </li>
      <li>
        When someone leaves or is removed, <strong>the expenses and income they added are withdrawn
        from the budget</strong>, which will change the totals for those months for both people.
        Categories and recurring templates remain.
      </li>
      <li>
        <strong>Removal and leaving are permanent.</strong> Re-joining requires a new invitation.
      </li>
      <li>
        <strong>Deleted records are not erased instantly.</strong> For synchronisation to work across
        devices, deletions travel as markers and the underlying records are removed from our cloud
        storage <strong>up to 90 days later</strong>. See our{' '}
        <a href="/privacypolicy">Privacy Policy</a>.
      </li>
      <li>
        <strong>We cannot make shared information unseen.</strong> Once the other person has viewed,
        exported, screenshotted, or remembered something, ending the share does not and cannot
        retrieve it.
      </li>
    </ul>

    <h3>6.5 Your commitments when you share</h3>
    <p>By using the Shared Budget feature, you represent, warrant, and agree that:</p>
    <ul>
      <li>
        You have the <strong>right to share</strong> everything you put into a shared budget, and
        where the information concerns another person, you have their consent to share it;
      </li>
      <li>
        You understand that <strong>you have no expectation of privacy, as against your co-member,</strong>{' '}
        in anything described in Section 6.1, and that this visibility is the purpose of the feature
        rather than a defect in it;
      </li>
      <li>
        You will not use the Shared Budget feature to monitor, surveil, coerce, or control another
        person, or in connection with any abusive, harassing, or unlawful conduct;
      </li>
      <li>
        You accept the personal, household, relationship, and financial consequences that can follow
        from another person seeing your financial information, and you assume that risk;
      </li>
      <li>
        <strong>
          Any dispute between you and a person you share or shared a budget with is between the two
          of you.
        </strong>{' '}
        We are not a party to it. We have no obligation to mediate, investigate, take sides, restore
        data, or disclose one member&apos;s information to the other. To the fullest extent permitted by
        law, <strong>you release us from all claims arising out of such a dispute</strong>, including
        claims about what your co-member saw, changed, deleted, or did with what they saw.
      </li>
      <li>
        We are <strong>not a party to any household arrangement</strong> between members — no split
        of expenses, allocation, separation, or agreement about who owes whom. The App&apos;s category
        split is a display of numbers you chose, not an enforceable agreement and not a record of
        debt between you.
      </li>
    </ul>

    <h3>6.6 Practical limits you should know</h3>
    <ul>
      <li>A shared budget holds <strong>exactly two people</strong>.</li>
      <li>
        <strong>Only the budget owner needs BYB+.</strong> Joining and being a member is free. The
        member gets cloud sync and can edit the shared plan, but personal paid features — reports, AI
        features, and creating debts — still require that member&apos;s own subscription.
      </li>
      <li>
        <strong>Currency is a per-person setting.</strong> If the two of you have different
        currencies selected, the same stored number will be displayed with each person&apos;s own
        currency symbol. Agree on one currency before you share.
      </li>
      <li>
        If the owner&apos;s BYB+ subscription lapses, the shared budget stops synchronising on the
        owner&apos;s side. The member&apos;s device is not notified of this and may continue to record
        entries that the owner&apos;s device does not receive, so the two devices can silently diverge.
        Nothing is deleted, and syncing resumes if the owner resubscribes.
      </li>
      <li>
        Technical safeguards in the App that limit what a member can do — for example the rule that
        only the person who logged an expense may edit it — are enforced by the App itself. A person
        using a modified version of the App may not be subject to them.
      </li>
    </ul>

    <h2>7. AI features</h2>
    <p>
      Some features use artificial intelligence provided by Google. When you use them, data is sent
      to Google to be processed, as described in our <a href="/privacypolicy">Privacy Policy</a>:
    </p>
    <ul>
      <li>
        <strong>Receipt scanning (BYB+)</strong> sends the <strong>photograph of your receipt</strong>{' '}
        and your list of category names to Google, and receives back the merchant, date, total, line
        items, and the last four digits of the payment card shown on the receipt.
      </li>
      <li>
        <strong>AI Advice / Insights (BYB+)</strong> sends a <strong>summary of your actual
        finances</strong> — spending totals, your top expense names and amounts, income, budgeted
        versus spent per category, and debt balances, rates, and payments — to Google, and returns
        written suggestions.
      </li>
    </ul>
    <p>
      <strong>
        AI output is generated automatically, is frequently wrong, and is not advice.
      </strong>{' '}
      A &ldquo;financial health score&rdquo;, a &ldquo;smart money move&rdquo;, an action plan, a
      scanned total, or a suggested category is a machine-generated suggestion that you must check
      before relying on it. Scanned values in particular can be misread — always compare them against
      the receipt itself. We do not warrant that AI output is accurate, complete, suitable, or
      appropriate for your situation, and Section 3 applies to it in full.
    </p>
    <p>
      Do not photograph documents, or type notes, that contain information you do not want
      transmitted for processing. AI features are rate-limited, may be changed or withdrawn, and
      depend on your device passing an integrity check; they may be unavailable on modified,
      emulated, or rooted devices.
    </p>

    <h2>8. BYB+ subscriptions and payments</h2>
    <ul>
      <li>
        The App is free to download and use. <strong>BYB+</strong> is an optional paid subscription
        that unlocks cloud sync, the full set of reports, recurring templates, creating debts, AI
        features, unlimited custom categories, and creating a Shared Budget.
      </li>
      <li>
        <strong>All purchases are made through Apple&apos;s App Store or Google Play, not through us.</strong>{' '}
        Payment is charged to your Apple or Google account at confirmation of purchase, and your
        purchase is also governed by that store&apos;s terms.
      </li>
      <li>
        <strong>Subscriptions renew automatically</strong> until you cancel. Your account is charged
        for renewal within 24 hours before the end of the current period unless you turn off
        auto-renew at least 24 hours before it ends.
      </li>
      <li>
        <strong>You cancel through the store, not through us</strong> — App Store account settings on
        iOS, Google Play account settings on Android. We cannot cancel a subscription for you.
      </li>
      <li>
        <strong>Prices vary by country and currency</strong> and may change. Any price displayed in
        the App comes from the store for your storefront at that moment, and that displayed price
        governs. Where the store offers a free trial, its length and your eligibility are determined
        by the store; if a trial is not offered to you, none is promised.
      </li>
      <li>
        <strong>Refunds are handled by the store under the store&apos;s policy.</strong> Except where the
        law requires otherwise, payments are non-refundable, and we do not give partial refunds for
        an unused part of a period.
      </li>
      <li>
        <strong>If your subscription ends</strong>, paid features stop working, recurring templates
        stop creating new entries, and cloud sync stops. Your existing data is not deleted, and paid
        features resume if you subscribe again.
      </li>
      <li>
        We may change what BYB+ includes, and we may change prices for future periods. If we do, the
        change applies from your next renewal.
      </li>
    </ul>

    <h2>9. Acceptable use</h2>
    <p>You agree that you will not:</p>
    <ul>
      <li>Use the App for any unlawful purpose, or to facilitate one;</li>
      <li>
        Use the App to surveil, stalk, harass, coerce, defraud, or exert financial control over
        another person;
      </li>
      <li>
        Access or try to access another person&apos;s data, another account, our servers, or any part of
        the service you have not been granted access to — including by guessing, enumerating, or
        redeeming invite codes that were not given to you;
      </li>
      <li>
        Reverse engineer, decompile, disassemble, modify, or create derivative works of the App, or
        circumvent any technical limitation, entitlement check, rate limit, or security measure,
        except to the extent this restriction is prohibited by applicable law;
      </li>
      <li>
        Use a modified, tampered, automated, or unofficial client, or scrape, bulk-download, or
        overload the service;
      </li>
      <li>
        Upload anything unlawful or infringing, anything containing malicious code, or any personal
        information about another person that you have no right to share;
      </li>
      <li>Resell, sublicense, rent, or commercially redistribute the App or access to it.</li>
    </ul>
    <p>
      We may investigate and respond to suspected violations, including by suspending or terminating
      access under Section 13.
    </p>

    <h2>10. Intellectual property</h2>
    <p>
      The App — including its software, design, interface, text, graphics, logos, and the name
      Budget Your Budget — is owned by us and protected by intellectual property laws. Subject to
      these Terms, we grant you a <strong>limited, personal, non-exclusive, non-transferable,
      revocable licence</strong> to use one copy of the App on devices you own or control, for your
      own personal, non-commercial use. All rights not expressly granted are reserved. This licence
      ends automatically if you breach these Terms.
    </p>
    <p>
      If you send us feedback, suggestions, or ideas, you grant us an unrestricted, perpetual,
      irrevocable, worldwide, royalty-free right to use them for any purpose without obligation or
      compensation to you. Please do not send us anything you consider confidential.
    </p>

    <h2>11. Third-party services</h2>
    <p>
      The App depends on services operated by others, including Google (Firebase cloud
      infrastructure, Gemini AI, Analytics, sign-in, and fonts), Apple (App Store, sign-in), and
      RevenueCat (subscription management). Those services are governed by their own terms and
      privacy policies, which are listed in our <a href="/privacypolicy">Privacy Policy</a>.
    </p>
    <p>
      <strong>
        We are not responsible for third-party services, their availability, their accuracy, their
        security practices, or any act or omission by them.
      </strong>{' '}
      If a third-party service changes, degrades, raises its prices, or shuts down, the App may stop
      working in whole or in part, and we may have to change or discontinue features as a result.
    </p>

    <h2>12. Changes to the App and to these Terms</h2>
    <p>
      <strong>We may change, suspend, limit, or discontinue the App or any feature at any time</strong>,
      with or without notice, and we may stop supporting an operating system, a device, or a version
      of the App. We may also stop offering the App entirely. Except as stated in Section 8 for a
      subscription you have already paid for, we have no liability to you for doing so.
    </p>
    <p>
      We may update these Terms. When we do, we will change the &ldquo;Last updated&rdquo; date at
      the top of this page, and for material changes we will make reasonable efforts to give notice
      in the App or by other means.{' '}
      <strong>
        Your continued use of the App after a change takes effect means you accept the updated
        Terms.
      </strong>{' '}
      If you do not accept them, stop using the App and uninstall it. Changes are not retroactive and
      do not apply to a dispute of which we already had notice.
    </p>

    <h2>13. Termination</h2>
    <p>
      You may stop using the App at any time by uninstalling it, and you may delete your account from
      within the App.
    </p>
    <p>
      <strong>
        We may suspend or terminate your access to the App or to any feature, at any time and
        without notice,
      </strong>{' '}
      if we reasonably believe you have breached these Terms, if your use creates risk or legal
      exposure for us or another person, or if we discontinue the service. On termination your licence
      ends immediately and you must stop using the App. Sections 3, 5, 6.5, 7, 10, 11, and 14 through
      21 survive termination.
    </p>

    <h2>14. Disclaimer of warranties</h2>
    <p>
      <strong>
        The App is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, with all faults and
        without warranty of any kind.
      </strong>{' '}
      To the maximum extent permitted by law, we disclaim all warranties, express, implied, or
      statutory, including any implied warranty of merchantability, fitness for a particular purpose,
      title, non-infringement, accuracy, and any warranty arising from course of dealing or usage of
      trade.
    </p>
    <p>Without limiting that, we do not warrant that:</p>
    <ul>
      <li>the App will be uninterrupted, timely, secure, or error-free;</li>
      <li>
        any calculation, projection, report, scanned value, or AI output will be accurate, complete,
        or suitable for your situation;
      </li>
      <li>
        data will sync correctly or promptly, or that a shared budget will be consistent across both
        devices at any moment;
      </li>
      <li>your data will be preserved, recoverable, or free from loss or corruption;</li>
      <li>
        the App will be available in your country, on your device, or compatible with future
        operating systems;
      </li>
      <li>
        defects will be corrected, or that the App is free of viruses or other harmful components.
      </li>
    </ul>
    <p>
      No advice or information, whether oral or written, obtained from us or through the App creates
      any warranty not expressly stated here.
    </p>

    <h2>15. Limitation of liability</h2>
    <p>
      <strong>
        To the maximum extent permitted by law, we will not be liable for any indirect, incidental,
        special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue,
        savings, goodwill, data, or business opportunity,
      </strong>{' '}
      arising out of or relating to these Terms or your use of or inability to use the App — whether
      the claim is based in contract, tort (including negligence), strict liability, statute, or any
      other theory, and even if we have been advised of the possibility of such damages.
    </p>
    <p>This includes, without limitation, any claim arising out of:</p>
    <ul>
      <li>
        <strong>any financial decision, loss, overdraft, missed payment, penalty, fee, or tax
        consequence</strong> connected with your use of the App or reliance on anything in it;
      </li>
      <li>
        <strong>any inaccuracy</strong> in a calculation, report, projection, scanned receipt value,
        or AI output;
      </li>
      <li>
        <strong>any loss, corruption, or unavailability of data</strong>, including a failed sync, a
        failed or partial account deletion, or data removed by a co-member;
      </li>
      <li>
        <strong>anything relating to a Shared Budget</strong>, including what a co-member saw,
        changed, deleted, disclosed, or did with information they obtained, and any personal,
        household, relationship, employment, or financial consequence of that;
      </li>
      <li>
        <strong>unauthorised access</strong> obtained by someone who came into possession of an
        invite code, your device, or your account credentials;
      </li>
      <li>
        <strong>any act, omission, outage, or change</strong> by a third-party service, app store, or
        operating system.
      </li>
    </ul>
    <p>
      <strong>
        Our total aggregate liability for all claims relating to the App or these Terms will not
        exceed the greater of (a) the total amount you actually paid us for the App in the twelve
        (12) months immediately before the event giving rise to the claim, or (b) twenty-five United
        States dollars (US$25.00).
      </strong>
    </p>
    <p>
      These limitations are a fundamental basis of the bargain between us and apply even if a limited
      remedy fails of its essential purpose.
    </p>
    <p>
      <strong>Exceptions.</strong> Nothing in these Terms excludes or limits any liability that
      cannot lawfully be excluded or limited, including liability for death or personal injury caused
      by negligence, for fraud or fraudulent misrepresentation, or any non-waivable right you have
      under the consumer-protection law of your country or state. Some jurisdictions do not allow
      certain exclusions or limitations, so parts of this Section and Section 14 may not apply to
      you; in that case they apply to the maximum extent permitted by law.
    </p>

    <h2>16. Indemnification</h2>
    <p>
      To the maximum extent permitted by law, you agree to <strong>defend, indemnify, and hold
      harmless</strong> Eduardo Velez and Budget Your Budget from and against any claim, demand,
      proceeding, loss, liability, damage, cost, or expense (including reasonable legal fees) arising
      out of or relating to:
    </p>
    <ul>
      <li>your use or misuse of the App;</li>
      <li>your breach of these Terms or of any law or the rights of any third party;</li>
      <li>
        <strong>information about another person that you entered into or shared through the App</strong>,
        or a claim brought by a person you shared a budget with;
      </li>
      <li>anything you did with an invite code, or anyone you gave one to.</li>
    </ul>
    <p>
      We may assume the exclusive defence and control of any matter subject to indemnification by
      you, at your expense, and you agree to cooperate with our defence. You will not settle any
      matter that imposes any obligation on us without our prior written consent.
    </p>

    <h2>17. Dispute resolution, arbitration, and class action waiver</h2>
    <p>
      <strong>
        Please read this Section carefully. It affects your legal rights, including your right to
        file a lawsuit in court and to have a jury decide your claims.
      </strong>
    </p>

    <h3>17.1 Talk to us first</h3>
    <p>
      Most concerns can be resolved quickly. <strong>Before starting an arbitration or any legal
      proceeding, you agree to send us a written Notice of Dispute</strong> at <Mail />, with your
      name, the email or account the dispute relates to, a description of the problem, and the relief
      you want. We will do the same for any claim we have against you.{' '}
      <strong>
        Both of us agree to try in good faith to resolve the dispute informally for thirty (30) days
      </strong>{' '}
      after the Notice is received. Only after that period may either of us start arbitration. This
      requirement is a condition precedent to arbitration, and the limitation period in Section 17.6
      is paused while it runs.
    </p>

    <h3>17.2 Binding individual arbitration</h3>
    <p>
      If we cannot resolve the dispute informally,{' '}
      <strong>
        you and we agree that any dispute, claim, or controversy arising out of or relating to these
        Terms, the App, or our relationship — whether based in contract, tort, statute, fraud, or any
        other theory, and whether arising before, during, or after these Terms end — will be resolved
        by binding individual arbitration, and not in court.
      </strong>
    </p>
    <p>
      The arbitration will be administered by the <strong>American Arbitration Association
      (&ldquo;AAA&rdquo;)</strong> under its <strong>Consumer Arbitration Rules</strong> then in
      effect, as modified by these Terms. The arbitration will be conducted by a single arbitrator,
      seated in <strong>San Juan, Puerto Rico</strong>, except that you may elect to have the hearing
      conducted by telephone or video, or held in the county or district where you live. The
      arbitrator&apos;s award may be entered as a judgment in any court of competent jurisdiction.
    </p>
    <p>
      <strong>
        This arbitration agreement is governed by the Federal Arbitration Act, 9 U.S.C. § 1 et seq.
      </strong>{' '}
      The arbitrator decides all issues except that a court decides whether Section 17.3 is
      enforceable.
    </p>
    <p>
      The arbitrator may award the same individual relief a court could award to you individually,
      and must follow these Terms. Each of us will bear our own legal fees except where the law or
      the AAA rules provide otherwise; AAA&apos;s consumer fee schedule governs the cost of the
      arbitration.
    </p>

    <h3>17.3 Class action waiver</h3>
    <p>
      <strong>
        You and we agree that each may bring claims against the other only in an individual capacity,
        and not as a plaintiff or class member in any purported class, collective, consolidated,
        private attorney general, or representative proceeding.
      </strong>{' '}
      The arbitrator may not consolidate more than one person&apos;s claims and may not preside over any
      form of class or representative proceeding.{' '}
      <strong>Class arbitration is not authorised under these Terms.</strong>
    </p>

    <h3>17.4 Exceptions</h3>
    <p>Notwithstanding the above:</p>
    <ul>
      <li>
        <strong>Either of us may bring an individual claim in small-claims court</strong> if it
        qualifies and remains in that court;
      </li>
      <li>
        <strong>Either of us may seek injunctive or equitable relief in court</strong> for actual or
        threatened infringement or misuse of intellectual property or confidential information;
      </li>
      <li>
        Nothing here prevents you from reporting a concern to a government agency or regulator.
      </li>
    </ul>

    <h3>17.5 If the class action waiver is unenforceable</h3>
    <p>
      If the class action waiver in Section 17.3 is found unenforceable as to a particular claim or
      request for relief, then{' '}
      <strong>
        that claim or request will be severed from the arbitration and brought in the courts
        identified in Section 18
      </strong>
      , and all other claims will still be arbitrated. The rest of this Section 17 survives. If any
      other part of this Section 17 is found unenforceable, it will be severed and the remainder will
      stay in force.
    </p>

    <h3>17.6 One-year limitation on claims</h3>
    <p>
      <strong>
        Any claim relating to the App or these Terms must be filed within one (1) year after the
        claim arose, or it is permanently barred
      </strong>{' '}
      — unless a longer period is required by law that cannot be shortened by agreement, in which
      case that period applies.
    </p>

    <h2>18. Governing law and venue</h2>
    <p>
      These Terms and any dispute arising out of them are governed by the{' '}
      <strong>laws of the Commonwealth of Puerto Rico</strong> and, where applicable, the federal law
      of the United States, without regard to conflict-of-law rules. The United Nations Convention on
      Contracts for the International Sale of Goods does not apply.
    </p>
    <p>
      For any dispute not subject to arbitration under Section 17, you and we agree to the{' '}
      <strong>
        exclusive jurisdiction and venue of the courts located in San Juan, Puerto Rico
      </strong>
      , and each of us waives any objection to that venue.
    </p>
    <p>
      <strong>
        If you live in the European Union, the United Kingdom, or another jurisdiction whose law
        gives you rights that cannot be overridden by contract, nothing here deprives you of the
        protection of the mandatory laws of your country of residence, or of the right to bring
        proceedings in your local courts where that right cannot be waived.
      </strong>
    </p>

    <h2>19. Apple and Google</h2>
    <p>
      <strong>If you obtained the App from Apple&apos;s App Store:</strong>
    </p>
    <ul>
      <li>These Terms are between you and us only, and not with Apple.</li>
      <li>Apple has no obligation to provide any maintenance or support for the App.</li>
      <li>
        If the App fails to conform to any applicable warranty, you may notify Apple, and Apple will
        refund the purchase price of the App to you. To the maximum extent permitted by law, Apple
        has no other warranty obligation whatsoever with respect to the App.
      </li>
      <li>
        Apple is not responsible for addressing any claim by you or a third party relating to the App,
        including product liability claims, any claim that the App fails to conform to a legal or
        regulatory requirement, and claims arising under consumer protection or similar legislation.
      </li>
      <li>
        Apple is not responsible for the investigation, defence, settlement, or discharge of any
        third-party claim that the App infringes intellectual property rights.
      </li>
      <li>
        You represent that you are not located in a country subject to a U.S. Government embargo or
        designated as a &ldquo;terrorist supporting&rdquo; country, and that you are not on any U.S.
        Government list of prohibited or restricted parties.
      </li>
      <li>
        <strong>
          Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them
          against you.
        </strong>
      </li>
      <li>
        You must comply with any applicable third-party terms of service, including the Apple Media
        Services Terms and Conditions.
      </li>
    </ul>
    <p>
      <strong>If you obtained the App from Google Play</strong>, your use is also subject to the
      Google Play Terms of Service, and Google is not a party to these Terms and is not responsible
      for the App.
    </p>

    <h2>20. General</h2>
    <ul>
      <li>
        <strong>Entire agreement.</strong> These Terms and the Privacy Policy are the entire agreement
        between you and us about the App, and replace any earlier terms, including the combined terms
        and privacy notice previously published on this site.
      </li>
      <li>
        <strong>Severability.</strong> If any provision is held invalid or unenforceable, it will be
        limited or removed to the minimum extent necessary and the rest stays in full force.
      </li>
      <li>
        <strong>No waiver.</strong> If we do not enforce a provision, that is not a waiver of our
        right to enforce it later.
      </li>
      <li>
        <strong>Assignment.</strong> You may not assign or transfer these Terms or any rights under
        them without our written consent. We may assign them, in whole or in part, including to a
        successor in connection with a merger, acquisition, or sale of assets.
      </li>
      <li>
        <strong>Force majeure.</strong> We are not liable for any failure or delay caused by events
        beyond our reasonable control, including outages of third-party services, network or
        infrastructure failure, natural disaster, storm, power loss, or governmental action.
      </li>
      <li>
        <strong>No third-party beneficiaries</strong>, except Apple as stated in Section 19.
      </li>
      <li>
        <strong>Notices.</strong> We may give you notice in the App, on this website, or by any email
        address associated with your account. You must give us notice at <Mail />.
      </li>
      <li>
        <strong>Relationship.</strong> These Terms do not create a partnership, joint venture, agency,
        or employment relationship between us.
      </li>
      <li>
        <strong>Language.</strong> These Terms are published in English and Spanish. If there is any
        conflict or difference of interpretation, <strong>the English version governs</strong>.
        Headings are for convenience only.
      </li>
    </ul>

    <h2>21. Contact</h2>
    <p>
      Questions, notices, and Notices of Dispute under Section 17.1 should be sent to:
    </p>
    <p>
      📧 <strong><Mail /></strong>
    </p>
    <p>
      Budget Your Budget — operated by Eduardo Velez, Commonwealth of Puerto Rico, United States.
    </p>
  </>
);

/* ── ESPAÑOL ──────────────────────────────────────────────── */

const ES = (
  <>
    <h1>Términos de Uso — <em>Budget Your Budget</em></h1>

    <div className="not-prose my-8 rounded-2xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 p-5 sm:p-6">
      <p className="text-sm font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide mb-2">
        Lea esto antes de usar la App
      </p>
      <p className="text-sm text-amber-900/90 dark:text-amber-100/90 leading-relaxed">
        Estos Términos contienen un <strong>acuerdo de arbitraje individual vinculante</strong> y una{' '}
        <strong>renuncia a demandas colectivas</strong> en la Sección 17. Al usar Budget Your Budget
        usted acepta que las disputas entre usted y nosotros se resolverán ante un árbitro
        individual, que <strong>renuncia a su derecho a un juicio por jurado</strong> y que{' '}
        <strong>no podrá presentar ni unirse a una acción colectiva o representativa</strong>.
        También acepta que toda reclamación deberá presentarse{' '}
        <strong>dentro de un (1) año</strong>. La Sección 17 explica el procedimiento, incluida una
        excepción para tribunales de reclamaciones menores.
      </p>
    </div>

    <h2>1. Aceptación de estos Términos</h2>
    <p>
      Estos Términos de Uso (los &ldquo;<strong>Términos</strong>&rdquo;) constituyen un contrato
      legalmente vinculante entre usted y <strong>Eduardo Velez</strong>, desarrollador de software
      independiente que opera bajo el nombre <strong>Budget Your Budget</strong>
      (&ldquo;<strong>BYB</strong>&rdquo;, &ldquo;<strong>nosotros</strong>&rdquo; o
      &ldquo;<strong>nuestro</strong>&rdquo;). Rigen su uso de la aplicación móvil Budget Your
      Budget, del sitio budgetyourbudget.com y de todas las funciones y servicios que ofrecemos a
      través de ellos (conjuntamente, la &ldquo;<strong>App</strong>&rdquo;).
    </p>
    <p>
      <strong>
        Al descargar, instalar, abrir o usar la App, usted acepta estos Términos y nuestra{' '}
        <a href="/privacypolicy">Política de Privacidad</a>, que se incorpora a estos Términos por
        referencia.
      </strong>{' '}
      Si no está de acuerdo con alguna parte, no use la App y desinstálela. El uso continuado de la
      App constituye su aceptación de la versión de estos Términos vigente en ese momento.
    </p>
    <p>
      Si utiliza la función de Presupuesto Compartido, acepta además los compromisos adicionales de
      la Sección 6.
    </p>

    <h2>2. Quién puede usar la App</h2>
    <ul>
      <li>
        <strong>Debe tener al menos 18 años</strong> para aceptar estos Términos y para crear una
        cuenta, comprar una suscripción o usar la función de Presupuesto Compartido.
      </li>
      <li>
        Una persona de <strong>13 a 17 años</strong> solo puede usar la App en el dispositivo y bajo
        la supervisión de un padre, madre o tutor legal que haya leído y aceptado estos Términos y
        que asuma plena responsabilidad por ese uso. En ese caso, la parte contratante es el padre,
        madre o tutor, no el menor.
      </li>
      <li>
        <strong>La App no está dirigida a menores de 13 años</strong> y no permitimos a sabiendas su
        uso. Véase la Sección 9 de nuestra{' '}
        <a href="/privacypolicy">Política de Privacidad</a>.
      </li>
      <li>
        Debe tener capacidad legal para contratar y no puede tener prohibido el uso de la App bajo
        las leyes de su país o de los Estados Unidos, incluidas las normas de sanciones y control de
        exportaciones.
      </li>
    </ul>

    <h2>3. Qué es la App — y qué no es</h2>
    <p>
      Budget Your Budget es una <strong>herramienta personal de presupuesto y seguimiento de
      gastos</strong>. Le ayuda a registrar lo que planifica gastar y lo que gastó realmente, y le
      muestra cálculos basados en los datos que usted ingresa.
    </p>
    <p>
      <strong>
        No somos un banco, cooperativa, prestamista, corredor, transmisor de dinero, preparador de
        impuestos, contable, asesor de crédito ni asesor financiero, legal o de inversiones.
      </strong>{' '}
      No custodiamos, movemos ni invertimos su dinero, ni tenemos acceso a él. No estamos conectados
      a sus cuentas bancarias ni tarjetas. Nada en la App constituye asesoramiento financiero, de
      inversión, fiscal, contable o legal, y nada en la App crea una relación fiduciaria, de asesoría
      o profesional entre usted y nosotros.
    </p>
    <ul>
      <li>
        <strong>Todo depende de lo que usted ingrese.</strong> La App no importa transacciones de
        ninguna institución financiera. Sus totales, proyecciones, saldos restantes, cifras de pago
        de deudas e informes son cálculos sobre datos que usted escribió, y solo son tan exactos como
        esos datos.
      </li>
      <li>
        <strong>Toda cifra es una estimación.</strong> Los presupuestos, planes, calendarios de pago
        y proyecciones son ilustraciones, no promesas, pronósticos ni garantías de resultado
        financiero alguno.
      </li>
      <li>
        <strong>Usted es el único responsable de sus decisiones financieras</strong>, incluida
        cualquier decisión que tome, demore o evite por algo que vio en la App. Antes de actuar sobre
        algo financieramente significativo, consulte a un profesional cualificado y verifique las
        cifras contra sus estados de cuenta reales.
      </li>
    </ul>

    <h2>4. Su cuenta</h2>
    <p>
      Puede usar la mayor parte de la App sin cuenta alguna. Iniciar sesión con Google o Apple es
      opcional y solo se requiere para la sincronización en la nube, la función de Presupuesto
      Compartido y la edición de su nombre visible y avatar. Las compras no requieren cuenta.
    </p>
    <ul>
      <li>
        Usted es responsable de todo lo que ocurra bajo su cuenta y en su dispositivo, incluido
        mantener seguras sus credenciales, el código de su dispositivo y el PIN de la App.
      </li>
      <li>
        Debe proporcionar información veraz y no debe suplantar a nadie ni usar la cuenta de otra
        persona.
      </li>
      <li>
        Avísenos de inmediato a <Mail /> si cree que se ha accedido a su cuenta sin su permiso.
      </li>
      <li>
        Puede eliminar su cuenta desde la App en cualquier momento (Perfil → tarjeta de su cuenta →
        Eliminar cuenta). Eliminar su cuenta borra sus datos en la nube y sus datos en ese
        dispositivo, y no se puede deshacer. Si es propietario de un Presupuesto Compartido que aún
        tiene otro miembro, primero debe eliminar a esa persona.
      </li>
    </ul>

    <h2>5. Sus datos, copias de seguridad y pérdidas</h2>
    <p>
      Sus datos de presupuesto le pertenecen. No reclamamos propiedad sobre los montos, nombres,
      notas o fotos que introduce en la App.
    </p>
    <p>
      <strong>
        Usted es responsable de mantener sus propias copias de seguridad. No garantizamos la
        conservación de sus datos y no somos responsables por su pérdida, corrupción o falta de
        disponibilidad.
      </strong>{' '}
      Los datos pueden perderse por razones que no controlamos ni podemos revertir — incluido
      eliminar la App, perder o restablecer su dispositivo, un cambio del sistema operativo o de la
      tienda, una sincronización fallida, una suscripción vencida, la eliminación de una cuenta o una
      acción de alguien con quien compartió un presupuesto. La App incluye Copia de seguridad e
      Importación y, para suscriptores, sincronización en la nube; úselas y conserve una exportación
      de todo lo que no pueda permitirse perder.
    </p>
    <p>
      Tenga en cuenta que el archivo de copia de seguridad que exporta la App{' '}
      <strong>no está cifrado</strong>. Una vez que lo entrega a otra aplicación, a un disco en la
      nube o a un servicio de mensajería, queda fuera de la App y fuera de nuestro control. Guárdelo
      en un lugar de confianza.
    </p>

    <h2>6. Presupuesto Compartido</h2>
    <p>
      La función de Presupuesto Compartido permite que{' '}
      <strong>dos personas — usted y otra persona — mantengan un presupuesto en común</strong>. Está
      diseñada para una pareja o un hogar que comparte dinero. Funciona almacenando ese presupuesto
      en nuestro servicio en la nube y dando acceso a ambos.
    </p>
    <p>
      <strong>
        Lea esta sección con atención antes de invitar a alguien o aceptar una invitación. Compartir
        un presupuesto significa que otra persona verá información financiera sobre usted.
      </strong>
    </p>

    <h3>6.1 Qué podrá ver y modificar la otra persona</h3>
    <p>
      Una vez compartido el presupuesto, ambas personas son{' '}
      <strong>editores en igualdad de condiciones</strong>. Cada uno puede ver, añadir, editar y
      eliminar:
    </p>
    <ul>
      <li>
        <strong>Todos los gastos del presupuesto</strong> — su nombre o comercio, monto, fecha,
        categoría y cualquier <strong>nota de texto libre</strong> adjunta;
      </li>
      <li>
        <strong>Las fotografías de recibos</strong> adjuntas a cualquier gasto del presupuesto,
        incluidas las que tomó la otra persona;
      </li>
      <li>
        <strong>Las categorías, los montos planificados y el reparto</strong> de cada categoría entre
        ambos, además de las categorías personalizadas y las plantillas recurrentes;
      </li>
      <li>
        <strong>Los ingresos de ambas personas y el total del hogar.</strong> Cada uno solo puede
        editar su propio ingreso, pero ambos montos son visibles para los dos;
      </li>
      <li>
        <strong>El nombre visible y la foto de perfil del otro.</strong> Las direcciones de correo
        electrónico nunca se comparten.
      </li>
    </ul>
    <p>
      <strong>Cada gasto muestra quién lo registró.</strong> El nombre y la foto de quien introdujo
      un gasto aparecen junto a él.
    </p>
    <p>
      <strong>Lo siguiente nunca se comparte</strong> y permanece privado para cada persona: las
      deudas, los pagos de deudas y los planes de pago, el PIN de la App y el bloqueo biométrico, sus
      ajustes, tema e idioma, sus informes y su historial de Consejos con IA.
    </p>

    <h3>6.2 Invitaciones</h3>
    <ul>
      <li>
        El propietario del presupuesto crea un <strong>código de invitación de 8 caracteres</strong>.
        Es válido por <strong>7 días</strong>, puede usarse <strong>una sola vez</strong>, y crear un
        código nuevo cancela el anterior.
      </li>
      <li>
        <strong>El código es una llave, no una invitación a una persona identificada.</strong> No
        verificamos quién lo canjea. Cualquiera que tenga el código e inicie sesión en la App puede
        usarlo para unirse a su presupuesto y obtener acceso completo a todo lo descrito en la
        Sección 6.1. <strong>Trate el código como una contraseña.</strong> Envíelo únicamente a la
        persona con quien desea compartir, por un canal de confianza, y si lo envía al lugar
        equivocado, cree un código nuevo de inmediato para cancelarlo.
      </li>
      <li>
        Usted es el único responsable de a quién entrega un código y de todo lo que esa persona haga
        con el acceso que le otorga.
      </li>
    </ul>

    <h3>6.3 Unirse al presupuesto de otra persona es irreversible</h3>
    <p>Cuando acepta una invitación y se une al presupuesto de otra persona:</p>
    <ul>
      <li>
        <strong>Sus categorías y gastos se fusionan con el presupuesto de esa persona</strong>, donde
        ella puede verlos y editarlos;
      </li>
      <li>
        <strong>Su propio historial de ingresos en ese dispositivo se borra</strong>, porque el
        historial de ingresos de un presupuesto compartido pertenece al presupuesto. Se le pedirá que
        introduzca su ingreso nuevamente, y la otra persona verá ese monto y el total del hogar;
      </li>
      <li>
        <strong>Esto no se puede deshacer.</strong> Salir del presupuesto más adelante no restaura lo
        que la fusión modificó.
      </li>
    </ul>
    <p>
      Exporte una copia de seguridad antes de unirse si desea conservar un registro de sus datos tal
      como estaban antes.
    </p>

    <h3>6.4 Salir, eliminar y qué permanece</h3>
    <ul>
      <li>
        <strong>Solo el propietario puede eliminar a la otra persona.</strong> Quien se unió puede
        salir en cualquier momento, pero no puede eliminar al propietario.
      </li>
      <li>
        Cuando alguien sale o es eliminado,{' '}
        <strong>los gastos e ingresos que esa persona añadió se retiran del presupuesto</strong>, lo
        que cambiará los totales de esos meses para ambos. Las categorías y las plantillas
        recurrentes permanecen.
      </li>
      <li>
        <strong>La eliminación y la salida son permanentes.</strong> Volver a unirse requiere una
        invitación nueva.
      </li>
      <li>
        <strong>Los registros eliminados no se borran al instante.</strong> Para que la
        sincronización funcione entre dispositivos, las eliminaciones viajan como marcadores y los
        registros subyacentes se eliminan de nuestro almacenamiento en la nube{' '}
        <strong>hasta 90 días después</strong>. Véase nuestra{' '}
        <a href="/privacypolicy">Política de Privacidad</a>.
      </li>
      <li>
        <strong>No podemos hacer que lo compartido deje de haberse visto.</strong> Una vez que la
        otra persona vio, exportó, capturó o recordó algo, terminar el uso compartido no lo recupera
        ni puede recuperarlo.
      </li>
    </ul>

    <h3>6.5 Sus compromisos al compartir</h3>
    <p>Al usar la función de Presupuesto Compartido, usted declara, garantiza y acepta que:</p>
    <ul>
      <li>
        Tiene <strong>derecho a compartir</strong> todo lo que incorpore a un presupuesto compartido
        y, cuando la información se refiera a otra persona, cuenta con su consentimiento para
        compartirla;
      </li>
      <li>
        Entiende que <strong>no tiene expectativa de privacidad frente a su co-miembro</strong> en
        nada de lo descrito en la Sección 6.1, y que esa visibilidad es el propósito de la función y
        no un defecto de ella;
      </li>
      <li>
        No usará el Presupuesto Compartido para vigilar, monitorear, coaccionar o controlar a otra
        persona, ni en relación con conducta abusiva, de acoso o ilícita;
      </li>
      <li>
        Acepta las consecuencias personales, familiares, de pareja y financieras que pueden derivarse
        de que otra persona vea su información financiera, y asume ese riesgo;
      </li>
      <li>
        <strong>
          Cualquier disputa entre usted y una persona con quien comparte o compartió un presupuesto
          es entre ustedes dos.
        </strong>{' '}
        No somos parte de ella. No tenemos obligación de mediar, investigar, tomar partido, restaurar
        datos ni revelar la información de un miembro al otro. En la máxima medida permitida por la
        ley, <strong>usted nos libera de toda reclamación derivada de tal disputa</strong>, incluidas
        las relativas a lo que su co-miembro vio, cambió, eliminó o hizo con lo que vio.
      </li>
      <li>
        <strong>No somos parte de ningún acuerdo doméstico</strong> entre miembros — ningún reparto
        de gastos, asignación, separación o acuerdo sobre quién le debe qué a quién. El reparto por
        categoría de la App es una presentación de cifras que ustedes eligieron, no un acuerdo
        exigible ni un registro de deuda entre ustedes.
      </li>
    </ul>

    <h3>6.6 Límites prácticos que debe conocer</h3>
    <ul>
      <li>Un presupuesto compartido admite <strong>exactamente dos personas</strong>.</li>
      <li>
        <strong>Solo el propietario necesita BYB+.</strong> Unirse y ser miembro es gratis. El miembro
        obtiene sincronización en la nube y puede editar el plan compartido, pero las funciones
        pagadas personales — informes, funciones de IA y creación de deudas — siguen requiriendo su
        propia suscripción.
      </li>
      <li>
        <strong>La moneda es un ajuste individual.</strong> Si ambos tienen monedas distintas
        seleccionadas, el mismo número almacenado se mostrará con el símbolo de moneda de cada uno.
        Acuerden una sola moneda antes de compartir.
      </li>
      <li>
        Si la suscripción BYB+ del propietario vence, el presupuesto compartido deja de sincronizarse
        del lado del propietario. El dispositivo del miembro no recibe aviso de esto y puede seguir
        registrando entradas que el dispositivo del propietario no recibe, por lo que ambos
        dispositivos pueden divergir en silencio. No se elimina nada, y la sincronización se reanuda
        si el propietario vuelve a suscribirse.
      </li>
      <li>
        Las salvaguardas técnicas de la App que limitan lo que un miembro puede hacer — por ejemplo,
        la regla de que solo quien registró un gasto puede editarlo — las aplica la propia App. Una
        persona que use una versión modificada de la App podría no estar sujeta a ellas.
      </li>
    </ul>

    <h2>7. Funciones de inteligencia artificial</h2>
    <p>
      Algunas funciones usan inteligencia artificial proporcionada por Google. Al usarlas, se envían
      datos a Google para su procesamiento, según se describe en nuestra{' '}
      <a href="/privacypolicy">Política de Privacidad</a>:
    </p>
    <ul>
      <li>
        <strong>El escaneo de recibos (BYB+)</strong> envía la{' '}
        <strong>fotografía de su recibo</strong> y su lista de nombres de categorías a Google, y
        recibe el comercio, la fecha, el total, las líneas de detalle y los últimos cuatro dígitos de
        la tarjeta de pago que aparece en el recibo.
      </li>
      <li>
        <strong>Consejos e Insights con IA (BYB+)</strong> envía un{' '}
        <strong>resumen de sus finanzas reales</strong> — totales de gasto, sus principales nombres
        de gasto con montos, ingresos, presupuestado frente a gastado por categoría, y saldos, tasas
        y pagos de deudas — a Google, y devuelve sugerencias escritas.
      </li>
    </ul>
    <p>
      <strong>
        El resultado de la IA se genera automáticamente, se equivoca con frecuencia y no es
        asesoramiento.
      </strong>{' '}
      Una &ldquo;puntuación de salud financiera&rdquo;, un consejo, un plan de acción, un total
      escaneado o una categoría sugerida son sugerencias generadas por una máquina que usted debe
      verificar antes de confiar en ellas. Los valores escaneados en particular pueden leerse mal —
      compárelos siempre con el recibo. No garantizamos que el resultado de la IA sea exacto,
      completo, adecuado o apropiado para su situación, y la Sección 3 le aplica en su totalidad.
    </p>
    <p>
      No fotografíe documentos, ni escriba notas, que contengan información que no desee transmitir
      para su procesamiento. Las funciones de IA tienen límites de uso, pueden cambiarse o retirarse y
      dependen de que su dispositivo supere una verificación de integridad; pueden no estar
      disponibles en dispositivos modificados, emulados o con acceso root.
    </p>

    <h2>8. Suscripciones BYB+ y pagos</h2>
    <ul>
      <li>
        La App es gratuita de descargar y usar. <strong>BYB+</strong> es una suscripción de pago
        opcional que habilita la sincronización en la nube, el conjunto completo de informes, las
        plantillas recurrentes, la creación de deudas, las funciones de IA, las categorías
        personalizadas ilimitadas y la creación de un Presupuesto Compartido.
      </li>
      <li>
        <strong>
          Todas las compras se realizan a través del App Store de Apple o de Google Play, no a través
          de nosotros.
        </strong>{' '}
        El pago se carga a su cuenta de Apple o Google al confirmar la compra, y su compra también se
        rige por los términos de esa tienda.
      </li>
      <li>
        <strong>Las suscripciones se renuevan automáticamente</strong> hasta que usted las cancele. Se
        cobrará la renovación dentro de las 24 horas previas al final del período en curso, salvo que
        desactive la renovación automática al menos 24 horas antes de que termine.
      </li>
      <li>
        <strong>La cancelación se hace en la tienda, no con nosotros</strong> — en los ajustes de su
        cuenta de App Store en iOS o de Google Play en Android. No podemos cancelar una suscripción
        por usted.
      </li>
      <li>
        <strong>Los precios varían según el país y la moneda</strong> y pueden cambiar. Cualquier
        precio mostrado en la App proviene de la tienda de su región en ese momento, y ese precio
        mostrado es el que rige. Cuando la tienda ofrece una prueba gratuita, su duración y su
        elegibilidad las determina la tienda; si no se le ofrece una prueba, no se promete ninguna.
      </li>
      <li>
        <strong>Los reembolsos los gestiona la tienda según su propia política.</strong> Salvo que la
        ley exija lo contrario, los pagos no son reembolsables y no otorgamos reembolsos parciales
        por una parte no usada de un período.
      </li>
      <li>
        <strong>Si su suscripción termina</strong>, las funciones pagadas dejan de estar disponibles,
        las plantillas recurrentes dejan de crear entradas nuevas y la sincronización en la nube se
        detiene. Sus datos existentes no se eliminan, y las funciones pagadas se reanudan si vuelve a
        suscribirse.
      </li>
      <li>
        Podemos cambiar lo que incluye BYB+ y podemos cambiar los precios para períodos futuros. Si lo
        hacemos, el cambio se aplica desde su siguiente renovación.
      </li>
    </ul>

    <h2>9. Uso aceptable</h2>
    <p>Usted acepta que no hará lo siguiente:</p>
    <ul>
      <li>Usar la App con fines ilícitos o para facilitarlos;</li>
      <li>
        Usar la App para vigilar, acechar, acosar, coaccionar, defraudar o ejercer control financiero
        sobre otra persona;
      </li>
      <li>
        Acceder o intentar acceder a los datos de otra persona, a otra cuenta, a nuestros servidores
        o a cualquier parte del servicio a la que no se le haya concedido acceso — incluido adivinar,
        enumerar o canjear códigos de invitación que no le fueron entregados;
      </li>
      <li>
        Realizar ingeniería inversa, descompilar, desensamblar, modificar o crear obras derivadas de
        la App, ni eludir limitaciones técnicas, verificaciones de suscripción, límites de uso o
        medidas de seguridad, salvo en la medida en que esta restricción esté prohibida por la ley
        aplicable;
      </li>
      <li>
        Usar un cliente modificado, alterado, automatizado o no oficial, ni extraer datos de forma
        masiva o sobrecargar el servicio;
      </li>
      <li>
        Subir contenido ilícito o infractor, código malicioso, o información personal de otra persona
        que usted no tenga derecho a compartir;
      </li>
      <li>Revender, sublicenciar, alquilar o redistribuir comercialmente la App o el acceso a ella.</li>
    </ul>
    <p>
      Podemos investigar y responder ante presuntas infracciones, incluso suspendiendo o cancelando
      el acceso conforme a la Sección 13.
    </p>

    <h2>10. Propiedad intelectual</h2>
    <p>
      La App — incluidos su software, diseño, interfaz, textos, gráficos, logotipos y el nombre Budget
      Your Budget — es de nuestra propiedad y está protegida por las leyes de propiedad intelectual.
      Sujeto a estos Términos, le concedemos una{' '}
      <strong>licencia limitada, personal, no exclusiva, intransferible y revocable</strong> para usar
      una copia de la App en dispositivos de su propiedad o bajo su control, para uso personal y no
      comercial. Todos los derechos no concedidos expresamente quedan reservados. Esta licencia
      termina automáticamente si usted incumple estos Términos.
    </p>
    <p>
      Si nos envía comentarios, sugerencias o ideas, nos concede un derecho irrestricto, perpetuo,
      irrevocable, mundial y libre de regalías para usarlos con cualquier fin, sin obligación ni
      compensación alguna hacia usted. Le rogamos no enviarnos nada que considere confidencial.
    </p>

    <h2>11. Servicios de terceros</h2>
    <p>
      La App depende de servicios operados por terceros, entre ellos Google (infraestructura en la
      nube de Firebase, IA Gemini, Analytics, inicio de sesión y fuentes), Apple (App Store, inicio de
      sesión) y RevenueCat (gestión de suscripciones). Esos servicios se rigen por sus propios
      términos y políticas de privacidad, enumerados en nuestra{' '}
      <a href="/privacypolicy">Política de Privacidad</a>.
    </p>
    <p>
      <strong>
        No somos responsables de los servicios de terceros, de su disponibilidad, exactitud o
        prácticas de seguridad, ni de ningún acto u omisión de su parte.
      </strong>{' '}
      Si un servicio de terceros cambia, se degrada, sube sus precios o cierra, la App puede dejar de
      funcionar total o parcialmente, y es posible que debamos cambiar o descontinuar funciones como
      consecuencia.
    </p>

    <h2>12. Cambios en la App y en estos Términos</h2>
    <p>
      <strong>
        Podemos cambiar, suspender, limitar o descontinuar la App o cualquier función en cualquier
        momento
      </strong>
      , con o sin aviso, y podemos dejar de dar soporte a un sistema operativo, un dispositivo o una
      versión de la App. También podemos dejar de ofrecer la App por completo. Salvo lo indicado en la
      Sección 8 respecto de una suscripción ya pagada, no tenemos responsabilidad alguna hacia usted
      por ello.
    </p>
    <p>
      Podemos actualizar estos Términos. Cuando lo hagamos, cambiaremos la fecha de &ldquo;Última
      actualización&rdquo; en la parte superior de esta página y, ante cambios sustanciales, haremos
      esfuerzos razonables por avisar en la App o por otros medios.{' '}
      <strong>
        El uso continuado de la App después de que un cambio entre en vigor significa que acepta los
        Términos actualizados.
      </strong>{' '}
      Si no los acepta, deje de usar la App y desinstálela. Los cambios no son retroactivos ni se
      aplican a una disputa de la que ya tuviéramos conocimiento.
    </p>

    <h2>13. Terminación</h2>
    <p>
      Puede dejar de usar la App en cualquier momento desinstalándola, y puede eliminar su cuenta
      desde la App.
    </p>
    <p>
      <strong>
        Podemos suspender o cancelar su acceso a la App o a cualquier función, en cualquier momento y
        sin aviso,
      </strong>{' '}
      si creemos razonablemente que usted ha incumplido estos Términos, si su uso genera riesgo o
      exposición legal para nosotros o para otra persona, o si descontinuamos el servicio. Al
      terminar, su licencia cesa de inmediato y debe dejar de usar la App. Las Secciones 3, 5, 6.5, 7,
      10, 11 y 14 a 21 sobreviven a la terminación.
    </p>

    <h2>14. Exclusión de garantías</h2>
    <p>
      <strong>
        La App se proporciona &ldquo;tal cual&rdquo; y &ldquo;según disponibilidad&rdquo;, con todos
        sus defectos y sin garantía de ningún tipo.
      </strong>{' '}
      En la máxima medida permitida por la ley, rechazamos toda garantía, expresa, implícita o legal,
      incluidas las garantías implícitas de comerciabilidad, idoneidad para un fin determinado,
      titularidad, no infracción y exactitud, así como toda garantía derivada del curso de
      negociaciones o de los usos del comercio.
    </p>
    <p>Sin limitar lo anterior, no garantizamos que:</p>
    <ul>
      <li>la App sea ininterrumpida, puntual, segura o libre de errores;</li>
      <li>
        cualquier cálculo, proyección, informe, valor escaneado o resultado de IA sea exacto, completo
        o adecuado para su situación;
      </li>
      <li>
        los datos se sincronicen correctamente o con prontitud, ni que un presupuesto compartido esté
        consistente en ambos dispositivos en un momento dado;
      </li>
      <li>sus datos se conserven, sean recuperables o estén libres de pérdida o corrupción;</li>
      <li>
        la App esté disponible en su país, en su dispositivo o sea compatible con futuros sistemas
        operativos;
      </li>
      <li>
        los defectos se corrijan, ni que la App esté libre de virus u otros componentes dañinos.
      </li>
    </ul>
    <p>
      Ningún consejo o información, oral o escrita, obtenido de nosotros o a través de la App crea
      garantía alguna no expresada aquí.
    </p>

    <h2>15. Limitación de responsabilidad</h2>
    <p>
      <strong>
        En la máxima medida permitida por la ley, no seremos responsables de daños indirectos,
        incidentales, especiales, consecuentes, ejemplares o punitivos, ni de pérdida de beneficios,
        ingresos, ahorros, reputación, datos u oportunidades de negocio,
      </strong>{' '}
      que surjan de o se relacionen con estos Términos o con su uso o imposibilidad de uso de la App —
      ya sea que la reclamación se base en contrato, responsabilidad extracontractual (incluida la
      negligencia), responsabilidad objetiva, ley o cualquier otra teoría, e incluso si se nos hubiera
      advertido de la posibilidad de tales daños.
    </p>
    <p>Esto incluye, sin limitación, toda reclamación derivada de:</p>
    <ul>
      <li>
        <strong>
          cualquier decisión financiera, pérdida, sobregiro, pago omitido, penalidad, cargo o
          consecuencia fiscal
        </strong>{' '}
        relacionada con su uso de la App o con su confianza en algo contenido en ella;
      </li>
      <li>
        <strong>cualquier inexactitud</strong> en un cálculo, informe, proyección, valor escaneado de
        un recibo o resultado de IA;
      </li>
      <li>
        <strong>cualquier pérdida, corrupción o falta de disponibilidad de datos</strong>, incluida
        una sincronización fallida, una eliminación de cuenta fallida o parcial, o datos eliminados
        por un co-miembro;
      </li>
      <li>
        <strong>cualquier asunto relativo a un Presupuesto Compartido</strong>, incluido lo que un
        co-miembro vio, cambió, eliminó, divulgó o hizo con la información obtenida, y cualquier
        consecuencia personal, familiar, de pareja, laboral o financiera de ello;
      </li>
      <li>
        <strong>el acceso no autorizado</strong> obtenido por alguien que llegó a poseer un código de
        invitación, su dispositivo o sus credenciales;
      </li>
      <li>
        <strong>cualquier acto, omisión, interrupción o cambio</strong> de un servicio de terceros,
        tienda de aplicaciones o sistema operativo.
      </li>
    </ul>
    <p>
      <strong>
        Nuestra responsabilidad total acumulada por todas las reclamaciones relativas a la App o a
        estos Términos no excederá la mayor de (a) la cantidad total que usted nos haya pagado
        efectivamente por la App en los doce (12) meses inmediatamente anteriores al hecho que dio
        lugar a la reclamación, o (b) veinticinco dólares estadounidenses (US$25.00).
      </strong>
    </p>
    <p>
      Estas limitaciones son una base fundamental del acuerdo entre nosotros y se aplican aunque un
      remedio limitado no cumpla su propósito esencial.
    </p>
    <p>
      <strong>Excepciones.</strong> Nada en estos Términos excluye ni limita responsabilidad alguna
      que no pueda excluirse o limitarse legalmente, incluida la responsabilidad por muerte o lesiones
      personales causadas por negligencia, por fraude o declaración fraudulenta, ni ningún derecho
      irrenunciable que usted tenga bajo la legislación de protección al consumidor de su país o
      estado. Algunas jurisdicciones no permiten ciertas exclusiones o limitaciones, por lo que partes
      de esta Sección y de la Sección 14 podrían no aplicarle; en ese caso, se aplican en la máxima
      medida permitida por la ley.
    </p>

    <h2>16. Indemnización</h2>
    <p>
      En la máxima medida permitida por la ley, usted acepta{' '}
      <strong>defender, indemnizar y mantener indemnes</strong> a Eduardo Velez y a Budget Your Budget
      frente a cualquier reclamación, demanda, procedimiento, pérdida, responsabilidad, daño, costo o
      gasto (incluidos honorarios legales razonables) que surja de o se relacione con:
    </p>
    <ul>
      <li>su uso o uso indebido de la App;</li>
      <li>su incumplimiento de estos Términos, de cualquier ley o de los derechos de terceros;</li>
      <li>
        <strong>
          información sobre otra persona que usted haya introducido o compartido a través de la App
        </strong>
        , o una reclamación presentada por una persona con quien compartió un presupuesto;
      </li>
      <li>cualquier acto suyo con un código de invitación, o cualquier persona a quien se lo diera.</li>
    </ul>
    <p>
      Podemos asumir la defensa y el control exclusivos de cualquier asunto sujeto a indemnización por
      su parte, a costa suya, y usted acepta cooperar con nuestra defensa. Usted no transigirá ningún
      asunto que imponga obligación alguna sobre nosotros sin nuestro consentimiento previo por
      escrito.
    </p>

    <h2>17. Resolución de disputas, arbitraje y renuncia a acciones colectivas</h2>
    <p>
      <strong>
        Lea esta Sección con atención. Afecta sus derechos legales, incluido su derecho a presentar
        una demanda judicial y a que un jurado decida sus reclamaciones.
      </strong>
    </p>

    <h3>17.1 Hable con nosotros primero</h3>
    <p>
      La mayoría de los problemas se resuelven rápido.{' '}
      <strong>
        Antes de iniciar un arbitraje o cualquier procedimiento legal, usted acepta enviarnos un Aviso
        de Disputa por escrito
      </strong>{' '}
      a <Mail />, con su nombre, el correo o la cuenta relacionada, una descripción del problema y la
      solución que busca. Haremos lo mismo ante cualquier reclamación nuestra contra usted.{' '}
      <strong>
        Ambos acordamos intentar de buena fe resolver la disputa de manera informal durante treinta
        (30) días
      </strong>{' '}
      desde la recepción del Aviso. Solo después de ese plazo podrá cualquiera de las partes iniciar
      el arbitraje. Este requisito es una condición previa al arbitraje, y el plazo de la Sección 17.6
      queda suspendido mientras transcurre.
    </p>

    <h3>17.2 Arbitraje individual vinculante</h3>
    <p>
      Si no logramos resolver la disputa de manera informal,{' '}
      <strong>
        usted y nosotros acordamos que toda disputa, reclamación o controversia que surja de o se
        relacione con estos Términos, la App o nuestra relación — ya se base en contrato,
        responsabilidad extracontractual, ley, fraude o cualquier otra teoría, y ya surja antes,
        durante o después de la vigencia de estos Términos — se resolverá mediante arbitraje
        individual vinculante y no ante los tribunales.
      </strong>
    </p>
    <p>
      El arbitraje será administrado por la{' '}
      <strong>American Arbitration Association (&ldquo;AAA&rdquo;)</strong> conforme a sus{' '}
      <strong>Consumer Arbitration Rules</strong> vigentes, con las modificaciones de estos Términos.
      El arbitraje se llevará a cabo ante un único árbitro, con sede en{' '}
      <strong>San Juan, Puerto Rico</strong>, salvo que usted opte por que la audiencia se realice por
      teléfono o videoconferencia, o en el municipio o distrito donde reside. El laudo del árbitro
      podrá registrarse como sentencia ante cualquier tribunal competente.
    </p>
    <p>
      <strong>
        Este acuerdo de arbitraje se rige por la Federal Arbitration Act, 9 U.S.C. § 1 y siguientes.
      </strong>{' '}
      El árbitro decide todas las cuestiones, salvo que un tribunal decidirá si la Sección 17.3 es
      exigible.
    </p>
    <p>
      El árbitro puede conceder la misma reparación individual que un tribunal podría concederle a
      usted individualmente, y debe atenerse a estos Términos. Cada parte asumirá sus propios
      honorarios legales, salvo que la ley o las reglas de la AAA dispongan otra cosa; el arancel de
      consumo de la AAA rige el costo del arbitraje.
    </p>

    <h3>17.3 Renuncia a acciones colectivas</h3>
    <p>
      <strong>
        Usted y nosotros acordamos que cada parte solo podrá presentar reclamaciones contra la otra a
        título individual, y no como demandante o miembro de un grupo en ningún procedimiento
        colectivo, consolidado, de acción popular o representativo.
      </strong>{' '}
      El árbitro no podrá consolidar las reclamaciones de más de una persona ni presidir ninguna forma
      de procedimiento colectivo o representativo.{' '}
      <strong>El arbitraje colectivo no está autorizado bajo estos Términos.</strong>
    </p>

    <h3>17.4 Excepciones</h3>
    <p>No obstante lo anterior:</p>
    <ul>
      <li>
        <strong>
          Cualquiera de las partes puede presentar una reclamación individual ante un tribunal de
          reclamaciones menores
        </strong>{' '}
        si califica y permanece en ese tribunal;
      </li>
      <li>
        <strong>
          Cualquiera de las partes puede solicitar medidas cautelares o equitativas ante los
          tribunales
        </strong>{' '}
        por infracción o uso indebido, real o inminente, de propiedad intelectual o información
        confidencial;
      </li>
      <li>
        Nada de lo aquí dispuesto le impide denunciar un asunto ante una agencia gubernamental o
        regulador.
      </li>
    </ul>

    <h3>17.5 Si la renuncia a acciones colectivas resulta inexigible</h3>
    <p>
      Si la renuncia a acciones colectivas de la Sección 17.3 se declarase inexigible respecto de una
      reclamación o petición concreta, entonces{' '}
      <strong>
        esa reclamación o petición se separará del arbitraje y se presentará ante los tribunales
        indicados en la Sección 18
      </strong>
      , y todas las demás reclamaciones seguirán sometidas a arbitraje. El resto de esta Sección 17
      permanece vigente. Si cualquier otra parte de esta Sección 17 resultase inexigible, se separará
      y el resto seguirá en vigor.
    </p>

    <h3>17.6 Plazo de un año para reclamar</h3>
    <p>
      <strong>
        Toda reclamación relativa a la App o a estos Términos debe presentarse dentro de un (1) año
        desde que surgió, o quedará permanentemente prescrita
      </strong>{' '}
      — salvo que la ley exija un plazo mayor que no pueda acortarse por acuerdo, en cuyo caso se
      aplicará ese plazo.
    </p>

    <h2>18. Ley aplicable y jurisdicción</h2>
    <p>
      Estos Términos y toda disputa derivada de ellos se rigen por las{' '}
      <strong>leyes del Estado Libre Asociado de Puerto Rico</strong> y, cuando corresponda, por la
      ley federal de los Estados Unidos, sin atender a las normas sobre conflicto de leyes. No se
      aplica la Convención de las Naciones Unidas sobre los Contratos de Compraventa Internacional de
      Mercaderías.
    </p>
    <p>
      Para cualquier disputa no sujeta a arbitraje conforme a la Sección 17, usted y nosotros
      aceptamos la{' '}
      <strong>
        jurisdicción y competencia exclusivas de los tribunales ubicados en San Juan, Puerto Rico
      </strong>
      , y cada parte renuncia a cualquier objeción a esa competencia.
    </p>
    <p>
      <strong>
        Si usted reside en la Unión Europea, el Reino Unido u otra jurisdicción cuya legislación le
        otorgue derechos que no pueden ser anulados por contrato, nada de lo aquí dispuesto le priva
        de la protección de las normas imperativas de su país de residencia, ni del derecho a acudir a
        los tribunales de su localidad cuando ese derecho sea irrenunciable.
      </strong>
    </p>

    <h2>19. Apple y Google</h2>
    <p>
      <strong>Si obtuvo la App en el App Store de Apple:</strong>
    </p>
    <ul>
      <li>Estos Términos son únicamente entre usted y nosotros, y no con Apple.</li>
      <li>Apple no tiene obligación alguna de prestar mantenimiento o soporte para la App.</li>
      <li>
        Si la App no se ajusta a alguna garantía aplicable, usted puede notificarlo a Apple, y Apple le
        reembolsará el precio de compra de la App. En la máxima medida permitida por la ley, Apple no
        tiene ninguna otra obligación de garantía respecto de la App.
      </li>
      <li>
        Apple no es responsable de atender reclamación alguna suya o de terceros relativa a la App,
        incluidas las reclamaciones por responsabilidad de producto, las que aleguen que la App no
        cumple un requisito legal o reglamentario, y las que surjan bajo normas de protección al
        consumidor o similares.
      </li>
      <li>
        Apple no es responsable de la investigación, defensa, transacción o cumplimiento de ninguna
        reclamación de terceros por infracción de derechos de propiedad intelectual.
      </li>
      <li>
        Usted declara que no se encuentra en un país sujeto a embargo del Gobierno de los EE. UU. ni
        designado como país &ldquo;que apoya el terrorismo&rdquo;, y que no figura en ninguna lista
        del Gobierno de los EE. UU. de partes prohibidas o restringidas.
      </li>
      <li>
        <strong>
          Apple y sus filiales son terceros beneficiarios de estos Términos y pueden hacerlos valer
          frente a usted.
        </strong>
      </li>
      <li>
        Usted debe cumplir los términos de servicio de terceros aplicables, incluidos los Términos y
        Condiciones de los Servicios de Medios de Apple.
      </li>
    </ul>
    <p>
      <strong>Si obtuvo la App en Google Play</strong>, su uso también está sujeto a los Términos de
      Servicio de Google Play, y Google no es parte de estos Términos ni es responsable de la App.
    </p>

    <h2>20. Disposiciones generales</h2>
    <ul>
      <li>
        <strong>Acuerdo íntegro.</strong> Estos Términos y la Política de Privacidad constituyen el
        acuerdo completo entre usted y nosotros sobre la App, y sustituyen cualquier término anterior,
        incluido el aviso combinado de términos y privacidad publicado antes en este sitio.
      </li>
      <li>
        <strong>Divisibilidad.</strong> Si alguna disposición se declara inválida o inexigible, se
        limitará o eliminará en la mínima medida necesaria y el resto permanecerá en pleno vigor.
      </li>
      <li>
        <strong>Ausencia de renuncia.</strong> Que no hagamos valer una disposición no supone renuncia
        a hacerla valer después.
      </li>
      <li>
        <strong>Cesión.</strong> Usted no puede ceder ni transferir estos Términos ni derecho alguno
        derivado de ellos sin nuestro consentimiento por escrito. Nosotros sí podemos cederlos, total
        o parcialmente, incluso a un sucesor en el marco de una fusión, adquisición o venta de
        activos.
      </li>
      <li>
        <strong>Fuerza mayor.</strong> No somos responsables de incumplimientos o demoras causados por
        hechos fuera de nuestro control razonable, incluidas interrupciones de servicios de terceros,
        fallos de red o infraestructura, desastres naturales, tormentas, cortes de energía o
        actuaciones gubernamentales.
      </li>
      <li>
        <strong>Sin terceros beneficiarios</strong>, salvo Apple conforme a la Sección 19.
      </li>
      <li>
        <strong>Notificaciones.</strong> Podemos notificarle dentro de la App, en este sitio web o a
        cualquier dirección de correo asociada a su cuenta. Usted debe notificarnos a <Mail />.
      </li>
      <li>
        <strong>Relación.</strong> Estos Términos no crean sociedad, empresa conjunta, agencia ni
        relación laboral entre nosotros.
      </li>
      <li>
        <strong>Idioma.</strong> Estos Términos se publican en inglés y español. En caso de conflicto
        o diferencia de interpretación,{' '}
        <strong>prevalece la versión en inglés</strong>. Los títulos son solo de referencia.
      </li>
    </ul>

    <h2>21. Contacto</h2>
    <p>
      Las preguntas, notificaciones y Avisos de Disputa conforme a la Sección 17.1 deben enviarse a:
    </p>
    <p>
      📧 <strong><Mail /></strong>
    </p>
    <p>
      Budget Your Budget — operado por Eduardo Velez, Estado Libre Asociado de Puerto Rico, Estados
      Unidos.
    </p>
  </>
);

/* ── PAGE ─────────────────────────────────────────────────── */

export default function Terms() {
  return (
    <LegalLayout
      en={EN}
      es={ES}
      updatedEn="September 23, 2026"
      updatedEs="23 de septiembre de 2026"
    />
  );
}

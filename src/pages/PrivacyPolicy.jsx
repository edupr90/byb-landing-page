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

        {/* ── Divider ──────────────────────────────────────── */}
        <hr className="my-16 border-slate-300 dark:border-slate-700" />

        {/* ── Spanish Version ──────────────────────────────── */}
        <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <strong>Última actualización:</strong> 29 de agosto de 2025
          </p>

          <h1>Términos de Uso y Política de Privacidad — <em>Budget Your Budget</em></h1>

          <p>
            Bienvenido a <strong>Budget Your Budget</strong> (&ldquo;la App&rdquo;). Al usar esta
            App, usted acepta los siguientes Términos de Uso y Política de Privacidad. Si no está de
            acuerdo, por favor deje de usarla.
          </p>
          <p>
            Podemos actualizar estos términos ocasionalmente. El uso continuado de la App después de
            las actualizaciones significa que acepta los cambios.
          </p>

          <br />

          <h2>1.0 Propósito de la App</h2>
          <ul>
            <li>
              Budget Your Budget es una <strong>herramienta de presupuesto personal</strong>.
            </li>
            <li>
              La App <strong>no es un banco, institución financiera ni asesor financiero</strong>.
            </li>
            <li>No proporcionamos asesoramiento de inversión, fiscal, contable ni legal.</li>
            <li>Usted es el único responsable de sus decisiones financieras.</li>
          </ul>
          <p>
            <strong>Aviso legal:</strong> No somos responsables de ninguna pérdida financiera, daños
            o decisiones tomadas usando esta App.
          </p>

          <br />

          <h2>2.0 Recopilación de Datos y Privacidad</h2>
          <ul>
            <li>
              Toda la información que ingresa (ingresos, categorías, gastos) se almacena{' '}
              <strong>localmente en su dispositivo</strong>.
            </li>
            <li>
              <strong>
                No recopilamos, transmitimos ni almacenamos sus datos personales o financieros en
                servidores externos
              </strong>
              .
            </li>
            <li>
              Usted tiene el control total de su información. Si elimina la App o restablece su
              dispositivo, no podemos acceder, recuperar ni restaurar sus datos en su nombre.
            </li>
            <li>
              La App proporciona una función integrada de{' '}
              <strong>copia de seguridad y restauración</strong>, que le permite exportar sus datos y
              reimportarlos cuando sea necesario. Recomendamos encarecidamente realizar copias de
              seguridad periódicas para evitar la pérdida de datos.
            </li>
          </ul>

          <h3>2.1 Servicios de Terceros</h3>
          <p>
            Si bien la App en sí no recopila datos, se pueden utilizar servicios de terceros para:
          </p>
          <ul>
            <li>
              <strong>Compras dentro de la app y suscripciones</strong> → gestionadas por Apple App
              Store o Google Play.
            </li>
            <li>
              <strong>Gestión de suscripciones</strong> → gestionada por RevenueCat.
            </li>
            <li>
              <strong>Anuncios</strong> (para usuarios gratuitos) → gestionados por Google AdMob.
            </li>
          </ul>
          <p>Cada tercero opera bajo su propia política de privacidad:</p>
          <ul>
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de Google Play
              </a>
            </li>
            <li>
              <a
                href="https://www.apple.com/legal/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de Apple
              </a>
            </li>
            <li>
              <a
                href="https://www.revenuecat.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de RevenueCat
              </a>
            </li>
          </ul>

          <br />

          <h2>3.1 Opciones de Suscripción</h2>
          <blockquote>
            <p>
              Los precios mostrados corresponden a la tienda de EE. UU.;{' '}
              <strong>los precios pueden variar según la región y la moneda</strong>. Las
              suscripciones <strong>se renuevan automáticamente</strong> a menos que se cancelen.
              Puede cancelar en cualquier momento en la configuración de App Store / Google Play.
            </p>
          </blockquote>

          <h3>Planes Premium</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th className="text-right">Precio</th>
                  <th>Facturación</th>
                  <th>Prueba</th>
                  <th>Cancelar en cualquier momento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Premium Mensual</strong>
                  </td>
                  <td className="text-right">
                    <strong>$4.99</strong>
                  </td>
                  <td>Por mes</td>
                  <td>—</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>
                    <strong>Premium Anual</strong>
                  </td>
                  <td className="text-right">
                    <strong>$29.99</strong>
                  </td>
                  <td>Por año</td>
                  <td>—</td>
                  <td>
                    ✅ <em>(Mejor valor)</em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Lo que obtiene con Premium</h3>
          <ul>
            <li>
              <strong>Categorías Personalizadas</strong> – Cree sus propias categorías con nombres y
              emojis que se adapten a su estilo de vida.
            </li>
            <li>
              <strong>Presupuestos y Gastos Recurrentes</strong> – Automatice elementos repetitivos
              para que nunca se pierda un pago.
            </li>
            <li>
              <strong>Reportes e Información</strong> – Compare meses, vea tendencias y sepa
              exactamente a dónde va su dinero.
            </li>
            <li>
              <strong>Exportar a PDF o Excel</strong> – Mantenga registros o comparta su presupuesto
              en cualquier momento.
            </li>
            <li>
              <strong>Experiencia sin Anuncios</strong> – Disfrute de una interfaz limpia y sin
              distracciones.
            </li>
          </ul>

          <h3>Cómo Funcionan las Suscripciones</h3>
          <ul>
            <li>
              El pago se cobra a su cuenta de <strong>Apple ID</strong> o{' '}
              <strong>Google Play</strong> al confirmar la compra.
            </li>
            <li>
              Las suscripciones <strong>se renuevan automáticamente</strong> a menos que desactive la
              renovación automática al menos 24 horas antes del final del período actual.
            </li>
            <li>
              Se cobrará a su cuenta la renovación dentro de las 24 horas previas al final del
              período actual.
            </li>
            <li>
              Administre o cancele su suscripción en la configuración de su cuenta de{' '}
              <strong>App Store</strong> / <strong>Google Play</strong> después de la compra.
            </li>
            <li>
              Si su suscripción caduca, las funciones premium ya no estarán disponibles y{' '}
              <strong>
                no se crearán nuevas categorías o gastos recurrentes
              </strong>
              .
            </li>
          </ul>

          <h3>Términos de Uso (EULA)</h3>
          <p>
            Para usuarios de iOS, el uso de suscripciones también se rige por el{' '}
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Acuerdo de Licencia de Usuario Final Estándar de Apple (EULA)</strong>
            </a>
            .
          </p>

          <br />

          <h2>4.0 Privacidad de los Niños</h2>
          <ul>
            <li>La App no está dirigida a niños menores de 13 años.</li>
            <li>No recopilamos datos de niños de manera consciente.</li>
            <li>
              Dado que todos los datos son solo locales, los padres siguen siendo responsables de
              supervisar el uso del dispositivo.
            </li>
          </ul>

          <br />

          <h2>5.0 Limitación de Responsabilidad</h2>
          <p>
            La App se proporciona <strong>&ldquo;tal cual&rdquo; sin garantías de ningún tipo</strong>
            . En la máxima medida permitida por la ley, rechazamos toda responsabilidad por daños,
            pérdidas o reclamaciones que surjan del uso de la App.
          </p>

          <br />

          <h2>6.0 Contacto y Soporte</h2>
          <p>
            Si tiene alguna pregunta sobre estos Términos o la Política de Privacidad, contáctenos
            en:
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

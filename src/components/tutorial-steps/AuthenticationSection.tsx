import { useState } from 'react';
import { links } from '../links';

export const AuthenticationSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Authentication Configuration</h2>

      <p className="text-lg text-gray-700">
        This section covers how to enable Azure Web App Easy Auth (Microsoft SSO) and restrict access to users from a
        specific tenant ID. This website doesn't have any special data or storage, but it still has authentication setup
        as an example to follow.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-semibold text-blue-900">Overview</h3>
        <p className="mt-2 text-blue-800">
          Azure Web App Easy Auth provides built-in authentication and authorization capabilities without requiring code
          changes. It handles the authentication flow automatically and injects user information into HTTP headers.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
          <h3 className="font-semibold text-orange-900">Step 1: Add Redirect URI to App Registration</h3>
          <div className="mt-3 text-orange-800 space-y-3">
            <p>
              Before configuring authentication, you need to add your web app's redirect URI to the existing app
              registration:
            </p>
            <ol className="space-y-2">
              <li>
                1. Go to the{' '}
                <a
                  href={links.appRegistration}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Registration in Azure Portal
                </a>
              </li>
              <li>
                2. Click on <strong>Authentication</strong> in the left sidebar
              </li>
              <li>
                3. Under <strong>Web</strong> platform, click <strong>Add URI</strong>
              </li>
              <li>
                4. Add your Azure Web App URL followed by{' '}
                <code className="bg-gray-100 px-1 rounded">/.auth/login/aad/callback</code>
              </li>
              <li>
                5. Click <strong>Save</strong>
              </li>
            </ol>
            <div className="mt-4">
              <img
                src="/redirect.png"
                alt="Azure App Registration Authentication page showing redirect URI configuration"
                className="w-full max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            If you do not have permissions to add your own redirect URI, you can ask the GenttAPI owners to do it for
            you.
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-semibold text-green-900">Step 2: Enable Authentication in Azure Portal</h3>
          <ol className="mt-3 text-green-800 space-y-2">
            <li>1. Navigate to your Azure Web App in the Azure Portal</li>
            <li>
              2. In the left sidebar, click on <strong>Authentication</strong>
            </li>
            <li>
              3. Click <strong>Add identity provider</strong>
            </li>
            <li>
              4. Select <strong>Microsoft</strong> as the identity provider
            </li>
            <li>
              5. Choose <strong>Current tenant - Single tenant</strong> for app registration type
            </li>
            <li>
              6. Set the supported account types to <strong>My organization only</strong>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold text-yellow-900">Step 3: Configure Microsoft Identity Provider</h3>
          <div className="mt-3 text-yellow-800 space-y-3">
            <p>Fill in the form fields with the following configuration:</p>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Configuration Settings:</h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-medium">Application (client) ID:</span>
                  <span className="col-span-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    b8a49903-6fac-45f9-a1a1-3717b12d70ea
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-medium">Client secret:</span>
                  <span className="col-span-2 text-gray-500">(recommended - leave empty)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-medium">Issuer URL:</span>
                  <span className="col-span-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {links.microsoftTenantIssuerUrl}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-medium">Allowed token audiences:</span>
                  <span className="col-span-2 text-gray-500">(leave empty for default)</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Additional Checks:</h4>

              <span className="font-medium">Leave unchanged</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">App Service Authentication Settings:</h4>
              <span className="font-medium">Leave unchanged</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-2">Where to find the Client ID:</h4>
              <p className="text-blue-800 text-sm">
                We're using an existing app registration from Step 1 (
                <code className="bg-white px-1 rounded">b8a49903-6fac-45f9-a1a1-3717b12d70ea</code>) to avoid the
                complexity of creating a new one with service tree requirements. You can find this Client ID in the{' '}
                <a
                  href={links.appRegistration}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Registration Overview
                </a>{' '}
                page. This App Registration isn't linked to any service tree, because it's auto created by Azure Static
                Web App. To save you time on having to create SWA just for this, this guide is saving you time by using
                an existing one.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-2">About the Tenant ID:</h4>
              <p className="text-blue-800 text-sm">
                This is Microsoft's tenant ID, which restricts access to Microsoft organization accounts only. It will
                be inferred based on Issuer URL.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4">
          <h3 className="font-semibold text-indigo-900">Step 4: Test Authentication</h3>
          <div className="mt-3 text-indigo-800 space-y-3">
            <p>After configuration, test the authentication flow:</p>
            <ul className="space-y-2">
              <li>• Navigate to your web app URL</li>
              <li>• You should be redirected to Microsoft login</li>
              <li>• Only users from your tenant (microsoft.com) should be able to access</li>
              <li>• Non-Microsoft accounts will be denied access</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 hover:bg-gray-200 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">For those who want to know more ⭐</h3>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="font-semibold text-purple-900">Configure App Registration</h3>
                <p className="mt-2 text-purple-800">If you need to configure the App Registration manually:</p>
                <ol className="mt-3 text-purple-800 space-y-2">
                  <li>
                    1. Go to <strong>Azure Active Directory</strong> {'>'} <strong>App registrations</strong>
                  </li>
                  <li>2. Find your app registration or create a new one</li>
                  <li>
                    3. Under <strong>Authentication</strong>, add a web platform configuration
                  </li>
                  <li>4. Add your Azure Web App URL as a redirect URI</li>
                  <li>
                    5. Enable <strong>ID tokens</strong> for the web flow
                  </li>
                  <li>
                    6. Set <strong>Supported account types</strong> to{' '}
                    <strong>Accounts in this organizational directory only</strong>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                <h3 className="font-semibold text-gray-900">Authentication Headers</h3>
                <p className="mt-2 text-gray-700">
                  Azure Web App Easy Auth automatically injects user information into HTTP headers:
                </p>
                <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
                  <ul className="text-sm space-y-2 font-mono">
                    <li>
                      <strong>X-MS-CLIENT-PRINCIPAL-NAME:</strong> user@microsoft.com
                    </li>
                    <li>
                      <strong>X-MS-CLIENT-PRINCIPAL-ID:</strong> user object ID
                    </li>
                    <li>
                      <strong>X-MS-CLIENT-PRINCIPAL:</strong> base64 encoded user claims
                    </li>
                    <li>
                      <strong>X-MS-TOKEN-AAD-ID-TOKEN:</strong> JWT ID token
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-900">Notes</h3>
                <ul className="mt-2 text-green-800 space-y-1">
                  <li>• Authentication is handled entirely by Azure, no code changes needed</li>
                  <li>• Users must have accounts in the specified tenant</li>
                  <li>• Access is automatically denied for users outside the tenant</li>
                  <li>• The authentication flow works for both frontend and API endpoints</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

const ScriptsPage = () => {
  const [mainCopied, setMainCopied] = useState(false);
  const [thankYouCopied, setThankYouCopied] = useState(false);

  const affiliateCode = "KA-TZ9CEZWZOP";

  const mainScript = `<script src="https://affisaas.com/js/${affiliateCode}.js" async></script>`;

  const thankYouScript = `<script src="https://affisaas.com/js/${affiliateCode}.js"></script>
<script>
  offers = window._revoffers_track || [];
  offers.push("convert");
</script>`;

  const copyToClipboard = async (
    text: string,
    setStateFn: (value: boolean) => void
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setStateFn(true);
      setTimeout(() => setStateFn(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Installation Scripts</h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Main Page Installation</h2>
        <p className="text-gray-600">
          Add this script to the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">{"<body>"}</code>{" "}
          section of your main page:
        </p>
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{mainScript}</code>
          </pre>
          <button
            onClick={() => copyToClipboard(mainScript, setMainCopied)}
            className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            <Copy
              size={20}
              className={mainCopied ? "text-green-400" : "text-gray-400"}
            />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Thank You Page Tracking</h2>
        <p className="text-gray-600">
          Add this script to your thank you page and replace{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">YOUR-ORDER-ID</code>{" "}
          and <code className="bg-gray-100 px-2 py-1 rounded">amount</code> with
          actual values:
        </p>
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{thankYouScript}</code>
          </pre>
          <button
            onClick={() => copyToClipboard(thankYouScript, setThankYouCopied)}
            className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            <Copy
              size={20}
              className={thankYouCopied ? "text-green-400" : "text-gray-400"}
            />
          </button>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <p className="text-yellow-700">
            <strong>Important:</strong> Make sure to replace the placeholder
            values:
          </p>
          <ul className="list-disc ml-6 mt-2 text-yellow-700">
            <li>
              Replace{" "}
              <code className="bg-yellow-100 px-2 py-1 rounded">
                YOUR-ORDER-ID
              </code>{" "}
              with your actual order ID
            </li>
            <li>
              Update the{" "}
              <code className="bg-yellow-100 px-2 py-1 rounded">amount</code>{" "}
              value with the actual purchase amount
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScriptsPage;

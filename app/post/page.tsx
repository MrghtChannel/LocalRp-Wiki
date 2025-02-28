"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import "github-markdown-css/github-markdown.css";
import "../css/post.css";
import { categories, categoryTitles, docTitles } from "../../config";

const DocsPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docTitle, setDocTitle] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [DocComponent, setDocComponent] = useState<React.FC | null>(null);
  const [docHeadings, setDocHeadings] = useState<Array<{ text: string; id: string }>>([]);

  const loadDoc = useCallback(async (category: string, doc: string) => {
    try {
      const docModule = await import(`../content/wiki/${category}/${doc}.mdx`);
      setDocComponent(() => docModule.default);
      setSelectedDoc(`wiki/${category}/${doc}`);
      setDocTitle(docModule.title || docTitles[`${category}/${doc}`] || "Без назви");
      extractHeadings(docModule.default);
    } catch (_error) {
      console.error("Error fetching document:", _error);
      const NoDocFound: React.FC = () => (
        <p className="text-red-500 text-2xl font-bold ml-4">Документ не знайдено</p>
      );
      NoDocFound.displayName = "NoDocFound";
      setDocComponent(() => NoDocFound);
      setDocTitle(null);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const doc = params.get("doc");

    if (category && doc) {
      loadDoc(category, doc);
      setOpenSections((prev) => ({ ...prev, [category]: true }));
    }
  }, [loadDoc]);

  const extractHeadings = (DocComponent: React.FC) => {
    console.log(DocComponent);
    setTimeout(() => {
      const headings = Array.from(
        document.querySelectorAll(".markdown-body h1, .markdown-body h2, .markdown-body h3")
      )
        .map((el) => ({ text: el.textContent || "", id: el.id }))
        .filter((item) => item.text && item.id);
      setDocHeadings(headings);
    }, 100);
  };

  const handleSelectDoc = (category: string, docFile: string) => {
    loadDoc(category, docFile);
    setOpenSections((prev) => ({ ...prev, [category]: true }));

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("category", category);
    newUrl.searchParams.set("doc", docFile);
    window.history.replaceState(null, "", newUrl.toString());
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    });
  };

  return (
    <div className="bg-[#0D0E14] text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-1 flex">
        <aside className="w-1/4 pr-4">
          <h1 className="text-3xl font-bold mb-6">Категорії</h1>
          {Object.entries(categories).map(([category, docs]) => (
            <div key={category} className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4 cursor-pointer flex items-center"
                onClick={() => setOpenSections((prev) => ({ ...prev, [category]: !prev[category] }))}
              >
                {categoryTitles[category] || category}
                {openSections[category] ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              </h2>
              {openSections[category] && (
                <ul className="pl-4 list-disc list-inside space-y-2">
                  {docs.map((doc) => (
                    <li key={doc}>
                      <button
                        onClick={() => handleSelectDoc(category, doc)}
                        className={`text-blue-400 hover:underline ${selectedDoc === `wiki/${category}/${doc}` ? "font-bold" : ""}`}
                      >
                        {docTitles[`${category}/${doc}`] || doc}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>
        <main className="w-2/4 bg-gray-800 p-6 rounded-lg shadow-lg">
          {docTitle && <h2 className="text-xl font-semibold mb-4">{docTitle}</h2>}
          {DocComponent ? (
            <div className="markdown-body">
              <DocComponent />
            </div>
          ) : (
            <p className="text-gray-400 ml-4 text-lg">Виберіть документ для перегляду</p>
          )}
        </main>
        <aside className="w-1/4 pl-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Зміст</h3>
            <ul className="list-disc list-inside space-y-2">
              {docHeadings.length > 0 ? (
                docHeadings.map((heading, index) => (
                  <li key={index}>
                    <a href={`#${heading.id}`} className="text-blue-400 hover:underline">
                      {heading.text}
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">Немає змісту</p>
              )}
            </ul>
          </div>
          <button
            onClick={handleShare}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FiShare2 className="mr-2" /> Поширити
          </button>
          {alertVisible && (
            <div className="mt-4 p-3 bg-green-500 text-white text-center rounded-lg transition-opacity duration-300 ease-in-out">
              ✅ Посилання скопійовано!
            </div>
          )}
        </aside>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default DocsPage;
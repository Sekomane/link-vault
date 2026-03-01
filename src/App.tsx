import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { LinkItem, LinkFormMode } from "./types/types";
import LinkFormContainer from "./components/LinkFormContainer";
import LinkCard from "./components/LinkCard";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";
import "./styles.css";

function App() {
  const [links, setLinks] = useLocalStorage<LinkItem[]>("links-vault", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [formMode, setFormMode] = useState<LinkFormMode>("create");
  const [currentLink, setCurrentLink] = useState<LinkItem | null>(null);

  //Safe filtering
  const filteredLinks = links.filter((link) => {
    const search = searchTerm.toLowerCase();

    return (
      link.title.toLowerCase().includes(search) ||
      link.url.toLowerCase().includes(search) ||
      (link.description ?? "").toLowerCase().includes(search) ||
      link.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  });

  // Add
  const handleAddLink = (newLink: Omit<LinkItem, "id" | "createdAt">) => {
    const linkToAdd: LinkItem = {
      ...newLink,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    setLinks((prev) => [...prev, linkToAdd]);
    setSearchTerm(""); // clear search so new link is visible
    showNotification("Link added successfully!");
  };

  // Update
  const handleUpdateLink = (updatedLink: LinkItem) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === updatedLink.id ? updatedLink : link
      )
    );

    setFormMode("create");
    setCurrentLink(null);
    showNotification("Link updated successfully!");
  };

  //Form handler
  const handleFormSubmit = (
    linkData: Omit<LinkItem, "id" | "createdAt"> | LinkItem
  ) => {
    if ("id" in linkData) {
      handleUpdateLink(linkData);
    } else {
      handleAddLink(linkData);
    }
  };

  //Delete
  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    showNotification("Link deleted successfully!");
  };

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(
      () => setNotification({ show: false, message: "" }),
      3000
    );
  };

  return (
    <div className="vault-layout">
      <header className="vault-header">
        <h1>LinkVault</h1>
        <p>Save, search and organize your important links</p>
      </header>

      <div className="vault-search">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={() => {}}
        />
      </div>

      <div className="vault-main">
        <div className="vault-form">
          <h3>{formMode === "edit" ? "Edit Link" : "Add New Link"}</h3>

          <LinkFormContainer
            onSubmit={handleFormSubmit}
            mode={formMode}
            initialData={currentLink}
            onCancel={() => {
              setFormMode("create");
              setCurrentLink(null);
            }}
          />
        </div>

        <div className="vault-links">
          {filteredLinks.length === 0 ? (
            <p className="empty-state">No links found</p>
          ) : (
            <div className="links-grid">
              {filteredLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onOpen={() => window.open(link.url, "_blank")}
                  onEdit={() => {
                    setCurrentLink(link);
                    setFormMode("edit");
                  }}
                  onDelete={() => handleDeleteLink(link.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Notification
        show={notification.show}
        message={notification.message}
      />
    </div>
  );
}

export default App;
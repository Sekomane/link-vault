import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LinkItem, LinkFormMode } from './types/types';
import LinkForm from './components/LinkForm';
import LinkCard from './components/LinkCard';
import SearchBar from './components/SearchBar';
import Notification from './components/Notification';
import './styles.css';

function App() {
  const [links, setLinks] = useLocalStorage<LinkItem[]>('links-vault', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [formMode, setFormMode] = useState<LinkFormMode>('create');
  const [currentLink, setCurrentLink] = useState<LinkItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const filteredLinks = links.filter(link => 
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleAddLink = (newLink: Omit<LinkItem, 'id' | 'createdAt'>) => {
    const linkToAdd = {
      ...newLink,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    setLinks([...links, linkToAdd]);
    showNotification('Link added successfully!');
  };

  const handleUpdateLink = (updatedLink: LinkItem) => {
    setLinks(links.map(link => link.id === updatedLink.id ? updatedLink : link));
    showNotification('Link updated successfully!');
    setFormMode('create');
  };

  const handleFormSubmit = (linkData: Omit<LinkItem, 'id' | 'createdAt'> | LinkItem) => {
    if ('id' in linkData) {
      handleUpdateLink(linkData);
    } else {
      handleAddLink(linkData);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    showNotification('Link deleted successfully!');
  };

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  return (
    <div className="app-container">
      <h1>Links Vault Application</h1>
      
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        isSearching={isSearching}
      />
      
      <LinkForm 
        onSubmit={handleFormSubmit}
        mode={formMode}
        initialData={currentLink}
        onCancel={() => {
          setFormMode('create');
          setCurrentLink(null);
        }}
      />
      
      <div className="links-grid">
        {filteredLinks.map(link => (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={() => {
              setCurrentLink(link);
              setFormMode('edit');
            }}
            onDelete={() => handleDeleteLink(link.id)}
          />
        ))}
      </div>
      
      <Notification 
        show={notification.show} 
        message={notification.message} 
      />
    </div>
  );
}

export default App;
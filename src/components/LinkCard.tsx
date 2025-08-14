import { LinkItem } from '../types/types';

interface LinkCardProps {
  link: LinkItem;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  const handleClick = () => {
    window.open(link.url, '_blank');
  };

  return (
    <div className="link-card">
      <div className="link-content" onClick={handleClick}>
        <h3>{link.title}</h3>
        <p className="url">{link.url}</p>
        {link.description && <p className="description">{link.description}</p>}
        {link.tags.length > 0 && (
          <div className="tags">
            {link.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="link-actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          Delete
        </button>
      </div>
    </div>
  );
}